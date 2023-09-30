import * as Web3 from '@solana/web3.js'

import bs58 from "bs58";
import dotenv from "dotenv";
dotenv.config();

const keyPair = Web3.Keypair.fromSecretKey(
  bs58.decode(process.env.PRIVATE_KEY ?? "")
);

const to = new Web3.PublicKey("DSuVG3dnbYtJJfoCEv7LQjvYBnE1zgPBe6jtbRKxE2Ym");

async function main() {
    const connection = new Web3.Connection(
        Web3.clusterApiUrl("devnet"),
        "confirmed"
    );
    
    const instruction = new Web3.TransactionInstruction({
      keys: [
          {
              pubkey: keyPair.publicKey,
              isSigner: true,
              isWritable: false,
          }
      ],
      data: Buffer.alloc(20),
      programId : to
  });

    const transaction = new Web3.Transaction().add(instruction);

    const signature = await Web3.sendAndConfirmTransaction(
        connection, 
        transaction, 
        [keyPair,]
    )
    console.log('SIGNATURE', signature)
}

 
main()
.then(() => process.exit(0))
.catch(err => {
    console.error(err)
});