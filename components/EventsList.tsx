'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, Info } from 'lucide-react'
import Eventcard from './Eventcard'
import Searchbar from './Searchbar'
import FilterDropdown from './FilterDropdown'
import { IEvent } from '@/database'

interface EventsListProps {
    initialEvents: IEvent[]
}

const EventsList = ({ initialEvents }: EventsListProps) => {
    const [debouncedQuery, setDebouncedQuery] = useState('')
    const [selectedMode, setSelectedMode] = useState<string | null>(null)
    const [selectedType, setSelectedType] = useState<string | null>(null)

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

            const matchesMode = !selectedMode || event.mode.toLowerCase() === selectedMode.toLowerCase()

            const matchesType = !selectedType || event.tags.some(tag => tag.toLowerCase() === selectedType.toLowerCase())

            return matchesSearch && matchesMode && matchesType
        })
    }, [debouncedQuery, selectedMode, selectedType, initialEvents])

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
                <div className="flex flex-wrap items-end gap-6">
                    <FilterDropdown
                        label="Event Mode"
                        options={eventModes}
                        selected={selectedMode}
                        onSelect={setSelectedMode}
                        icon={<SlidersHorizontal size={14} />}
                    />

                    <FilterDropdown
                        label="Event Type"
                        options={eventTypes}
                        selected={selectedType}
                        onSelect={setSelectedType}
                        icon={<Info size={14} />}
                    />
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
                            onClick={() => {
                                setDebouncedQuery('')
                                setSelectedMode(null)
                                setSelectedType(null)
                            }}
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
