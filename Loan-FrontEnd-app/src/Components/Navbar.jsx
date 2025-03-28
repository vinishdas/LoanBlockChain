import { useNavigate } from "react-router-dom";
import Logo from "../assets/protractor.png";
 

const Navbar = ( props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirects to login page
  };


  return (
    <div className="h-20 rounded fixed top-0 left-0 z-10 w-full bg-white drop-shadow-md">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="flex flex-row justify-center items-center">
          <img src={Logo} alt="Logo" className="w-10 h-10 mb-4" />
          <span className="ml-3 mb-3 font-mono text-black text-xl">UniFund</span>
        </div>

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-black justify-center">
          <a href="#" className="text-black font-medium mr-5 transition-all hover:translate-y-2 hover:text-[#02C39A] hover:text-xl  opacity-90">Loan Status</a>
         {props.Application &&<a href="#Loanform"   className="text-black font-medium mr-5 transition-all hover:translate-y-2 hover:text-[#02C39A] hover:text-xl opacity-90">Loan Application</a>}
          <a href="#Loancal" className="text-black font-medium  mr-5 transition-all hover:translate-y-2 hover:text-[#02C39A] hover:text-xl opacity-90">Loan Calculator</a>
        </nav>

        <button
          onClick={handleLogout}
          className="w-24 inline-flex mb-4 justify-center items-center bg-transparent border-2 border-[#02C39A] text-[#02C39A] py-1 px-3 rounded-full mt-4 md:mt-0 transition-all duration-300 hover:bg-[#02C39A] hover:text-white"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
