import { Connection, Keypair, PublicKey } from "@solana/web3.js";

async function checkAccountType(address) {
  const connection = new Connection("https://api.devnet.solana.com");
  
  try {
    const accountInfo = await connection.getParsedAccountInfo(new PublicKey("Zddkv5QiM4Bq1o4HZHdvhxQuYHkLjzwUHxP5ZYLnAGB"));
    console.log(accountInfo, "accountinfo")
    
    if (!accountInfo.value) {
      console.log('Account not found');
      return;
    }
    
    const owner = accountInfo.value.owner.toBase58();
    
    if (owner === 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') { // Token Program ID
      console.log('This is a token account (possibly an ATA)');
    } else if (owner === 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb') { // Token Program 2022 ID
      console.log('This is a token account (possibly an ATA) using Token Extensions Program');
    } else if (owner === '11111111111111111111111111111111') { // System Program ID
      console.log('This is likely a mint account');
    } else {
      console.log('This is another type of account');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Usage
checkAccountType('YOUR_ADDRESS_HERE');