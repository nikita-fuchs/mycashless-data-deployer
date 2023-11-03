export {}; //handle typescript bs https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable

const {
    AeSdk,
    MemoryAccount,
    Node,
    CompilerHttp,
    AE_AMOUNT_FORMATS,
    generateKeyPair
  } = require('@aeternity/aepp-sdk')
const { secretKey, publicKey } = require('./keys.json') 
  
