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

// 🔹 Wallets for different roles
const studentWallet = new ethers.Wallet(process.env.STUDENT_PRIVATE_KEY, provider);
const collegeWallet = new ethers.Wallet(process.env.COLLEGE_PRIVATE_KEY, provider);
const bankWallet = new ethers.Wallet(process.env.BANK_PRIVATE_KEY, provider);

// 🔹 Contract instances
const studentContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, studentWallet);
const collegeContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, collegeWallet);
const bankContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, bankWallet);

// 🔹 Apply for Loan
app.post("/apply-loan", async (req, res) => {
    try {
        const { college, bank, course, yr_start, yr_end } = req.body;
        const tx = await studentContract.applyForLoan(college, bank, course, yr_start, yr_end);
        await tx.wait();
        res.json({ message: "✅ Loan Requested Successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Get Loan Details
app.get("/get-loan-details", async (req, res) => {
    try {
        let { student } = req.query;
        student = student.trim();

        const loanDetails = await studentContract.getLoanDetails(student);

        const formattedDetails = {
            id: loanDetails.id ? loanDetails.id.toString() : "0",
            student: loanDetails.student,
            college: loanDetails.college,
            bank: loanDetails.bank,
            course: loanDetails.course,
            yr_start: loanDetails.yr_start ? Number(loanDetails.yr_start) : 0,
            yr_end: loanDetails.yr_end ? Number(loanDetails.yr_end) : 0,
            status: loanDetails.status,
            timestamp: loanDetails.timestamp ? loanDetails.timestamp.toString() : "0"
        };

        res.json(formattedDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Verify Loan
app.post("/verify-loan", async (req, res) => {
    try {
        const { student, college, bank } = req.body;
        const tx = await collegeContract.verifyLoanByCollege(student, college, bank);
        await tx.wait();
        res.json({ message: "✅ Loan Verified by College!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Approve Loan
app.post("/approve-loan", async (req, res) => {
    try {
        const { student, college } = req.body;
        const tx = await bankContract.approveLoanByBank(student, college);
        await tx.wait();
        res.json({ message: "✅ Loan Approved by Bank!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Backend Running on Port ${PORT}`));
