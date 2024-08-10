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
} from '../../StyledComponents';

const ExamDetails = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { submissionData } = location.state;

  const onSubmit = (data) => {
    const combinedData = { ...submissionData, ...data };
    navigate('/certificate-details', { state: { submissionData: combinedData, price: data.examFee } });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Exam Title</Label>
          <Input
            {...register('examTitle', { required: 'Exam Title is required' })}
            placeholder="Enter exam title"
          />
          {errors.examTitle && <ErrorMessage>{errors.examTitle.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Exam Description</Label>
          <Input
            {...register('examDescription', { required: 'Exam Description is required' })}
            placeholder="Enter exam description"
          />
          {errors.examDescription && <ErrorMessage>{errors.examDescription.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Exam Category</Label>
          <Select {...register('examCategory', { required: 'Exam Category is required' })}>
            <option value="">Select Category</option>
            <option value="technical">Technical</option>
            <option value="aptitude">Aptitude</option>
            <option value="language">Language</option>
          </Select>
          {errors.examCategory && <ErrorMessage>{errors.examCategory.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Exam Code</Label>
          <Input
            {...register('examCode', { required: 'Exam Code is required' })}
            placeholder="Enter exam code"
          />
          {errors.examCode && <ErrorMessage>{errors.examCode.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Exam Duration (in minutes)</Label>
          <Input
            type="number"
            {...register('examDuration', { required: 'Exam Duration is required' })}
            placeholder="Enter exam duration"
          />
          {errors.examDuration && <ErrorMessage>{errors.examDuration.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Total Marks</Label>
          <Input
            type="number"
            {...register('totalMarks', { required: 'Total Marks is required' })}
            placeholder="Enter total marks"
          />
          {errors.totalMarks && <ErrorMessage>{errors.totalMarks.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Passing Criteria</Label>
          <Input
            {...register('passingCriteria', { required: 'Passing Criteria is required' })}
            placeholder="Enter passing criteria"
          />
          {errors.passingCriteria && <ErrorMessage>{errors.passingCriteria.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Number of Attempts Allowed</Label>
          <Input
            type="number"
            {...register('attemptsAllowed', { required: 'Number of Attempts is required' })}
            placeholder="Enter number of attempts allowed"
          />
          {errors.attemptsAllowed && <ErrorMessage>{errors.attemptsAllowed.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Exam Fee</Label>
          <Input
            type="number"
            {...register('examFee', { required: 'Exam Fee is required' })}
            placeholder="Enter exam fee"
          />
          {errors.examFee && <ErrorMessage>{errors.examFee.message}</ErrorMessage>}
        </FormGroup>

        <SubmitButton type="submit">Proceed to Certifications</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ExamDetails;