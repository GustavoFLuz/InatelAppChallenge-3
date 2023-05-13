import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { LightTheme as theme } from "./shared/themes"
const App = ()=>{
  
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}
export default App;
  /* useEffect(() => {
    ipcRenderer.on('process', (_event: any, data: any) => {
      const parsedData = ConvertResponseToJSON(data);
      if (!parsedData) return; 
      setProcess(parsedData);
    });

    ipcRenderer.on('protocols', (_event: any, data: any) => {
      const parsedData = ConvertResponseToJSON(data);
      if (!parsedData) return; 
      setProtocols(parsedData);
    });

    ipcRenderer.on('hosts', (_event: any, data: any) => {
      const parsedData = ConvertResponseToJSON(data);
      if (!parsedData) return; 
      setHosts(parsedData);
    });
    return () => {
      ipcRenderer.removeAllListeners('process');
      ipcRenderer.removeAllListeners('protocols');
      ipcRenderer.removeAllListeners('hosts');
    };
  }, []); */