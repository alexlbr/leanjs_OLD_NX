import React from 'react';

import { TRAINING_TYPE_WORKSHOP } from '../../../../config/data';
import Section from '../../CurriculumSection';
import StylingInReactSession, {
  titleSession as titleSession2,
} from '../../sessions/StylingInReactSession';
import DesignSystemSession, {
  titleSession as titleSession3,
} from '../../sessions/DesignSystemSession';
import Curriculum from '../../Curriculum';

const CurriculumStylingAndAdvUI = ({ showTitle = true, section, ...rest }) => (
  <Curriculum
    title={showTitle ? '1-Day Styling & Design Systems Curriculum' : ''}
    trainingType={TRAINING_TYPE_WORKSHOP}
    {...rest}
    firstHalf={
      <React.Fragment>
        <Section
          title={titleSession2}
          trainingType={TRAINING_TYPE_WORKSHOP}
          {...section}
        >
          <StylingInReactSession title="" />
        </Section>
        <Section
          title={titleSession3}
          trainingType={TRAINING_TYPE_WORKSHOP}
          {...section}
        >
          <DesignSystemSession title="" />
        </Section>
      </React.Fragment>
    }
  />
);

export default CurriculumStylingAndAdvUI;
