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
import HomePage from "./components/HomePage/HomePage";
import ExamsAvailable from "./components/ExamsAvailable/ExamsAvailable";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exams-available" element={<ExamsAvailable />} />
        <Route path="/register/:examId" element={<RegistrationForm />} />
        <Route path="/exam-details/:examId" element={<ExamDetails />} />
        <Route
          path="/certificate-details/:examId"
          element={<CertificationDetails />}
        />
        <Route path="/exam-content/:examId" element={<ExamContent />} />
        <Route path="/exam-scheduling/:examId" element={<ExamScheduling />} />
        <Route
          path="/candidate-preparation/:examId"
          element={<CandidatePreparation />}
        />
        <Route
          path="/exam-administration/:examId"
          element={<ExamAdministration />}
        />
        <Route path="/results-feedback/:examId" element={<ResultsFeedback />} />
        <Route path="/payment/:examId" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
