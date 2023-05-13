export function ConvertResponseToJSON(data: string): any | null {
    const jsonString = data.split("\n").find((el: string) => el.includes("b'{"))?.trim();
    if (!jsonString) return null;

    return JSON.parse(jsonString.substr(2, jsonString.length - 3))
}