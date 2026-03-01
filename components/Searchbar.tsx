'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { IEvent } from '@/database'

interface SearchbarProps {
    initialEvents: IEvent[]
    onSearch: (query: string) => void
    initialValue?: string
}

const Searchbar = ({ initialEvents, onSearch, initialValue = '' }: SearchbarProps) => {
    const [query, setQuery] = useState(initialValue)
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Sync internal state with prop if needed
    useEffect(() => {
        setQuery(initialValue)
    }, [initialValue])

    // Click outside to close suggestion dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Debounced search trigger and suggestion filtering
    useEffect(() => {
        if (!query.trim()) {
            setIsOpen(false)
            onSearch('')
            return
        }

        setIsLoading(true)
        setIsOpen(true)

        const timeoutId = setTimeout(() => {
            onSearch(query)
            setIsLoading(false)
        }, 300)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [query, onSearch])

    const suggestions = useMemo(() => {
        if (!query.trim()) return []
        const q = query.toLowerCase()
        return initialEvents
            .filter(event =>
                event.title.toLowerCase().includes(q) ||
                event.tags.some(tag => tag.toLowerCase().includes(q))
            )
            .slice(0, 6) // Limit to 6 suggestions
    }, [query, initialEvents])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setHighlightedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev))
        } else if (e.key === 'Enter') {
            if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
                selectSuggestion(suggestions[highlightedIndex].title)
            } else {
                setIsOpen(false)
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false)
            inputRef.current?.blur()
        }
    }

    const selectSuggestion = (value: string) => {
        setQuery(value)
        onSearch(value)
        setIsOpen(false)
        setHighlightedIndex(-1)
    }

    const clearInput = () => {
        setQuery('')
        onSearch('')
        setIsOpen(false)
        inputRef.current?.focus()
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto z-[100]" ref={dropdownRef}>
            <div className="relative group">
                <div className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isLoading ? 'text-primary' : 'text-light-200 group-focus-within:text-primary'}`}>
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.trim() && setIsOpen(true)}
                    placeholder="Search by title, tags, or location..."
                    className="w-full bg-[#0d1117]/80 backdrop-blur-xl border border-dark-200 rounded-full pl-14 pr-12 py-3.5 outline-none focus:border-primary/50 focus:ring-4 ring-primary/10 transition-all text-light-100 placeholder:text-light-200/50 shadow-lg shadow-black/20"
                />

                {query && (
                    <button
                        onClick={clearInput}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-light-200 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {isOpen && query.trim() && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#0d1117] border border-dark-200 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                        {suggestions.length > 0 ? (
                            <div className="flex flex-col">
                                <p className="px-4 py-2 text-[10px] uppercase tracking-widest text-light-200/50 font-bold">Suggestions</p>
                                {suggestions.map((event, index) => (
                                    <button
                                        key={event.slug || index}
                                        className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all ${highlightedIndex === index ? 'bg-primary/10 text-primary' : 'text-light-100 hover:bg-dark-200'
                                            }`}
                                        onClick={() => selectSuggestion(event.title)}
                                        onMouseEnter={() => setHighlightedIndex(index)}
                                    >
                                        <Search size={14} className="opacity-50" />
                                        <div>
                                            <p className="font-medium">{event.title}</p>
                                            <div className="flex gap-2">
                                                {event.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="text-[10px] opacity-60">#{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center flex flex-col items-center gap-3">
                                <div className="bg-dark-200 p-3 rounded-full opacity-50">
                                    <Search size={24} className="text-light-200" />
                                </div>
                                <p className="text-light-200 text-sm">No exact matches for &quot;{query}&quot;</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-dark-200/50 px-4 py-2 border-t border-dark-200 flex justify-between items-center">
                        <p className="text-[10px] text-light-200/50 uppercase font-medium">Use arrows to navigate</p>
                        <p className="text-[10px] text-light-200/50 font-medium">Press <span className="text-primary">Enter</span> to search</p>
                    </div>
                </div>
            )}

            {/* Loading Bar Pulse at the top of the dropdown if loading */}
            {isLoading && isOpen && (
                <div className="absolute top-full left-4 right-4 h-0.5 mt-[1px] bg-primary/20 overflow-hidden z-[101] rounded-full">
                    <div className="h-full bg-primary animate-progress-loading w-1/3"></div>
                </div>
            )}
        </div>
    )
}

export default Searchbar
