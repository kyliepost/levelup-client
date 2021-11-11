import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createEvent, getEvent, updateEventFetch } from './EventManager.js'
import { getGames } from '../game/GameManager.js'


export const EventForm = () => {
    const history = useHistory()
    const [event, setState] = useState({})

    const { eventId } = useParams()

    const [currentEvent, setEvent] = useState({
        gameId: 0,
        description: "",
        date: "",
        time: "",
    })
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    useEffect(() => {
        if (eventId) {
            getEvent(eventId).then((eventData) => setState({
                ...eventData,
                game: eventData.game,
                description: eventData.description,
                date: eventData.date,
                time: eventData.time
            }))
        }
    }, [eventId])

    const handleControlledInputChange = (event) => {
        const newEvent = Object.assign({}, currentEvent)
        newEvent[event.target.name] = event.target.value
        setEvent(newEvent)
    }

    const updateEvent = (event) => {
        event.preventDefault()

        updateEventFetch(event).then(() => {
            history.push('/events')
        })
    }
    

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ handleControlledInputChange }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option name="gameId" value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Event Date: </label>
                    <input name="date" onChange={handleControlledInputChange} type="date" id="date" className="form-control" placeholder="Select a Date" required />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Event Time: </label>
                    <input name="time" onChange={handleControlledInputChange} type="time" id="time" className="form-control" placeholder="Select a Time" required />
                </div>
            </fieldset>

            <div>
                <button onClick={(event) => {
                    if (eventId) {
                        updateEvent(event)
                    } else {
                        saveEvent(event)
                    }
                }}>Save Event </button>
            </div>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const newEvent = {
                        gameId: parseInt(currentEvent.gameId),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    createEvent(newEvent)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}