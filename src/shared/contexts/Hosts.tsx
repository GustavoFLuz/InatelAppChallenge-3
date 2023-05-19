import { createContext, useEffect, useState } from "react"
import { ConvertFromBytesToNumber, getColorFromId } from "../utils"

export const HostsContext = createContext({
  addPackage: (rawData: string) => { },
  last: [{
    "id": "0",
    "name": "Example.exe",
    "upload": 0,
    "download": 0,
    "total": 0,
  }],
  totalConsumption: 0,
  total: {
    "0": {
      "id": "0",
      "name": "Example.exe",
      "history": [],
    }
  }
})

interface HostsProviderProps {
  children: React.ReactNode
}
export const HostsProvider: React.FC<HostsProviderProps> = ({ children }) => {

  const [last, setLast] = useState<any>([])
  const [total, setTotal] = useState<any>({})
  const [incomplete_data, setIncomplete_data] = useState<any>({})
  const [totalConsumption, setTotalConsumption] = useState<number>(0)
  const [counter, setCounter] = useState<number>(0) //total history only every 10 seconds

  const update = (data: any[]) => {
    let newTotalConsumption = Object.keys(data).reduce((sum, key: any) => sum + data[key].total, 0);

    setTotalConsumption(newTotalConsumption)
    setLast((prev: any) => {
      return Object.keys(data)
        .map((key: any) => data[key])
        .sort((a, b) => b.total - a.total)
    });
    setCounter(prev => prev + 1)
  }

  useEffect(() => {
    if (counter % 10 !== 0) return;
    const newTotal = { ...total };

    last.forEach((element: any) => {
      if (newTotal[element.id] === undefined) {
        newTotal[element.id] = {
          id: element.id,
          name: element.name,
          color: element.color,
          history: []
        }
      }
      newTotal[element.id].history.push({
        upload: element.upload,
        download: element.download,
        total: element.total,
      })
      if (newTotal[element.id].history.length > 60) {
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

  return <HostsContext.Provider value={{ addPackage, last, totalConsumption, total }}>{children}</HostsContext.Provider>

}

function convertResponseToJSON(data: string) {
  const jsonString = data.split("\n").find((el: string) => el.includes("b'{"))?.trim();
  if (!jsonString) return null;
  const jsonObject = JSON.parse(jsonString.substr(2, jsonString.length - 3))

  const formatedJsonObject: any = {}
  Object.keys(jsonObject).forEach((key) => {
    const download = ConvertFromBytesToNumber(jsonObject[key].download)
    const upload = ConvertFromBytesToNumber(jsonObject[key].upload)
    formatedJsonObject[key] = {
      id: key,
      name: jsonObject[key].host,
      upload: upload,
      download: download,
      total: download + upload,
      color: getColorFromId(key)
    }
  })
  return formatedJsonObject
};