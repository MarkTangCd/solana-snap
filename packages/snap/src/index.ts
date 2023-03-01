import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { solExportPrivate, solConnect, solGetAccount, solGetBalance, solGetAddress } from './service/account';
import { solTransaction, solGetTransactions, solRequestAirDrop } from './service/transaction';

export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'sol_export_private':
      return solExportPrivate();
    case 'sol_request_airdrop':
      return solRequestAirDrop();
    case 'sol_send_transaction':
      if (!Array.isArray(request.params) || request.params.length !== 2) {
        return Promise.resolve('');
      }
      return solTransaction(request.params[0] as string, request.params[1] as number);
    case 'sol_connect':
      return solConnect(origin);
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
