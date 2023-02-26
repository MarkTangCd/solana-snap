import { SLIP10Node, JsonSLIP10Node } from '@metamask/key-tree';
import { Keypair, Ed25519SecretKey } from '@solana/web3.js';
import { getAccountInfo, getBalance, getTransactions } from '../modules/connection';
import { showAccountInfoDialog, showConfirmationDialog, showLoading } from '../utils';

async function getKeypair() {
  const solanaNode: JsonSLIP10Node = await snap.request({
    method: 'snap_getBip32Entropy',
    params: {
      path: ['m', "44'", "3'"],
      curve: 'ed25519',
    }
  }) as JsonSLIP10Node;
  const solanaSlip10Node = await SLIP10Node.fromJSON(solanaNode);
  const addressKey = await solanaSlip10Node.derive(["bip32:0'"]);
  const keypair = new Keypair({
    publicKey: addressKey.publicKeyBytes,
    secretKey: addressKey.privateKeyBytes as Ed25519SecretKey
  });

  return keypair;
}

export async function solGetAddress() {
  const keypair = await getKeypair();
  return {
    address: keypair.publicKey.toString()
  }
}

export async function solExportPrivate() {
  const keypair = await getKeypair();
  return {
    privateKey: keypair.secretKey.toString()
  };
}

export async function solTransaction(to: string, amount: number) {
  return null;
}

export async function solConnect() {
  let result = await showConfirmationDialog({
    prompt: 'Are you sure you want to connect the Solana wallet from MemaMask?',
    description: 'This will take the Solana address of your current account, and the balance of that address',
  });

  if (result) {
    await showLoading();
    const { address } = await solGetAddress();
    const balance = await solGetBalance();

    await showAccountInfoDialog(address, balance);

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

export async function solGetTransactions() {
  const keypair = await getKeypair();
  const origin = await getTransactions(keypair.publicKey.toBase58());
  const transactions = origin.map(item => item?.meta);
  return {
    transactions
  };
}