import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaBlogDapp } from "../target/types/solana_blog_dapp";

describe("solana-blog-dapp", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaBlogDapp as Program<SolanaBlogDapp>;
  
  // Create a new keypair to use as a blog account
  const kp = anchor.web3.Keypair.generate()

  it("Can create a Blog Account!", async () => {
    // Create a new Blog Account
    await program.methods.createBlog('Berzan', 'How nice Solana is').accounts({
      blogAccount: kp.publicKey,
      author: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([kp]).rpc();

  });


  it("Can make a post!", async () => {
    // Make a post
    await program.methods.makePost(Buffer.from("Solana has the best UX and DX in the crypto world!")).accounts({
      author: provider.wallet.publicKey,
      blogAccount: kp.publicKey,
    }).rpc()

    // Fetch blog account
    const account = await program.account.blogAccount.fetch(kp.publicKey)
    // Print data
    console.log(`
    Blog Name: ${account.blogName}
    Latest Post: ${(account.latestPost as Buffer).toString()}
    Author: ${account.authorName}
    Author Address: ${account.author.toBase58()}
    `)
  })
});
