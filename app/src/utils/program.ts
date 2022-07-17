import { Program, Wallet, AnchorProvider } from "@project-serum/anchor";
import { PublicKey, SystemProgram, Connection, ConfirmOptions } from "@solana/web3.js";
import { getBlogAccount } from "./blogAccount";
import {IDL, type SolanaBlogDapp} from "./solana-blog-dapp"


export function getProgram(wallet: Wallet, connection: Connection) {
    const provider = new AnchorProvider(connection, wallet, 'confirmed' as ConfirmOptions)
    const programId = new PublicKey('8vn9kdHuybwnWiwQDc16XKjUvsvKxwmjA53uKAtXTbpk')
    return new Program(IDL, programId, provider)
}


export async function createBlogOnProgram(program: Program<SolanaBlogDapp>, author_name: string, blog_name: string, author: PublicKey) {
    // Get blog account from local storage
    const blogAccount = getBlogAccount()
    // Make a tx to create a blog
    const tx = await program.methods.createBlog(author_name, blog_name)
    .accounts({
        blogAccount: blogAccount.publicKey,
        systemProgram: SystemProgram.programId,
        author: author,
    }).signers([blogAccount])
    .rpc()
    
    console.log(tx);
}

export async function makePostOnProgram(program: Program<SolanaBlogDapp>, new_post: string, author: PublicKey) {
    // Get blog account from local storage
    const blogAccount = getBlogAccount()
    // Convert string into utf8 encoded buffer
    const post_utf8_encoded = Buffer.from(new_post)

    // Make a tx to make a post
    const tx = await program.methods.makePost(post_utf8_encoded)
    .accounts({
        blogAccount: blogAccount.publicKey,
        author: author
    }).rpc()
    
    console.log(tx)
}