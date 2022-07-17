import { Program, Wallet } from "@project-serum/anchor";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { getProgram, createBlogOnProgram, makePostOnProgram, getAccountsOnProgram, BlogAccount } from "../utils/program";
import { SolanaBlogDapp } from "../utils/solana-blog-dapp";

interface ProgramContextState {
    createBlog(author: string, blog: string): Promise<void>,
    makePost(post: string): Promise<void>,
    donate(pk: PublicKey): Promise<void>,
    blogs: BlogAccount[],
}

const ProgramContext = createContext({} as ProgramContextState)

export function useProgram() {
    return useContext(ProgramContext)
}

export const ProgramProvider = ({ children }: { children: ReactNode }) => {
    const [blogs, setBlogs] = useState<BlogAccount[]>([])
    const wallet = useWallet()
    const anchorWallet = useAnchorWallet()
    const { connection } = useConnection()
    const program = useRef({} as Program<SolanaBlogDapp>)

    useEffect(() => {
        if(!anchorWallet) return
        program.current = getProgram(anchorWallet as unknown as Wallet ,connection)
    }, [connection, anchorWallet])

    async function createBlog(authorName: string, blogName: string) {
        if(!wallet.publicKey) return
        await createBlogOnProgram(program.current, authorName, blogName, wallet.publicKey)
    }

    async function makePost(post: string) {
        if(!wallet.publicKey) return
        await makePostOnProgram(program.current, post, wallet.publicKey)
    }

    async function getBlogs() {
        if(!wallet.publicKey) return
        setBlogs(await getAccountsOnProgram(program.current))
    }

    async function donate(pk: PublicKey) {
        if(!wallet.publicKey) return
        const tx = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: pk,
                lamports: 1e7,
            }
        ))
        const sig = await wallet.sendTransaction(tx, connection)
        const blockHash = await connection.getLatestBlockhash()
        await connection.confirmTransaction({
            blockhash: blockHash.blockhash,
            lastValidBlockHeight: blockHash.lastValidBlockHeight,
            signature: sig,
        })

    }

    useEffect(() => {
        if(!wallet.publicKey) return
        getBlogs()
    }, [wallet.publicKey])

    return (
        <ProgramContext.Provider value={{createBlog, makePost, donate, blogs}}>
            {children}
        </ProgramContext.Provider>
    )
}