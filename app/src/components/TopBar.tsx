import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styled from "styled-components";

const StyledTopBar = styled.header`
    position: sticky;
    top: 0px;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding: 0rem 1.5rem;
    color: white;
    background: #222222;
`

const Title = styled.a`
    font-weight: 600;
    font-size: 1.5rem;
`

export const TopBar = () => (
    <StyledTopBar>
        <Title>Solana Blog</Title>
        <WalletMultiButton/>
    </StyledTopBar>
)