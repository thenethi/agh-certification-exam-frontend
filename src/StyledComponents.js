import styled from "styled-components";

// Colors
const darkBlue = "#0d1430";
const white = "#ffffff";
const lightGray = "#f9f9f9";
const gray = "#666";
const hoverBlue = "#0056b3";
const successGreen = "#28a745";
const dangerRed = "#dc3545";

// Hero Section Styles
export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${darkBlue};
  color: ${white};
  height: 100vh; /* Full viewport height */
  text-align: center;
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.5rem; /* Adjusted for tablets */
  }

  @media (max-width: 480px) {
    font-size: 2rem; /* Adjusted for mobile */
  }
`;

export const HeroDescription = styled.p`
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1.05rem; /* Adjusted for tablets */
  }

  @media (max-width: 480px) {
    font-size: 1rem; /* Adjusted for mobile */
  }
`;

// Page Container
export const PageContainer = styled.div`
  margin: 0px;
`;

// Heading
export const Heading = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
  color: ${darkBlue};
`;

// Form Container
export const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: ${white};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  padding: 10px;
  margin: 10px;
  font-size: 1.5rem;
  color: ${darkBlue};
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 12px top 50%;
  background-size: 12px auto;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${hoverBlue};
  }
`;

export const ErrorMessage = styled.span`
  color: ${dangerRed};
  font-size: 14px;
  margin-top: 5px;
  display: block;
`;

export const SuccessMessage = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }
`;

export const PhoneInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .react-flags-select {
    flex: 0 0 auto;
    width: 120px;
  }

  input {
    flex: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;

    .react-flags-select {
      width: 100%;
    }
  }
`;

// Tile Components
export const TileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 30px;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* Two tiles per row on desktop */
  }

  @media (max-width: 1023px) and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Two tiles per row on tablets */
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr; /* One tile per row on mobile devices */
  }
`;

export const Tile = styled.div`
  background-color: ${lightGray};
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
`;

export const TileHeading = styled.h2`
  font-size: 1.5rem;
  color: ${darkBlue};
  margin-bottom: 10px;
`;

export const TileDescription = styled.p`
  font-size: 1rem;
  color: ${gray};
  margin-bottom: 20px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${hoverBlue};
  }
`;

export const ExamTile = styled.div`
  background-color: ${lightGray};
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const TileDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const DetailItem = styled.p`
  width: 45%;
  margin: 5px 0;
  color: ${gray};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.25rem;
  color: ${gray};
  margin-top: 10px;
  font-weight: 400;
  text-align: center;
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;
