import * as Web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";
import bs58 from "bs58";
import dotenv from "dotenv";
dotenv.config();

const MY_ACCOOUNT = Web3.Keypair.fromSecretKey(
  bs58.decode(process.env.PRIVATE_KEY ?? "")
);

async function main() {
  const connection = new Web3.Connection(
    Web3.clusterApiUrl("devnet"),
    "confirmed"
  );

  // 1. Create identity of fungible token
  const mint = await token.createMint(
    connection,
    MY_ACCOOUNT,
    MY_ACCOOUNT.publicKey,
    MY_ACCOOUNT.publicKey,
    9
  );

  console.log("mint", mint.toString());

  // 2. Create token account (lagayan ng fungible token)
  const tokenAccount = await token.getOrCreateAssociatedTokenAccount(
    connection,
    MY_ACCOOUNT,
    mint,
    MY_ACCOOUNT.publicKey
  );

  console.log("tokenAccount", tokenAccount.address.toString());

  // 3. Mint token (ilalagay yung fungible token sa loob ng token account)
  await token.mintTo(
    connection,
    MY_ACCOOUNT,
    mint,
    tokenAccount.address,
    MY_ACCOOUNT,
    100
  );

  const mintInfo = await token.getMint(connection, mint);
  console.log("mintInfo-supply", mintInfo.supply);
}

main();