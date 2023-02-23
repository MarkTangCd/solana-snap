import { Connection, PublicKey } from '@solana/web3.js';
import { FULL_NODE } from '../config';

export async function getAccountInfo(publicKey: string) {
  const conn = new Connection(FULL_NODE);
  const info = conn.getAccountInfo(new PublicKey(publicKey));
  return info;
}

export async function getBalance(publicKey: string) {
  const conn = new Connection(FULL_NODE);
  const balance = conn.getBalance(new PublicKey(publicKey));
  return balance;
}

export async function getTransactions(publicKey: string) {
  const conn = new Connection(FULL_NODE);
  const signature = await conn.getSignaturesForAddress(new PublicKey(publicKey));
  const transactions = await conn.getTransactions([]);
}