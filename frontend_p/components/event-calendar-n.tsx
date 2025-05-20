'use client'

import type { EventType } from '@/lib/types'
import { Calendar } from '@/components/calendar'
import { EventViewer } from '@/components/event-viewer'

interface Props { events: EventType[] }

export default function EventCalendarNew({ events }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Calendar events={events} />
      </div>
      <div>
        <EventViewer />
      </div>
    </div>
  )
}
