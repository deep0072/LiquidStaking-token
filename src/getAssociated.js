import { getAssociatedTokenAddress, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";



async function checkATA() {
    const connection = new Connection("https://devnet.helius-rpc.com/?api-key=f9f072ab-7fd3-4b65-9ae7-6574bab7a666");;
    
    // Your wallet and token addresses
    const walletAddress = "7K5mRe8gHK4fX59HUFph6mD1z8oLroAGZpscoxqT6ZNa";
    const mintAddress = "9iPJqjK6Xgz3aaQAppyUUnk78GvGT2sMtsGNrn6RTjQR";
    
    // Token-2022 Program ID
    const TOKEN_2022_PROGRAM_ID = new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');

    // Get your ATA address
    const ataAddress = await getAssociatedTokenAddress(
        new PublicKey(mintAddress),
        new PublicKey(walletAddress),
        false,
        TOKEN_2022_PROGRAM_ID
    );

    console.log(ataAddress, "ataAddress")
    // Check the account info
    const accountInfo = await connection.getAccountInfo(ataAddress);
    
    if (accountInfo !== null) {
        console.log("ATA exists:", ataAddress.toString());
        console.log("ATA exists:", ataAddress.toString());
        console.log("ATA balance exists in your wallet");
    } else {
        console.log("ATA does not exist");
    }
}

checkATA();