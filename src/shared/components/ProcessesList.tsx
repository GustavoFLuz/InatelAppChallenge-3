import { Box, ListItem, Tooltip, ListItemText, Collapse, List, ListItemButton, ListItemIcon, Accordion, AccordionDetails, AccordionSummary, CircularProgress, IconButton } from '@mui/material'
import { useContext, useState } from 'react'
import { Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ConvertFromNumberToBytes, PrettierTime, CalculateTimeFromMiliseconds, DownloadCSV } from '../utils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ProcessContext } from '../contexts';
import DownloadIcon from '@mui/icons-material/Download';

interface ProcessesListProps {
    data: any;
    totalConsumption: number;
    history: any;
}

export const ProcessesList: React.FC<ProcessesListProps> = ({ data, totalConsumption, history }) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const DownloadProcess = (id: number) => {
        const process = history[id];
        DownloadCSV([process], process.name.split(".")[0])
    }
    
    return (
        <div style={{ overflowY: 'auto', paddingTop: "20px" }}>
            {data.map((process: any, index: number) => {
                const consumptionPercent = (100 * process.total / totalConsumption)
                const progressColor = consumptionPercent > 50 ? "error" : consumptionPercent > 30 ? "warning" : "success"
                return (
                    <Accordion key={index} expanded={expanded === ("panel" + index)} onChange={handleChange(("panel" + index))} sx={{ backgrouncColor: "background.paper" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0, display: "flex", alignItems: "center" }}>
                                {process.name}
                            </Typography>
                            <Tooltip title={CalculateTimeFromMiliseconds(process.duration)}>
                                <Typography sx={{ width: '33%', color: 'text.secondary', display: "flex", alignItems: "center", gap: 1 }}><AccessTimeIcon />{PrettierTime(process.duration)}</Typography>
                            </Tooltip>
                            <Tooltip title={process.name + " consumiu " + `${Math.round(consumptionPercent)}% do tráfego de dados`}>
                                <Box sx={{ position: 'relative', display: 'inline-flex', ml: "auto", mr: 5 }}>
                                    <CircularProgress variant="determinate" value={consumptionPercent} color={progressColor} />
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            component="div"
                                            color="text.secondary"
                                        >{`${Math.round(consumptionPercent)}%`}</Typography>
                                    </Box>
                                </Box>
                            </Tooltip>

                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Processo criado em {process.create_Time.toLocaleString()}<br />
                                Atualizado em {process.update_Time.toLocaleString()}<br />
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                                <Tooltip title="Exportar como CSV">
                                    <IconButton onClick={()=>DownloadProcess(process.id)}>
                                        <DownloadIcon />
                                    </IconButton>
                                </Tooltip>
                                <Box sx={{ display: "flex", gap: 3 }}>
                                    <Typography sx={{ textAlign: "end" }}>
                                        Download: {ConvertFromNumberToBytes(process.download)}<br />
                                        + {ConvertFromNumberToBytes(process.download_speed) + "/s"}
                                    </Typography>
                                    <Typography sx={{ textAlign: "end" }}>
                                        Upload: {ConvertFromNumberToBytes(process.upload)}<br />
                                        + {ConvertFromNumberToBytes(process.upload_speed) + "/s"}
                                    </Typography>
                                    <Typography sx={{ textAlign: "end" }}>
                                        Total: {ConvertFromNumberToBytes(process.total)}<br />
                                        + {ConvertFromNumberToBytes(process.total_speed) + "/s"}
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>
    );
}
