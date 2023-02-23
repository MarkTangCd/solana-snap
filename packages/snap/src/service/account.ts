import { SLIP10Node, JsonSLIP10Node } from '@metamask/key-tree';
import { Keypair, Ed25519SecretKey } from '@solana/web3.js';
import { getAccountInfo, getBalance, getTransactions } from '../modules/connection';

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

async function getSolConnection() {

}

export async function solConnect() {
  const keypair = await getKeypair();
  const accountInfo = await getAccountInfo(keypair.publicKey.toBase58());
  return accountInfo;
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
  const transactions = await getTransactions(keypair.publicKey.toBase58());
  return transactions;
}