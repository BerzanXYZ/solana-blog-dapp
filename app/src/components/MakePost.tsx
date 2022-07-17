import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { useProgram } from "../context/ProgramProvider";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`

const Div = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    box-shadow: 0 0 1rem #00000060;
    border-radius: 10px;
    padding: 1.5rem;
    color: white;
    border: 1px solid #444444;
    background-color: #222222;
`

const TextArea = styled.textarea`
    font-size: 1.25rem;
    outline: none;
    background-color: #333333;
    color: #bbb;
    box-shadow: inset 0 0 1rem #00000060;
    border: 1px solid #444444;
    border-radius: 10px;
    height: 300px;
    padding: 10px;
    transition-duration: 200ms;
    &:hover {
        background-color: #3b3b3b;
    }
    &:focus {
        color: white;
    }
    resize: none;
`


const H2 = styled.h2`
    font-weight: 600;
    font-size: 1.375rem;
`

const Button = styled.button`
    margin-top: 1.5rem;
    width: 100%;
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

export const MakePost = () => {
    const [post, setPost] = useState('')
    const program = useProgram()
    const { publicKey } = useWallet()

    async function makePost() {
        if(!(post && publicKey)) {
            alert('Post cannot be empty')
            return
        }
        program.makePost(post).then(() => {
            alert('You have successfully made a post!')
            setPost('')
        })
    }

    return(
        <Wrapper>
            <Div style={{rowGap: '0rem'}}>
                <H2>See others Blogs</H2>
                <Link href="/blogs"><Button>Go to see the Blogs</Button></Link>
            </Div>
            <Div>
                <H2>Post on your Blog</H2>
                <TextArea value={post} onChange={e=>setPost(e.target.value)}/>
                <Button onClick={makePost}>Make Post</Button>
            </Div>
        </Wrapper>
    )
}