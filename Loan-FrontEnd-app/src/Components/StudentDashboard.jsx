// src/components/StudentDashboard.jsx
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import ScrollVelocity from "./ScrollVelocity/ScrollVelocity";
import HeroSection from "./HeroSection";
import LoanApplication from "./LoanApplication";
import ClickSpark from "./ClickSpark/ClickSpark";
import MagnetLines from "./MagnetLines/MagnetLines";
import LoanCalculator from "./LoanCalculator";
import { useState } from "react";
import axios from "axios"; // ✅ Added missing axios import

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirects to login
  };

  const [loanStatus, setLoanStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const [statusMessage, setStatusMessage] = useState(""); // ✅ Corrected status message state

  const studentAddress = "0x8EB8d8CE42742D481eA21a4f43B7Ba098BB95465";

  const checkLoanStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/get-loan-details?student=${studentAddress}`
      );

      // ✅ Fixed incorrect useState inside function
      let newStatusMessage = "";
      switch (res.data.status) {
        case "student_apply":
          newStatusMessage = "Pending College Approval";
          break;
        case "college_verified":
          newStatusMessage = "Pending Bank Approval";
          break;
        case "loan_verified":
          newStatusMessage = "✅ Loan Approved!";
          break;
        default:
          newStatusMessage = "Unknown Status";
      }

      setStatusMessage(newStatusMessage); // ✅ Updated correctly

      setLoanStatus({
        ...res.data,
        statusMessage: newStatusMessage, // ✅ Uses updated state correctly
      });

      showMessage("✅ Loan Status Updated!", "success");
    } catch (err) {
      showMessage(err.response?.data?.error || "Error fetching loan details", "error");
    }
  };

  return (
    <>
      <Navbar Application={true} />
      <ClickSpark
        sparkColor="#02C39A"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <HeroSection User="Student" />

        {!loanStatus && (
          <button
            className="bg-[#02C39A] p-6 rounded-xl transition-all ease-in hover:shadow-lg hover:-translate-1.5  active:brightness-125"
            onClick={checkLoanStatus}
          >
            Check Status
          </button>
        )}
        {loanStatus && (
          <div className="m-auto w-96 bg-gray-800 p-6 rounded-xl shadow-lg transition-all ease-in hover:shadow-xl hover:scale-105">
          <h2 className="text-2xl font-bold text-center text-white mb-4">📜 Loan Details</h2>
          <div className="space-y-3 text-gray-300">
            <p className="border-b border-gray-700 pb-2">
              <b className="text-white">Status:</b> <span className="text-yellow-400">{loanStatus.statusMessage}</span>
            </p>
            <p className="border-b border-gray-700 pb-2">
              <b className="text-white">Stream:</b> {loanStatus.course}
            </p>
            <p className="border-b border-gray-700 pb-2">
              <b className="text-white">Bank:</b> {loanStatus.bank}
            </p>
            <p className="border-b border-gray-700 pb-2">
              <b className="text-white">Year Start:</b> {loanStatus.yr_start}
            </p>
            <p className="pb-2">
              <b className="text-white">Year End:</b> {loanStatus.yr_end}
            </p>
          </div>
        </div>
        
        )}

        <div className="m-20">
          <MagnetLines
            rows={9}
            columns={9}
            containerSize="60vmin"
            lineColor="#02C39A"
            lineWidth="0.8vmin"
            lineHeight="5vmin"
            baseAngle={0}
            style={{ margin: "2rem auto" }}
          />
        </div>

        <div  id="Loanform" className="mt-30 mb-30">
          <LoanApplication />
        </div>
        <div id="Loancal">
          <LoanCalculator />
        </div>
      </ClickSpark>
    </>
  );
};

export default StudentDashboard;
