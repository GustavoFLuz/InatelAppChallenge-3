import React, { useEffect, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { ConvertFromNumberToBytes, ListOfColors } from '../utils';
import { Box, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface LineChartProps {
    data: any[];
    sorting: string;
    length: number;
    msInterval: number;
    skip?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ data, sorting, length, msInterval, skip=1 }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [largestLength, setLargestLength] = useState(data.reduce((acc: number, curr: any) => Math.max(acc, curr.history.length), 0));

    const getValues = (data: any, key: string) => {
        const filledData = padStartArray(data, largestLength, sorting)
        return filledData.map((hist: any) => hist[key]).slice(0, length*skip).filter((el: any, index: number) => index % skip === 0)
    }
    const [chartData, setChartData] = useState<any>({
        labels: Array(Math.min(data[0]?.history.length || 1, length)).fill(1).map((el, index) => {
            const now = new Date();
            now.setTime(now.getTime() - (length - index) * msInterval)
            return now.toLocaleTimeString()
        }).filter((el, index)=> index % skip === 0),
        datasets: data.map((element) => ({
            label: element.name,
            data: getValues(element.history, sorting),
            borderColor: element.color,
            fill: false,
        }))
    })

    const refreshData = () => {
        setLargestLength(data.reduce((acc: number, curr: any) => Math.max(acc, curr.history.length), 0))
        setChartData({
            labels: Array(Math.min(data[0]?.history.length || 1, length)).fill(1).map((el, index) => {
                const now = new Date();
                now.setTime(now.getTime() - (length - index) * 1000)
                return now.toLocaleTimeString()
            }).filter((el, index)=> index % skip === 0),
            datasets: data.map((element) => ({
                label: element.name,
                data: getValues(element.history, sorting),
                borderColor: element.color,
                fill: false,
            })
            )
        })
    }

    useEffect(() => {
        refreshData();
    }, [sorting])

    if (!data.length || !data[0]?.history.length) return (
        <Box sx={{ width: "100%", height: "100%", p: 0, m: 0, position: "relative", display: "flex", justifyContent: "center" }}>
            <Tooltip title="Atualizar" sx={{ position: "absolute", top: "-10px", right: "24px" }} >
                <IconButton onClick={refreshData}><RefreshIcon /></IconButton>
            </Tooltip>
            <Typography variant='h6'>
                Não há dados para exibir, aguarde a pressione o botão de atualizar
            </Typography>
        </Box>
    )


    return <Box sx={{ width: "100%", height: "100%", maxHeight: "65vh", p: 0, m: 0, position: "relative", display: "flex", justifyContent: "center", overflowY:"auto" }}>
        <Tooltip title="Atualizar" sx={{ position: "absolute", top: "-10px", right: "24px" }} >
            <IconButton onClick={refreshData}><RefreshIcon fontSize='large' /></IconButton>
        </Tooltip>
        <Line data={chartData}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: isMobile ? "bottom" : "right",
                        maxWidth: 500,
                    },
                    tooltip: {
                        callbacks: {
                            label: (context: any) => `${context.dataset.label}: ${ConvertFromNumberToBytes(context.parsed.y)}${sorting.includes("current") ? "/s" : ""}`
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: (value: any) => ConvertFromNumberToBytes(value) // Format the y-axis tick labels
                        },
                    },
                },
            }} />
    </Box>;
}

function padStartArray(data:any, length:number, sorting:string){
    if(data.length >= length) return data;
    return Array(length - data.length).fill({[sorting]:0}).concat(data);
}