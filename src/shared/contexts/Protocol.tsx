import { createContext, useEffect, useState } from "react"
import { ConvertFromBytesToNumber, getColorFromId } from "../utils"

export const ProtocolContext = createContext({
    addPackage: (_rawData: string) => { },
    last: [{
        "id": "0",
        "upload": 0,
        "download": 0,
        "total": 0,
    }],
    total: {
        "0": {
            "id": "0",
            "history": [],
        }
    }
})

interface ProtocolProviderProps {
    children: React.ReactNode
}
export const ProtocolProvider: React.FC<ProtocolProviderProps> = ({ children }) => {

    const [last, setLast] = useState<any>([])
    const [total, setTotal] = useState<any>({})
    const [incomplete_data, setIncomplete_data] = useState<any>({})

    const update = (data: any[]) => {
        setLast(Object.keys(data)
            .map((key: any) => data[key])
            .sort((a, b) => b.total - a.total));
    }

    useEffect(() => {
        const newTotal = { ...total };

        last.forEach((element: any) => {
            if (newTotal[element.id] === undefined) {
                newTotal[element.id] = {
                    id: element.id,
                    name: element.id,
                    color: element.color,
                    history: []
                }
            }
            newTotal[element.id].history.push({
                upload: element.upload,
                download: element.download,
                total: element.total,
            })
            if (newTotal[element.id].history.length > 60 * 60) {
                newTotal[element.id].history.shift()
            }
        })

        setTotal(newTotal)
    }, [last])

    const addPackage = (rawData: string) => {
        const isNew = rawData.substr(0, 20).includes("HTTP/1.1 200 OK")
        const hasEnd = rawData.substr(rawData.length - 20, 20).includes(`"}}'`)
        if (isNew && hasEnd) {
            const parsedData = convertResponseToJSON(rawData);
            if (!parsedData) return;
            update(parsedData)
            return;
        }
        if (isNew) {
            setIncomplete_data(rawData)
            return;
        }
        if (hasEnd) {
            const parsedData = convertResponseToJSON(incomplete_data + rawData);
            if (!parsedData) return;
            update(parsedData);
            return;
        }
        setIncomplete_data(incomplete_data + rawData);
    }

    return <ProtocolContext.Provider value={{ addPackage, last, total }}>{children}</ProtocolContext.Provider>

}

function convertResponseToJSON(data: string) {
    const jsonString = data.split("\n").find((el: string) => el.includes("b'{"))?.trim();
    if (!jsonString) return null;
    const jsonObject = JSON.parse(jsonString.substr(2, jsonString.length - 3))

    const formatedData: any = {}
    Object.keys(jsonObject).forEach((key) => {
        const idFromKey = Array.from(key).map(letter=>letter.charCodeAt(0)).reduce((sum, code)=>sum+code, 0).toString()
        formatedData[key] = {
            id: key,
            name: key,
            total: ConvertFromBytesToNumber(jsonObject[key].total),
            download: ConvertFromBytesToNumber(jsonObject[key].download),
            upload: ConvertFromBytesToNumber(jsonObject[key].upload),
            color: getColorFromId(idFromKey)
        }
    })
    return formatedData;
};