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
const wallet = new ethers.Wallet(process.env.STUDENT_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

// 🔹 Apply for Loan
app.post("/apply-loan", async (req, res) => {
    try {
        const { college, bank, course, yr_start, yr_end } = req.body;
        const tx = await contract.applyForLoan(college, bank, course, yr_start, yr_end);
        await tx.wait();
        res.json({ message: "✅ Loan Requested Successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get("/get-loan-details", async (req, res) => {
    try {
        let { student } = req.query;
        student = student.trim(); // 🔹 Trim spaces/newlines

        const loanDetails = await contract.getLoanDetails(student);

        // 🔹 Convert all BigInt values to strings or numbers
        const formattedDetails = {
            id: loanDetails.id ? loanDetails.id.toString() : "0",
            student: loanDetails.student,
            college: loanDetails.college,
            bank: loanDetails.bank,
            course: loanDetails.course,
            yr_start: loanDetails.yr_start ? Number(loanDetails.yr_start) : 0, // Convert to Number
            yr_end: loanDetails.yr_end ? Number(loanDetails.yr_end) : 0, // Convert to Number
            status: loanDetails.status,
            timestamp: loanDetails.timestamp ? loanDetails.timestamp.toString() : "0"
        };

        res.json(formattedDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(3001, () => console.log("🚀 Student Backend Running on Port 3001"));
