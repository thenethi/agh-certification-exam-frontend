import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  PageContainer, 
  Heading, 
  ExamTile, 
  TileHeading, 
  TileDetails, 
  DetailItem, 
  Button,
  Subtitle
} from "../../StyledComponents"; // Adjust the path as needed

const ExamsAvailable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { exams } = location.state || {};

  const handleRegisterClick = (examId) => {
    navigate(`/register/${examId}`);
  };

  return (
    <PageContainer>
      <Heading>
        Available Exams
        <Subtitle>Find the right exam for your certification journey</Subtitle>
      </Heading>
      {exams ? (
        exams.map((exam) => (
          <ExamTile key={exam._id}>
            <TileHeading>{exam.examTitle}</TileHeading>
            <TileDetails>
              <DetailItem><strong>Duration:</strong> {exam.examDuration} minutes</DetailItem>
              <DetailItem><strong>Total Marks:</strong> {exam.totalMarks}</DetailItem>
              <DetailItem><strong>Passing Criteria:</strong> {exam.passingCriteria}%</DetailItem>
              <DetailItem><strong>Mode:</strong> {exam.examMode}</DetailItem>
              <DetailItem><strong>Attempts Allowed:</strong> {exam.attemptsAllowed}</DetailItem>
              <DetailItem><strong>Fee:</strong> {exam.examFee}/-</DetailItem>
              <DetailItem><strong>Certification Title:</strong> {exam.certificationTitle}</DetailItem>
              <DetailItem><strong>Certification Level:</strong> {exam.certificationLevel}</DetailItem>
              <DetailItem><strong>Exam Date:</strong> {exam.examDate}</DetailItem>
              <DetailItem><strong>Time:</strong> {exam.examTime} {exam.timeZone}</DetailItem>
              <DetailItem><strong>ID Verification:</strong> {exam.idVerificationRequired}</DetailItem>
              <DetailItem><strong>Reevaluation Option:</strong> {exam.reevaluationOption}</DetailItem>
            </TileDetails>
            <Button onClick={() => handleRegisterClick(exam._id)}>
              Register for Exam
            </Button>
          </ExamTile>
        ))
      ) : (
        <p>No exams available.</p>
      )}
    </PageContainer>
  );
};

export default ExamsAvailable;
