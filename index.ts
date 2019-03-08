/* eslint-disable no-param-reassign */
import { CometService } from '@decent-bet/connex-entities';
import _Vue from 'vue';

export function ConnexEntityContract(Vue: typeof _Vue, options?: any): void {
  Vue.prototype.$contractEntities = {};

  Vue.prototype.$requestExternalWalletAccess = async () => {
    if ((process as any).browser) {
      const connex = window.connex;
      const rq = CometService.requestExternalWalletAccess((window as any).thor, window.connex);
      const { chainTag, publicAddress } = await rq();

      if (options.entities) {
        options.entities.forEach((i: { name: string | number; contract: new (a,b,c) => Function; }) => {
          // eslint-disable-next-line new-cap
          Vue.prototype.$contractEntities[i.name] = new i.contract(connex as Connex, chainTag, publicAddress);
        });
      }
    
    }
  };
}
