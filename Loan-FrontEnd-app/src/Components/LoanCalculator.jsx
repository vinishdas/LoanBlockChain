import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTenure, setLoanTenure] = useState(1);
  const [scholarship, setScholarship] = useState(0);
  const [downPayment, setDownPayment] = useState(0);

  // Colors for Pie Chart
  const COLORS = ["#60db63", "#FFBB28"];

  // Derived calculations (avoiding unnecessary re-renders)
  const principal = loanAmount - downPayment - scholarship;
  const monthlyInterest = interestRate / 100 / 12;
  const totalMonths = loanTenure * 12;

  // EMI Calculation
  const emi = useMemo(() => {
    if (monthlyInterest === 0) return principal / totalMonths;
    return (
      (principal * monthlyInterest * Math.pow(1 + monthlyInterest, totalMonths)) /
      (Math.pow(1 + monthlyInterest, totalMonths) - 1)
    );
  }, [principal, monthlyInterest, totalMonths]);

  // Total Payment and Interest
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;

  // Pie Chart Data
  const data = [
    { name: "Principal", value: principal },
    { name: "Total Interest", value: totalInterest },
  ];

  return (
    <div className="h-[700px] p-7 flex flex-row justify-center items-center bg-[#02906f] text-white rounded-2xl m-5">
      {/* Loan Calculator Section */}
      <div className="w-2xl h-4/5 p-6 border-2 border-[#02c399a1] rounded-2xl shadow-2xl">
        <h2 className="text-xl text-left mb-7 font-mono font-bold">Student Loan Calculator</h2>

        {/* Loan Amount */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Loan Amount</label>
            <p className="font-semibold">₹ {loanAmount.toLocaleString()}</p>
          </div>
          <input
            type="range"
            min="50000"
            max="5000000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full cursor-pointer accent-white"
          />
        </div>

        {/* Interest Rate */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Interest Rate (p.a)</label>
            <p className="font-semibold">{interestRate}%</p>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full cursor-pointer accent-white"
          />
        </div>

        {/* Loan Tenure */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Loan Tenure (Years)</label>
            <p className="font-semibold">{loanTenure} Years</p>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={loanTenure}
            onChange={(e) => setLoanTenure(Number(e.target.value))}
            className="w-full cursor-pointer accent-white"
          />
        </div>

        {/* Results */}
        <div className="p-4 rounded-md mt-10 text-white-700 drop-shadow-black drop-shadow-xl">
          <p className="text-lg font-semibold mb-2 text-left">Results</p>
          <p className="flex justify-between">
            <span>Monthly EMI:</span>
            <span className="font-medium">₹ {emi.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Total Interest:</span>
            <span className="font-medium">₹ {totalInterest.toFixed(2)}</span>
          </p>
          <p className="flex justify-between pt-2">
            <span>Total Payment:</span>
            <span className="font-medium">₹ {totalPayment.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="w-xl h-[60%] p-6 flex items-center justify-center">
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default LoanCalculator;
