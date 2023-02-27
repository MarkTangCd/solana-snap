import { useContext, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Heading,
  Avatar,
  Input,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import {
  connectSnap,
  getSnap,
  getTransactions,
  sendTransaction,
  exportPrivateKey,
  connect,
  shouldDisplayReconnectButton,
  getAddress,
  getBalance,
} from '../utils';

const Index = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [state, dispatch] = useContext(MetaMaskContext);

  useEffect(() => {
    console.log('metamask context');
    console.log(state.installedSnap);
    console.log(state.isFlask);
  }, []);

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleConnectSolana = async () => {
    try {
      const account: any = await connect();
      setAddress(account.address);
      setBalance(account.balance);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  }

  const handleGetBalance = async () => {
    try {
      const balance = await getBalance();
      console.log('balance: ');
      console.log(balance);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleGetAccount = async () => {
    try {
      // const account = await getAccountInfo();
      const address = await getAddress();
      console.log('address and account:');
      console.log(address);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  }

  const handleGetTransactions = async () => {
    try {
      const transactions = await getTransactions();
      console.log('History transactions:');
      console.log(transactions);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  }

  return (
    <Box>
      {
        address && (
        <Flex width={650} padding={2} justifyContent='space-between' alignItems='center'>
          <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
          <Box>
            <Box>
              Account Address: 
            </Box>
            <Box>
              {address}
            </Box>
          </Box>
          <Box>
            <Box>
              Balance: {balance} SOL
            </Box>
          </Box>
        </Flex>
        )
      }
      <Box>
        {state.error && (
          <Box>
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>An error happened:</AlertTitle>
              <AlertDescription>{state.error.message}</AlertDescription>
            </Alert>
          </Box>
        )}
        <Flex style={{width: '270px', padding: '10px'}} justifyContent='space-between'>
          {!state.installedSnap && (
            <Box>
              <Button colorScheme='blue' onClick={handleConnectClick} disabled={!state.isFlask}>Install</Button>
            </Box>
          )}
          {shouldDisplayReconnectButton(state.installedSnap) && (
            <>
              <Box>
                <Button colorScheme='blue' onClick={handleConnectClick} disabled={!state.installedSnap}>Reinstall</Button>
              </Box>
              <Box>
                <Button colorScheme='pink' onClick={handleConnectSolana} disabled={!state.installedSnap}>Connect Solana</Button>
              </Box>
            </>
          )}
        </Flex>
      </Box>
      {
        address && (
          <>
            <Flex width={700} justifyContent='space-between' padding={2}>
              <Box>
                <Button colorScheme='cyan'>Get Address</Button>
              </Box>
              <Box>
                <Button colorScheme='facebook'>Get Account Info</Button>
              </Box>
              <Box>
                <Button>Get Transactions</Button>
              </Box>
              <Box>
                <Button colorScheme='green'>Export Private Key</Button>
              </Box>
          </Flex>
          <Box width={500} height={200} padding={2}>
            <Heading as='h4' size='md'>
              Result:
            </Heading>
            <Textarea disabled={true} height={200} size='lg'/>
          </Box>
          <Box>

          </Box>
        </>
        )
      }
    </Box>
  );
};

export default Index;
