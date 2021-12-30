import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Games = () => {
  const [games, setGames] = useState([])

  useEffect(() => {
    axios
      .get(
        'https://games-rental-83316-default-rtdb.europe-west1.firebasedatabase.app/games.json'
      )
      .then((res) => {
        console.log(res)
        setGames(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <p style={{ color: 'white' }}>yoo</p>
      {games.map((g: {id: number, name: string}) => (
        <p style={{ color: 'white' }} key={g.id}>{g.name}</p>
      ))}
    </div>
  )
}

export default Games
