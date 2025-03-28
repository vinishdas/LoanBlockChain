import { useState } from "react";
import axios from "axios";

function App() {
  const [stream, setStream] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [colAddress, setColAddress] = useState("");
  const [yrStart, setYrStart] = useState("");
  const [yrEnd, setYrEnd] = useState("");
  const [loanStatus, setLoanStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success"); // "success" or "error"

  const studentAddress = "0xd84E1Ee2A977AcCFE2C0C12748a76AE084275724"; // Hardcoded for now change

  // 🔹 Show Tailwind Notification (Success or Error)
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  // 🔹 Apply for Loan
  const applyForLoan = async () => {
    try {
      await axios.post("http://localhost:3001/apply-loan", {
        college: colAddress,
        bank: bankAddress,
        course: stream,
        yr_start: parseInt(yrStart),
        yr_end: parseInt(yrEnd),
      });

      showMessage("✅ Loan Requested Successfully!", "success");
    } catch (err) {
      showMessage(err.response?.data?.error || "Error applying for loan", "error");
    }
  };

  // 🔹 Check Loan Status
  const checkLoanStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/get-loan-details?student=${studentAddress}`);
      let statusMessage = "";

      switch (res.data.status) {
        case "student_apply":
          statusMessage = "Pending College Approval";
          break;
        case "college_verified":
          statusMessage = "Pending Bank Approval";
          break;
        case "loan_verified":
          statusMessage = "✅ Loan Approved!";
          break;
        default:
          statusMessage = "Unknown Status";
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">🎓 Student Loan Application</h1>

      {/* 🔹 Tailwind Notification Message */}
      {message && (
        <div
          className={`mt-4 px-4 py-2 rounded text-center text-white ${
            messageType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}

      {/* 🔹 Loan Application Form */}
      <div className="flex flex-col mt-5 space-y-3 bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <input
          type="text"
          placeholder="Enter Stream"
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          value={stream}
          onChange={(e) => setStream(e.target.value)}
        />
         
         <input
          type="text"
          placeholder="Enter College Address"
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          value={colAddress}
          onChange={(e) => setColAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Bank Address"
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          value={bankAddress}
          onChange={(e) => setBankAddress(e.target.value)}
        />

        <input
          type="number"
          placeholder="Year Start"
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          value={yrStart}
          onChange={(e) => setYrStart(e.target.value)}
        />

        <input
          type="number"
          placeholder="Year End"
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          value={yrEnd}
          onChange={(e) => setYrEnd(e.target.value)}
        />

        <button
          onClick={applyForLoan}
          className="bg-blue-600 text-white px-6 py-2 mt-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Apply for Loan
        </button>
      </div>

      <button
        onClick={checkLoanStatus}
        className="bg-green-600 text-white px-6 py-2 mt-5 rounded-lg hover:bg-green-700 transition duration-300"
      >
        Check Loan Status
      </button>

      {/* 🔹 Display Loan Details */}
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
    </div>
  );
}

export default App;
