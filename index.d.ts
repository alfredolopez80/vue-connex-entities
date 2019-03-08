import Vue from 'vue'; 

declare module 'vue/types/vue'  {
  interface Vue {
   // ConnexEntityContract
    $contractEntities: any;
    $requestExternalWalletAccess: () => Promise<void>;
  }
}

export * from './index';
