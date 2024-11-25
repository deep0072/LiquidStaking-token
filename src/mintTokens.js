import {
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { PRIVATE_KEY, RPC_URL, TOKEN_MINT } from "./address.js";
import bs58 from "bs58";

console.log(RPC_URL);
const connection = new Connection(RPC_URL);

const privateKeyBuffer = bs58.decode(PRIVATE_KEY); // decode private key into uint8
const keyPair = Keypair.fromSecretKey(privateKeyBuffer);

export const sendLstToken = async (fromAddress, amount) => {
  // first create associated token account
  // for lst token

  const associatedToken = await getOrCreateAssociatedTokenAccount(
    connection, // connection
    keyPair, // fee payer
    new PublicKey(TOKEN_MINT), // mint
    new PublicKey(fromAddress), // owner
    false, // allowOwnerOffCurve
    "confirmed", // commitment
    undefined, // confirmOptions
    TOKEN_2022_PROGRAM_ID // programId
  );
  console.log(associatedToken, "associated token");
  // then mint token to ata
  await mintTo(
    connection,
    keyPair,
    TOKEN_MINT,
    associatedToken.address,
    keyPair.publicKey,
    amount,
    [],
    undefined,
    TOKEN_2022_PROGRAM_ID
  );
};
