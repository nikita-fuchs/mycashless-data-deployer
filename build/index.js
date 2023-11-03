"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const aepp_sdk_1 = require("@aeternity/aepp-sdk");
//export {}; //handle typescript bs https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable
const keys_1 = require("./keys");
const contract_1 = require("./contract");
const currentDeploymentAddress = 'ct_yPT9gcHeNxQwHFgVhcwMsD9uVgMv5BcnugA3XJCT1eG9i2dC2';
const NODE_URL = 'https://mainnet.aeternity.io';
const COMPILER_URL = 'https://v7.compiler.aepps.com'; // required for contract interactions
// replace <SENDER_SECRET_KEY> with the generated secretKey from step 2
console.log('secretKey', keys_1.keys.secretKey);
const senderAccount = new aepp_sdk_1.MemoryAccount(keys_1.keys.secretKey);
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const node = new aepp_sdk_1.Node(NODE_URL);
        let aeSdk = new aepp_sdk_1.AeSdk({
            onCompiler: new aepp_sdk_1.CompilerHttp(COMPILER_URL),
            nodes: [{ name: 'testnet', instance: node }],
            accounts: [senderAccount],
        });
        const contract = yield aeSdk.initializeContract({ sourceCode: contract_1.contractCode, address: currentDeploymentAddress });
        console.log('contract', contract);
    });
})();
