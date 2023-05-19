export const ListOfColors = [
    "#00FF00",
    "#FFFF00",
    "#FF00FF",
    "#FF0080",
    "#FF7F50",
    "#40E0D0",
    "#8A2BE2",
    "#FF69B4",
    "#00CED1",
    "#00FA9A",
    "#9370DB",
    "#00BFFF",
    "#FF6347",
    "#DC143C",
    "#FFD700",
    "#ADFF2F",
    "#BA55D3",
    "#FFA500",
    "#FF1493",
    "#B0C4DE",
    "#00FFFF",
    "#FF7F50",
    "#48D1CC",
    "#D2B48C",
    "#FF4500"
]

export const getColorFromId = (id: string) => {
    const pos = parseInt(id)%ListOfColors.length
    return ListOfColors[pos]
}