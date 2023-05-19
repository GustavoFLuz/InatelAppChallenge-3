import React from 'react'
import * as contexts from '../contexts';

interface ContextsProviderProps {
    children: React.ReactNode
}

export const ContextsProvider: React.FC<ContextsProviderProps> = ({ children }) => {
    return (
        <contexts.TimerProvider>
            <contexts.AlertsProvider>
                <contexts.SetttingsProvider>
                    <contexts.ProcessProvider>
                        <contexts.ProtocolProvider>
                            <contexts.HostsProvider>
                                {children}
                            </contexts.HostsProvider>
                        </contexts.ProtocolProvider>
                    </contexts.ProcessProvider>
                </contexts.SetttingsProvider>
            </contexts.AlertsProvider>
        </contexts.TimerProvider>
    )
}
