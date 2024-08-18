import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useLocation,useParams } from 'react-router-dom';
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

const ExamScheduling = () => {
  const { register, handleSubmit, control, setValue, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const {examId}=useParams();
  const { submissionData } = location.state;
  const [loading, setLoading] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState(false);

  useEffect(() => {
      axios.get(`${process.env.REACT_APP_ADMIN_APP_URL}/${examId}`)
      .then(response => {
        const data = response.data;
        setValue('examDate', data.examDate || '');
        setValue('examTime', data.examTime || '');
        setValue('timeZone', data.timeZone || '');
        setValue('rescheduleOption', data.rescheduleOption || '');
        setValue('reschedulePolicy', data.reschedulePolicy || '');
        setValue('slotBooking', data.slotBooking || '');
        setLoading(false);
        setIsReadOnly(true); 
      })
      .catch(error => {
        console.error('Error fetching exam scheduling details:', error);
        setLoading(false);
      });
  }, [examId, setValue]);

  const onSubmit = (data) => {
    const combinedData = { ...submissionData, ...data };
    navigate(`/candidate-preparation/${examId}`, { state: { submissionData: combinedData } });
  };

  return (
    <FormContainer>
      <Title>Exam Scheduling</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Exam Date</Label>
            <Input
              type="date"
              {...register('examDate', { required: 'Exam Date is required' })}
              readOnly={isReadOnly}
            />
            {errors.examDate && <ErrorMessage>{errors.examDate.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Exam Time</Label>
            <Input
              type="time"
              {...register('examTime', { required: 'Exam Time is required' })}
              readOnly={isReadOnly}
            />
            {errors.examTime && <ErrorMessage>{errors.examTime.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Time Zone</Label>
            <Controller
              control={control}
              name="timeZone"
              rules={{ required: 'Time Zone is required' }}
              render={({ field }) => (
                <Select {...field} disabled={isReadOnly}>
                  <option value="">Select Time Zone</option>
                  <option value="Asia/Kolkata">IST (Indian Standard Time)</option>
                  <option value="America/New_York">EST (Eastern Standard Time)</option>
                  <option value="America/Los_Angeles">PST (Pacific Standard Time)</option>
                  <option value="Europe/London">GMT (Greenwich Mean Time)</option>
                  <option value="Europe/Paris">CET (Central European Time)</option>
                  <option value="Asia/Tokyo">JST (Japan Standard Time)</option>
                  <option value="Australia/Sydney">AEDT (Australian Eastern Daylight Time)</option>
                </Select>
              )}
            />
            {errors.timeZone && <ErrorMessage>{errors.timeZone.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Reschedule Option</Label>
            <Controller
              control={control}
              name="rescheduleOption"
              rules={{ required: 'Reschedule Option is required' }}
              render={({ field }) => (
                <Select {...field} disabled={isReadOnly}>
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              )}
            />
            {errors.rescheduleOption && <ErrorMessage>{errors.rescheduleOption.message}</ErrorMessage>}
          </FormGroup>

          {watch('rescheduleOption') === 'yes' && (
            <FormGroup>
              <Label>Reschedule Policy</Label>
              <Input
                {...register('reschedulePolicy')}
                placeholder="Enter reschedule policy (if applicable)"
                readOnly={isReadOnly}
              />
            </FormGroup>
          )}

          <FormGroup>
            <Label>Slot Booking</Label>
            <Input
              {...register('slotBooking')}
              placeholder="Enter slot booking details (if applicable)"
              readOnly={isReadOnly}
            />
          </FormGroup>

          <SubmitButton type="submit">Proceed to Candidate Preparation</SubmitButton>
        </form>
      )}
    </FormContainer>
  );
};

export default ExamScheduling;
