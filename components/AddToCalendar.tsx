'use client'

import { Calendar, Download, Share2 } from 'lucide-react'
import { IEvent } from '@/database'

const AddToCalendar = ({ event }: { event: any }) => {
    const { title, description, date, time, location, slug } = event

    // Format date and time for calendar links (YYYYMMDDTHHMMSS)
    // date: YYYY-MM-DD, time: HH:MM
    const cleanDate = date.replace(/-/g, '')
    const cleanTime = time.replace(/:/g, '')
    const startDateTime = `${cleanDate}T${cleanTime}00`

    // Assume 2 hour duration if not specified
    const endTime = (parseInt(cleanTime.substring(0, 2)) + 2).toString().padStart(2, '0') + cleanTime.substring(2)
    const endDateTime = `${cleanDate}T${endTime}00`

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`

    const generateICS = () => {
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `URL:${window.location.origin}/events/${slug}`,
            `DTSTART:${startDateTime}`,
            `DTEND:${endDateTime}`,
            `SUMMARY:${title}`,
            `DESCRIPTION:${description}`,
            `LOCATION:${location}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\n')

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.setAttribute('download', `${slug}-event.ics`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="flex flex-col gap-3 mt-6">
            <p className="text-[10px] uppercase font-bold text-light-200/50 tracking-widest pl-1">Save to Calendar</p>

            <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full bg-dark-200/50 hover:bg-dark-200 border border-dark-200 px-4 py-3 rounded-xl transition-all group"
            >
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                    <Calendar size={18} className="text-primary" />
                </div>
                <div className="text-left">
                    <p className="text-sm font-semibold text-light-100">Google Calendar</p>
                    <p className="text-[10px] text-light-200/60">Add to your Google schedule</p>
                </div>
            </a>

            <button
                onClick={generateICS}
                className="flex items-center gap-3 w-full bg-dark-200/50 hover:bg-dark-200 border border-dark-200 px-4 py-3 rounded-xl transition-all group text-left"
            >
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                    <Download size={18} className="text-primary" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-light-100">Outlook / iCal</p>
                    <p className="text-[10px] text-light-200/60">Download .ics file</p>
                </div>
            </button>

            <button
                onClick={() => {
                    if (navigator.share) {
                        navigator.share({
                            title: title,
                            text: description,
                            url: window.location.href,
                        }).catch(console.error);
                    } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                    }
                }}
                className="flex items-center gap-3 w-full bg-dark-200/50 hover:bg-dark-200 border border-dark-200 px-4 py-3 rounded-xl transition-all group text-left"
            >
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                    <Share2 size={18} className="text-primary" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-light-100">Share Event</p>
                    <p className="text-[10px] text-light-200/60">Copy or share link</p>
                </div>
            </button>
        </div>
    )
}

export default AddToCalendar
