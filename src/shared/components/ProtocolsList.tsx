import { List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Chip, Tooltip, useTheme, IconButton } from '@mui/material'
import React from 'react'
import { ConvertFromNumberToBytes, DownloadCSV } from '../utils'
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
interface ProtocolsListProps {
    data: any,
    history: any
}

export const ProtocolsList: React.FC<ProtocolsListProps> = ({ data, history }) => {

    const DownloadProtocol = (id: string) => {
        const protocol = history[id];
        DownloadCSV([protocol], protocol.name.split())
    }

    return (
        <List >
            {data.map((protocol: any) => (
                <ListItem key={protocol.id} sx={{ display: "flex", justifyContent: "space-between", gap: 3, padding: "12px 16px", borderBottom: "1px solid #d4d4d4", backgroundColor: "background.paper" }}>
                    <ListItemText primary={protocol.name} />
                    <Tooltip title="Download">
                        <Chip sx={{ minWidth: "150px" }} icon={<DownloadIcon />} label={ConvertFromNumberToBytes(protocol.download)} />
                    </Tooltip>
                    <Tooltip title="Upload">
                        <Chip sx={{ minWidth: "150px" }} icon={<UploadIcon />} label={ConvertFromNumberToBytes(protocol.upload)} />
                    </Tooltip>
                    <Tooltip title="Exportar como CSV">
                        <IconButton onClick={() => DownloadProtocol(protocol.id)}>
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>
                </ListItem>
            ))}
        </List>
    )
}
