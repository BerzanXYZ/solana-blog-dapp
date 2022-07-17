import Link from "next/link"
import styled from "styled-components"
import { useProgram } from "../context/ProgramProvider"
import { BlogAccount } from "../utils/program"

const JumpToIndex = styled.button`
    position: fixed;
    bottom: 10px;
    right: 10px;
    height: 50px;
    padding: 0px 18px;
    border-radius: 10px;
    border: none;
    background-color: #444444;
    color: white;
    box-shadow: 0 0 1rem #00000060;
    font-size: 1rem;
    font-weight: 600;
    transition-duration: 200ms;
    cursor: pointer;
    &:hover {
        background-color: #505050;
    }
`

const BlogList = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    color: white;
`

const BlogDiv = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 14px;
    background-color: #282828;
    row-gap: 1rem;
`

const BlogName = styled.h2`
    font-weight: 600;
    font-size: 1.375rem;
`

const BlogAuthorDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    row-gap: 1rem;
    justify-content: space-between;
`

const BlogAuthorName = styled.h3`
    font-weight: 600;
    font-size: 1.25rem;
    color: #222222;
    padding: 6px;
    border-radius: 6px;
    background-color: #9945FF;
`

const BlogAuthor = styled.p`
    font-weight: 600;
    font-size: 0.625rem;
    color: hsl(267, 100%, 75%);
    padding: 6px;
    border-radius: 6px;
    background-color: #333333;
`

const BlogLatestPost = styled.p`
    font-weight: 600;
    font-size: 1rem;
    filter: opacity(0.7);
    padding: 14px;
    border-radius: 10px;
    background-color: #333333;
`

const BlogDonateDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    row-gap: 0.75rem;
    column-gap: 1rem;
`

const Button = styled.button`
    border: none;
    font-weight: 600;
    font-size: 0.75rem;
    padding: 2px 8px;
    border-radius: 8px;
    color: white;
    background-color: #505050;
    cursor: pointer;
    transition-duration: 200ms;
    &:hover {
        color: black;
        background-color: rgba(20,241,149,1);
    }
`

const Blog = ({ blog }: {blog: BlogAccount}) => {
    const { donate } = useProgram()

    return (
        <BlogDiv>
            <BlogName>{blog.blogName}</BlogName>
            <BlogLatestPost>{blog.latestPost.toString() || 'No content yet!'}</BlogLatestPost>
            <BlogAuthorDiv>
                <BlogDonateDiv>
                    <BlogAuthor>{blog.author.toBase58()}</BlogAuthor>
                    <Button onClick={() => donate(blog.author)}>Donate</Button>
                </BlogDonateDiv>
                <BlogAuthorName>{blog.authorName}</BlogAuthorName>
            </BlogAuthorDiv>
        </BlogDiv>
    )
}

export const AllBlogs = () => {
    const { blogs } = useProgram()
    return (
        <>
            <BlogList>
                {blogs.map((blog, i)=> <Blog key={i+100} blog={blog}/>)}
            </BlogList>
            <Link href='/'><JumpToIndex>Make a Post</JumpToIndex></Link>
        </>
    )
}