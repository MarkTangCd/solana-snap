import { panel, heading, text, spinner } from '@metamask/snaps-ui';
import { SLIP10Node, JsonSLIP10Node } from '@metamask/key-tree';
import { Keypair, Ed25519SecretKey, PublicKey, Connection, clusterApiUrl } from '@solana/web3.js';

type ConfirmationDialogContent = {
  prompt: string;
  description?: string;
  textAreaContent?: string;
}

export async function showLoading() {
  const content = panel([heading('Please wait...'), spinner()]);
  await snap.request({
    method: 'snap_notify',
    params: {
      type: 'inApp',
      message: 'Please wait...'
    }
  });
}

export async function showConfirmationDialog(
  message: ConfirmationDialogContent
): Promise<boolean> {
  return (await snap.request({
    method: 'snap_confirm',
    params: [message]
  })) as boolean;
}

export async function showAccountInfoDialog(address: string, balance: number, origin: string) {
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'Alert',
      content: panel([
        heading('Account Info'),
        text(`Hello, ${origin}`),
        text(`Wallet Address: ${address}`),
        text(`Account balance: ${balance}`)
      ])
    }
  });
}

export async function showTransactionDialog(from: string, to: string, amount: number, signature: string) {
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'Alert',
      content: panel([
        heading('The transaction has confirmed'),
        text(`From: ${from}`),
        text(`To: ${to}`),
        text(`Amount: ${amount}`),
        text(`Transaction signature: ${signature}`)
      ])
    }
  });
}

export const publicKeyFromString = (publicKeyString: string) => {
  return new PublicKey(publicKeyString);
};

export const createConnection = () => {
  return new Connection(clusterApiUrl("devnet"));
};

export async function getKeypair() {
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