import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { CalculateTimeDiference, ConvertFromBytesToNumber, ConvertFromNumberToBytes, FormatDate, ListOfColors, SumBytes, getColorFromId } from "../utils"
import { AlertsContext, SetttingsContext } from "."

export const ProcessContext = createContext({
  addPackage: (rawData: string) => { },
  last: [{
    "id": "0",
    "name": "Example.exe",
    "create_Time": new Date(),
    "update_Time": new Date(),
    "duration": 0,
    "upload": 0,
    "download": 0,
    "total": 0,
    "download_speed": 0,
    "upload_speed": 0,
    "total_speed": 0,
  }],
  totalConsumption: 0,
  total: {
    "0": {
      "id": "0",
      "name": "Example.exe",
      "create_Time": new Date(),
      "history": [],
    }
  }
})

interface ProcessProviderProps {
  children: React.ReactNode
}
export const ProcessProvider: React.FC<ProcessProviderProps> = ({ children }) => {

  const { settings } = useContext(SetttingsContext)
  const { pushAlerts } = useContext(AlertsContext)

  const [last, setLast] = useState<any>([])
  const [total, setTotal] = useState<any>({})
  const [incomplete_data, setIncomplete_data] = useState<any>({})
  const [totalConsumption, setTotalConsumption] = useState<number>(0)
  const [totalConsumptionThreshhold, setTotalConsumptionThreshhold] = useState<number>(settings.notifyTotalAmount)
  const [notified, setNotified] = useState<any>([])

  const update = (data: any[]) => {
    let newTotalConsumption = Object.keys(data).reduce((sum, key: any) => sum + data[key].total, 0);
    setTotalConsumption(newTotalConsumption)

    setLast(Object.keys(data)
      .map((key: any) => data[key])
      .sort((a, b) => b.total - a.total));
  }

  useEffect(() => {
    if (totalConsumption < totalConsumptionThreshhold || totalConsumption==0) return;
    pushAlerts(-1, "Consumo total passou de:" + ConvertFromNumberToBytes(totalConsumptionThreshhold))
    setTotalConsumptionThreshhold(prev => prev + settings.notifyTotalAmount)
  }, [totalConsumption])

  useEffect(() => {
    setTotalConsumptionThreshhold(settings.notifyTotalAmount * Math.ceil(totalConsumption / settings.notifyTotalAmount))
  }, [settings])

  useEffect(() => {
    const notifiedProcesses = [...notified]
    const newTotal = { ...total };

    last.forEach((element: any) => {
      if (newTotal[element.id] === undefined) {
        newTotal[element.id] = {
          id: element.id,
          name: element.name,
          create_Time: element.create_Time,
          color: element.color,
          history: []
        }
      }
      newTotal[element.id].history.push({
        update_Time: element.update_Time,
        duration: element.duration,
        upload: element.upload,
        download: element.download,
        total: element.total,
        upload_current: element.upload_speed,
        download_current: element.download_speed,
        total_current: element.total_speed,
      })
      if (newTotal[element.id].history.length > 60 * 60) {
        newTotal[element.id].history.shift()
      }

      if (notifiedProcesses.includes(element.id)) return;

      if (element.total > settings.notifyProcessAmount) {
        pushAlerts(element.id, "Consumo de " + element.name + " passou de:" + ConvertFromNumberToBytes(1000000))
        notifiedProcesses.push(element.id)
      }
    })
    setNotified(notifiedProcesses);
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

  return <ProcessContext.Provider value={{ addPackage, last, totalConsumption, total }}>{children}</ProcessContext.Provider>

}

function convertResponseToJSON(data: string) {
  const jsonString = data.split("\n").find((el: string) => el.includes("b'{"))?.trim();
  if (!jsonString) return null;
  const jsonObject = JSON.parse(jsonString.substr(2, jsonString.length - 3))

  const formatedJsonObject: any = {}
  Object.keys(jsonObject).forEach((key) => {
    const created = FormatDate(jsonObject[key].create_Time);
    const updated = FormatDate(jsonObject[key].last_time_updated)
    const download = ConvertFromBytesToNumber(jsonObject[key].download)
    const upload = ConvertFromBytesToNumber(jsonObject[key].upload)

    const download_speed = ConvertFromBytesToNumber(jsonObject[key].download_speed.replace(/\\/g, ''))
    const upload_speed = ConvertFromBytesToNumber(jsonObject[key].upload_speed.replace(/\\/g, ''))
    formatedJsonObject[key] = {
      id: key,
      name: jsonObject[key].name,
      create_Time: created,
      update_Time: updated,
      duration: CalculateTimeDiference(created, updated),
      upload: upload,
      download: download,
      total: download + upload,
      upload_speed: upload_speed,
      download_speed: download_speed,
      total_speed: download_speed + upload_speed,
      color: getColorFromId(key)
    }
  })
  return formatedJsonObject
};
