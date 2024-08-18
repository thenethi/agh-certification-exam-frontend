import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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

const ExamAdministration = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
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
          setValue('idVerification', data.idVerificationRequired || '');
          setValue('examRules', data.examRules || '');
          setValue('allowedMaterials', data.allowedMaterials || '');
          setValue('environmentSetup', data.environmentSetup || '');

          setLoading(false);
          setIsEditable(false); // Set form to non-editable after fetching
        })
        .catch(error => {
          console.error('Error fetching exam administration details:', error);
          setLoading(false);
        });
    }
  }, [examId, setValue]);

  const onSubmit = (data) => {
    const combinedData = { ...submissionData, ...data };
    navigate(`/results-feedback/${examId}`, { state: { submissionData: combinedData } });
  };

  return (
    <FormContainer>
      <Title>Exam Administration</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>ID Verification Required</Label>
            <Select 
              {...register('idVerification', { required: 'ID Verification is required' })}
              disabled={!isEditable}
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
            {errors.idVerification && <ErrorMessage>{errors.idVerification.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Exam Rules and Guidelines</Label>
            <Input
              {...register('examRules', { required: 'Exam Rules are required' })}
              placeholder="Enter exam rules and guidelines"
              disabled={!isEditable}
            />
            {errors.examRules && <ErrorMessage>{errors.examRules.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Allowed/Prohibited Materials</Label>
            <Input
              {...register('allowedMaterials')}
              placeholder="Enter allowed or prohibited materials"
              disabled={!isEditable}
            />
          </FormGroup>

          <FormGroup>
            <Label>Exam Environment Setup Instructions</Label>
            <Input
              {...register('environmentSetup')}
              placeholder="Enter environment setup instructions"
              disabled={!isEditable}
            />
          </FormGroup>

          <SubmitButton type="submit">Proceed to Results & Feedback</SubmitButton>
        </form>
      )}
    </FormContainer>
  );
};

export default ExamAdministration;