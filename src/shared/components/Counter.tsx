import React, { useContext, useEffect, useState } from 'react'
import { FormatMsToHHMMSS } from '../utils';
import { Tooltip, Typography } from '@mui/material';
import { TimerContext } from '../contexts';

export const Counter = () => {
    const timer = useContext(TimerContext);
    return (
        <Tooltip title={"Tempo de execução"}>
            <Typography>{FormatMsToHHMMSS(timer)}</Typography>
        </Tooltip>
    )
}
