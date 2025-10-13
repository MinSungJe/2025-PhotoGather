import { useState } from 'react';
import useFunnelHistory from './useFunnelHistory';

const useFunnel = <Step extends string>(initialStep: Step) => {
  const [funnelStep, setFunnelStep] = useState<Step>(initialStep);

  const { navigateToNext } = useFunnelHistory<Step>(funnelStep, setFunnelStep);

  const goNextStep = (nextStep: Step) => {
    navigateToNext(nextStep);
    setFunnelStep(nextStep);
  };

  return { funnelStep, setFunnelStep, goNextStep };
};

export default useFunnel;
