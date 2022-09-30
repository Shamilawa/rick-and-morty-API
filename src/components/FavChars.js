import React, { useState } from 'react'

// importing the custom hooks
//this manage users fav cards
import { useFavCharsContext } from "../hooks/useFavCharsContext"

function FavChars({ character, favIcon }) {


    //import dispatch from FavChartContext using custom hook
    const { dispatch } = useFavCharsContext()

    //state to track button click
    const [clicked, setClicked] = useState(false)


    // manage the localstorage and FavCharsContext
    const storeInLocalStorage = (item, newCharacter) => {

        // change the state of the button
        setClicked(!clicked)

        //get item from local storage
        var data = localStorage.getItem(item)
        data = data ? JSON.parse(data) : []

        // check if the localstorage is empty if so, add new fav character
        if (data.length === 0) {

            data.push(newCharacter)
            localStorage.setItem(item, JSON.stringify(data))
            dispatch({ type: "LOCAL_ADD_CHARS", payload: data })
            setClicked(true)
            return

        } else {

            // check if there is a matching character is already in localstorage
            //if there is any, the below function create a new array excluding that
            //matching character
            const filtereddata = data.filter((el) => {
                return el.id !== newCharacter.id
            })

            //when there is no matching characters
            if (filtereddata.length === data.length) {
                data.push(newCharacter)
                localStorage.setItem(item, JSON.stringify(data))
                dispatch({ type: "LOCAL_ADD_CHARS", payload: data })
                return
            }

            //when is there is matching characters
            if (filtereddata.length !== data.length) {
                localStorage.setItem(item, JSON.stringify(filtereddata))
                dispatch({ type: "LOCAL_ADD_CHARS", payload: filtereddata })
                return
            }
        }
    }


    return (
        <div>
            {favIcon &&
                <span
                    className="material-symbols-outlined fav-button"
                    onClick={() => storeInLocalStorage("favChars", character)}
                    style={clicked ? { color: "red" } : null}
                >
                    favorite
                </span>
            }
        </div>
    )
}

export default FavChars