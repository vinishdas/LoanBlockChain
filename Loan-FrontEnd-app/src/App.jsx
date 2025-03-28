import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LoginForm from "./Components/LoginForm";
import StudentDashboard from "./Components/StudentDashboard";
import BankDashboard from "./Components/BankDashboard";
import CollegeDashboard from "./Components/CollegeDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/bank-dashboard" element={<BankDashboard />} />
        <Route path="/college-dashboard" element={<CollegeDashboard />} />
        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
