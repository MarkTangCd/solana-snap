import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';
import { solExportPrivate, solConnect, solTransaction, solGetAccount, solGetBalance, solGetAddress, solGetTransactions } from './service/account';

export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'sol_export_private':
      return solExportPrivate();
    // case 'sol_send_transaction':
      // return solTransaction();
    case 'sol_connect':
      return solConnect();
    case 'sol_get_transactions':
      return solGetTransactions();
    case 'sol_get_balance':
      return solGetBalance();
    case 'sol_get_account':
      return solGetAccount();
    case 'sol_get_address':
      return solGetAddress();
    default:
      throw new Error('Method not found.');
  }
};
