import { Box, Button, FormControl, IconButton, InputLabel, List, MenuItem, Select } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { Menu, PieChart, ProcessesList, LineChart, ExportAsCSV } from '../shared/components';
import { ProcessContext } from '../shared/contexts';
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
    { value: "total", label: "Consumo Total", piechart: true, line: true },
    { value: "download", label: "Download", piechart: true, line: true },
    { value: "upload", label: "Upload", piechart: true, line: true },
    { value: "created", label: "Data de Criação", piechart: false, line: false },
    { value: "updated", label: "Data de Atualização", piechart: false, line: false },
    { value: "total_current", label: "Taxa Total", piechart: false, line: true },
    { value: "download_current", label: "Taxa de Download", piechart: false, line: true },
    { value: "upload_current", label: "Taxa de Upload", piechart: false, line: true },
]

export const Processes = () => {
    const [currentScreen, setCurrentScreen] = useState<number>(0)

    const [sorting, setSorting] = useState<string>("total")
    const [sortedData, setSortedData] = useState<any>([])
    const [decreasing, setDecreasing] = useState<boolean>(true)
    const { last: data, totalConsumption, total } = useContext(ProcessContext)


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
            case "created":
                var sorted = data.sort((a, b) => a.create_Time.getTime() - b.create_Time.getTime());
                break;
            case "updated":
                var sorted = data.sort((a, b) => a.update_Time.getTime() - b.update_Time.getTime());
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

    const filterSortingOptions = (): any[] => {
        let filteredSorting = sortingOptions;
        if (currentScreen === 1) filteredSorting = sortingOptions.filter(option => option.piechart)
        if (currentScreen === 2) filteredSorting = sortingOptions.filter(option => option.line)
        return filteredSorting ? filteredSorting : []
    }

    const totalToArray = (total: any) => {
        if (!total) return []
        return Object.keys(total).map(key => total[key])
    }

    const getCurrentScreen = () => {
        return [
            <ProcessesList data={sortedData} totalConsumption={totalConsumption} history={total} />,
            <PieChart data={sortedData} sorting={sorting} />,
            <LineChart data={totalToArray(total)} sorting={sorting} length={100} msInterval={3000} skip={3} />
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
                                {filterSortingOptions().map((option, index) => (
                                    <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    {currentScreen === 0 &&
                        <IconButton aria-label="decreasing" onClick={() => setDecreasing(!decreasing)}>
                            {!decreasing ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        </IconButton>
                    }
                </Box>
                <Box sx={{ display: "flex", gap: 3 }}>
                    <Button variant="outlined" color="secondary" sx={buttonHover} onClick={() => setCurrentScreen(0)}><FormatListBulletedIcon /></Button>
                    <Button variant="outlined" color="secondary" sx={buttonHover} onClick={() => setCurrentScreen(1)}><PieChartIcon /></Button>
                    <Button variant="outlined" color="secondary" sx={buttonHover} onClick={() => setCurrentScreen(2)}><ShowChartIcon /></Button>
                </Box>
                <ExportAsCSV data={totalToArray(total)} title={'processes'} />
            </Menu>
            <List sx={{ flexGrow: 1, overflowY: "auto", mb: 10 }}>
                {getCurrentScreen()}
            </List>
        </Box>
    )
}
