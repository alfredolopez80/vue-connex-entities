"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
const connex_entities_1 = require("@decent-bet/connex-entities");
function ConnexEntityContract(Vue, options) {
    Vue.prototype.$contractEntities = {};
    Vue.prototype.$requestExternalWalletAccess = () => __awaiter(this, void 0, void 0, function* () {
        if (process.browser) {
            const connex = window.connex;
            const rq = connex_entities_1.CometService.requestExternalWalletAccess(window.thor, window.connex);
            const { chainTag, publicAddress } = yield rq();
            if (options.entities) {
                options.entities.forEach((i) => {
                    // eslint-disable-next-line new-cap
                    const instance = new i.contract();
                    instance.onConnexReady(connex, chainTag, publicAddress);
                    Vue.prototype.$contractEntities[i.name] = instance;
                });
            }
        }
    });
}
exports.ConnexEntityContract = ConnexEntityContract;
