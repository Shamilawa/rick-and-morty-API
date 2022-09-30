import { useContext } from "react"
import { FavCharsContext } from "../context/FavCharsContext"

// This custom hook help to extract global varibles from FavCharsContext
export const useFavCharsContext = () => {

    const context = useContext(FavCharsContext)

    if (!context) {
        throw Error("useFavCharsContext must be use inside and useFavCharsContext")
    }

    return context

}