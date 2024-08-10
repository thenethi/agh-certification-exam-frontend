import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  PaymentPageContainer,
  PaymentBox,
  Title,
  LoadingText,
  Message,
  StyledButton
} from './StyledComponents';

// Inline styled button

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { submissionData, price } = location.state;
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasInitiatedPayment = useRef(false);

  useEffect(() => {
    const initiatePayment = async () => {
      if (hasInitiatedPayment.current) return;

      hasInitiatedPayment.current = true;
      setIsLoading(true);

      try {
        const orderResponse = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/create-order`, {
          amount: 500,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
        });

        const { id: order_id, currency, amount } = orderResponse.data;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: amount,
          currency: currency,
          name: 'Certification Exam',
          description: 'Exam Registration Payment',
          order_id: order_id,
          handler: async (response) => {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

            try {
              const verifyResponse = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/verify-payment`, {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                submissionData,
              });

              if (verifyResponse.data.message) {
                setIsSuccess(true);
                setMessage(`Payment successful! Your transaction ID is ${razorpay_payment_id}. Registration completed. Please check your email for confirmation.`);
                setTimeout(() => navigate('/'), 5000);
              } else {
                throw new Error('Payment verification failed.');
              }
            } catch (error) {
              console.error('Verification error:', error);
              setIsSuccess(false);
              setMessage('Payment was successful, but there was an issue saving your registration details. Please contact support with your transaction ID: ' + razorpay_payment_id);
            }
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error('Payment initiation failed:', error);
        setIsSuccess(false);
        setMessage('Payment initiation failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    initiatePayment();
  }, [price, submissionData, navigate]);

  const handleRetry = () => {
    hasInitiatedPayment.current = false;
    setMessage('');
    setIsSuccess(null);
    setIsLoading(true);
    
    const initiatePayment = async () => {
      // ... (copy the entire initiatePayment function from the useEffect here)
    };

    initiatePayment();
  };

  return (
    <PaymentPageContainer>
      <PaymentBox>
        <Title>{isLoading ? 'Processing Payment...' : 'Payment Status'}</Title>
        {isLoading && <LoadingText>Please do not refresh the page.</LoadingText>}
        {message && <Message success={isSuccess}>{message}</Message>}
        {!isLoading && !isSuccess && (
          <StyledButton onClick={handleRetry}>Retry Payment</StyledButton>
        )}
      </PaymentBox>
    </PaymentPageContainer>
  );
};

export default PaymentPage;