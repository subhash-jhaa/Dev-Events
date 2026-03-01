'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, Info } from 'lucide-react'
import Eventcard from './Eventcard'
import Searchbar from './Searchbar'
import { IEvent } from '@/database'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface EventsListProps {
    initialEvents: IEvent[]
}

const EventsList = ({ initialEvents }: EventsListProps) => {
    const [debouncedQuery, setDebouncedQuery] = useState('')
    const [selectedMode, setSelectedMode] = useState<string>("all")
    const [selectedType, setSelectedType] = useState<string>("all")

    // Mode and Type options
    const eventTypes = ['Hackathon', 'Meetup', 'Conference']
    const eventModes = ['online', 'offline', 'hybrid']

    const filteredEvents = useMemo(() => {
        return initialEvents.filter(event => {
            const matchesSearch =
                debouncedQuery === '' ||
                event.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                event.tags.some(tag => tag.toLowerCase().includes(debouncedQuery.toLowerCase()))

            const matchesMode = selectedMode === "all" || event.mode.toLowerCase() === selectedMode.toLowerCase()

            const matchesType = selectedType === "all" || event.tags.some(tag => tag.toLowerCase() === selectedType.toLowerCase())

            return matchesSearch && matchesMode && matchesType
        })
    }, [debouncedQuery, selectedMode, selectedType, initialEvents])

    const handleClearFilters = () => {
        setDebouncedQuery('')
        setSelectedMode("all")
        setSelectedType("all")
    }

    return (
        <div className="space-y-10">
            <div className="flex flex-col gap-8">
                {/* Search Bar */}
                <Searchbar
                    initialEvents={initialEvents}
                    onSearch={(q) => setDebouncedQuery(q)}
                    initialValue={debouncedQuery}
                />

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold text-light-200 uppercase tracking-widest opacity-50 ml-1">Mode</span>
                        <Select value={selectedMode} onValueChange={setSelectedMode}>
                            <SelectTrigger className="w-[160px] bg-white/[0.03] border-white/10 text-light-200 hover:text-white hover:bg-white/5 transition-all h-10 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal size={14} className="opacity-70" />
                                    <SelectValue placeholder="Event Mode" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-[#0c1212] border-white/10 text-white rounded-xl">
                                <SelectItem value="all">All Modes</SelectItem>
                                {eventModes.map((mode) => (
                                    <SelectItem key={mode} value={mode} className="capitalize">{mode}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold text-light-200 uppercase tracking-widest opacity-50 ml-1">Type</span>
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="w-[160px] bg-white/[0.03] border-white/10 text-light-200 hover:text-white hover:bg-white/5 transition-all h-10 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <Info size={14} className="opacity-70" />
                                    <SelectValue placeholder="Event Type" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-[#0c1212] border-white/10 text-white rounded-xl">
                                <SelectItem value="all">All Types</SelectItem>
                                {eventTypes.map((type) => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {(selectedMode !== "all" || selectedType !== "all" || debouncedQuery !== "") && (
                        <button
                            onClick={handleClearFilters}
                            className="mt-5 text-xs font-bold text-primary uppercase tracking-widest hover:underline px-2 transition-all"
                        >
                            Reset
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-xl font-bold mb-6">
                    {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
                </h3>

                {filteredEvents.length > 0 ? (
                    <ul className="events-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-0 m-0 list-none">
                        {filteredEvents.map((event: any) => (
                            <li key={event._id || event.title}>
                                <Eventcard {...event} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex items-center justify-center flex-col gap-4 py-20 border border-dashed border-white/10 rounded-2xl mt-8 bg-white/[0.02]">
                        <div className="bg-white/5 p-4 rounded-full">
                            <Search size={32} className="text-light-200 opacity-50" />
                        </div>
                        <p className="text-light-200">No events found matching your current filters.</p>
                        <button
                            className="text-primary hover:underline font-medium text-sm transition-all"
                            onClick={handleClearFilters}
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EventsList
