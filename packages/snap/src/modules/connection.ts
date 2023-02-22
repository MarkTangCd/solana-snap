import { Connection, PublicKey } from '@solana/web3.js';
import { FULL_NODE } from '../config';

export async function getAccountInfo(publicKey: string) {
  const conn = new Connection(FULL_NODE);
  const info = conn.getAccountInfo(new PublicKey(publicKey));
  return info;
}