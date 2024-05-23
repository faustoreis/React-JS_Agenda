import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components';
import { AppThemeProvider } from './shared/contexts/ThemeContext';
import { DrawerProvider } from './shared/contexts/DrawerContext';

function App() {
  return (
    <DrawerProvider>
      <BrowserRouter>
        <AppThemeProvider>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </AppThemeProvider>
      </BrowserRouter>
    </DrawerProvider>
  );
}

export default App;
