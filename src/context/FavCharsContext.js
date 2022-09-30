import { createContext, useReducer, useEffect } from "react"


export const FavCharsContext = createContext()

const FavCharsReducer = (state, action) => {
    switch (action.type) {
        case "ADD_CHARS":
            if (!state.favCharacters) {
                return {
                    favCharacters: [action.payload]
                }
            } else {
                return {
                    favCharacters: [action.payload, ...state.favCharacters]
                }
            }
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

    const [state, dispatch] = useReducer(FavCharsReducer, {
        favCharacters: null
    })


    // check if the user already have favourite character favourite charaters were
    // saved in browser local storage. this will chech if the local storage already have data
    useEffect(() => {

        const savedCharacters = JSON.parse(localStorage.getItem("favChars"))

        if (savedCharacters) {
            dispatch({ type: "LOCAL_ADD_CHARS", payload: savedCharacters })
        }

    }, [])

    console.log(state.favCharacters);


    return (
        <FavCharsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </FavCharsContext.Provider>
    )

}