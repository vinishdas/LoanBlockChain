import { useState } from "react";

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Loan Application Submitted:", formData);
  };

  return (
    <div className="w-1/2 mx-auto p-8 border border-gray-300 rounded-lg   bg-white">
      <h2 className="text-3xl font-bold text-[#3F3D56] mb-6 text-left animate-fade-in">
        Apply for a Loan
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border-b-2  border-gray-300   text-black focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border-b-2  border-gray-300   text-black focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Loan Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-3 border-b-2  border-gray-300   text-black focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
          required
        />
        <textarea
          name="purpose"
          placeholder="Purpose of Loan"
          value={formData.purpose}
          onChange={handleChange}
          className="w-full p-3 border-b-2  border-gray-300   text-black focus:outline-none focus:border-[#02C39A] focus:ring-[#02C39A] transition-all duration-300"
          required
        ></textarea>
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
