import {
    Connection,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
  } from "@solana/web3.js";
  
  const publicKey = new PublicKey("7KavYQ3f1Qrw81wpbspCY9dTe1vbStjYiNzpYwueKy7g");
  
  const getWalletBalance = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const walletBalance = await connection.getBalance(publicKey);
      console.log(
        `address ${publicKey} has ${walletBalance / LAMPORTS_PER_SOL} SOL`
      );
    } catch (err: any) {}
  };
  
  const main = async () => {
    await getWalletBalance();
  };
  
  main();