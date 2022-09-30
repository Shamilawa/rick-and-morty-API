import React, { useEffect, useState } from 'react'

// custom hooks and context
import { useFavCharsContext } from "../hooks/useFavCharsContext"

// Pages and Components
import CharacterCard from "../components/CharacterCard"

function CharacterFeed() {

    const [characters, setCharacters] = useState([])
    const [shaowFavChars, setShaowFavChars] = useState(false)

    // state for pagination
    const [nextPage, setNextPage] = useState()
    const [prevPage, setPrevPage] = useState()

    const { favCharacters } = useFavCharsContext()



    //function to render the next page
    const NavigateNext = async () => {
        const res = await fetch(nextPage)

        const data = await res.json()

        // get the link to next page and prev page and update the state
        if (data.info.next) {
            setNextPage(data.info.next)
        }

        if (data.info.prev) {
            setPrevPage(data.info.prev)
        }

        setCharacters(data.results)
    }


    // function to render the second page
    const NavigatePrev = async () => {
        const res = await fetch(prevPage)

        const data = await res.json()

        // get the link to next page and prev page and update the state
        if (data.info.next) {
            setNextPage(data.info.next)
        }

        if (data.info.prev) {
            setPrevPage(data.info.prev)
        }

        setCharacters(data.results)
    }



    // Get all data from API when the component is loaded
    useEffect(() => {

        // Get req to fetch data from API
        const getData = async () => {

            const res = await fetch("https://rickandmortyapi.com/api/character")

            const data = await res.json()

            // get the link to next page and prev page and update the state
            if (data.info.next) {
                setNextPage(data.info.next)
            }

            if (data.info.prev) {
                setNextPage(data.info.prev)
            }

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
                <h5 onClick={getFavChars}>{shaowFavChars ? "All Characters" : "Show fav"}</h5>
            </div>

            {shaowFavChars ?

                //This will render the favotite character
                <div className="character-feed-container">
                    {favCharacters && favCharacters.map((character) => {
                        return (
                            <CharacterCard key={character.id} character={character} favIcon={false} />
                        )
                    })}
                </div>
                :
                //This will render the all characters
                <div className="character-feed-container">
                    {characters && characters.map((character) => {
                        return (
                            <CharacterCard key={character.id} character={character} favIcon={true} />
                        )
                    })}
                </div>
            }

            {/* Pagination - only show in the feed page*/}
            {shaowFavChars ? null :
                <div className="pagination">
                    <span onClick={NavigatePrev} className="material-symbols-outlined">
                        navigate_before
                    </span>
                    <span onClick={NavigateNext} className="material-symbols-outlined">
                        navigate_next
                    </span>
                </div>
            }
        </div>
    )
}

export default CharacterFeed