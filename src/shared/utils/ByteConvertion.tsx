export function ConvertFromBytesToNumber(byte: string){
    const byteNumber = parseFloat(byte.replaceAll(/[A-Z]/g, ""))
    const byteLetter = byte.replaceAll(/[0-9]|\./g, "") + ""

    const byteValue = byteNumber * (lettersToQuantities(byteLetter) || 1)
    return byteValue
}

export function ConvertFromNumberToBytes(number: number) {
    if (number < 1000) {
        return number + "B"
    }
    if (number < 1000000) {
        return (number / 1000).toFixed(2) + "KB"
    }
    if (number < 1000000000) {
        return (number / 1000000).toFixed(2) + "MB"
    }
    if (number < 1000000000000) {
        return (number / 1000000000).toFixed(2) + "GB"
    }
    return (number / 1000000000000).toFixed(2) + "TB"
}

export function SumBytes(byte1: string, byte2: string) {
    const byte1Value = ConvertFromBytesToNumber(byte1)
    const byte2Value = ConvertFromBytesToNumber(byte2)

    return byte1Value + byte2Value
}

function lettersToQuantities(suffix: string) {
    if (suffix.includes('s'))
        suffix = suffix.replace('/s', '')
    return {
        "B": 1,
        "KB": 1000,
        "MB": 1000000,
        "GB": 1000000000,
        "TB": 1000000000000,
    }[suffix]
}