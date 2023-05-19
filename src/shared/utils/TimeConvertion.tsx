export function FormatDate(unformated: string) {
    const [unformatedDate, time] = unformated.split(" ")
    const [day, i, month, j, year, k] = unformatedDate.split(/\D/)
    const [hour, minutes, seconds] = time.split(":")
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minutes), parseInt(seconds));
}

export function CalculateTimeDiference(first: Date, second: Date) {
    return Math.abs(first.getTime() - second.getTime());
}

export function CalculateTimeFromMiliseconds(time: number) {
    if (time < 1000) {
        return time + "ms"
    }
    const seconds = Math.floor(time / 1000)
    if (seconds < 60) {
        return seconds + "s "
    }
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) {
        return minutes + "m " + (seconds % 60) + "s "
    }
    const hours = Math.floor(minutes / 60)
    if (hours < 24) {
        return hours + "h " + (minutes % 60) + "m " + (seconds % 60) + "s "
    }
    const days = Math.floor(hours / 24)
    return days + "d " + (hours % 24) + "h " + (minutes % 60) + "m " + (seconds % 60) + "s "
}

export function FormatMsToHHMMSS(ms: number) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function PrettierTime(miliseconds: number) {
    const msToSeconds = 1000;
    const msToMinutes = msToSeconds * 60;
    const msToHours = msToMinutes * 60;
    const msToDays = msToHours * 24;
    const msToMonths = msToDays * 30;
    const msToYears = msToMonths * 12;

    if (miliseconds < msToSeconds) {
        return "0 segundos"
    }

    if (miliseconds < msToMinutes) {
        return Math.floor(miliseconds / msToSeconds) + " segundos"
    }

    if (miliseconds < msToHours) {
        return Math.floor(miliseconds / msToMinutes) + " minutos"
    }

    if (miliseconds < msToDays) {
        return Math.floor(miliseconds / msToHours) + " horas"
    }

    if (miliseconds < msToMonths) {
        return Math.floor(miliseconds / msToDays) + " dias"
    }

    if (miliseconds < msToYears) {
        return Math.floor(miliseconds / msToMonths) + " meses"
    }

    return Math.floor(miliseconds / msToYears) + " anos"
}

