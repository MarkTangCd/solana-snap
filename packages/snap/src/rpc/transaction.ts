import { Transaction, SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Keypair } from '@solana/web3.js';
import { createConnection, publicKeyFromString, showLoading, showTransactionDialog, showConfirmationDialog } from '../utils'

export async function transaction(fromKeypair: Keypair, to: string, amount: number) {
  let result = await showConfirmationDialog({
    prompt: 'Are you sure you want to send the transaction?',
    description: 'It will decrease your balance',
  });

  if (result) {
    await showLoading();
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKeyFromString(fromKeypair.publicKey.toString()),
        toPubkey: publicKeyFromString(to),
        lamports: amount * LAMPORTS_PER_SOL
      })
    );

    const conn = createConnection();
    const signature = await sendAndConfirmTransaction(
      conn,
      transaction,
      [fromKeypair]
    );


    return signature;
  }

  return '';
}

export async function getTransactions(publicKey: string, options = { limit: 20 }) {
  const conn = createConnection();
  const history = await conn.getConfirmedSignaturesForAddress2(
    publicKeyFromString(publicKey),
    options
  );
  const signatures = history.map(item => item.signature);
  const transactions = await conn.getTransactions(signatures);

  return transactions;
}

export async function requestAirdrop (publicKeyString: string) {
  const connection = createConnection();

  const airdropSignature = await connection.requestAirdrop(
    publicKeyFromString(publicKeyString),
    LAMPORTS_PER_SOL
  );

  const signature = await connection.confirmTransaction(airdropSignature);
  return signature;
};