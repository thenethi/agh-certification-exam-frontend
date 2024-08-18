import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Select,
  SubmitButton,
  ErrorMessage,
  Title
} from '../../StyledComponents';

const ExamDetails = () => {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { examId } = useParams();
  const [loading, setLoading] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const location=useLocation()
  const { submissionData } = location.state || {};

  useEffect(() => {
    if (examId) {
      axios.get(`${process.env.REACT_APP_ADMIN_APP_URL}/${examId}`)
        .then(response => {
          const data = response.data;
          setValue('examTitle', data.examTitle || '');
          setValue('examDescription', data.examDescription || '');
          setValue('examCategory', data.examCategory || ''); 
          setValue('examCode', data.examCode || '');
          setValue('examDuration', data.examDuration || '');
          setValue('totalMarks', data.totalMarks || '');
          setValue('passingCriteria', data.passingCriteria || '');
          setValue('attemptsAllowed', data.attemptsAllowed || '');
          setValue('examFee', data.examFee || '');
          setLoading(false);
          setIsReadOnly(true); 
        })
        .catch(error => {
          console.error('Error fetching exam details:', error);
          setLoading(false);
        });
    }
  }, [examId, setValue]);

  const onSubmit = (data) => {
    // Combine form data with existing data
    const combinedData = {...submissionData, ...data };
    navigate(`/certificate-details/${examId}`, { state: { submissionData: combinedData, price: data.examFee } });
  };

  return (
    <FormContainer>
      <Title>Exam Details</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Exam Title</Label>
            <Input
              {...register('examTitle', { required: 'Exam Title is required' })}
              placeholder="Enter exam title"
              readOnly={isReadOnly} // Apply readOnly attribute
            />
            {errors.examTitle && <ErrorMessage>{errors.examTitle.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Exam Description</Label>
            <Input
              {...register('examDescription', { required: 'Exam Description is required' })}
              placeholder="Enter exam description"
              readOnly={isReadOnly} // Apply readOnly attribute
            />
            {errors.examDescription && <ErrorMessage>{errors.examDescription.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Exam Category</Label>
            <Controller
              control={control}
              name="examCategory"
              rules={{ required: 'Exam Category is required' }}
              render={({ field }) => (
                <Select {...field} disabled={isReadOnly}>
                  <option value="">Select Category</option>
                  <option value="Technical">Technical</option>
                  <option value="Aptitude">Aptitude</option>
                  <option value="Language">Language</option>
                </Select>
              )}
            />
            {errors.examCategory && <ErrorMessage>{errors.examCategory.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Exam Code</Label>
            <Input
              {...register('examCode', { required: 'Exam Code is required' })}
              placeholder="Enter exam code"
              readOnly={isReadOnly} // Apply readOnly attribute
            />
            {errors.examCode && <ErrorMessage>{errors.examCode.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Exam Duration (in minutes)</Label>
            <Input
              type="number"
              {...register('examDuration', { required: 'Exam Duration is required' })}
              placeholder="Enter exam duration"
              readOnly={isReadOnly} // Apply readOnly attribute
            />
            {errors.examDuration && <ErrorMessage>{errors.examDuration.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Total Marks</Label>
            <Input
              type="number"
              {...register('totalMarks', { required: 'Total Marks is required' })}
              placeholder="Enter total marks"
              readOnly={isReadOnly} // Apply readOnly attribute
            />
            {errors.totalMarks && <ErrorMessage>{errors.totalMarks.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Passing Criteria</Label>
            <Input
              {...register('passingCriteria', { required: 'Passing Criteria is required' })}
              placeholder="Enter passing criteria"
              readOnly={isReadOnly} // Apply readOnly attribute
            />
            {errors.passingCriteria && <ErrorMessage>{errors.passingCriteria.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Number of Attempts Allowed</Label>
            <Input
              type="number"
              {...register('attemptsAllowed', { required: 'Number of Attempts is required' })}
              placeholder="Enter number of attempts allowed"
              readOnly={isReadOnly} // Apply readOnly attribute
            />
            {errors.attemptsAllowed && <ErrorMessage>{errors.attemptsAllowed.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Exam Fee</Label>
            <Input
              type="number"
              {...register('examFee', { required: 'Exam Fee is required' })}
              placeholder="Enter exam fee"
              readOnly={isReadOnly} // Apply readOnly attribute
            />
            {errors.examFee && <ErrorMessage>{errors.examFee.message}</ErrorMessage>}
          </FormGroup>

          <SubmitButton type="submit">Proceed to Certifications</SubmitButton>
        </form>
      )}
    </FormContainer>
  );
};

export default ExamDetails;
