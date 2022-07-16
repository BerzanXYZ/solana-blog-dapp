use anchor_lang::prelude::*;

#[account]
pub struct BlogAccount {
    // Space is 8 + 32 + unknown
    pub author: Pubkey,
    pub latest_post: Vec<u8>,
}