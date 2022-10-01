import { createContext, useState } from "react"


export const FocusCardContext = createContext()

export const FocusCardContextProvider = ({ children }) => {

    // global state to track which card user click
    const [triggerCardId, setTriggerCardId] = useState()

    return (
        <FocusCardContext.Provider value={{ triggerCardId, setTriggerCardId }}>
            {children}
        </FocusCardContext.Provider>
    )
}