import React, { useEffect, useState } from "react"
import { createGame, getGameTypes } from "./GameManager.js"
import { useHistory } from "react-router-dom"

export const GameForm = () => {
    const [game, setState] = useState({})
    const [gameTypes, setGameTypes] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGameTypes().then(typesData => setGameTypes(typesData))
    }, [])

    const handleOnChange = (event) => {
        const copyGame = { ...game }
        copyGame[event.target.name] = event.target.value
        setState(copyGame)
    }

    const saveGame = (event) => {
        event.preventDefault()

        createGame(game).then(() => {
            history.push('/')
        })
    }

    return (
        <form>
            <label>Title</label>
            <input type="text" name="title" onChange={(event) => handleOnChange(event)}></input>

            <label>Maker</label>
            <input type="text" name="maker" onChange={(event) => handleOnChange(event)}></input>

            <label>Number of Players</label>
            <input type="number" name="numberOfPlayers" onChange={(event) => handleOnChange(event)}></input>

            <label>Skill Level</label>
            <input type="number" name="skillLevel" onChange={(event) => handleOnChange(event)}></input>

            <label>Game Type</label>
            <select name="gameTypeId" onChange={(event) => handleOnChange(event)}>
                <option value="0">Select a game type</option>
                {
                    gameTypes.map(type => <option value={type.id}>{type.label}</option>)
                }
            </select>
            <button onClick={(event) => saveGame(event)}>Save Game</button>
        </form>
    )

}