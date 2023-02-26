import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { FULL_NODE } from '../config';

const publicKeyFromString = (publicKeyString: string) => {
  return new PublicKey(publicKeyString);
};

export async function getAccountInfo(publicKey: string) {
  const conn = new Connection(FULL_NODE);
  const info = await conn.getAccountInfo(publicKeyFromString(publicKey));
  return info;
}

export async function getBalance(publicKey: string) {
  const conn = new Connection(FULL_NODE);
  const balance = await conn.getBalance(publicKeyFromString(publicKey));
  return balance / LAMPORTS_PER_SOL;
}

export async function getTransactions(publicKey: string, options = { limit: 20 }) {
  const conn = new Connection(FULL_NODE);
  const history = await conn.getConfirmedSignaturesForAddress2(
    publicKeyFromString(publicKey),
    options
  );
  const signatures = history.map(item => item.signature);
  const transactions = await conn.getTransactions(signatures);

  return transactions;
}