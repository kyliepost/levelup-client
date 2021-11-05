import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"

export const EventList = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(eventsData => setEvents(eventsData))
    }, [])

    return (
        <article>
            {
                events.map(event => (
                    <section>
                        <p>Event Description: {event.description}</p>
                        <p>Event Date: {event.date}</p>
                        <p>Event Time: {event.time}</p>
                    </section>
                ))
            }
        </article>
    )
}