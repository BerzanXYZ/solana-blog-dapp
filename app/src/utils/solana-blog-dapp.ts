export type SolanaBlogDapp = {
  "version": "0.1.0",
  "name": "solana_blog_dapp",
  "instructions": [
    {
      "name": "createBlog",
      "accounts": [
        {
          "name": "blogAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "authorName",
          "type": "string"
        },
        {
          "name": "blogName",
          "type": "string"
        }
      ]
    },
    {
      "name": "makePost",
      "accounts": [
        {
          "name": "blogAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newPost",
          "type": "bytes"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "blogAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "publicKey"
          },
          {
            "name": "authorName",
            "type": "string"
          },
          {
            "name": "blogName",
            "type": "string"
          },
          {
            "name": "latestPost",
            "type": "bytes"
          }
        ]
      }
    }
  ]
};

export const IDL: SolanaBlogDapp = {
  "version": "0.1.0",
  "name": "solana_blog_dapp",
  "instructions": [
    {
      "name": "createBlog",
      "accounts": [
        {
          "name": "blogAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "authorName",
          "type": "string"
        },
        {
          "name": "blogName",
          "type": "string"
        }
      ]
    },
    {
      "name": "makePost",
      "accounts": [
        {
          "name": "blogAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newPost",
          "type": "bytes"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "blogAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "author",
            "type": "publicKey"
          },
          {
            "name": "authorName",
            "type": "string"
          },
          {
            "name": "blogName",
            "type": "string"
          },
          {
            "name": "latestPost",
            "type": "bytes"
          }
        ]
      }
    }
  ]
};
