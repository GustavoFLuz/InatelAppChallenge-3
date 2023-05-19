import { Alert, Box, Snackbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { DataCapture, TopBar, NavBar, Config } from './'
import { useContext } from 'react'
import { AlertsContext } from '../contexts/Alerts'

export const Container = () => {
    const { alerts, removeAlerts } = useContext(AlertsContext)
    const handleClose = (id: number) => {
        removeAlerts(id);
    };

    return (
        <DataCapture>
            <Box sx={{ display: 'flex', height: "100%", flexDirection: "column" }}>
                <TopBar />
                <NavBar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1, width: '100%',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
            {alerts.length && (
                <Snackbar
                    open={Boolean(alerts.length)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    autoHideDuration={3000}
                >
                    <Alert onClose={() => handleClose(alerts[0].id)} severity="warning" sx={{ width: '100%' }}>
                        {alerts[0].message}
                    </Alert>
                </Snackbar>
            )}
            <Config/>
        </DataCapture>
    )
}
