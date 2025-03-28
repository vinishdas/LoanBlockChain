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

const StudentDashboard = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    navigate("/"); // Redirects to login
  };

  const [loanStatus, setLoanStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const studentAddress = "0x8EB8d8CE42742D481eA21a4f43B7Ba098BB95465";

  const checkLoanStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/get-loan-details?student=${studentAddress}`);
      const [statusMessage,SetstausMessage] =  useState("");

      switch (res.data.status) {
        case "student_apply":
          SetstausMessage("Pending College Approval");
          break;
        case "college_verified":
          SetstausMessage("Pending Bank Approval");
          break;
        case "loan_verified":
          SetstausMessage("✅ Loan Approved!");
          break;
        default:
          SetstausMessage("Unknown Status");
      }

      setLoanStatus({
        ...res.data,
        statusMessage: statusMessage,
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
        <HeroSection User="Student"></HeroSection>


        {!loanStatus && <button className="bg-[#02C39A] p-6 rounded-xl transition-all ease-in hover:shadow-lg hover:-translate-1.5  active:brightness-125  " onClick={checkLoanStatus}>Check Status</button> }
        {loanStatus && (
        <div className="mt-5 bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold text-center">📜 Loan Details</h2>
          <div className="mt-3 text-left">
            <p className="border-b border-gray-700 py-1">
              <b>Status:</b> <span className="text-yellow-400">{loanStatus.statusMessage}</span>
            </p>
            <p className="border-b border-gray-700 py-1">
              <b>Stream:</b> {loanStatus.course}
            </p>
            <p className="border-b border-gray-700 py-1">
              <b>Bank:</b> {loanStatus.bank}
            </p>
            <p className="border-b border-gray-700 py-1">
              <b>Year Start:</b> {loanStatus.yr_start}
            </p>
            <p className="py-1">
              <b>Year End:</b> {loanStatus.yr_end}
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

        <div id="Loanform" className="mt-30 mb-30">
          <LoanApplication></LoanApplication>
        </div>
        <div id="Loancal">
          <LoanCalculator></LoanCalculator>
        </div>
      </ClickSpark>
    </>
  );
};

export default StudentDashboard;
