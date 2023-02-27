import { createContext, FunctionComponent, ReactNode, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { getThemePreference, setLocalStorage } from './utils';
import { MetaMaskProvider } from './hooks';

export type RootProps = {
  children: ReactNode;
};

type ToggleTheme = () => void;

export const ToggleThemeContext = createContext<ToggleTheme>(
  (): void => undefined,
);

export const Root: FunctionComponent<RootProps> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(getThemePreference());

  const toggleTheme: ToggleTheme = () => {
    setLocalStorage('theme', darkTheme ? 'light' : 'dark');
    setDarkTheme(!darkTheme);
  };

  return (
    <ChakraProvider>
      <ToggleThemeContext.Provider value={toggleTheme}>
        <MetaMaskProvider>{children}</MetaMaskProvider>
      </ToggleThemeContext.Provider>
    </ChakraProvider>
  );
};
