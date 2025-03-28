// src/App.jsx
import { useState } from "react";
import axios from "axios";

function College() {
  const [student, setStudent] = useState("");
  const [college, setCollege] = useState("");
  const [bank, setBank] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success"); // "success" or "error"

  // 🔹 Show Tailwind Notification (Success or Error)
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  // 🔹 Verify Loan
  const verifyLoan = async () => {
    try {
      const res = await axios.post("http://localhost:3002/verify-loan", {
        student,
        college,
        bank,
      });

      showMessage("✅ Loan Verified by College!", "success");
    } catch (err) {
      showMessage(err.response?.data?.error || "Error verifying loan", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">🎓 College Loan Verification</h1>

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

      {/* 🔹 Loan Verification Form */}
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

        <input
          type="text"
          placeholder="Enter Bank Address"
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
        />

        <button
          onClick={verifyLoan}
          className="bg-blue-600 text-white px-6 py-2 mt-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Verify Loan
        </button>
      </div>
    </div>
  );
}

export default College;


// // src/App.jsx
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Web3 from "web3";

// function College() {
//   const [student, setStudent] = useState("");
//   const [college, setCollege] = useState("");
//   const [bank, setBank] = useState("");
//   const [loanDetails, setLoanDetails] = useState(null);  // Store loan details from the event
//   const [message, setMessage] = useState(null);
//   const [messageType, setMessageType] = useState("success"); // "success" or "error"

//   // Web3 setup
//   const web3 = new Web3(window.ethereum);
//   const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
//   const contractABI = [ /* Your contract ABI here */ ];
//   const contract = new web3.eth.Contract(contractABI, contractAddress);

//   // 🔹 Show Tailwind Notification (Success or Error)
//   const showMessage = (text, type = "success") => {
//     setMessage(text);
//     setMessageType(type);
//     setTimeout(() => setMessage(null), 3000);
//   };

//   // 🔹 Verify Loan
//   const verifyLoan = async () => {
//     try {
//       const res = await axios.post("http://localhost:3002/verify-loan", {
//         student,
//         college,
//         bank,
//       });

//       showMessage("✅ Loan Verified by College!", "success");
//     } catch (err) {
//       showMessage(err.response?.data?.error || "Error verifying loan", "error");
//     }
//   };

//   // Listen for LoanRequested event (when a student applies for a loan)
//   useEffect(() => {
//     const listenForLoanApplication = () => {
//       contract.events.LoanRequested({
//         fromBlock: "latest",  // Listen for events from the latest block onwards
//       })
//       .on("data", (event) => {
//         // Extract loan application details from the event
//         const {
//           student: loanStudent,
//           loanID,
//           college: loanCollege,
//           bank: loanBank,
//           course,
//           yr_start,
//           yr_end,
//           status,
//         } = event.returnValues;

//         // Update the state with the loan application details
//         setLoanDetails({
//           student: loanStudent,
//           loanID,
//           college: loanCollege,
//           bank: loanBank,
//           course,
//           yr_start,
//           yr_end,
//           status,
//         });
//       })
//       .on("error", (error) => {
//         console.error("Error in event listener:", error);
//       });
//     };

//     listenForLoanApplication(); // Start listening for the event

//     return () => {
//       // Cleanup the event listener when the component unmounts
//       contract.events.LoanRequested().unsubscribe();
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
//       <h1 className="text-3xl font-bold mb-4">🎓 College Loan Verification</h1>

//       {/* 🔹 Tailwind Notification Message */}
//       {message && (
//         <div
//           className={`mt-4 px-4 py-2 rounded text-center text-white ${
//             messageType === "success" ? "bg-green-500" : "bg-red-500"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       {/* 🔹 Loan Details from Event */}
//       {loanDetails && (
//         <div className="mt-5 p-6 rounded-lg bg-gray-800 shadow-lg w-96">
//           <h3 className="text-xl font-semibold mb-3">Loan Application Details</h3>
//           <p><strong>Student Address:</strong> {loanDetails.student}</p>
//           <p><strong>Loan ID:</strong> {loanDetails.loanID}</p>
//           <p><strong>College Address:</strong> {loanDetails.college}</p>
//           <p><strong>Bank Address:</strong> {loanDetails.bank}</p>
//           <p><strong>Course:</strong> {loanDetails.course}</p>
//           <p><strong>Year Start:</strong> {loanDetails.yr_start}</p>
//           <p><strong>Year End:</strong> {loanDetails.yr_end}</p>
//           <p><strong>Status:</strong> {loanDetails.status}</p>
//         </div>
//       )}

//       {/* 🔹 Loan Verification Form */}
//       <div className="flex flex-col mt-5 space-y-3 bg-gray-800 p-6 rounded-lg shadow-lg w-96">
//         <input
//           type="text"
//           placeholder="Enter Student Address"
//           className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
//           value={student}
//           onChange={(e) => setStudent(e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Enter College Address"
//           className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
//           value={college}
//           onChange={(e) => setCollege(e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Enter Bank Address"
//           className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
//           value={bank}
//           onChange={(e) => setBank(e.target.value)}
//         />

//         <button
//           onClick={verifyLoan}
//           className="bg-blue-600 text-white px-6 py-2 mt-3 rounded-lg hover:bg-blue-700 transition duration-300"
//         >
//           Verify Loan
//         </button>
//       </div>
//     </div>
//   );
// }

// export default College;


// import { useState, useEffect } from "react";
// import Web3 from "web3";
// import axios from "axios";

// function College() {
//   const [student, setStudent] = useState("");
//   const [college, setCollege] = useState("");
//   const [bank, setBank] = useState("");
//   const [loanDetails, setLoanDetails] = useState(null);  // Store loan details from the event
//   const [message, setMessage] = useState(null);
//   const [messageType, setMessageType] = useState("success"); // "success" or "error"
//   const [contract, setContract] = useState(null); // Web3 contract instance
//   const [web3, setWeb3] = useState(null); // Web3 instance

//   // Web3 setup: Initialize Web3 and Contract
//   useEffect(() => {
//     if (window.ethereum) {
//       const web3Instance = new Web3(window.ethereum);
//       setWeb3(web3Instance);

//       const contractAddress = "0x279A1bB8de92154E0019f783b71658f34a6EF6Ac"; // Replace with your contract address
//       const contractABI = [
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "_college",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "address",
//                     "name": "_bank",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "string",
//                     "name": "_course",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "_yr_start",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "_yr_end",
//                     "type": "uint256"
//                 }
//             ],
//             "name": "applyForLoan",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "student",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "address",
//                     "name": "_college",
//                     "type": "address"
//                 }
//             ],
//             "name": "approveLoanByBank",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "_collegeAdmin",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "address",
//                     "name": "_bankAdmin",
//                     "type": "address"
//                 }
//             ],
//             "stateMutability": "nonpayable",
//             "type": "constructor"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": true,
//                     "internalType": "address",
//                     "name": "student",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "address",
//                     "name": "college",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "address",
//                     "name": "bank",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "bool",
//                     "name": "verified",
//                     "type": "bool"
//                 }
//             ],
//             "name": "CollegeVerified",
//             "type": "event"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": true,
//                     "internalType": "address",
//                     "name": "student",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "address",
//                     "name": "college",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "bool",
//                     "name": "approved",
//                     "type": "bool"
//                 }
//             ],
//             "name": "LoanApproved",
//             "type": "event"
//         },
//         {
//             "anonymous": false,
//             "inputs": [
//                 {
//                     "indexed": true,
//                     "internalType": "address",
//                     "name": "student",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "uint256",
//                     "name": "id",
//                     "type": "uint256"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "address",
//                     "name": "college",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "address",
//                     "name": "bank",
//                     "type": "address"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "string",
//                     "name": "course",
//                     "type": "string"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "uint256",
//                     "name": "yr_start",
//                     "type": "uint256"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "uint256",
//                     "name": "yr_end",
//                     "type": "uint256"
//                 },
//                 {
//                     "indexed": false,
//                     "internalType": "string",
//                     "name": "status",
//                     "type": "string"
//                 }
//             ],
//             "name": "LoanRequested",
//             "type": "event"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "student",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "address",
//                     "name": "_college",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "address",
//                     "name": "_bank",
//                     "type": "address"
//                 }
//             ],
//             "name": "verifyLoanByCollege",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "bankAdmin",
//             "outputs": [
//                 {
//                     "internalType": "address",
//                     "name": "",
//                     "type": "address"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "",
//                     "type": "address"
//                 }
//             ],
//             "name": "bankApprovals",
//             "outputs": [
//                 {
//                     "internalType": "address",
//                     "name": "student",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "address",
//                     "name": "college",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "bool",
//                     "name": "approved",
//                     "type": "bool"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "timestamp",
//                     "type": "uint256"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [],
//             "name": "collegeAdmin",
//             "outputs": [
//                 {
//                     "internalType": "address",
//                     "name": "",
//                     "type": "address"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "",
//                     "type": "address"
//                 }
//             ],
//             "name": "collegeVerifications",
//             "outputs": [
//                 {
//                     "internalType": "address",
//                     "name": "student",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "address",
//                     "name": "college",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "address",
//                     "name": "bank",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "bool",
//                     "name": "verified",
//                     "type": "bool"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "timestamp",
//                     "type": "uint256"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "student",
//                     "type": "address"
//                 }
//             ],
//             "name": "getBankApproval",
//             "outputs": [
//                 {
//                     "components": [
//                         {
//                             "internalType": "address",
//                             "name": "student",
//                             "type": "address"
//                         },
//                         {
//                             "internalType": "address",
//                             "name": "college",
//                             "type": "address"
//                         },
//                         {
//                             "internalType": "bool",
//                             "name": "approved",
//                             "type": "bool"
//                         },
//                         {
//                             "internalType": "uint256",
//                             "name": "timestamp",
//                             "type": "uint256"
//                         }
//                     ],
//                     "internalType": "struct LoanSystem.BankApproval",
//                     "name": "",
//                     "type": "tuple"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "student",
//                     "type": "address"
//                 }
//             ],
//             "name": "getCollegeVerification",
//             "outputs": [
//                 {
//                     "components": [
//                         {
//                             "internalType": "address",
//                             "name": "student",
//                             "type": "address"
//                         },
//                         {
//                             "internalType": "address",
//                             "name": "college",
//                             "type": "address"
//                         },
//                         {
//                             "internalType": "address",
//                             "name": "bank",
//                             "type": "address"
//                         },
//                         {
//                             "internalType": "bool",
//                             "name": "verified",
//                             "type": "bool"
//                         },
//                         {
//                             "internalType": "uint256",
//                             "name": "timestamp",
//                             "type": "uint256"
//                         }
//                     ],
//                     "internalType": "struct LoanSystem.CollegeVerification",
//                     "name": "",
//                     "type": "tuple"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "student",
//                     "type": "address"
//                 }
//             ],
//             "name": "getLoanDetails",
//             "outputs": [
//                 {
//                     "components": [
//                         {
//                             "internalType": "uint256",
//                             "name": "id",
//                             "type": "uint256"
//                         },
//                         {
//                             "internalType": "address",
//                             "name": "student",
//                             "type": "address"
//                         },
//                         {
//                             "internalType": "address",
//                             "name": "college",
//                             "type": "address"
//                         },
//                         {
//                             "internalType": "address",
//                             "name": "bank",
//                             "type": "address"
//                         },
//                         {
//                             "internalType": "string",
//                             "name": "course",
//                             "type": "string"
//                         },
//                         {
//                             "internalType": "uint256",
//                             "name": "yr_start",
//                             "type": "uint256"
//                         },
//                         {
//                             "internalType": "uint256",
//                             "name": "yr_end",
//                             "type": "uint256"
//                         },
//                         {
//                             "internalType": "string",
//                             "name": "status",
//                             "type": "string"
//                         },
//                         {
//                             "internalType": "uint256",
//                             "name": "timestamp",
//                             "type": "uint256"
//                         }
//                     ],
//                     "internalType": "struct LoanSystem.LoanApplication",
//                     "name": "",
//                     "type": "tuple"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         },
//         {
//             "inputs": [
//                 {
//                     "internalType": "address",
//                     "name": "",
//                     "type": "address"
//                 }
//             ],
//             "name": "studentLoans",
//             "outputs": [
//                 {
//                     "internalType": "uint256",
//                     "name": "id",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "address",
//                     "name": "student",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "address",
//                     "name": "college",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "address",
//                     "name": "bank",
//                     "type": "address"
//                 },
//                 {
//                     "internalType": "string",
//                     "name": "course",
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "yr_start",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "yr_end",
//                     "type": "uint256"
//                 },
//                 {
//                     "internalType": "string",
//                     "name": "status",   
//                     "type": "string"
//                 },
//                 {
//                     "internalType": "uint256",
//                     "name": "timestamp",
//                     "type": "uint256"
//                 }
//             ],
//             "stateMutability": "view",
//             "type": "function"
//         }
//     ];

//       const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
//       setContract(contractInstance);
//     } else {
//       setMessage("Please install MetaMask or another Ethereum wallet.");
//       setMessageType("error");
//     }
//   }, []);

//   // Show Tailwind Notification (Success or Error)
//   const showMessage = (text, type = "success") => {
//     setMessage(text);
//     setMessageType(type);
//     setTimeout(() => setMessage(null), 3000);
//   };

//   // Listen for LoanRequested event (when a student applies for a loan)
//   useEffect(() => {
//     if (contract) {
//       const listenForLoanApplication = () => {
//         contract.events.LoanRequested({
//           fromBlock: "latest",  // Listen for events from the latest block onwards
//         })
//         .on("data", (event) => {
//           const {
//             student: loanStudent,
//             loanID,
//             college: loanCollege,
//             bank: loanBank,
//             course,
//             yr_start,
//             yr_end,
//             status,
//           } = event.returnValues;

//           // Update the state with the loan application details
//           setLoanDetails({
//             student: loanStudent,
//             loanID,
//             college: loanCollege,
//             bank: loanBank,
//             course,
//             yr_start,
//             yr_end,
//             status, // This will initially be "not_verified"
//           });
//         })
//         .on("error", (error) => {
//           console.error("Error in event listener:", error);
//         });
//       };

//       listenForLoanApplication(); // Start listening for the event

//       return () => {
//         // Cleanup the event listener when the component unmounts
//         contract.events.LoanRequested().unsubscribe();
//       };
//     }
//   }, [contract]); // Depend on contract instance

//   // Verify Loan (Send request to backend for loan verification)
//   const verifyLoan = async () => {
//     try {
//       const res = await axios.post("http://localhost:3002/verify-loan", {
//         student,
//         college,
//         bank,
//       });

//       showMessage("✅ Loan Verified by College!", "success");
//     } catch (err) {
//       showMessage(err.response?.data?.error || "Error verifying loan", "error");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
//       <h1 className="text-3xl font-bold mb-4">🎓 College Loan Verification</h1>

//       {/* 🔹 Tailwind Notification Message */}
//       {message && (
//         <div
//           className={`mt-4 px-4 py-2 rounded text-center text-white ${
//             messageType === "success" ? "bg-green-500" : "bg-red-500"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       {/* 🔹 Loan Details from Event */}
//       {loanDetails && (
//         <div className="mt-5 p-6 rounded-lg bg-gray-800 shadow-lg w-96">
//           <h3 className="text-xl font-semibold mb-3">Loan Application Details</h3>
//           <p><strong>Student Address:</strong> {loanDetails.student}</p>
//           <p><strong>Loan ID:</strong> {loanDetails.loanID}</p>
//           <p><strong>College Address:</strong> {loanDetails.college}</p>
//           <p><strong>Bank Address:</strong> {loanDetails.bank}</p>
//           <p><strong>Course:</strong> {loanDetails.course}</p>
//           <p><strong>Year Start:</strong> {loanDetails.yr_start}</p>
//           <p><strong>Year End:</strong> {loanDetails.yr_end}</p>
//           <p><strong>Status:</strong> {loanDetails.status}</p> {/* "not_verified" status here */}
//         </div>
//       )}

//       {/* 🔹 Loan Verification Form */}
//       <div className="flex flex-col mt-5 space-y-3 bg-gray-800 p-6 rounded-lg shadow-lg w-96">
//         <input
//           type="text"
//           placeholder="Enter Student Address"
//           className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
//           value={student}
//           onChange={(e) => setStudent(e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Enter College Address"
//           className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
//           value={college}
//           onChange={(e) => setCollege(e.target.value)}
//         />

//         <input
//           type="text"
//           placeholder="Enter Bank Address"
//           className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
//           value={bank}
//           onChange={(e) => setBank(e.target.value)}
//         />

//         <button
//           onClick={verifyLoan}
//           className="bg-blue-600 text-white px-6 py-2 mt-3 rounded-lg hover:bg-blue-700 transition duration-300"
//         >
//           Verify Loan
//         </button>
//       </div>
//     </div>
//   );
// }

// export default College;
