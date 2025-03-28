import express from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Load ABI from JSON file
const contractABI = JSON.parse(fs.readFileSync("contractABI.json"));

// 🔹 Connect to Infura (Sepolia)
const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
const wallet = new ethers.Wallet(process.env.COLLEGE_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

// 🔹 Verify Loan
app.post("/verify-loan", async (req, res) => {
    try {
        const { student, college, bank } = req.body;
        const tx = await contract.verifyLoanByCollege(student, college, bank);
        await tx.wait();
        res.json({ message: "✅ Loan Verified by College!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3002, () => console.log("🚀 College Backend Running on Port 3002"));
 
