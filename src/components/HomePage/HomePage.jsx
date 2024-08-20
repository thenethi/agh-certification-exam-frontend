import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
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
  Title,
  LoaderContainer
} from "../../StyledComponents";

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching exam details:", error);
        setIsLoading(false);
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
      {isLoading ? (
        <LoaderContainer>
          <RotatingLines
            strokeColor="blue"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </LoaderContainer>
      ) : (
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
      )}
    </PageContainer>
  );
};

export default HomePage;