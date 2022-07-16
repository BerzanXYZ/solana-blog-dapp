import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaBlogDapp } from "../target/types/solana_blog_dapp";

describe("solana-blog-dapp", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaBlogDapp as Program<SolanaBlogDapp>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
