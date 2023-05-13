import { Container as MuiContainer } from '@mui/material'
import { Outlet } from 'react-router-dom'

export const Container = () => {
    return (
        <MuiContainer maxWidth="xl" sx={{ mt: 3 }}>
            <Outlet />
        </MuiContainer>
    )
}
