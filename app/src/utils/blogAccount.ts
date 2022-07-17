import { Keypair } from "@solana/web3.js";

export function createNewBlogAccount() {
    const ba = Keypair.generate()
    localStorage.setItem('blogAccount', ba.secretKey.toString())
    return ba
}

export function getBlogAccount() {
    const localSecretKey = localStorage.getItem('blogAccount')

    if(!localSecretKey) return createNewBlogAccount()

    const secretKey = new Uint8Array(
        localSecretKey.split("").map(c => c.charCodeAt(0))
    )

    return Keypair.fromSecretKey(secretKey)
}