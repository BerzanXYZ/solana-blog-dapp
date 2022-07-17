import { useWallet } from "@solana/wallet-adapter-react";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { useProgram } from "../context/ProgramProvider";

const Div = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 1rem #00000060;
    border-radius: 10px;
    padding: 1.5rem;
    color: white;
    border: 1px solid #444444;
    background-color: #222222;
`

const Input = styled.input`
    font-size: 1.25rem;
    outline: none;
    background-color: #333333;
    color: #bbb;
    box-shadow: inset 0 0 1rem #00000060;
    border: 1px solid #444444;
    border-radius: 10px;
    padding: 7px 10px;
    transition-duration: 200ms;
    &:hover {
        background-color: #3b3b3b;
    }
    &:focus {
        color: white;
    }
`
const H2 = styled.h2`
    font-weight: 600;
    font-size: 1.375rem;
`

const Button = styled.button`
    margin-top: 3rem;
    color: white;
    font-size: 1.125rem;
    font-weight: 600;
    background-color: hsl(267, 100%, 35%);
    box-shadow: 0 0 1rem #00000060;
    border: none;
    height: 40px;
    border-radius: 10px;
    padding: 0px 10px;
    transition-duration: 200ms;
    cursor: pointer;
    &:hover {
        background-color: hsl(267, 100%, 40%);
    }
`

export const CreateBlog = ({ onSubmit }: { onSubmit: Dispatch<SetStateAction<boolean>> }) => {
    const [blogName, setBlogName] = useState('')
    const [authorName, setAuthorName] = useState('')
    const program = useProgram()
    const { publicKey } = useWallet()

    async function createBlog() {
        if(!(blogName && authorName && publicKey)) {
            alert('Inputs cannot be empty!')
            return
        }
        await program.createBlog(authorName, blogName).then(() => onSubmit(true))
    }

    return (
        <Div>
            <H2>Blog Name</H2>
            <Input onChange={e=>setBlogName(e.target.value)}/>
            <H2>Author</H2>
            <Input onChange={e=>setAuthorName(e.target.value)}/>
            <Button onClick={createBlog}>Create Blog</Button>
        </Div>
    )
}