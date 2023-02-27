import { FunctionComponent, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {

  return (
    <>
      <Box>
        {children}
      </Box>
    </>
  );
};
