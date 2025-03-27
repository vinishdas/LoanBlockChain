import { useState } from "react";
import axios from "axios";
import StudentDashboard from "./StudentDashboard";
import BankDashboard from "./BankDashboard";
import CollegeDashboard from "./CollegeDashboard";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null); // Stores user role after login
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const { role } = response.data; // Assuming backend returns role
      setRole(role); // Set role to render appropriate UI
    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  // Render different dashboards based on role
  if (role === "Student") return <StudentDashboard />;
  if (role === "Bank") return <BankDashboard />;
  if (role === "College") return <CollegeDashboard />;

  return (
    <div className=" h-lvh w-lvw flex xs:flex-col flex-row  justify-center items-center    ">
      <div className="h-full w-full flex  bg-white rounded-lg shadow-lg     overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-b from-[#11B5A3] to-[#028090] flex items-center justify-center p-6">
          <img
            src="/your-image-path.png"
            alt="Illustration"
            className="max-w-xs"
          />
        </div>

        {/* Right Section (Form) */}
        <div className="w-1/2  mt-36   p- flex flex-col items-center   ">
          <img
            src="/your-logo-path.png"
            alt="Logo"
            className="w-16 h-16 mb-4"
          />
          <h2 className="text-5xl font-bold text-black">WELCOME</h2>

          <form className="w-1/2 mt-11">
            <div className="mb-11 relative">
              <div className="w-full flex items-center border-b-4 border-gray-400   py-2 relative transition-all duration-300 peer-focus:border-transparent">
                <span className="text-gray-500 text-3xl pr-2">&#128100;</span>

                <input
                  type="password"
                  className="peer w-full text-2xl bg-transparent border-none outline-none text-black placeholder-transparent"
                  placeholder="Password"
                />

                <label className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-2xl peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#007bff]">
                  Email
                </label>

                <span className="absolute  -bottom-1 left-0 h-[4px] w-0 bg-[#11B5A3] transition-all duration-300 peer-focus:w-full"></span>
              </div>
            </div>
            <div className="mb-11 relative">
              <div className="w-full flex items-center border-b-4 border-gray-400   py-2 relative transition-all duration-300 peer-focus:border-transparent">
                <span className="text-gray-500 text-3xl pr-2">&#128274;</span>

                <input
                  type="password"
                  className="peer w-full text-2xl bg-transparent border-none outline-none text-black placeholder-transparent"
                  placeholder="Password"
                />

                <label className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-2xl peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#007bff]">
                  Password
                </label>

                <span className="absolute  -bottom-1 left-0 h-[4px] w-0 bg-[#11B5A3] transition-all duration-300 peer-focus:w-full"></span>
              </div>
            </div>

            <button
              type="submit"
              className="w-1/3 h-1/5 py-2 mt-11   text-white bg-gradient-to-r from-[#11B5A3] to-[#028090]  shadow-md hover:opacity-90"
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
