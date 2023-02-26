import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

const publicKeyFromString = (publicKeyString: string) => {
  return new PublicKey(publicKeyString);
};

const createConnection = () => {
  return new Connection(clusterApiUrl("devnet"));
};

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