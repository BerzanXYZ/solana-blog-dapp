import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaBlogDapp } from "../target/types/solana_blog_dapp";

describe("solana-blog-dapp", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaBlogDapp as Program<SolanaBlogDapp>;

  it("Can create a Blog Account!", async () => {
    // Create a new keypair to use as a blog account
    const kp = anchor.web3.Keypair.generate()

    // Create a new Blog Account
    await program.methods.createBlog().accounts({
      blogAccount: kp.publicKey,
      signer: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([kp]).rpc();

  });


  it("Can make a post!", async () => {
    // Create a new keypair to use as a blog account
    const kp = anchor.web3.Keypair.generate()

    // Create a new Blog Account
    await program.methods.createBlog().accounts({
      blogAccount: kp.publicKey,
      signer: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([kp]).rpc();

    // Make a post
    await program.methods.makePost(Buffer.from("Hello, blog!")).accounts({
      author: provider.wallet.publicKey,
      blogAccount: kp.publicKey,
    }).rpc()

    // Fetch blog account
    const account = await program.account.blogAccount.fetch(kp.publicKey)
    console.log('Author:', account.author.toBase58(), '\nPost:', (account.latestPost as Buffer).toString());
  })
});
