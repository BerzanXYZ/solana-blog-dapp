import Link from "next/link"
import styled from "styled-components"
import { useProgram } from "../context/ProgramProvider"
import { BlogAccount } from "../utils/program"

const JumpToIndex = styled.button`
    position: fixed;
    bottom: 10px;
    right: 10px;
    height: 30px;
    padding: 0px 15px;
    border-radius: 10px;
    border: none;
    background-color: white;
    box-shadow: 0 0 1rem #00000060;

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
    background-color: #222222;
    row-gap: 1rem;
`

const BlogName = styled.h2`
    font-weight: 600;
    font-size: 1.375rem;
`

const BlogAuthorDiv = styled.div`
    display: flex;
    align-items: flex-end;
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
    font-size: 0.75rem;
    color: hsl(267, 100%, 75%);
    padding: 6px;
    border-radius: 6px;
    background-color: #333333;
`

const BlogLatestPost = styled.p`
    font-weight: 700;
    font-size: 1rem;
    filter: opacity(0.7);
    padding: 14px;
    border-radius: 10px;
    background-color: #333333;
`

const Blog = ({ blog }: {blog: BlogAccount}) => (
    <BlogDiv>
        <BlogName>{blog.blogName}</BlogName>
        <BlogLatestPost>{blog.latestPost.toString() || 'No content yet!'}</BlogLatestPost>
        <BlogAuthorDiv>
            <BlogAuthor>{blog.author.toBase58()}</BlogAuthor>
            <BlogAuthorName>{blog.authorName}</BlogAuthorName>
        </BlogAuthorDiv>
    </BlogDiv>
)

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