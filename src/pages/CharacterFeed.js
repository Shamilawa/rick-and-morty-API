import React, { useEffect, useState } from 'react'

// custom hooks and context
import { useFavCharsContext } from "../hooks/useFavCharsContext"

// Pages and Components
import CharacterCard from "../components/CharacterCard"

function CharacterFeed() {

    const [characters, setCharacters] = useState([])
    const [shaowFavChars, setShaowFavChars] = useState(false)

    const { favCharacters } = useFavCharsContext()


    // Get all data from API when the component is loaded
    useEffect(() => {

        // Get req to fetch data from API
        const getData = async () => {

            const res = await fetch("https://rickandmortyapi.com/api/character")

            const data = await res.json()

            setCharacters(data.results)

        }

        // calling the function
        getData()


    }, [])


    // Get favourite character
    const getFavChars = () => {
        setShaowFavChars(!shaowFavChars)
    }

    return (
        <div>
            <div>
                <h5 onClick={getFavChars}>Fav Character</h5>
            </div>

            {shaowFavChars ?
                <div className="character-feed-container">
                    {favCharacters && favCharacters.map((character) => {
                        return (
                            <CharacterCard key={character.id} character={character} favIcon={false} />
                        )
                    })}
                </div>
                :
                <div className="character-feed-container">
                    {characters && characters.map((character) => {
                        return (
                            <CharacterCard key={character.id} character={character} favIcon={true} />
                        )
                    })}
                </div>
            }


        </div>
    )
}

export default CharacterFeed