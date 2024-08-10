import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Select,
  SubmitButton,
  ErrorMessage,
} from '../../StyledComponents'; // Adjust the path as necessary

const ExamScheduling = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { submissionData } = location.state;

  const onSubmit = (data) => {
    const combinedData = { ...submissionData, ...data };
    navigate('/candidate-preparation', { state: { submissionData: combinedData } }); // Redirect to the next step
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Exam Date</Label>
          <Input
            type="date"
            {...register('examDate', { required: 'Exam Date is required' })}
          />
          {errors.examDate && <ErrorMessage>{errors.examDate.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Exam Time</Label>
          <Input
            type="time"
            {...register('examTime', { required: 'Exam Time is required' })}
          />
          {errors.examTime && <ErrorMessage>{errors.examTime.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Time Zone</Label>
          <Select {...register('timeZone', { required: 'Time Zone is required' })}>
            <option value="">Select Time Zone</option>
            <option value="IST">IST (Indian Standard Time)</option>
            <option value="EST">EST (Eastern Standard Time)</option>
            <option value="PST">PST (Pacific Standard Time)</option>
            <option value="GMT">GMT (Greenwich Mean Time)</option>
            {/* Add more time zones as needed */}
          </Select>
          {errors.timeZone && <ErrorMessage>{errors.timeZone.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Reschedule Option</Label>
          <Select {...register('rescheduleOption', { required: 'Reschedule Option is required' })}>
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
          {errors.rescheduleOption && <ErrorMessage>{errors.rescheduleOption.message}</ErrorMessage>}
        </FormGroup>

        {/** Show Reschedule Policy only if Reschedule Option is 'Yes' **/}
        <FormGroup>
          <Label>Reschedule Policy</Label>
          <Input
            {...register('reschedulePolicy')}
            placeholder="Enter reschedule policy (if applicable)"
          />
        </FormGroup>

        <FormGroup>
          <Label>Slot Booking</Label>
          <Input
            {...register('slotBooking')}
            placeholder="Enter slot booking details (if applicable)"
          />
        </FormGroup>

        <SubmitButton type="submit">Proceed to Candidate Preparation</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ExamScheduling;
