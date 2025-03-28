// src/components/CollegeDashboard.jsx
import Navbar from "./Navbar";
 
import MagnetLines from "./MagnetLines/MagnetLines";
import LoanCalculator from "./LoanCalculator";
import CollegeLoanStaus from "./CollegeLoanStaus";


const CollegeDashboard = () => {
    return (
      <>
      <Navbar Application={false} ></Navbar>
      <CollegeLoanStaus></CollegeLoanStaus>

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
                  <div id="Loancal">

<LoanCalculator ></LoanCalculator>

    </div>
      </>
    );
  };
  export default CollegeDashboard;
  