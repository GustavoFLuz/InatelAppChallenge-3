import { Box, Button, FormControl, IconButton, InputLabel, List, MenuItem, Select } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { Menu, PieChart, HostsList, LineChart, ExportAsCSV } from '../shared/components';
import { HostsContext } from '../shared/contexts';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const buttonHover = {
    "&:hover": {
        backgroundColor: "secondary.main",
        color: "primary.light"
    }
}

const sortingOptions = [
    { value: "total", label: "Consumo Total" },
    { value: "download", label: "Download" },
    { value: "upload", label: "Upload" },
]
export const Hosts = () => {
    const [currentScreen, setCurrentScreen] = useState<number>(0)

    const [sorting, setSorting] = useState<string>("total")
    const [sortedData, setSortedData] = useState<any>([])
    const [decreasing, setDecreasing] = useState<boolean>(true)
    const { last: data, totalConsumption, total } = useContext(HostsContext)

    useEffect(() => {
        if (!data.length) return
        switch (sorting) {
            case "total":
                var sorted = data.sort((a, b) => b.total - a.total);
                break;
            case "download":
                var sorted = data.sort((a, b) => b.download - a.download);
                break;
            case "upload":
                var sorted = data.sort((a, b) => b.upload - a.upload);
                break;
            default:
                var sorted = data.sort((a, b) => b.total - a.total);
                break;
        }
        if (decreasing) return setSortedData(sorted)
        return setSortedData(sorted.reverse())
    }, [data, sorting, decreasing])

    useEffect(() => {
        setSorting("total")
        setDecreasing(true)
    }, [currentScreen])

    const handleChangeSorting = (event: any) => {
        setSorting(event.target.value);
    }

    const totalToArray = (total: any) => {
        if (!total) return []
        return Object.keys(total).map(key => total[key])
    }
    const getCurrentScreen = () => {
        return [
            <HostsList data={sortedData} />,
            <PieChart data={sortedData} sorting={sorting} />,
        ][currentScreen]
    }
    return (
        <Box sx={{ width: "100%", height: "calc(100vh - 2.5em)", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
            <Menu>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: "center" }}>
                    <Box sx={{ width: 'clamp(175px, 33%, 250px)' }}>
                        <FormControl fullWidth>
                            <InputLabel id="sorting">Ordenar</InputLabel>
                            <Select
                                labelId="sorting"
                                id="demo-simple-select"
                                value={sorting}
                                label="Ordenar"
                                onChange={handleChangeSorting}
                            >
                                {sortingOptions.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <IconButton aria-label="decreasing" onClick={() => setDecreasing(!decreasing)}>
                        {!decreasing ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </IconButton>
                </Box>
                <Box sx={{display:"flex", gap:3}}>
                    <Button variant="outlined" color="secondary" sx={buttonHover} onClick={() => setCurrentScreen(0)}><FormatListBulletedIcon /></Button>
                    <Button variant="outlined" color="secondary" sx={buttonHover} onClick={() => setCurrentScreen(1)}><PieChartIcon /></Button>
                </Box>
                <ExportAsCSV data={sortedData} title={'hosts'}/>
            </Menu>
            <List sx={{ flexGrow: 1, overflowY: "auto", mb: 10 }}>
                {getCurrentScreen()}
            </List>
        </Box>
    )
}
