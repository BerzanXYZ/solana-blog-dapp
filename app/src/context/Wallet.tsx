import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { ReactNode, useMemo } from "react";

export default function Wallet({ children }: { children: ReactNode }) {
    // Network can be set Devnet, Testnet, and Mainnet
    const network = WalletAdapterNetwork.Devnet;

    // Endpoint can also be set a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network])

    // You can support any wallet you want
    // But keep in mind more wallets mean slow pages
    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
    ], [network])


    // Return the Context Providers
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}