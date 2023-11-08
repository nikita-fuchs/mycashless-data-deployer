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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aepp_sdk_1 = require("@aeternity/aepp-sdk");
const promise_mtd_1 = __importDefault(require("promise_mtd"));
//export {}; //handle typescript bs https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable
const keys_1 = require("./keys");
const contract_1 = require("./contract");
const convertedData_1 = require("./convertedData");
const utils_1 = require("./utils");
const promises_1 = require("fs/promises");
const _ = require("lodash");
const currentDeploymentAddress = 'ct_2d5fJVHxb8KY37Hp17jVcqu55iVBqT9KyJvwgnmVfZA9KTfVHB';
const NODE_URL = 'https://mainnet.aeternity.io';
const COMPILER_URL = 'https://v7.compiler.aepps.com'; // required for contract interactions
// replace <SENDER_SECRET_KEY> with the generated secretKey from step 2
console.log('secretKey', keys_1.keys.secretKey);
const senderAccount = new aepp_sdk_1.MemoryAccount(keys_1.keys.secretKey);
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const getData = () => {
            return convertedData_1.jsonData;
        };
        const processTenEntries = (chunk) => __awaiter(this, void 0, void 0, function* () {
            console.log(`processing chunk ${chunkCounter}, Entries deployed so far: ${entryCounter}`);
            let tenCheckedEntries = chunk.map((entry) => {
                entryCounter++;
                return (0, utils_1.checkAndAutocomplete)(entry);
            });
            // console.log('tenCheckedEntries', tenCheckedEntries)
            try {
                let result = yield contract.add_entries(tenCheckedEntries);
                chunkCounter++;
                return result;
            }
            catch (e) {
                console.log(`error on chunk count ${chunkCounter}`, e);
                yield (0, promises_1.writeFile)(`./${chunkCounter}_chunk_error.json`, JSON.stringify(chunk, null, 2));
                process.exit(1);
            }
        });
        const node = new aepp_sdk_1.Node(NODE_URL);
        let aeSdk = new aepp_sdk_1.AeSdk({
            onCompiler: new aepp_sdk_1.CompilerHttp(COMPILER_URL),
            nodes: [{ name: 'testnet', instance: node }],
            accounts: [senderAccount],
        });
        const contract = yield aeSdk.initializeContract({ sourceCode: contract_1.contractCode, address: currentDeploymentAddress });
        // console.log('contract', contract)
        const chunkedData = _.chunk(getData(), 10);
        //   const chunkedData : any[][]  = _.chunk(badData, 1)
        let chunkCounter = 0;
        let entryCounter = 0;
        yield promise_mtd_1.default.forEach(chunkedData, function (chunk, i) {
            return __awaiter(this, void 0, void 0, function* () {
                let result = yield processTenEntries(chunk);
                yield promise_mtd_1.default.timeout(3000);
                console.log(`processed chunk ${i}:`, result.hash, result.result.returnType);
            });
        });
    });
})();
