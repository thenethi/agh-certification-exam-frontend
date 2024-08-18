import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TileContainer,
  Tile,
  TileHeading,
  TileDescription,
  Button,
  HeroSection,
  HeroTitle,
  HeroDescription,
  PageContainer,
  Title
} from "../../StyledComponents";

const ExamTilePage = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_EXAM_DETAILS_URL}`)
      .then(response => {
        const data = response.data;
        const companyMap = {};
        data.forEach(exam => {
          const { companyName, companyDescription } = exam;
          if (!companyMap[companyName]) {
            companyMap[companyName] = {
              companyName,
              companyDescription,
              exams: []
            };
          }
          companyMap[companyName].exams.push(exam);
        });

        setCompanies(Object.values(companyMap));
      })
      .catch(error => {
        console.error("Error fetching exam details:", error);
      });
  }, []);

  const handleNavigate = (exams) => {
    navigate("/exams-available", { state: { exams } });
  };

  return (
    <PageContainer>
      <HeroSection>
        <HeroTitle>Certification Exam Portal</HeroTitle>
        <HeroDescription>
          Explore various certification exams offered by top companies. Choose an exam that aligns with your career goals and take the next step towards professional success.
        </HeroDescription>
      </HeroSection>
      <Title>Kickstart Your Career with Our Expert-Curated Assessments</Title>
      <TileContainer>
        {companies.map((company, index) => (
          <Tile key={index}>
            <TileHeading>{company.companyName}</TileHeading>
            <TileDescription>{company.companyDescription}</TileDescription>
            <Button onClick={() => handleNavigate(company.exams)}>
              Take a Certify Exam
            </Button>
          </Tile>
        ))}
      </TileContainer>
    </PageContainer>
  );
};

export default ExamTilePage;
