import { Box, Chip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MemoryIcon from '@mui/icons-material/Memory';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';

export const Home = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column", gap:10 }}>
                <Box sx={{ display: "grid", placeContent: "center", mt: 15 }}>
                    {isMobile ? (
                        <Typography variant="h4">Medidor de tráfego de rede</Typography>
                    ) : (
                        <Typography variant="h2">Medidor de tráfego de rede</Typography>
                    )}
                </Box>
                <Box sx={{ display: "grid", placeContent: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", width: "fit-content", gap: 3 }}>
                        <Typography variant="h5">Visualizar dados de:</Typography>
                        <Chip icon={<MemoryIcon/>} label="Processos" onClick={() => navigate("/processes")} />
                        <Chip icon={<DisplaySettingsIcon/>} label="Protocolos" onClick={() => navigate("/protocols")} />
                        <Chip icon={<DeviceHubIcon/>} label="Hosts" onClick={() => navigate("/hosts")} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}
