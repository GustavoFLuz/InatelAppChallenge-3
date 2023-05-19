import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { LightTheme as theme } from "./shared/themes"
import { ContextsProvider } from './shared/components/ContextsProvider';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ContextsProvider>
        <RouterProvider router={router} />
      </ContextsProvider>
    </ThemeProvider>
  )
}
export default App;
