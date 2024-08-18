import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
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

const CertificationDetails = () => {
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { examId } = useParams(); 
  const { submissionData } = location.state || {}; 

  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(true); 

  useEffect(() => {
    if (examId) {
      axios.get(`${process.env.REACT_APP_ADMIN_APP_URL}/${examId}`)
        .then(response => {
          const data = response.data;
          setValue('certificationTitle', data.certificationTitle || '');
          setValue('certificationLevel', data.certificationLevel || '');
          setValue('validityPeriod', data.validityPeriod || '');
          setValue('certificationId', data.certificationId || '');
          setValue('certificationAuthority', data.certificationAuthority || '');
          setValue('issueDate', data.issueDate || '');
          setValue('expiryDate', data.expiryDate || '');
          setValue('renewalCriteria', data.renewalCriteria || '');

          setLoading(false);
          setIsEditable(false); // Set form to non-editable after fetching
        })
        .catch(error => {
          console.error('Error fetching certification details:', error);
          setLoading(false);
        });
    }
  }, [examId, setValue]);

  const onSubmit = (data) => {
    const combinedData = { ...submissionData, ...data };
    navigate(`/exam-content/${examId}`, { state: { submissionData: combinedData } });
  };

  return (
    <FormContainer>
      <Title>Certification Details</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Certification Title</Label>
            <Input
              {...register('certificationTitle', { required: 'Certification Title is required' })}
              placeholder="Enter certification title"
              disabled={!isEditable}
            />
            {errors.certificationTitle && <ErrorMessage>{errors.certificationTitle.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Certification Level</Label>
            <Controller
              name="certificationLevel"
              control={control}
              rules={{ required: 'Certification Level is required' }}
              render={({ field }) => (
                <Select {...field} disabled={!isEditable}>
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Select>
              )}
            />
            {errors.certificationLevel && <ErrorMessage>{errors.certificationLevel.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Validity Period (in years)</Label>
            <Input
              type="number"
              {...register('validityPeriod', { required: 'Validity Period is required' })}
              placeholder="Enter validity period"
              disabled={!isEditable}
            />
            {errors.validityPeriod && <ErrorMessage>{errors.validityPeriod.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Certification ID</Label>
            <Input
              {...register('certificationId', { required: 'Certification ID is required' })}
              placeholder="Enter certification ID"
              disabled={!isEditable}
            />
            {errors.certificationId && <ErrorMessage>{errors.certificationId.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Certification Authority</Label>
            <Input
              {...register('certificationAuthority', { required: 'Certification Authority is required' })}
              placeholder="Enter certification authority"
              disabled={!isEditable}
            />
            {errors.certificationAuthority && <ErrorMessage>{errors.certificationAuthority.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Issue Date</Label>
            <Input
              type="date"
              {...register('issueDate', { required: 'Issue Date is required' })}
              disabled={!isEditable}
            />
            {errors.issueDate && <ErrorMessage>{errors.issueDate.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Expiry Date (if applicable)</Label>
            <Input
              type="date"
              {...register('expiryDate')}
              disabled={!isEditable}
            />
          </FormGroup>

          <FormGroup>
            <Label>Renewal Criteria</Label>
            <Input
              {...register('renewalCriteria', { required: 'Renewal Criteria is required' })}
              placeholder="Enter renewal criteria"
              disabled={!isEditable}
            />
            {errors.renewalCriteria && <ErrorMessage>{errors.renewalCriteria.message}</ErrorMessage>}
          </FormGroup>

          <SubmitButton type="submit">Proceed to Exam Content</SubmitButton>
        </form>
      )}
    </FormContainer>
  );
};

export default CertificationDetails;
