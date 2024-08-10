import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import ExamDetails from "./components/ExamDetails/ExamDetails";
import Payment from "./components/PaymentPage/PaymentPage";
import CertificationDetails from "./components/CertificationDetails/CertificationDetails";
import ExamContent from "./components/ExamContent/ExamContent";
import ExamScheduling from "./components/ExamScheduling/ExamScheduling";
import CandidatePreparation from "./components/CandidatePreparation/CandidatePreparation";
import ExamAdministration from "./components/ExamAdministration/ExamAdministration";
import ResultsFeedback from "./components/ResultsFeedback/ResultsFeedback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/exam-details" element={<ExamDetails />} />
        <Route path="/certificate-details" element={<CertificationDetails />} />
        <Route path="/exam-content" element={<ExamContent />} />
        <Route path="/exam-scheduling" element={<ExamScheduling />} />
        <Route
          path="/candidate-preparation"
          element={<CandidatePreparation />}
        />
        <Route path="/exam-administration" element={<ExamAdministration />} />
        <Route path="/results-feedback" element={<ResultsFeedback />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
