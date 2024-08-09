import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import PaymentPage from "./components/PaymentPage/PaymentPage"; // Import the PaymentPage component

const App = () => {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: "center" }}>Certification Exam Registration</h1>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
