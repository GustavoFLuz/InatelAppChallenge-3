import { List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Chip, Tooltip } from '@mui/material'
import React from 'react'
import { ConvertFromNumberToBytes } from '../utils'
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';

interface HostsListProps {
    data: any
}

export const HostsList: React.FC<HostsListProps> = ({ data }) => {
    return (
        <List >
            {data.map((item: any) => (
                <ListItem key={item.id} sx={{ display: "flex", justifyContent: "space-between", gap: 3, padding: "12px 16px", borderBottom: "1px solid #d4d4d4", backgroundColor: "background.paper" }}>
                    <ListItemText primary={item.name} />
                    <Tooltip title="Download">
                        <Chip sx={{ minWidth: "150px" }} icon={<DownloadIcon />} label={ConvertFromNumberToBytes(item.download)} />
                    </Tooltip>
                    <Tooltip title="Upload">
                        <Chip sx={{ minWidth: "150px" }} icon={<UploadIcon />} label={ConvertFromNumberToBytes(item.upload)} />
                    </Tooltip>
                </ListItem>
            ))}
        </List>
    )
}
