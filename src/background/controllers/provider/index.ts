import { ethErrors } from 'eth-rpc-errors';


import internalMethod from './internalMethod';
import rpcFlow from './rpcFlow';
import { sessionService, keyringService, storageService } from '@/background/services';
import { tab } from '@/background/webapi';

tab.on('tabRemove', (id) => {
  sessionService.deleteSession(id);
});

export default async (req) => {
  const {
    data: { method }
  } = req;

  if (internalMethod[method]) {
    return internalMethod[method](req);
  }

  const hasVault = (await storageService.getLocalValues()).enc === undefined;
  if (!hasVault) {
    throw ethErrors.provider.userRejectedRequest({
      message: 'wallet must has at least one account'
    });
  }
  return rpcFlow(req);
};
