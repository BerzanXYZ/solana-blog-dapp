use anchor_lang::prelude::*;

#[account]
pub struct BlogAccount {
    // Space in bytes is 8 + 32 + 36 + 36 + 1024
    pub author: Pubkey,
    pub author_name: String,
    pub blog_name: String,
    pub latest_post: Vec<u8>,
}