// src/components/StudentDashboard.jsx
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import ScrollVelocity from "./ScrollVelocity/ScrollVelocity";
import HeroSection from "./HeroSection";
import LoanApplication from "./LoanApplication";
import ClickSpark from "./ClickSpark/ClickSpark";
import MagnetLines from "./MagnetLines/MagnetLines";
import LoanCalculator from "./LoanCalculator";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirects to login
  };

  return (
    <>
      <Navbar />
      <ClickSpark
        sparkColor="#02C39A"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <HeroSection User="Student"></HeroSection>
      <div className="m-20">

        <MagnetLines
          rows={9}
          columns={9}
          containerSize="60vmin"
          lineColor="#02C39A"
          lineWidth="0.8vmin"
          lineHeight="5vmin"
          baseAngle={0}
          style={{ margin: "2rem auto" }}
          />
          </div>

        <div id="Loanform" className="mt-30 mb-30">
          <LoanApplication></LoanApplication>
        </div>
        <div id="Loancal">

    <LoanCalculator ></LoanCalculator>

        </div>
      </ClickSpark>

    </>
  );
};

export default StudentDashboard;
