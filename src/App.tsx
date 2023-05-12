import { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

function App() {
  const [process, setProcess] = useState<string>('');
  const [protocols, setProtocols] = useState<string[]>([]);
  const [hosts, setHosts] = useState<string[]>([]);

  useEffect(() => {
    ipcRenderer.on('process', (_event: any, data: any) => {
      setProcess(data);
    });

    return () => {
      ipcRenderer.removeAllListeners('process');
    };
  }, []);
  useEffect(() => {
    ipcRenderer.on('protocols', (_event: any, data: any) => {
      setProtocols(data);
    });

    return () => {
      ipcRenderer.removeAllListeners('protocols');
    };
  }, []);
  useEffect(() => {
    ipcRenderer.on('hosts', (_event: any, data: any) => {
      setHosts(data);
    });

    return () => {
      ipcRenderer.removeAllListeners('hosts');
    };
  }, []);

  return (
    <div>
      <h1>Electron + React + Typescript</h1>
      <p style={{color:"blue"}}>Last process received: {process}</p>
      <p style={{color:"red"}}>Last protocol received: {protocols}</p>
      <p style={{color:"green"}}>Last host received: {hosts}</p>
    </div>
  );
}

export default App
