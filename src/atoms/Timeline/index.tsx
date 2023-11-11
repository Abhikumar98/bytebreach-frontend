import TimelineStep from '@mui/material/Step';
import StepConnector from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import React from 'react';

export interface TimelineStep<T> {
  value: T;
  label: string;
}

interface CustomStepperProps<T> {
  steps: TimelineStep<T>[];
  currentValue: T;
}

const CustomStepper = <T,>({ steps, currentValue }: CustomStepperProps<T>) => {
  // Find the index of the current step
  const activeStep = steps.findIndex((step) => step.value === currentValue);

  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<StepConnector />}
    >
      {steps.map((step, index) => (
        <TimelineStep key={typeof step.value === 'number' ? step.value : index}>
          <StepLabel>{step.label}</StepLabel>
        </TimelineStep>
      ))}
    </Stepper>
  );
};

export default CustomStepper;
