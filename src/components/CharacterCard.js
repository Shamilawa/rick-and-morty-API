import React, { useEffect, useState } from 'react'

// Pages and components
import FavChars from "../components/FavChars"

// importing the custom hooks
//this manage card open anc close
import { useFocusCardContext } from "../hooks/useFocusCardContext"

function CharacterCard({ character, favIcon }) {

    const [link, setLinks] = useState([])
    const [noOfEpisodes, setNoOfEpisodes] = useState()
    const [name, setName] = useState([])

    // state to track card open and close
    const [open, setOpen] = useState(false)


    // importing the custom hooks
    const { triggerCardId, setTriggerCardId } = useFocusCardContext()



    useEffect(() => {

        // Get req to fetch data from API
        const getData = async () => {

            // Get the latest 3 episode & update the state
            const latestEpisodes = character.episode.slice(-3)
            setLinks(latestEpisodes)

            // Get the length of episode (No of episodes)
            setNoOfEpisodes(latestEpisodes.length)

            // fetch data from each link using the for loop and update the state with episode data
            for (let index = 0; index < noOfEpisodes; index++) {

                const res = await fetch(link[index])

                const data = await res.json()

                setName(preValue => [...preValue, data])
            }

        }

        // calling the function
        getData()

    }, [character.episode, noOfEpisodes])



    return (
        <div>
            <div className='character-card'>


                <div>
                    <div>{character.status}</div>
                    <img src={character.image} alt="character avatar" />
                    <div>
                        <h3>{character.name}</h3>
                        <p>{character.gender}</p>
                    </div>
                    <p>{character.species}</p>
                    <p>{character.origin.name}</p>


                    {/* episode section */}
                    {/* expand the section when open state is true and triggerCardId(global state) equals to this character.id */}
                    {open &&
                        <div>
                            {triggerCardId === character.id && name.map((e, index) => {
                                return (
                                    <p key={e.id + index}>{e.name}</p>
                                )
                            })}
                        </div>
                    }

                </div>

                <div>
                    <FavChars character={character} favIcon={favIcon} />
                    <p onClick={() => {
                        setTriggerCardId(character.id)
                        setOpen(!open)
                    }} >
                        {/* change button text state based on equality of the triggerCardId and character.id */}
                        {triggerCardId === character.id ?
                            <span>See Less</span>
                            :
                            <span>See more</span>
                        }
                    </p>
                </div>
            </div>

        </div>
    )
}

export default CharacterCard