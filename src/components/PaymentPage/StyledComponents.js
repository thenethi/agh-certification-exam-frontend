import styled from "styled-components";

export const PaymentPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

export const PaymentBox = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
`;

export const LoadingText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-top: 1rem;
`;

export const Message = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
  color: ${({ success }) => (success ? "green" : "red")};
`;

export const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
