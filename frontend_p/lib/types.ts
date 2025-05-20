export type EventType = {
    id: string
    title: string
    date: string     // ISO or parseable by `new Date(...)`
    time: string
    location: string
    description: string
    image: string
    category: 'workshop' | 'performance' | 'meeting' | 'exhibition'
    capacity: number
  }
  