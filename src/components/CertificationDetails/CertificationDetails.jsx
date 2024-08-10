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

const CertificationDetails = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { submissionData } = location.state;

  const onSubmit = (data) => {
    const combinedData = { ...submissionData, ...data };
    navigate('/exam-content', { state: { submissionData: combinedData } });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Certification Title</Label>
          <Input
            {...register('certificationTitle', { required: 'Certification Title is required' })}
            placeholder="Enter certification title"
          />
          {errors.certificationTitle && <ErrorMessage>{errors.certificationTitle.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Certification Level</Label>
          <Select {...register('certificationLevel', { required: 'Certification Level is required' })}>
            <option value="">Select Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Select>
          {errors.certificationLevel && <ErrorMessage>{errors.certificationLevel.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Validity Period (in years)</Label>
          <Input
            type="number"
            {...register('validityPeriod', { required: 'Validity Period is required' })}
            placeholder="Enter validity period"
          />
          {errors.validityPeriod && <ErrorMessage>{errors.validityPeriod.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Certification ID</Label>
          <Input
            {...register('certificationId', { required: 'Certification ID is required' })}
            placeholder="Enter certification ID"
          />
          {errors.certificationId && <ErrorMessage>{errors.certificationId.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Certification Authority</Label>
          <Input
            {...register('certificationAuthority', { required: 'Certification Authority is required' })}
            placeholder="Enter certification authority"
          />
          {errors.certificationAuthority && <ErrorMessage>{errors.certificationAuthority.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Issue Date</Label>
          <Input
            type="date"
            {...register('issueDate', { required: 'Issue Date is required' })}
          />
          {errors.issueDate && <ErrorMessage>{errors.issueDate.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Expiry Date (if applicable)</Label>
          <Input
            type="date"
            {...register('expiryDate')}
          />
        </FormGroup>

        <FormGroup>
          <Label>Renewal Criteria</Label>
          <Input
            {...register('renewalCriteria', { required: 'Renewal Criteria is required' })}
            placeholder="Enter renewal criteria"
          />
          {errors.renewalCriteria && <ErrorMessage>{errors.renewalCriteria.message}</ErrorMessage>}
        </FormGroup>

        <SubmitButton type="submit">Proceed to Exam Content</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CertificationDetails;
