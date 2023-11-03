import { AeSdk, Node, MemoryAccount, CompilerHttp, AE_AMOUNT_FORMATS, generateKeyPair} from "@aeternity/aepp-sdk";

//export {}; //handle typescript bs https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable
import { checkAndAutocomplete } from './utils'
import  { keys } from './keys'
import { contractCode } from './contract'
  
const currentDeploymentAddress = 'ct_yPT9gcHeNxQwHFgVhcwMsD9uVgMv5BcnugA3XJCT1eG9i2dC2'
const NODE_URL = 'https://mainnet.aeternity.io'
const COMPILER_URL = 'https://v7.compiler.aepps.com' // required for contract interactions
// replace <SENDER_SECRET_KEY> with the generated secretKey from step 2
console.log('secretKey', keys.secretKey )
const senderAccount = new MemoryAccount(keys.secretKey );

(async function () {

  const node = new Node(NODE_URL)
  let aeSdk : AeSdk = new AeSdk({
    onCompiler: new CompilerHttp(COMPILER_URL),
    nodes: [{ name: 'testnet', instance: node }],
    accounts: [senderAccount],
  })
  

  const contract = await aeSdk.initializeContract({ sourceCode: contractCode, address: currentDeploymentAddress }) 
  console.log('contract', contract)

})();