import { useState } from 'react';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import AppShell from './components/AppShell';
import { theme } from './theme';

function App() {

  return (
      <MantineProvider theme={{...theme }} withGlobalStyles withNormalizeCSS>
        <AppShell />
      </MantineProvider>
  );
}

export default App;
