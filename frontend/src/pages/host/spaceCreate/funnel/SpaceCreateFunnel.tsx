import { Activity } from 'react';
import StepProgressBar from '../../../../components/@common/progressBar/step/StepProgressBar';
import useConfirmBeforeRefresh from '../../../../hooks/@common/useConfirmBeforeRefresh';
import useFormFunnel from '../../../../hooks/domain/funnel/useFormFunnel';
import type {
  CreateFunnelForm,
  CreateFunnelStep,
} from '../../../../types/funnel.type';
import SpaceDescriptionElement from '../funnelElements/SpaceDescriptionElement';
import SpaceNameElement from '../funnelElements/SpaceNameElement';
import SpaceCheckElement from '../funnelElements/spaceCheckElement/SpaceCheckElement';
import SpaceDetailElement from '../funnelElements/spaceDetailElement/SpaceDetailElement';
import SpaceVisibilityElement from '../funnelElements/spaceVisibilityElement/SpaceVisibilityElement';
import * as S from './SpaceCreateFunnel.styles';

const PROGRESS_STEP_LIST: readonly CreateFunnelStep[] = [
  'name',
  'accessType',
  'description',
  'detail',
  'check',
] as const;
const initialCreateFunnelForm: CreateFunnelForm = {
  name: '',
  description: '',
  visibility: 'PUBLIC',
  profileImage: [],
  email: '',
  instagram: '',
};

const SpaceCreateFunnel = () => {
  useConfirmBeforeRefresh();

  const Funnel = useFormFunnel<CreateFunnelStep, CreateFunnelForm>(
    'name',
    initialCreateFunnelForm,
  );
  const currentStepIndex = PROGRESS_STEP_LIST.indexOf(Funnel.funnelStep) + 1;

  return (
    <S.Wrapper>
      <StepProgressBar
        currentStep={currentStepIndex}
        maxStep={PROGRESS_STEP_LIST.length}
      />
      <S.TopContainer></S.TopContainer>
      <S.ContentContainer>
        <Activity mode={Funnel.funnelStep === 'name' ? 'visible' : 'hidden'}>
          <SpaceNameElement
            onNext={(name) => Funnel.goNextWithData('accessType', { name })}
          />
        </Activity>
        <Activity
          mode={Funnel.funnelStep === 'accessType' ? 'visible' : 'hidden'}
        >
          <SpaceVisibilityElement
            onNext={(visibility) =>
              Funnel.goNextWithData('description', { visibility })
            }
          />
        </Activity>
        <Activity
          mode={Funnel.funnelStep === 'description' ? 'visible' : 'hidden'}
        >
          <SpaceDescriptionElement
            onNext={(description) =>
              Funnel.goNextWithData('detail', { description })
            }
          />
        </Activity>
        <Activity mode={Funnel.funnelStep === 'detail' ? 'visible' : 'hidden'}>
          <SpaceDetailElement
            onNext={(detail) => Funnel.goNextWithData('check', { ...detail })}
          />
        </Activity>
        <Activity mode={Funnel.funnelStep === 'check' ? 'visible' : 'hidden'}>
          <SpaceCheckElement createFunnelForm={Funnel.form} onNext={() => {}} />
        </Activity>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default SpaceCreateFunnel;
