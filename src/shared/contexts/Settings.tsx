import { createContext, useEffect, useState } from "react"

export const SetttingsContext = createContext({
    handleOpenConfig: () => { },
    handleCloseConfig: () => { },
    openConfig: false,
    handleSettings: (newSettings: any) => { },
    settings: {
        notifyProcessAmount:0,
        notifyTotalAmount:0,
    }
})

interface SetttingsProviderProps {
    children: React.ReactNode
}
export const SetttingsProvider: React.FC<SetttingsProviderProps> = ({ children }) => {
    const [openConfig, setOpenConfig] = useState(false)
    const [settings, setSettings] = useState({
        notifyProcessAmount: 5000000000,
        notifyTotalAmount: 50000000000,
    })

    const handleOpenConfig = () => {
        setOpenConfig(true)
    }
    const handleCloseConfig = () => {
        setOpenConfig(false)
    }

    const handleSettings = (newSettings: any) => {
        setSettings(newSettings)
    }

    return <SetttingsContext.Provider value={{ openConfig, handleOpenConfig, handleCloseConfig, settings, handleSettings }}>{children}</SetttingsContext.Provider>
}
