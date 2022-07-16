mod blog;

use blog::*;

use anchor_lang::prelude::*;

declare_id!("8vn9kdHuybwnWiwQDc16XKjUvsvKxwmjA53uKAtXTbpk");

#[program]
pub mod solana_blog_dapp {
    use std::str::from_utf8;

    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // Get blog_account from the context
        let blog_account = &mut ctx.accounts.blog_account;
        // Assign the author property
        blog_account.author = *ctx.accounts.signer.key;

        Ok(())
    }

    pub fn make_post(ctx: Context<MakePost>, new_post: Vec<u8>) -> Result<()> {
        let post = from_utf8(&new_post).map_err(|err| {
            msg!("Invalid UTF-8, from byte {}", err.valid_up_to());
            ProgramError::InvalidInstructionData
        }).unwrap();
        msg!(post);

        let blog_account = &mut ctx.accounts.blog_account;
        blog_account.latest_post = new_post;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8)]
    pub blog_account: Account<'info, BlogAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MakePost<'info> {
    #[account(mut, has_one = author)]
    pub blog_account: Account<'info, BlogAccount>,
    pub author: Signer<'info>,
}