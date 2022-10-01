import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"

// Pages and components
import FavChars from "../components/FavChars"

// importing the custom hooks
//this manage card open anc close
import { useFocusCardContext } from "../hooks/useFocusCardContext"

//importing assests
import speciesIcon from "../assets/images/species.svg"
import earthIcon from "../assets/images/earth.svg"


function CharacterCard({ character, favIcon }) {

    //This state store latest three epsodes
    const [link, setLinks] = useState([])

    // this state keep track of number of episode - this will use to loop through the array of epi links
    const [noOfEpisodes, setNoOfEpisodes] = useState()

    // this store episode informations
    const [name, setName] = useState([])

    //this state store a css style object based on character status.
    const [statusStyle, setStatusStyle] = useState()

    // state to track card open and close
    const [open, setOpen] = useState(false)

    // importing the custom hooks. This help to determin which card user click
    const { triggerCardId, setTriggerCardId } = useFocusCardContext()


    useEffect(() => {

        // Get req to fetch data from API
        const getData = async () => {

            // Get the latest 3 episode & update the state
            const latestEpisodes = character.episode.slice(-3)
            setLinks(latestEpisodes.reverse())

            // Get the length of episode (No of episodes)
            setNoOfEpisodes(latestEpisodes.length)

            // fetch data from each link using the for loop and update the state with episode data
            for (let index = 0; index < noOfEpisodes; index++) {

                const res = await fetch(link[index])

                const data = await res.json()

                // update state which contain all the episodes
                setName(preValue => [...preValue, data])
            }

        }


        // Get the character status and update the data
        const characterStatus = () => {

            // if status is Alive
            if (character.status === "Alive") {
                return setStatusStyle({ border: "2px solid #1bd3f4", color: "#1bd3f4" })
            }

            // if satus is Dead
            if (character.status === "Dead") {
                return setStatusStyle({ border: "2px solid #dc2634", color: "#dc2634" })
            }

        }

        // calling the function
        getData()
        characterStatus()

    }, [character.episode, noOfEpisodes])


    return (
        <div>
            {/* A single card */}
            <motion.div
                className='character-card'
                whileTap={{ scale: 1.01 }}
            >
                <div>

                    {/* basic character information */}
                    <img className='character-img' src={character.image} alt="character avatar" />
                    <div
                        className='status'
                        style={statusStyle}
                    >
                        {character.status}
                    </div>

                    <div className='character-info'>
                        <h3 className='character-name'>{character.name}</h3>
                        <p>{character.gender}</p>
                    </div>

                    <div className='species-info'>
                        <div className='species'>
                            <img src={speciesIcon} alt="species-icon" />
                            <p>{character.species}</p>
                        </div>

                        <div className='origin'>
                            <img src={earthIcon} alt="species-icon" />
                            <p>{character.origin.name}</p>
                        </div>
                    </div>

                    {/* episode section */}
                    {/* expand the section when open state is true and triggerCardId(global state) equals to this character.id */}
                    {open &&
                        <div>
                            <p className='episode-header'>Episode Detailes</p>
                            {triggerCardId === character.id && name.map((e, index) => {
                                return (
                                    <div key={e.id}>

                                        <div className="episode-container">
                                            <p className='episode-name'>{e.name}</p>
                                            <div className='episode-info'>
                                                <p>{e.air_date}</p>
                                                <p>{e.episode}</p>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>

                {/* this containe logic to show latest episodes and add to fav button */}
                <div className='card-footer'>
                    <FavChars character={character} favIcon={favIcon} />
                    <p onClick={() => {
                        setTriggerCardId(character.id)
                        setOpen(!open)
                    }} >
                        {/* change button text state based on equality of the triggerCardId and character.id */}
                        {open && triggerCardId === character.id ?
                            <span className='s'>See Less</span>
                            :
                            <span>See more</span>
                        }
                    </p>
                </div>

            </motion.div>
        </div>
    )
}

export default CharacterCard