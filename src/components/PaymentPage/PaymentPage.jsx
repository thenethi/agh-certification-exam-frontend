import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  PaymentPageContainer,
  PaymentBox,
  Title,
  LoadingText,
  Message,
} from './StyledComponents';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { submissionData, price } = location.state;
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const hasInitiatedPayment = useRef(false); // Ref to track if payment has been initiated

  useEffect(() => {
    const initiatePayment = async () => {
      if (hasInitiatedPayment.current) return; // Prevent multiple initiations

      hasInitiatedPayment.current = true; // Mark payment as initiated

      try {
        // Create an order in test mode
        const orderResponse = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/create-order`, {
          amount: price,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
        });

        const { id: order_id, currency, amount } = orderResponse.data;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Use environment variable
          amount: amount,
          currency: currency,
          name: 'Certification Exam',
          description: 'Exam Registration Payment',
          order_id: order_id,
          handler: async (response) => {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

            // Verify the payment
            const verifyResponse = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/verify-payment`, {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              registrationData: submissionData,
            });

            if (verifyResponse.data.message) {
              setIsSuccess(true);
              setMessage(`Payment successful! Your transaction ID is ${razorpay_payment_id}. Registration completed. Please check your email for confirmation.`);
              setTimeout(() => navigate('/'), 5000); // Redirect after 5 seconds
            } else {
              setIsSuccess(false);
              setMessage('Payment verification failed.');
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
      }
    };

    initiatePayment();
  }, [price, submissionData, navigate]);

  return (
    <PaymentPageContainer>
      <PaymentBox>
        <Title>Processing Payment...</Title>
        <LoadingText>Please do not refresh the page.</LoadingText>
        {message && <Message success={isSuccess}>{message}</Message>}
      </PaymentBox>
    </PaymentPageContainer>
  );
};

export default PaymentPage;
