import React, { useEffect, useMemo, useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ConvertFromBytesToNumber, ConvertFromNumberToBytes, ListOfColors, SumBytes } from '../utils';

interface PieChartProps {
    data: any;
    sorting: string;
}

Chart.register(CategoryScale);

export const PieChart: React.FC<PieChartProps> = ({ data, sorting }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const restrictData = (data: any) => {
        if (!data.length) return;
        if (data.length < 11) return data
        const firstTen = data.slice(0, 10);
        const others = data.slice(10).reduce((sum: any, current: any) => ({
            ...sum,
            "total": (sum.total + current.total),
            "download": (sum.total, current.total),
            "upload": (sum.total, current.total)
        }), { "name": "Outros", "total": 0, "download": 0, "upload": 0, "create_Time": new Date(), "update_Time": new Date(), "color": "#f0f0f0" })
        return ([...firstTen, others])
    }

    const getValues = (data: any, key: string) => {
        const newData = restrictData(data)
        return newData.map((element: any) => element[key])
    }

    const getLabel = (key: string) => {
        switch (key) {
            case "total":
                return "Total consumido (B)"
            case "download":
                return "Total Download (B)"
            case "upload":
                return "Total Upload (B)"
            case "created":
                return "Tempo desde Criado (ms)"
            case "update":
                return "Tempo desde último update (ms)"
        }
    }


    const [chartData, setChartData] = useState({
        labels: getValues(data, 'name'),
        datasets: [
            {
                label: getLabel(sorting),
                data: getValues(data, sorting),
                backgroundColor: getValues(data, 'color'),
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });

    useEffect(() => {
        setChartData({
            labels: getValues(data, 'name'),
            datasets: [
                {
                    label: getLabel(sorting),
                    data: getValues(data, sorting),
                    backgroundColor: getValues(data, 'color'),
                    borderColor: "black",
                    borderWidth: 2
                }
            ]
        })
    }, [data])

    return (
        <Box sx={{ width: '100%', height: '75vh', display: 'grid', placeItems: "center" }}>
            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <Pie
                    data={chartData}
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
                                    label: (context: any) => ConvertFromNumberToBytes(context.parsed)
                                }
                            }
                        }
                    }}
                />
            </div>
        </Box>
    )
}