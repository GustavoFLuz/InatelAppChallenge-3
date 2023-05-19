import React from 'react'

export const DownloadCSV = (data: any[], title: string) => {
    if (data[0].history) {
        var keys = Object.keys(data[0]).concat(Object.keys(data[0].history[0]));
        keys.splice(keys.indexOf("color"), 1);
        keys.splice(keys.indexOf("history"), 1);

        var parsedData = data.map((el) => {
            const values = Object.keys(el)
                .filter((key: string) => !["color", "history"].includes(key))
                .map((key: string) => key.includes("Time") ? el[key].toLocaleString() : el[key]).join(";")
            const history = el.history.map((hist: any) =>
                values + ";" +
                Object.keys(hist).map((key: string) => {
                    if(key.includes("Time")) return hist[key].toLocaleString()
                    if(typeof(hist[key]) === "number") return hist[key].toFixed(2)
                    return hist[key]
                }).join(";")
            ).join("\n")
            return history
        }
        ).join("\n")
    } else {
        var keys = Object.keys(data[0])
        keys.splice(keys.indexOf("color"), 1);

        var parsedData = data.map((el) => {
            const values = Object.keys(el)
                .filter((key: string) => !["color", "history"].includes(key))
                .map((key: string) => key.includes("Time") ? el[key].toLocaleString() : el[key]).join(";")
            return values
        }
        ).join("\n")
    }

    const csvContent = "data:text/csv;charset=utf-8," + keys.join(";") + "\n" + parsedData;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", title + ".csv");
    document.body.appendChild(link);
    link.click();
}
