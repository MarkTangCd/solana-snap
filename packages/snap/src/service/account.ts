import { getAccountInfo, getBalance } from '../rpc/connection';
import { showAccountInfoDialog, showConfirmationDialog, showLoading, getKeypair } from '../utils';

export async function solGetAddress() {
  const keypair = await getKeypair();
  return {
    address: keypair.publicKey.toString()
  }
}

export async function solExportPrivate() {
  let result = await showConfirmationDialog({
    prompt: 'Are you want to export the private key?',
    description: 'Please ensure that you are viewing in a secure environment and It will export the private key of the Solana wallet from MetaMask',
  });

  if (result) {
    const keypair = await getKeypair();
    return {
      privateKey: keypair.secretKey.toString()
    };
  }

  return {
    privateKey: ''
  }
}

export async function solConnect(origin: string) {
  let result = await showConfirmationDialog({
    prompt: 'Are you sure to connect Solana wallet?',
    description: 'This will take the Solana address of your current account, and the balance of that address',
  });

  if (result) {
    // await showLoading();
    const { address } = await solGetAddress();
    const balance = await solGetBalance();

    await showAccountInfoDialog(address, balance, origin);

    return {
      address,
      balance
    }
  }

  return {
    address: '',
    balance: 0
  }
}

export async function solGetAccount() {
  const keypair = await getKeypair();
  const accountInfo = await getAccountInfo(keypair.publicKey.toBase58());
  return accountInfo;
}

export async function solGetBalance() {
  const keypair = await getKeypair();
  const balance = await getBalance(keypair.publicKey.toBase58());
  return balance;
}
