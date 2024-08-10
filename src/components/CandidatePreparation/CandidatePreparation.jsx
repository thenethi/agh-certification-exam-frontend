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
} from '../../StyledComponents';

const CandidatePreparation = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { submissionData } = location.state;

  const onSubmit = (data) => {
    const combinedData = { ...submissionData, ...data };
    navigate('/exam-administration', { state: { submissionData: combinedData } });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Study Guides</Label>
          <Input
            {...register('studyGuides')}
            placeholder="Enter study guides"
          />
        </FormGroup>

        <FormGroup>
          <Label>Practice Tests/Mock Exams</Label>
          <Input
            {...register('practiceTests')}
            placeholder="Enter practice tests or mock exams details"
          />
        </FormGroup>

        <FormGroup>
          <Label>Previous Year Question Papers</Label>
          <Input
            {...register('previousYearPapers')}
            placeholder="Enter previous year question papers"
          />
        </FormGroup>

        <FormGroup>
          <Label>Tutorial Videos</Label>
          <Input
            {...register('tutorialVideos')}
            placeholder="Enter tutorial videos"
          />
        </FormGroup>

        <FormGroup>
          <Label>FAQs and Tips</Label>
          <Input
            {...register('faqsTips')}
            placeholder="Enter FAQs and tips"
          />
        </FormGroup>

        <SubmitButton type="submit">Proceed to Exam Administration</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CandidatePreparation;
