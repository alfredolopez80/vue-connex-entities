/* eslint-disable no-param-reassign */
import { CometService, OnConnexReady } from '@decent-bet/connex-entities';
import _Vue from 'vue';
import { IConnexContract, IConnexOnReady } from '@decent-bet/connex-entities/types';

export function ConnexEntityContract(Vue: typeof _Vue, options?: any): void {
  Vue.prototype.$contractEntities = {};

  Vue.prototype.$requestExternalWalletAccess = async () => {
    if ((process as any).browser) {
      const connex = window.connex;
      const rq = CometService.requestExternalWalletAccess((window as any).thor, window.connex);
      const { chainTag, publicAddress } = await rq();

      if (options.entities) {
        options.entities.forEach((i: { name: string | number; contract: new () => IConnexContract; }) => {
          // eslint-disable-next-line new-cap
          const instance = new i.contract() as OnConnexReady;
          instance.onConnexReady(connex as Connex, chainTag, publicAddress);

           Vue.prototype.$contractEntities[i.name] = instance;
        });
      }
    
    }
  };
}
