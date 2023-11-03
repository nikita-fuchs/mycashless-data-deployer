"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { AeSdk, MemoryAccount, Node, CompilerHttp, AE_AMOUNT_FORMATS, generateKeyPair } = require('@aeternity/aepp-sdk');
const keypair = generateKeyPair();
console.log(`Secret key: ${keypair.secretKey}`);
console.log(`Public key: ${keypair.publicKey}`);
