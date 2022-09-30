import { useContext } from "react"
import { FocusCardContext } from "../context/FocusCardContext"

// This custom hook help to extract global varibles from FocusCardContext
export const useFocusCardContext = () => {

    const context = useContext(FocusCardContext)

    if (!context) {
        throw Error("useCharacterContext must be use inside and useCharacterContext")
    }

    return context
}