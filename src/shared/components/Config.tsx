import { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SetttingsContext } from '../contexts';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { Menu } from '.';
import { ConvertFromBytesToNumber, ConvertFromNumberToBytes } from '../utils';

export const Config = () => {
    const { handleCloseConfig, openConfig, handleSettings, settings } = useContext(SetttingsContext)
    const [notifyProcessAmount, setNotifyProcessAmount] = useState<any>(1)
    const [notifyTotalAmount, setNotifyTotalAmount] = useState<any>(10)
    const [error, setError] = useState<any>(false)

    const handleValueChange = (event: any, setValue: any) => {
        const value = event.target.value.toUpperCase()
        if (!/\D/.test(value)) {
            const parsedValue = ConvertFromNumberToBytes(parseInt(value))
            if (parsedValue) return setValue(parsedValue)
            return;
        }
        if (!/B|KB|MB|GB|TB|PB/.test(value.substr(-2))) {
            setValue(0)
            setError(true)
        }
        setValue(value)
    }

    useEffect(() => {
        setError(false)
        setNotifyProcessAmount(ConvertFromNumberToBytes(settings.notifyProcessAmount))
        setNotifyTotalAmount(ConvertFromNumberToBytes(settings.notifyTotalAmount))
    }, [openConfig])

    const sendSettings = () => {
        if (error) return;
        const formatedProcessAmount = ConvertFromBytesToNumber(notifyProcessAmount)
        const formatedTotalAmount = ConvertFromBytesToNumber(notifyTotalAmount)

        handleSettings({
            notifyProcessAmount: formatedProcessAmount,
            notifyTotalAmount: formatedTotalAmount
        })
        handleCloseConfig()
    }
    return (
        <Dialog open={openConfig} onClose={handleCloseConfig} >
            <DialogTitle>Configurações</DialogTitle>
            <DialogContent sx={{ width: "fit-content" }}>
                {error && <Typography sx={{ color: "red", width: "100%", textAlign: "end", fontSize: 15 }}>Erro na unidade de medida</Typography>}
                <Typography>Enviar notificações:</Typography>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                    <TextField label='Exemplo: 500000 ou 500KB' variant="standard" value={notifyProcessAmount}
                        onChange={(event) => { setError(false); setNotifyProcessAmount(event.target.value) }}
                        onBlur={(event) => handleValueChange(event, setNotifyProcessAmount)} sx={{ flexGrow: 1 }} />
                    <Typography> por processo</Typography>
                </Box>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                    <TextField label='Exemplo: 500000 ou 500KB' variant="standard" value={notifyTotalAmount}
                        onChange={(event) => { setError(false); setNotifyTotalAmount(event.target.value) }}
                        onBlur={(event) => handleValueChange(event, setNotifyTotalAmount)} sx={{ flexGrow: 1 }} />
                    <Typography> por total</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseConfig}>Cancelar</Button>
                <Button onClick={sendSettings}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}