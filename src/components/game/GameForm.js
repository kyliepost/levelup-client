import React, { useEffect, useState } from "react"
import { createGame, getGameTypes, getGame, updateGameFetch } from "./GameManager.js"
import { useHistory, useParams } from "react-router-dom"

export const GameForm = () => {
    const [game, setState] = useState({})
    const [gameTypes, setGameTypes] = useState([])
    const history = useHistory()

    const { gameId } = useParams()

    useEffect(() => {
        getGameTypes().then(typesData => setGameTypes(typesData))
    }, [])

    useEffect(() => {
        if (gameId) {
            getGame(gameId).then((gameData) => setState({
                ...gameData,
                skillLevel: gameData.skill_level,
                numberOfPlayers: gameData.number_of_players,
                gameTypeId: gameData.game_type.id
            }))
        }
    }, [gameId])

    const handleOnChange = (event) => {
        const copyGame = { ...game }
        copyGame[event.target.name] = event.target.value
        setState(copyGame)
    }

    const updateGame = (event) => {
        event.preventDefault()

        updateGameFetch(game).then(() => {
            history.push('/')
        })
    }

    const saveGame = (event) => {
        event.preventDefault()

        createGame(game).then(() => {
            history.push('/')
        })
    }

    return (
        <form>
            <div>
                <label>Title</label>
                <input type="text" name="title" value={game.title} onChange={(event) => handleOnChange(event)}></input>
            </div>

            <div>
                <label>Maker</label>
                <input type="text" name="maker" value={game.maker} onChange={(event) => handleOnChange(event)}></input>
            </div>

            <div>
                <label>Number of Players</label>
                <input type="number" name="numberOfPlayers" value={game.numberOfPlayers} onChange={(event) => handleOnChange(event)}></input>
            </div>

            <div>
                <label>Skill Level</label>
                <input type="number" name="skillLevel" value={game.skillLevel} onChange={(event) => handleOnChange(event)}></input>
            </div>

            <div>
                <label>Game Type</label>
                <select name="gameTypeId" value={game.gameTypeId} onChange={(event) => handleOnChange(event)}>
                    <option value="0">Select a game type</option>
                    {
                        gameTypes.map(type => <option value={type.id}>{type.label}</option>)
                    }
                </select>
            </div>
            <div>
                <button onClick={(event) => {
                    if (gameId) {
                        updateGame(event)
                    } else {
                        saveGame(event)
                    }
                }}>Save Game</button>
            </div>
        </form>
    )

}