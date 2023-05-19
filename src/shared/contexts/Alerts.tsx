import { createContext, useEffect, useState } from "react"

export const AlertsContext = createContext({
    pushAlerts: (id: number, message: string) => { },
    removeAlerts: (id: number) => { },
    alerts: [{ id: 0, message: "example" }],
})

interface AlertsProviderProps {
    children: React.ReactNode
}
export const AlertsProvider: React.FC<AlertsProviderProps> = ({ children }) => {
    const [alerts, setAlerts] = useState<any>([])
    const removeAlerts = (id: number) => {
        setAlerts((prev: any) => prev.filter((alert: any) => alert.id !== id))
    }

    const pushAlerts = (id: number, message: string) => {
        setAlerts((prev: any) => {
            const existingAlert = prev.find((alert: any) => alert.id === id)
            if (!existingAlert) return [...prev, { id, message }]
            existingAlert.message = message;
            return prev
        })
        return message
    }

    return <AlertsContext.Provider value={{ removeAlerts, alerts, pushAlerts }}>{children}</AlertsContext.Provider>

}
