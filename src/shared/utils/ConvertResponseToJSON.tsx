export function ConvertResponseToJSON(data: string): any | null {
    const jsonString = data.split("\n").find((el: string) => el.includes("b'{"))?.trim();
    if (!jsonString) return null;
    const jsonObject = JSON.parse(jsonString.substr(2, jsonString.length - 3))
    const parsedToArray = Object.keys(jsonObject).map((key) => {
        return {
            id: key,
            ...jsonObject[key]
        }
    })
    return parsedToArray
}