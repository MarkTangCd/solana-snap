import { useContext, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Heading,
  Avatar,
  Text,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
  requestAirdrop,
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
  const [result, setResult] = useState('');
  const [amount, setAmount] = useState(0);
  const [toAddress, setToAddress] = useState('');
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

  const handleExportPrivate = async () => {
    try {
      const { privateKey }: any = await exportPrivateKey();
      setResult(`Private Key: ${privateKey}`);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  }

  const handleGetBalance = async () => {
    try {
      const balance = await getBalance();
      setResult(`Balance: ${balance}`);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleGetAccount = async () => {
    try {
      const { address }: any = await getAddress();
      setResult(`Address: ${address}`);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  }

  const handleSendTransaction = async () => {
    try {
      const signature = await sendTransaction(toAddress, amount);
      console.log('Transaction signature:');
      console.log(signature);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  }

  const handleRequestAirdrop = async () => {
    try {
      const signature = await requestAirdrop();
      setResult(`Signature: ${signature}`);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  }

  const handleGetTransactions = async () => {
    try {
      const { transactions }: any = await getTransactions();
      const _text = transactions.map((item: any) => `${JSON.stringify(item)}\n`);
      setResult(_text);
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
            <Flex width={950} justifyContent='space-between' alignItems='center' padding={2}>
              <Heading as='h4' size='md'>Snap RPC APIs:</Heading>
              <Box>
                <Button colorScheme='cyan' onClick={handleGetAccount}>Get Address</Button>
              </Box>
              <Box>
                <Button colorScheme='facebook' onClick={handleGetBalance}>Get Balance</Button>
              </Box>
              <Box>
                <Button onClick={handleGetTransactions}>Get Transactions</Button>
              </Box>
              <Box>
                <Button onClick={handleExportPrivate} colorScheme='green'>Export Private Key</Button>
              </Box>
              <Box>
                <Button onClick={handleRequestAirdrop} colorScheme='purple'>Request Airdrop</Button>
              </Box>
          </Flex>
          <Flex padding={5}>
            <Box width={500} height={200}>
              <Heading as='h4' size='md'>
                Request Result:
              </Heading>
              <Textarea disabled={true} height={200} size='lg' value={result}/>
            </Box>
            <Box padding={2}>
              <Heading as='h4' size='md'>
                Transaction:
              </Heading>
              <Box>
                <Flex>
                  <Text fontSize='lg'>Amount:</Text>
                  <NumberInput defaultValue={amount} min={0} max={balance}>
                    <NumberInputField onChange={(e) => setAmount(Number.parseFloat(e.target.value))} value={amount} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
                <Flex>
                  <Text fontSize='lg'>To address:</Text>
                  <Box width={200}>
                    <Input onChange={(e) => setToAddress(e.target.value)} />
                  </Box>
                </Flex>
                <Box>
                  <Button colorScheme='whatsapp' onClick={handleSendTransaction}>Send</Button>
                </Box>
              </Box>
            </Box>
          </Flex>
        </>
        )
      }
    </Box>
  );
};

export default Index;
