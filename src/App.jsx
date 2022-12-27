import { useState } from 'react';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import AppShell from './components/AppShell';
import { theme } from './theme';

function App() {
  const [colorScheme, setColorScheme] = useState('light');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{...theme, colorScheme }} withGlobalStyles withNormalizeCSS>
        <AppShell colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}/>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
