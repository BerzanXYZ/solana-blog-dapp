import { Program, Wallet } from "@project-serum/anchor";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getProgram, createBlogOnProgram, makePostOnProgram } from "../utils/program";
import { SolanaBlogDapp } from "../utils/solana-blog-dapp";

interface ProgramContextState {
    createBlog(author: string, blog: string): Promise<void>,
    makePost(post: string): Promise<void>,
}

const ProgramContext = createContext({} as ProgramContextState)

export function useProgram() {
    return useContext(ProgramContext)
}

export const ProgramProvider = ({ children }: { children: ReactNode }) => {
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

    return (
        <ProgramContext.Provider value={{createBlog, makePost}}>
            {children}
        </ProgramContext.Provider>
    )
}