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

const ExamAdministration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { submissionData } = location.state;

  const onSubmit = (data) => {
    const combinedData = { ...submissionData, ...data };
    navigate('/results-feedback', { state: { submissionData: combinedData } });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>ID Verification Required</Label>
          <Select {...register('idVerification', { required: 'ID Verification is required' })}>
            <option value="">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
          {errors.idVerification && <ErrorMessage>{errors.idVerification.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Exam Rules and Guidelines</Label>
          <Input
            {...register('examRules', { required: 'Exam Rules are required' })}
            placeholder="Enter exam rules and guidelines"
          />
          {errors.examRules && <ErrorMessage>{errors.examRules.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Allowed/Prohibited Materials</Label>
          <Input
            {...register('allowedMaterials')}
            placeholder="Enter allowed or prohibited materials"
          />
        </FormGroup>

        <FormGroup>
          <Label>Exam Environment Setup Instructions</Label>
          <Input
            {...register('environmentSetup')}
            placeholder="Enter environment setup instructions"
          />
        </FormGroup>

        <SubmitButton type="submit">Proceed to Results & Feedback</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ExamAdministration;
