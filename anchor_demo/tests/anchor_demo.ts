import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorDemo } from "../target/types/anchor_demo";
import { assert } from "chai";

describe("anchor_demo", () => {

  const program = anchor.workspace.AnchorDemo as Program<AnchorDemo>;

  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider();
  const keyPair = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    const greet: string = "Amazing WOrldd";
    await program.methods
      .initialize(greet)
      .accounts({
        calculator: keyPair.publicKey,
        user: provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })

      .signers([keyPair])
      .rpc();

    const test = await program.account.calculator.fetch(
      keyPair.publicKey
    );
    console.log(test);
  });

  it("should add!", async () => {
    const greet: string = "Amazing WOrldd";
    await program.methods
      .add(new anchor.BN(1), new anchor.BN(1))
      .accounts({
        calculator: keyPair.publicKey,
      })
      .rpc();

    const test = await program.account.calculator.fetch(
      keyPair.publicKey
    );

    console.log(test);
  });

  it("should subtract!", async () => {
    await program.methods
      .subtract(new anchor.BN(5), new anchor.BN(2))
      .accounts({
        calculator: keyPair.publicKey,
      })
      .rpc();

    const test = await program.account.calculator.fetch(
      keyPair.publicKey
    );

    console.log(test);
  });

  it("should multiply!", async () => {
    await program.methods
      .multiply(new anchor.BN(3), new anchor.BN(2))
      .accounts({
        calculator: keyPair.publicKey,
      })
      .rpc();

    const test = await program.account.calculator.fetch(
      keyPair.publicKey
    );

    console.log(test);
  });

  it("should divide!", async () => {
    await program.methods
      .divide(new anchor.BN(8), new anchor.BN(2))
      .accounts({
        calculator: keyPair.publicKey,
      })
      .rpc();

    const test = await program.account.calculator.fetch(
      keyPair.publicKey
    );

    console.log(test);
  });

});