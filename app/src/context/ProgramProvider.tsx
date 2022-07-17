import { Wallet } from "@project-serum/anchor";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { getProgram, createBlogOnProgram, makePostOnProgram } from "../utils/program";

interface ProgramContextState {
    createBlog(author: string, blog: string): Promise<void>,
    makePost(post: string): Promise<void>,
}

const ProgramContext = createContext({} as ProgramContextState)

export function useProgram() {
    return useContext(ProgramContext)
}

export const ProgramProvider = ({ children }: { children: ReactNode }) => {
    const { publicKey } = useWallet()
    const { connection } = useConnection()
    const program = useMemo(() => getProgram(connection), [connection])

    async function createBlog(authorName: string, blogName: string) {
        if(!publicKey) return
        await createBlogOnProgram(program, authorName, blogName, publicKey)
    }

    async function makePost(post: string) {
        if(!publicKey) return
        await makePostOnProgram(program, post, publicKey)
    }

    return (
        <ProgramContext.Provider value={{createBlog, makePost}}>
            {children}
        </ProgramContext.Provider>
    )
}