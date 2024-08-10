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
} from '../../StyledComponents'; // Adjust the path as necessary

const ExamContent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { submissionData } = location.state;

  const onSubmit = (data) => {
    const combinedData = { ...submissionData, ...data };
    navigate('/exam-scheduling', { state: { submissionData: combinedData } });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Question Types</Label>
          <Select {...register('questionTypes', { required: 'Question Types are required' })}>
            <option value="">Select Question Type</option>
            <option value="multipleChoice">Multiple Choice</option>
            <option value="trueFalse">True/False</option>
            <option value="shortAnswer">Short Answer</option>
            <option value="essay">Essay</option>
          </Select>
          {errors.questionTypes && <ErrorMessage>{errors.questionTypes.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Number of Questions</Label>
          <Input
            type="number"
            {...register('numberOfQuestions', { required: 'Number of Questions is required' })}
            placeholder="Enter number of questions"
          />
          {errors.numberOfQuestions && <ErrorMessage>{errors.numberOfQuestions.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Section-wise Breakdown</Label>
          <Input
            {...register('sectionBreakdown')}
            placeholder="Enter section-wise breakdown (if applicable)"
          />
        </FormGroup>

        <FormGroup>
          <Label>Syllabus/Topics Covered</Label>
          <Input
            {...register('syllabusTopics', { required: 'Syllabus/Topics are required' })}
            placeholder="Enter syllabus/topics covered"
          />
          {errors.syllabusTopics && <ErrorMessage>{errors.syllabusTopics.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Reference Materials</Label>
          <Input
            {...register('referenceMaterials')}
            placeholder="Enter reference materials (Books, Articles, Videos, etc.)"
          />
        </FormGroup>

        <SubmitButton type="submit">Proceed to Exam Scheduling</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ExamContent;
