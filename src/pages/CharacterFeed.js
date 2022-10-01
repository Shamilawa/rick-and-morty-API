import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"

// custom hooks and context
import { useFavCharsContext } from "../hooks/useFavCharsContext"

// Pages and Components
import CharacterCard from "../components/CharacterCard"

function CharacterFeed() {

    //These state store information about all characters and fav characters
    const [characters, setCharacters] = useState([])
    const [shaowFavChars, setShaowFavChars] = useState(false)

    // state for pagination
    const [nextPage, setNextPage] = useState()
    const [prevPage, setPrevPage] = useState()

    //get favCharacters from global state - FavCharsContext
    const { favCharacters } = useFavCharsContext()

    //This function will generate random number which will use to generate unique key value for components
    const genRanNum = () => {
        return Math.random()
    }

    //function to render the next page
    const NavigateNext = async () => {

        // get data to next page
        const res = await fetch(nextPage)

        const data = await res.json()

        // get the link to next page and prev page and update the state
        if (data.info.next) {
            setNextPage(data.info.next)
        }

        if (data.info.prev) {
            setPrevPage(data.info.prev)
        }

        // update the state to reflect the new page data
        setCharacters(data.results)

        // scroll to top when new page data load
        window.scrollTo(0, 0)
    }


    // function to render the second page
    const NavigatePrev = async () => {

        // get the data to next page
        const res = await fetch(prevPage)

        const data = await res.json()

        // get the link to next page and prev page and update the state
        if (data.info.next) {
            setNextPage(data.info.next)
        }

        if (data.info.prev) {
            setPrevPage(data.info.prev)
        }

        // update the state to reflect the new page data
        setCharacters(data.results)

        // scroll to top when new page data load
        window.scrollTo(0, 0)
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

            // update the state to reflect the new page data
            setCharacters(data.results)
        }

        // calling the function
        getData()

    }, [])


    // Get favourite character. this update simple state based on true and false value which then use
    // to conditionally render fav chars and all chars 
    const getFavChars = () => {
        setShaowFavChars(!shaowFavChars)
    }


    return (
        <div>
            {/* Toggle to display favorite character and all character */}
            <div className='container-header'>
                <h5 onClick={getFavChars}>{shaowFavChars ? "All Characters" : "Show Favourite Characters"}</h5>
            </div>

            {/* conditionally generate the favorite charater card and all character cards */}
            {shaowFavChars ?

                //This will render the favotite character cards
                <div className="character-feed-container">
                    {favCharacters && favCharacters.map((character) => {
                        return (
                            <CharacterCard key={character.id} character={character} favIcon={false} />
                        )
                    })}
                </div>
                :
                //This will render the all characters cards
                <div className="character-feed-container">
                    {characters && characters.map((character) => {
                        return (
                            <CharacterCard key={character.id + genRanNum()} character={character} favIcon={true} />
                        )
                    })}
                </div>

            }

            {/* Pagination - only show in the feed page*/}
            {shaowFavChars ? null :
                <div className="pagination">

                    <motion.span
                        onClick={NavigatePrev} className="material-symbols-outlined"
                        whileTap={{ scale: 1.06 }}
                    >
                        navigate_before
                    </motion.span>

                    <motion.span
                        onClick={NavigateNext} className="material-symbols-outlined"
                        whileTap={{ scale: 1.06 }}
                    >
                        navigate_next
                    </motion.span>

                </div>
            }

        </div>
    )
}

export default CharacterFeed