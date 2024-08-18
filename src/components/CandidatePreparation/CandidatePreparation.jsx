import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  Title
} from '../../StyledComponents';

const CandidatePreparation = () => {
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
          setValue('studyGuides', data.studyGuides || '');
          setValue('practiceTests', data.practiceTests || '');
          setValue('previousYearPapers', data.previousYearPapers || '');
          setValue('tutorialVideos', data.tutorialVideos || '');
          setValue('faqsAndTips', data.faqsAndTips || '');

          setLoading(false);
          setIsEditable(false); // Set form to non-editable after fetching
        })
        .catch(error => {
          console.error('Error fetching candidate preparation details:', error);
          setLoading(false);
        });
    }
  }, [examId, setValue]);

  const onSubmit = (data) => {
    const combinedData = { ...submissionData, ...data };
    navigate(`/exam-administration/${examId}`, { state: { submissionData: combinedData } });
  };

  return (
    <FormContainer>
      <Title>Candidate Preparation</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Study Guides</Label>
            <Input
              {...register('studyGuides')}
              placeholder="Enter study guides"
              disabled={!isEditable}
            />
          </FormGroup>

          <FormGroup>
            <Label>Practice Tests/Mock Exams</Label>
            <Input
              {...register('practiceTests')}
              placeholder="Enter practice tests or mock exams details"
              disabled={!isEditable}
            />
          </FormGroup>

          <FormGroup>
            <Label>Previous Year Question Papers</Label>
            <Input
              {...register('previousYearPapers')}
              placeholder="Enter previous year question papers"
              disabled={!isEditable}
            />
          </FormGroup>

          <FormGroup>
            <Label>Tutorial Videos</Label>
            <Input
              {...register('tutorialVideos')}
              placeholder="Enter tutorial videos"
              disabled={!isEditable}
            />
          </FormGroup>

          <FormGroup>
            <Label>FAQs and Tips</Label>
            <Input
              {...register('faqsAndTips')}
              placeholder="Enter FAQs and tips"
              disabled={!isEditable}
            />
          </FormGroup>

          <SubmitButton type="submit">Proceed to Exam Administration</SubmitButton>
        </form>
      )}
    </FormContainer>
  );
};

export default CandidatePreparation;