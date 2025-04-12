import { useState } from "react";
 
import axios from "axios";



const LoanApplication =()=>{
// import { Calendar } from 'primereact/calendar';
const [stream, setStream] = useState("");
const [bankAddress, setBankAddress] = useState("");
const [colAddress, setColAddress] = useState("");
const [yrStart, setYrStart] = useState("");
const [yrEnd, setYrEnd] = useState("");




 
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


 

  return (
    <div className="w-1/2 mx-auto p-8 border border-gray-300 rounded-lg   bg-white">
      <h2 className="text-3xl font-bold text-[#3F3D56] mb-6 text-left animate-fade-in">
        Apply for a Loan
      </h2>
      <div  className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Enter Stream"
          value={stream}
          onChange={(e) => setStream(e.target.value)}
          className="w-full p-3 border-b-2  border-gray-300   text-black focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
          required
        />
        <input
          type="text"
          name="collegeAdd"
          placeholder="Enter College  Address"
          value={colAddress}
          onChange={(e) => setColAddress(e.target.value)}
          className="w-full p-3 border-b-2  border-gray-300   text-black focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
          required
        />
        <input
          type="text"
          name="BankAdd"
          placeholder="Enter Bank Add Address"
          value={bankAddress}
          onChange={(e) => setBankAddress(e.target.value)}
          className="w-full p-3 border-b-2  border-gray-300   text-black focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
          required
        />

       
      
        <input
          type="number"
          name="YearStart"
          placeholder="Year Start"
          value={yrStart}
          onChange={(e) => setYrStart(e.target.value)}
          className="w-full p-3 border-b-2  border-gray-300   text-black focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
          required
          />
         
        <input
          type="number"
          name="YearEnd"
          placeholder="Year End"
          value={yrEnd}
          onChange={(e) => setYrEnd(e.target.value)}
          className="w-full p-3 border-b-2  border-gray-300   text-black focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
          required
        />
         
        <button
          onClick={ applyForLoan} 
          
          className="w-1/2  bg-[#02C39A] text-white p-3 rounded-full hover:bg-[#3F3D56] transition duration-300 transform hover:scale-105"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
};

export default LoanApplication;


// import { useState } from "react";
// import axios from "axios";

// const LoanApplication = () => {
//   const [stream, setStream] = useState("");
//   const [bankAddress, setBankAddress] = useState("");
//   const [colAddress, setColAddress] = useState("");
//   const [yrStart, setYrStart] = useState("");
//   const [yrEnd, setYrEnd] = useState("");
//   const [message, setMessage] = useState(null);
//   const [messageType, setMessageType] = useState("success");

//   // 🔹 Show Tailwind Notification (Success or Error)
//   const showMessage = (text, type = "success") => {
//     setMessage(text);
//     setMessageType(type);
//     setTimeout(() => setMessage(null), 3000);
//   };

//   // 🔹 Apply for Loan
//   const applyForLoan = async () => {
//     try {
//       await axios.post("http://localhost:3001/apply-loan", {
//         college: colAddress,
//         bank: bankAddress,
//         course: stream,
//         yr_start: parseInt(yrStart),
//         yr_end: parseInt(yrEnd),
//       });

//       showMessage("✅ Loan Requested Successfully!", "success");
//     } catch (err) {
//       showMessage(err.response?.data?.error || "Error applying for loan", "error");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
//       <h1 className="text-3xl font-bold mb-4">🎓 Student Loan Application</h1>

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

//       {/* 🔹 Loan Application Form */}
//       <div className="flex flex-col mt-5 space-y-5 bg-gray-800 p-6 rounded-lg shadow-lg w-96">
//         <input
//           type="text"
//           name="stream"
//           placeholder="Enter Stream"
//           value={stream}
//           onChange={(e) => setStream(e.target.value)}
//           className="w-full p-3 border-b-2 border-gray-300 text-white bg-gray-700 focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
//           required
//         />
//         <input
//           type="text"
//           name="collegeAdd"
//           placeholder="Enter College Address"
//           value={colAddress}
//           onChange={(e) => setColAddress(e.target.value)}
//           className="w-full p-3 border-b-2 border-gray-300 text-white bg-gray-700 focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
//           required
//         />
//         <input
//           type="text"
//           name="bankAdd"
//           placeholder="Enter Bank Address"
//           value={bankAddress}
//           onChange={(e) => setBankAddress(e.target.value)}
//           className="w-full p-3 border-b-2 border-gray-300 text-white bg-gray-700 focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
//           required
//         />

//         <div>
//           <label className="text-gray-600">Start Year</label>
//           <input
//             type="number"
//             name="yearStart"
//             placeholder="Year Start"
//             value={yrStart}
//             onChange={(e) => setYrStart(e.target.value)}
//             className="w-full p-3 border-b-2 border-gray-300 text-white bg-gray-700 focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
//             required
//           />
//         </div>

//         <div>
//           <label className="text-gray-600">End Year</label>
//           <input
//             type="number"
//             name="yearEnd"
//             placeholder="Year End"
//             value={yrEnd}
//             onChange={(e) => setYrEnd(e.target.value)}
//             className="w-full p-3 border-b-2 border-gray-300 text-white bg-gray-700 focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
//             required
//           />
//         </div>

//         <button
//           onClick={applyForLoan}
//           className="w-1/2 bg-[#02C39A] text-white p-3 rounded-full hover:bg-[#3F3D56] transition duration-300 transform hover:scale-105"
//         >
//           Submit Application
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoanApplication;
