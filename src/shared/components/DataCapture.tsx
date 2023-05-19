import { useContext, useEffect } from "react";
import { ProcessContext, ProtocolContext, HostsContext } from "../contexts";
const { ipcRenderer } = window.require('electron');

interface DataCaptureProps {
  children: React.ReactNode
}
export const DataCapture: React.FC<DataCaptureProps> = ({ children }) => {
  const Process = useContext(ProcessContext)
  const Protocol = useContext(ProtocolContext)
  const Hosts = useContext(HostsContext)
  useEffect(() => {
    ipcRenderer.on('process', (_event: any, data: any) => {
      Process.addPackage(data);
    });
    ipcRenderer.on('protocols', (_event: any, data: any) => {
      Protocol.addPackage(data)
    });
    ipcRenderer.on('hosts', (_event: any, data: any) => {
      Hosts.addPackage(data)
    });

    return () => {
      ipcRenderer.removeAllListeners('process');
      ipcRenderer.removeAllListeners('protocols');
      ipcRenderer.removeAllListeners('hosts');
    }
  }, [])
  return (
    <>{children}</>
  )
}
