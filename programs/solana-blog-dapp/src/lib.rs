mod blog;

use blog::*;

use anchor_lang::prelude::*;

declare_id!("8vn9kdHuybwnWiwQDc16XKjUvsvKxwmjA53uKAtXTbpk");

#[program]
pub mod solana_blog_dapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // Get blog_account from the context
        let blog_account = &mut ctx.accounts.blog_account;
        // Assign the author property
        blog_account.author = *ctx.accounts.signer.key;

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
