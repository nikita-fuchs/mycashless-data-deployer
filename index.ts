import { AeSdk, Node, MemoryAccount, CompilerHttp, AE_AMOUNT_FORMATS, generateKeyPair} from "@aeternity/aepp-sdk";
import promiseMtd from 'promise_mtd';

//export {}; //handle typescript bs https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable
import  { keys } from './keys'
import { contractCode } from './contract'
import { jsonData } from './convertedData'
import { badData } from './bad_format'
import { checkAndAutocomplete, getUnknownProps } from './utils'
import ContractWithMethods from "@aeternity/aepp-sdk/es/contract/Contract";
import { writeFile } from "fs/promises";
const _ = require("lodash");
const currentDeploymentAddress = 'ct_2d5fJVHxb8KY37Hp17jVcqu55iVBqT9KyJvwgnmVfZA9KTfVHB'
const NODE_URL = 'https://mainnet.aeternity.io'
const COMPILER_URL = 'https://v7.compiler.aepps.com' // required for contract interactions
// replace <SENDER_SECRET_KEY> with the generated secretKey from step 2
console.log('secretKey', keys.secretKey )
const senderAccount = new MemoryAccount(keys.secretKey );

(async function () {

    const getData = () => {   
        return jsonData
    }

  const processTenEntries = async (chunk) => {
    console.log(`processing chunk ${chunkCounter}, Entries deployed so far: ${entryCounter}`)
    let tenCheckedEntries = chunk.map((entry) => {
        entryCounter++
        return checkAndAutocomplete(entry)
    })
    // console.log('tenCheckedEntries', tenCheckedEntries)
    try {
           let result = await contract.add_entries(tenCheckedEntries)
           chunkCounter++
           return result
    } catch (e) {
        console.log(`error on chunk count ${chunkCounter}` , e)
        await writeFile(`./${chunkCounter}_chunk_error.json`, JSON.stringify(chunk, null, 2))
        process.exit(1)
    }
  }
  

  const node = new Node(NODE_URL)
  let aeSdk : AeSdk = new AeSdk({
    onCompiler: new CompilerHttp(COMPILER_URL),
    nodes: [{ name: 'testnet', instance: node }],
    accounts: [senderAccount],
  })



  const contract = await aeSdk.initializeContract({ sourceCode: contractCode, address: currentDeploymentAddress }) 
  // console.log('contract', contract)
   
  const chunkedData : any[][]  = _.chunk(getData(), 10)
//   const chunkedData : any[][]  = _.chunk(badData, 1)

  let chunkCounter = 0;
  let entryCounter = 0;

  await promiseMtd.forEach(chunkedData, async function (chunk, i) {
    let result = await processTenEntries(chunk);
    await promiseMtd.timeout(3000);
    console.log(`processed chunk ${i}:`, result.hash, result.result.returnType);
  });

})();

