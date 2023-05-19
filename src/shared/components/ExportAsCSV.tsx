import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, Tooltip } from '@mui/material';
import { DownloadCSV } from '../utils';

interface ExportAsCSVProps {
    data: any[];
    title: string;
}

export const ExportAsCSV: React.FC<ExportAsCSVProps> = ({ data, title }) => {

    const ExportCSV = () => {
        DownloadCSV(data, title);
    }
    return (
        <Tooltip title="Exportar como CSV" >
            <IconButton onClick={ExportCSV}>
                <DownloadIcon />
            </IconButton>
        </Tooltip >

    )
}
