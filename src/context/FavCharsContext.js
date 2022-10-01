import { createContext, useReducer, useEffect } from "react"

export const FavCharsContext = createContext()


// reducer function to manage global state data based on dispatch type
const FavCharsReducer = (state, action) => {
    switch (action.type) {

        case "LOCAL_ADD_CHARS": {
            return {
                favCharacters: action.payload
            }
        }

        default:
            break;
    }
}


export const FavCharsContextProvider = ({ children }) => {

    // reducer state to store favorite charaters globally
    const [state, dispatch] = useReducer(FavCharsReducer, {
        favCharacters: null
    })

    // check if the user already have favourite characters saved in browser local storage.
    //This user effect will check if the local storage already have data, if so, useEffect update
    // the this global state on the component's first render
    useEffect(() => {

        const savedCharacters = JSON.parse(localStorage.getItem("favChars"))

        if (savedCharacters) {
            dispatch({ type: "LOCAL_ADD_CHARS", payload: savedCharacters })
        }

    }, [])

    return (
        <FavCharsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </FavCharsContext.Provider>
    )

}