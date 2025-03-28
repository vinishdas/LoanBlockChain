// src/App.jsx
import { useState } from "react";
import axios from "axios";

function App() {
  const [student, setStudent] = useState("");
  const [college, setCollege] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success"); // "success" or "error"

  // 🔹 Show Tailwind Notification (Success or Error)
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  // 🔹 Approve Loan
  const approveLoan = async () => {
    try {
      const res = await axios.post("http://localhost:3003/approve-loan", {
        student,
        college,
      });

      showMessage("✅ Loan Approved by Bank!", "success");
    } catch (err) {
      showMessage(err.response?.data?.error || "Error approving loan", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">🏦 Bank Loan Approval</h1>

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

      {/* 🔹 Loan Approval Form */}
      <div className="flex flex-col mt-5 space-y-3 bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <input
          type="text"
          placeholder="Enter Student Address"
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter College Address"
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />

        <button
          onClick={approveLoan}
          className="bg-blue-600 text-white px-6 py-2 mt-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Approve Loan
        </button>
      </div>
    </div>
  );
}

export default App;
