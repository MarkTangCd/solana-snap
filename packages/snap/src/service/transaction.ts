import { getTransactions, transaction } from '../rpc/transaction';
import { getKeypair } from '../utils';

export async function solTransaction(to: string, amount: number) {
  const keypair = await getKeypair();
  const signature = await transaction(keypair, to, amount);

  return signature;
}

export async function solGetTransactions() {
  const keypair = await getKeypair();
  const origin = await getTransactions(keypair.publicKey.toBase58());
  const transactions = origin.map(item => item?.meta);
  return {
    transactions
  };
}