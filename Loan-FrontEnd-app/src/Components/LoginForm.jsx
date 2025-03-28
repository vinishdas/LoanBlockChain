import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/protractor.png";
import financeImage from "../assets/undraw_financial-data_r0vs.svg";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Simulating login API call
      // const response = await axios.post("http://localhost:5000/api/login", { email, password });
      // const { role } = response.data;

      const role = "Bank"; // Hardcoded for now, replace with API response

      // Navigate to the corresponding dashboard
      if (role === "Student") navigate("/student-dashboard");
      else if (role === "Bank") navigate("/bank-dashboard");
      else if (role === "College") navigate("/college-dashboard");
      else setError("Invalid role. Please contact support.");

    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="h-lvh w-lvw flex xs:flex-col flex-row justify-center items-center">
      <div className="h-full w-full flex bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-b from-[#11B5A3] to-[#028090] flex items-center justify-center p-6">
          <img src={financeImage} alt="Illustration" className="max-w-xl" />
        </div>

        {/* Right Section (Form) */}
        <div className="w-1/2 mt-5 mb-20 border-2 p- flex flex-col items-center">
          <img src={Logo} alt="Logo" className="w-40 h-40 mb-4" />
          <h2 className="text-5xl font-bold text-black">WELCOME</h2>

          <form className="w-1/2 mt-11" onSubmit={handleLogin}>
            <div className="mb-11 relative">
              <div className="w-full flex items-center border-b-4 border-gray-400 py-2 relative transition-all duration-300 peer-focus:border-transparent">
                <span className="text-gray-500 text-3xl pr-2">&#128100;</span>
                <input
                  type="text"
                  className="peer w-full text-2xl bg-transparent border-none outline-none text-black"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="absolute -bottom-1 left-0 h-[4px] w-0 bg-[#11B5A3] transition-all duration-300 peer-focus:w-full"></span>
              </div>
            </div>

            <div className="mb-11 relative">
              <div className="w-full flex items-center border-b-4 border-gray-400 py-2 relative transition-all duration-300 peer-focus:border-transparent">
                <span className="text-gray-500 text-3xl pr-2">&#128274;</span>
                <input
                  type="password"
                  className="peer w-full text-2xl bg-transparent border-none outline-none text-black"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="absolute -bottom-1 left-0 h-[4px] w-0 bg-[#11B5A3] transition-all duration-500 peer-focus:w-full"></span>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-1/2 h-1/5 mt-11 rounded-4xl text-white bg-gradient-to-r from-[#11B5A3] to-[#028090] shadow-md hover:opacity-90"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
