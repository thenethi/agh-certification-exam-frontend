import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  PaymentPageContainer,
  PaymentBox,
  Title,
  LoadingText,
  Message,
  StyledButton
} from './StyledComponents';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { submissionData } = location.state;
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [examFee, setExamFee] = useState(0);
  const hasInitiatedPayment = useRef(false);
  const { examId } = useParams();

  useEffect(() => {
    const fetchExamFee = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_ADMIN_APP_URL}/${examId}`);
        const fee = parseFloat(response.data.examFee) || 0;
        setExamFee(fee);
        return fee;
      } catch (error) {
        console.error('Error fetching exam fee:', error);
        setMessage('Error fetching exam fee. Please try again.');
        setIsSuccess(false);
        setIsLoading(false);
        return 0;
      }
    };

    const initiatePayment = async () => {
      if (hasInitiatedPayment.current) return;

      hasInitiatedPayment.current = true;
      setIsLoading(true);

      const fee = await fetchExamFee();

      

      try {
        const orderResponse = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/create-order`, {
          amount: fee , // Convert to paise
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
  }, [examId, submissionData, navigate]);

  const handleRetry = () => {
    hasInitiatedPayment.current = false;
    setMessage('');
    setIsSuccess(null);
    setIsLoading(true);

    const fetchExamFee = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_ADMIN_APP_URL}/${examId}`);
        const fee = parseFloat(response.data.examFee) || 0;
        setExamFee(fee);
        return fee;
      } catch (error) {
        console.error('Error fetching exam fee:', error);
        setMessage('Error fetching exam fee. Please try again.');
        setIsSuccess(false);
        setIsLoading(false);
        return 0;
      }
    };
    
    const initiatePayment = async () => {
      if (hasInitiatedPayment.current) return;

      hasInitiatedPayment.current = true;
      setIsLoading(true);

      const fee = await fetchExamFee();

      try {
        const orderResponse = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/create-order`, {
          amount: fee ,
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
  };

  return (
    <PaymentPageContainer>
      <PaymentBox>
        <Title>{isLoading ? (examFee === 0 ? 'Processing Registration...' : 'Processing Payment...') : 'Registration Status'}</Title>
        {isLoading && <LoadingText>Please do not refresh the page.</LoadingText>}
        {message && <Message success={isSuccess}>{message}</Message>}
        {!isLoading && !isSuccess && (
          <StyledButton onClick={handleRetry}>{examFee === 0 ? 'Retry Registration' : 'Retry Payment'}</StyledButton>
        )}
      </PaymentBox>
    </PaymentPageContainer>
  );
};

export default PaymentPage;