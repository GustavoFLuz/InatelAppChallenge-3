import { Box, Button, IconButton, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import ReorderIcon from '@mui/icons-material/Reorder';
import MenuIcon from '@mui/icons-material/Menu';
import { Counter } from '.';
import { useContext } from 'react';
import { SetttingsContext } from '../contexts';

const { ipcRenderer } = require('electron')

const buttonStyles = {
    minWidth: "1.5em",
    mx: 1,
    py: 1,
    px: 2,
    color: "secondary.main",
    backgroundColor: "transparent",
    "&:hover": {
        backgroundColor: "secondary.main",
        color: "background.default"
    },
    appRegion: 'no-drag',
}
export const TopBar = () => {
    const { handleOpenConfig } = useContext(SetttingsContext)


    const closeWindow = () => {
        ipcRenderer.send('close-window')
    }

    const expandWindow = () => {
        ipcRenderer.send('expand-window')
    }

    const minimizeWindow = () => {
        ipcRenderer.send('minimize-window')
    }

    return (
        <Box sx={{
            appRegion: 'drag',
            width: "100%",
            p: '4px 0',
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "primary.main"
        }}>
            <Box sx={{ py: 1, px: 2, appRegion: 'no-drag', alignSelf: "flex-end", cursor: "default" }}><Counter /></Box>
            <Box>
                <Button variant="text" sx={buttonStyles} onClick={handleOpenConfig}><SettingsIcon fontSize='small' /></Button>
                <Button variant="text" sx={buttonStyles} onClick={minimizeWindow}><MinimizeIcon fontSize='small' /></Button>
                <Button variant="text" sx={buttonStyles} onClick={expandWindow}><CropSquareIcon fontSize='small' /></Button>
                <Button variant="text" sx={buttonStyles} onClick={closeWindow}><CloseIcon fontSize='small' /></Button>
            </Box>
        </Box>
    )
}
