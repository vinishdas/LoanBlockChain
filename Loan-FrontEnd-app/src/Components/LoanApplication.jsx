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
      <form onSubmit={applyForLoan} className="space-y-5">
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

        <label className="flex   m-0 relative -right-4 top-3 self-start      text-gray-600  focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300">
      Start year
      </label>
        <input
          type="date"
          name="YearStart"
          placeholder="Year Start"
          value={yrStart}
          onChange={(e) => setYrStart(e.target.value)}
          className="w-full p-3 border-b-2  border-gray-300   text-black focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
          required
          />
          <label className="flex   m-0 relative -right-4 top-3 self-start      text-gray-600  focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300">
      Start End
      </label>
        <input
          type="date"
          name="YearEnd"
          placeholder="Year End"
          value={yrEnd}
          onChange={(e) => setYrEnd(e.target.value)}
          className="w-full p-3 border-b-2  border-gray-300   text-black focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
          required
        />
         
        <button
          type="submit"
          
          className="w-1/2  bg-[#02C39A] text-white p-3 rounded-full hover:bg-[#3F3D56] transition duration-300 transform hover:scale-105"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanApplication;
