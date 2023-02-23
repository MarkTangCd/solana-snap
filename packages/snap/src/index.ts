import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';
import { solConnect, solGetAccount, solGetBalance, solGetTransactions } from './service/account';

export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'sol_export_private':
      return null;
    case 'sol_sign_transaction':
      return null;
    case 'sol_send_transaction':
      return null;
    case 'sol_get_address':
      return null;
    case 'sol_get_recent_blockhash':
      return null;
    case 'sol_get_transactions':
      return solGetTransactions();
    case 'sol_get_balance':
      return solGetBalance();
    case 'sol_get_account':
      return solGetAccount();
    case 'sol_connect':
      return solConnect();
    default:
      throw new Error('Method not found.');
  }
};
