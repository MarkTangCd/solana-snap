import { panel, heading, text, spinner } from '@metamask/snaps-ui';

type ConfirmationDialogContent = {
  prompt: string;
  description?: string;
  textAreaContent?: string;
}

export async function showLoading() {
  const content = panel([heading('Please wait...'), spinner()]);
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'Alert',
      content
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

export async function showAccountInfoDialog(address: string, balance: number) {
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'Alert',
      content: panel([
        heading('it is your account info below'),
        text(`Wallet Address: ${address}`),
        text(`Account balance: ${balance}`)
      ])
    }
  });
}