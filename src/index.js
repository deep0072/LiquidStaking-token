import express from "express";
import { sendLstToken } from "./mintTokens.js";
const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

const HELIUS_RESPONSE = {
  nativeTransfers: [
    {
      amount: 100,
      fromUserAccount: "DjmQEq3xvmCQ1zCaucA6YN4cua6HpXVnSgD33K4yUhU8",
      toUserAccount: "7K5mRe8gHK4fX59HUFph6mD1z8oLroAGZpscoxqT6ZNa",
    },
  ],
};
const VAULT = "7K5mRe8gHK4fX59HUFph6mD1z8oLroAGZpscoxqT6ZNa";
app.post("/helius", async (req, res) => {
  const incomingTx = HELIUS_RESPONSE.nativeTransfers.find(
    (x) => x.toUserAccount === VAULT
  );
  if (!incomingTx) {
    res.json({ message: "processed" });
  }
  const fromAddress = incomingTx.fromUserAccount;
  const toAddress = VAULT;
  const amount = incomingTx.amount;
  const type = "received_native_sol";
  console.log(fromAddress, "incomingTx");
  await sendLstToken(fromAddress, amount);

  // if (type === "received_native_sol") {

  // } else {
  //   await burnTokens(fromAddress, toAddress, amount);
  //   await sendNativeTokens(fromAddress, toAddress, amount);
  // }

  res.send("Transaction Successfull");
});
app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
