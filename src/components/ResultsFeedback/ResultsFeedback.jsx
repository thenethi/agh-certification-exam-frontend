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
  ErrorMessage,
  Select,
  Title
} from '../../StyledComponents';

const ResultsFeedback = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { examId } = useParams();
  const { submissionData } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(true);
  const [examFee, setExamFee] = useState(0);
  const [message, setMessage]=useState('')

  useEffect(() => {
    if (examId) {
      axios.get(`${process.env.REACT_APP_ADMIN_APP_URL}/${examId}`)
        .then(response => {
          const data = response.data;
          console.log('Fetched results and feedback details:', data);

          setValue('resultAnnouncementDate', data.resultDate || '');
          setValue('resultStatus', data.resultStatus || '');
          setValue('score', data.score || '');
          setValue('rank', data.rank || '');
          setValue('feedback', data.feedback || '');
          setValue('reEvaluation', data.reevaluationOption || '');

          setExamFee(parseFloat(data.examFee) || 0);
          setLoading(false);
          setIsEditable(false);
        })
        .catch(error => {
          console.error('Error fetching results and feedback details:', error);
          setLoading(false);
        });
    }
  }, [examId, setValue]);

  const onSubmit = async(data) => {
    const combinedData = { ...submissionData, ...data };
    if (examFee > 0) {
      navigate(`/payment/${examId}`, { state: { submissionData: combinedData } });
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/register-exam`, {submissionData:combinedData});
        if(response.status===200){
          setMessage(response.data.message)
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <FormContainer>
      <Title>Results & Feedback</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Result Announcement Date</Label>
            <Input
              type="date"
              {...register('resultAnnouncementDate', { required: 'Result Announcement Date is required' })}
              disabled={!isEditable}
            />
            {errors.resultAnnouncementDate && <ErrorMessage>{errors.resultAnnouncementDate.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Result Status</Label>
            <Select 
              {...register('resultStatus')}
              disabled={!isEditable}
            >
              <option value="">Select Status</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </Select>
            {errors.resultStatus && <ErrorMessage>{errors.resultStatus.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Score/Marks Obtained</Label>
            <Input
              type="number"
              {...register('score')}
              placeholder="Enter score or marks obtained"
              disabled={!isEditable}
            />
            {errors.score && <ErrorMessage>{errors.score.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Rank/Percentile</Label>
            <Input
              {...register('rank')}
              placeholder="Enter rank or percentile (if applicable)"
              disabled={!isEditable}
            />
          </FormGroup>

          <FormGroup>
            <Label>Feedback/Suggestions</Label>
            <Input
              {...register('feedback')}
              placeholder="Enter feedback or suggestions (optional)"
              disabled={!isEditable}
            />
          </FormGroup>

          <FormGroup>
            <Label>Re-evaluation Request</Label>
            <Select 
              {...register('reEvaluation')}
              disabled={!isEditable}
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </FormGroup>

          <SubmitButton type="submit">
            {examFee > 0 ? 'Proceed to Payment' : 'Submit'}
          </SubmitButton>
          {message && <p>{message}</p>}
        </form>
      )}
    </FormContainer>
  );
};

export default ResultsFeedback;