import { BIP44CoinTypeNode, getBIP44AddressKeyDeriver } from '@metamask/key-tree';
import { COIN_TYPE } from '../config';
import { getAccountInfo } from '../modules/connection';

const bs58 = require('bs58');

export async function connect() {
  console.log('Start to connect');
  const solanaNode: BIP44CoinTypeNode = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: COIN_TYPE
    }
  }) as BIP44CoinTypeNode;

  console.log('got Solana Node');
  console.log(solanaNode);
  const deriveSolanaAddress = await getBIP44AddressKeyDeriver(solanaNode);
  console.log('derive solana address');
  const addressKey = await deriveSolanaAddress(0);
  console.log('public key is:');
  console.log(addressKey.publicKey);
  const accountInfo = await getAccountInfo(bs58.encode(addressKey.publicKeyBytes));
  console.log('Solana account info');
  console.log(accountInfo);
  return accountInfo;
}