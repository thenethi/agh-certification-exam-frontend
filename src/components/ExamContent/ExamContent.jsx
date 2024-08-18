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

const ExamContent = () => {
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
          setValue('questionTypes', data.questionTypes || '');
          setValue('numberOfQuestions', data.numberOfQuestions || '');
          setValue('sectionBreakdown', data.sectionBreakdown || '');
          setValue('syllabusTopics', data.syllabus || '');
          setValue('referenceMaterials', data.referenceMaterials || '');

          setLoading(false);
          setIsEditable(false); // Set form to non-editable after fetching
        })
        .catch(error => {
          console.error('Error fetching exam content details:', error);
          setLoading(false);
        });
    }
  }, [examId, setValue]);

  const onSubmit = (data) => {
    const combinedData = { ...submissionData, ...data };
    navigate(`/exam-scheduling/${examId}`, { state: { submissionData: combinedData } });
  };

  return (
    <FormContainer>
      <Title>Exam Content</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Question Types</Label>
            <Controller
              name="questionTypes"
              control={control}
              rules={{ required: 'Question Types are required' }}
              render={({ field }) => (
                <Select {...field} disabled={!isEditable}>
                  <option value="">Select Question Type</option>
                  <option value="Multiple Choice">Multiple Choice</option>
                  <option value="True/False">True/False</option>
                  <option value="Short Answer">Short Answer</option>
                  <option value="Essay">Essay</option>
                </Select>
              )}
            />
            {errors.questionTypes && <ErrorMessage>{errors.questionTypes.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Number of Questions</Label>
            <Input
              type="number"
              {...register('numberOfQuestions', { required: 'Number of Questions is required' })}
              placeholder="Enter number of questions"
              disabled={!isEditable}
            />
            {errors.numberOfQuestions && <ErrorMessage>{errors.numberOfQuestions.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Section-wise Breakdown</Label>
            <Input
              {...register('sectionBreakdown')}
              placeholder="Enter section-wise breakdown (if applicable)"
              disabled={!isEditable}
            />
          </FormGroup>

          <FormGroup>
            <Label>Syllabus/Topics Covered</Label>
            <Input
              {...register('syllabusTopics', { required: 'Syllabus/Topics are required' })}
              placeholder="Enter syllabus/topics covered"
              disabled={!isEditable}
            />
            {errors.syllabusTopics && <ErrorMessage>{errors.syllabusTopics.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Reference Materials</Label>
            <Input
              {...register('referenceMaterials')}
              placeholder="Enter reference materials (Books, Articles, Videos, etc.)"
              disabled={!isEditable}
            />
          </FormGroup>

          <SubmitButton type="submit">Proceed to Exam Scheduling</SubmitButton>
        </form>
      )}
    </FormContainer>
  );
};

export default ExamContent;
