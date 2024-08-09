import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ReactFlagsSelect from 'react-flags-select';
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Select,
  SubmitButton,
  ErrorMessage,
  PhoneInputContainer,
} from './StyledComponents';

import countries from '../data/country.json';
import states from '../data/states.json';
import cities from '../data/cities.json';

const RegistrationForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm();
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const navigate = useNavigate();

  const examType = watch('examType');

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    const filteredStates = states.filter(state => state.country_id === countryId);
    setSelectedStates(filteredStates);
    setSelectedCities([]);
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    const filteredCities = cities[2].data.filter(city => city.state_id === stateId);
    setSelectedCities(filteredCities);
  };

  const onSubmit = (data) => {
    const selectedCountry = countries.find(country => country.sortname === selectedCountryCode);
    const formattedPhoneNumber = `+${selectedCountry?.phonecode || ''}${data.mobileNumber}`;

    const selectedState = states.find(state => state.state_id === data.state);
    const selectedCity = selectedCities.find(city => city.city_id === data.city);

    const submissionData = {
      ...data,
      mobileNumber: formattedPhoneNumber,
      country: selectedCountry?.country_name,
      state: selectedState?.state_name,
      city: selectedCity?.city_name,
    };

    console.log(submissionData)

    // Determine the price based on the exam type
    const price = data.examType === 'offline' ? 500 : 300;

    // Navigate to the payment page with submission data and price
    reset()
    navigate('/payment', { state: { submissionData, price } });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            {...register('fullName', { required: 'Full name is required' })}
            placeholder="Enter your full name"
          />
          {errors.fullName && <ErrorMessage>{errors.fullName.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="Enter your email"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Mobile Number</Label>
          <PhoneInputContainer>
            <ReactFlagsSelect
              selected={selectedCountryCode}
              onSelect={(code) => {
                setSelectedCountryCode(code);
                setValue('countryCode', code);
              }}
              searchable
              searchPlaceholder="Search countries"
            />
            <Input
              {...register('mobileNumber', {
                required: 'Mobile number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number"
                }
              })}
              placeholder="Enter your mobile number"
            />
          </PhoneInputContainer>
          {errors.mobileNumber && <ErrorMessage>{errors.mobileNumber.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Preferred Exam Type</Label>
          <Select {...register('examType', { required: 'Exam type is required' })}>
            <option value="">Select Exam Type</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </Select>
          {errors.examType && <ErrorMessage>{errors.examType.message}</ErrorMessage>}
        </FormGroup>

        {examType === 'offline' && (
          <>
            <FormGroup>
              <Label>Country</Label>
              <Select
                {...register('country', { required: 'Country is required' })}
                onChange={handleCountryChange}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.country_id} value={country.country_id}>
                    {country.country_name}
                  </option>
                ))}
              </Select>
              {errors.country && <ErrorMessage>{errors.country.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>State</Label>
              <Select
                {...register('state', { required: 'State is required' })}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>
                {selectedStates.map((state) => (
                  <option key={state.state_id} value={state.state_id}>
                    {state.state_name}
                  </option>
                ))}
              </Select>
              {errors.state && <ErrorMessage>{errors.state.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>City</Label>
              <Select {...register('city', { required: 'City is required' })}>
                <option value="">Select City</option>
                {selectedCities.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {city.city_name}
                  </option>
                ))}
              </Select>
              {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
            </FormGroup>
          </>
        )}

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default RegistrationForm;
