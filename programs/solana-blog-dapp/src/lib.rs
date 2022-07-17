mod blog;

use blog::*;

use anchor_lang::prelude::*;

declare_id!("8vn9kdHuybwnWiwQDc16XKjUvsvKxwmjA53uKAtXTbpk");

#[program]
pub mod solana_blog_dapp {
    use std::str::from_utf8;

    use super::*;

    pub fn create_blog(ctx: Context<CreateBlog>, author_name: String ,blog_name: String) -> Result<()> {
        // Get blog_account from the context
        let blog_account = &mut ctx.accounts.blog_account;

        // Assign the author property
        blog_account.author = *ctx.accounts.author.key;

        // Assign the author_name property
        blog_account.author_name = author_name;

        // Assign the blog_name property
        blog_account.blog_name = blog_name;


        Ok(())
    }

    pub fn make_post(ctx: Context<MakePost>, new_post: Vec<u8>) -> Result<()> {
        // Decode new_post
        let post = from_utf8(&new_post).map_err(|err| {
            msg!("Invalid UTF-8, from byte {}", err.valid_up_to());
            ProgramError::InvalidInstructionData
        }).unwrap();

        // Print post to the log
        msg!(post);

        // Get blog_account from the context
        let blog_account = &mut ctx.accounts.blog_account;

        // Assign latest_post property
        blog_account.latest_post = new_post;


        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateBlog<'info> {
    #[account(init, payer = author, space = 8 + 32 + 36 + 36 + 1024)]
    pub blog_account: Account<'info, BlogAccount>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MakePost<'info> {
    #[account(mut, has_one = author)]
    pub blog_account: Account<'info, BlogAccount>,
    #[account(mut)]
    pub author: Signer<'info>,
}