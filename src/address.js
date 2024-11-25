import { config } from "dotenv"; //
import { PublicKey } from "@solana/web3.js";
import path from "path"; // Import path module
import { fileURLToPath } from "url"; // Import fileURLToPath to get the current file path

// Get the directory name from the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use absolute path to the .env file
config({ path: path.resolve(__dirname, "../.env") });

export const PRIVATE_KEY = process.env.MY_KEY;
export const RPC_URL = process.env.RPC_URL;

export const TOKEN_MINT = new PublicKey(
  "9iPJqjK6Xgz3aaQAppyUUnk78GvGT2sMtsGNrn6RTjQR"
);
