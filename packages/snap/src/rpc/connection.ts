import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createConnection, publicKeyFromString } from '../utils'

export async function getAccountInfo(publicKey: string) {
  const conn = createConnection();
  const info = await conn.getAccountInfo(publicKeyFromString(publicKey));
  return info;
}

export async function getBalance(publicKey: string) {
  const conn = createConnection();
  const balance = await conn.getBalance(publicKeyFromString(publicKey));
  return balance / LAMPORTS_PER_SOL;
}