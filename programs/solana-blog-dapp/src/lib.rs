use anchor_lang::prelude::*;

declare_id!("8vn9kdHuybwnWiwQDc16XKjUvsvKxwmjA53uKAtXTbpk");

#[program]
pub mod solana_blog_dapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
