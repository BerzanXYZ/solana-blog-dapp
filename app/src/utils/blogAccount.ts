import { Keypair } from "@solana/web3.js";

export function createNewBlogAccount() {
    const ba = Keypair.generate()
    const secretKeyHex = Array.from(ba.secretKey)
        .map(i => i.toString(16).padStart(2, "0"))
        .join("")
    localStorage.setItem('blogAccount', secretKeyHex)
    return ba
}

export function getBlogAccount() {
    const localSecretKeyHex = localStorage.getItem('blogAccount')

    if(!localSecretKeyHex) return createNewBlogAccount()

    const secretKey = Uint8Array.from(
        Buffer.from(localSecretKeyHex, 'hex')
    )

    return Keypair.fromSecretKey(secretKey)
}