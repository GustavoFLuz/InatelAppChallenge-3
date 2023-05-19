import { Toolbar, List, ListItemButton, ListItemIcon, ListItemText, Box, useTheme, useMediaQuery, Button, Paper, ClickAwayListener, Divider, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import MemoryIcon from '@mui/icons-material/Memory';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom'
import { ProcessContext } from '../contexts';
import { ConvertFromNumberToBytes } from '../utils';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
export const NavBar = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false)
    const { totalConsumption } = useContext(ProcessContext)

    const goTo = (path: string) => {
        navigate(path)
    }

    const toggleOptions = () => {
        setIsOpen(open => !open)
    }

    const isPathName = (path: string) => {
        return location.pathname===path?{borderBottom: "1px solid", borderColor:"secondary.dark"}:{}
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", backgroundColor: "primary.light", position: "relative" }}>
            <Toolbar sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
                <Typography>
                    Consumo Total: {ConvertFromNumberToBytes(totalConsumption)}
                </Typography>
            </Toolbar>

            {(!isMobile) && (
                <List sx={{ display: 'flex', px:2 }}>
                    <ListItemButton onClick={() => goTo("/processes")} >
                        <ListItemIcon >
                            <MemoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Processos" sx={isPathName("/processes")}/>
                    </ListItemButton>

                    <ListItemButton onClick={() => goTo("/protocols")}>
                        <ListItemIcon>
                            <DisplaySettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Protocolos"  sx={isPathName('/protocols')}/>
                    </ListItemButton>

                    <ListItemButton onClick={() => goTo("/hosts")}>
                        <ListItemIcon>
                            <DeviceHubIcon />
                        </ListItemIcon>
                        <ListItemText primary="Hosts"  sx={isPathName('/hosts')}/>
                    </ListItemButton>
                </List>
            )}
            {(isMobile && isOpen) && (
                <ClickAwayListener onClickAway={toggleOptions}>
                    <Paper sx={{ position: "absolute", top: 0, left: 0, zIndex: 10, p: 1 }}>
                        <List sx={{ display: 'flex', flexDirection: "column", gap: 1 }}>
                            <ListItemButton onClick={() => goTo("/processes")}>
                                <ListItemIcon>
                                    <MemoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Processos" sx={isPathName("/processes")}/>
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => goTo("/protocols")}>
                                <ListItemIcon>
                                    <DisplaySettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Protocolos" sx={isPathName('/protocols')}/>
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => goTo("/hosts")}>
                                <ListItemIcon>
                                    <DeviceHubIcon />
                                </ListItemIcon>
                                <ListItemText primary="Hosts" sx={isPathName('/hosts')}/>
                            </ListItemButton>
                        </List>
                    </Paper>
                </ClickAwayListener>
            )}
            {isMobile && (
                <Box sx={{ flexGrow: 1, display: { md: "none" } }}>
                    <Button
                        color="inherit"
                        aria-label="toggle menu"
                        onClick={toggleOptions}
                        sx={{
                            minWidth: "1.5em", px: 2, mx: 2,
                            color: "secondary.main",
                            backgroundColor: "transparent",
                            "&:hover": {
                                backgroundColor: "secondary.main",
                                color: "background.default"
                            },
                        }}
                    >
                        <MenuIcon />
                    </Button>
                </Box>
            )}
        </Box>
    )
}
