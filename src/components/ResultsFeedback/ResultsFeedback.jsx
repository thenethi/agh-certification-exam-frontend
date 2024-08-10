import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  ErrorMessage,
  Select
} from '../../StyledComponents';

const ResultsFeedback = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { submissionData } = location.state;

  const onSubmit = (data) => {
    const combinedData = { ...submissionData, ...data };
    // Handle final submission or navigation to a summary page
    console.log('Final Submission Data:', combinedData);
    navigate('/payment', { state: { submissionData: combinedData } });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Result Announcement Date</Label>
          <Input
            type="date"
            {...register('resultAnnouncementDate', { required: 'Result Announcement Date is required' })}
          />
          {errors.resultAnnouncementDate && <ErrorMessage>{errors.resultAnnouncementDate.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Result Status</Label>
          <Select {...register('resultStatus', { required: 'Result Status is required' })}>
            <option value="">Select Status</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
          </Select>
          {errors.resultStatus && <ErrorMessage>{errors.resultStatus.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Score/Marks Obtained</Label>
          <Input
            type="number"
            {...register('score', { required: 'Score is required' })}
            placeholder="Enter score or marks obtained"
          />
          {errors.score && <ErrorMessage>{errors.score.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Rank/Percentile</Label>
          <Input
            {...register('rank')}
            placeholder="Enter rank or percentile (if applicable)"
          />
        </FormGroup>

        <FormGroup>
          <Label>Feedback/Suggestions</Label>
          <Input
            {...register('feedback')}
            placeholder="Enter feedback or suggestions (optional)"
          />
        </FormGroup>

        <FormGroup>
          <Label>Re-evaluation Request</Label>
          <Select {...register('reEvaluation')}>
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </FormGroup>

        <SubmitButton type="submit">Proceed to Payment</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ResultsFeedback;
