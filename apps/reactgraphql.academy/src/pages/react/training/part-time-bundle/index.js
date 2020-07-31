import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Link from 'src/components/navigation/Link';
import NextTrainingButton from 'src/components/training/NextTrainingButton';
import Section, { TopSection } from 'src/components/layout/Section';
import { Col, Row } from 'src/components/layout/Grid';
import { H2, P } from 'src/components/text';
import Ul, { Li } from 'src/components/layout/Ul';
import {
  AttendeeQuote,
  UpcomingTrainingSection,
  TrustedBySection,
  selectUpcomingTrainings,
  selectNthTraining,
} from 'src/components/training';
import { Segment } from 'src/components/elements';
import CurriculumReactCompletePartTime from 'src/components/curriculum/CurriculumReactCompletePartTime';
import Header from 'src/components/layout/Header';
import {
  TECH_REACT,
  PART_TIME,
  REACT_BOOTCAMP_ID,
  TRAINING_TYPE_FULL_CURRICULUM,
} from 'src/config/data';
import header from 'src/components/layout/Header.json';
import { createMetas } from 'src/components/utils';
import { WHY_REACTJS_ACADEMY } from 'src/config/images.js';
import { FAQSection, getMetaData } from 'src/components/training/PageContent';

const defaultMetas = {
  title: 'React Part-Time Training | React GraphQL Academy',
  description:
    'Interested in a React training? Learn the main libraries of the React ecosystem and become a confident React developer with our React part-time training.',
  image: WHY_REACTJS_ACADEMY,
  type: 'website',
};

const trainingType = TRAINING_TYPE_FULL_CURRICULUM;
const trainingInstanceTypeName = PART_TIME;
const trainingId = REACT_BOOTCAMP_ID;

const CompletePartTime = ({ trainings, path, data }) => {
  const upcomingPartTimeTrainings = selectUpcomingTrainings({
    trainingInstanceTypeName,
    trainings,
    trainingId,
  });
  const nextTraining = selectNthTraining({
    trainings: upcomingPartTimeTrainings,
  });

  const metas = getMetaData({
    defaultMetas,
    metaData: data.sanityTrainingPage,
  });

  return (
    <React.Fragment>
      <Helmet title={metas.title}>{createMetas(metas)}</Helmet>
      <Header
        breadcrumbPath={[
          { to: '/', label: 'Home' },
          { to: '/react', label: 'React' },
          { to: '/react/training/', label: 'Training' },
          {
            to: path,
            label: 'Part-time Bundle',
          },
        ]}
        tech={TECH_REACT}
        titleLines={['React Part-time Bundle Training', 'In-person or Remote']}
        subtitle="Master the React ecosystem by working with industry experts without having to cut into valuable work"
        trainingType={trainingType}
        links={header.landingPageLinks.links}
      />
      <TopSection>
        <Segment>
          <CurriculumReactCompletePartTime
            trainings={upcomingPartTimeTrainings}
            pageData={data.sanityTrainingPage}
          />
        </Segment>
      </TopSection>
      <Section>
        <Row>
          <Col md={5} mdOffset={1}>
            <AttendeeQuote
              quote="Whatever business you're in, [the training will] enhance your work. It helped my confidence and boosted me to be in line for a promotion!"
              fullname="Lara Ramey"
              job="Software Developer"
              company="Meredith Corporation"
              youtubeId="4NY7HCRPhWA"
            />
          </Col>
          <Col md={4} mdOffset={1}>
            <Link to="#target-audience" name="target-audience" />
            <H2>Is this React part-time training right for me?</H2>
            <P>
              If you're ready for a complete React training but don't want to
              miss work or projects, this is the training that suits you. It's
              not for beginners, so make sure you meet the{' '}
              <Link to="/react/how-to-choose-our-react-training-combination-that-suits-you-best/">
                requirements
              </Link>{' '}
              before enrolling.
            </P>
            <P>
              It's a personal mentoring type of training, where experts work
              alongside you and help you understand React step by step.
            </P>
            {/* <Ul>
              <Li>Meaningful, collaborative learning</Li>
              <Li>
                Personal mentoring rather than massive online open courses
              </Li>
              <Li>Don't miss work days or projects</Li>
              <Li>Not for beginners!</Li>
              <Li>Discuss real-world projects to learn best practices</Li>
              <Li>Expert coaches with extensive React experience</Li>
            </Ul> */}
            <NextTrainingButton
              type="part-time course"
              training={nextTraining}
            />
          </Col>
        </Row>
      </Section>
      <FAQSection pageData={data.sanityTrainingPage} />
      <TrustedBySection />
      <UpcomingTrainingSection trainings={trainings} />
    </React.Fragment>
  );
};

export const query = graphql`
  query reactPartTimeBundle($path: String!) {
    sanityTrainingPage(path: { eq: $path }) {
      ...sanityTrainingPageFragment
    }
  }
`;

export default CompletePartTime;
