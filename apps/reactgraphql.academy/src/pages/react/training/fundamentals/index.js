import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import { FAQSection, getMetaData } from 'src/components/training/PageContent';
import { BOOTCAMP } from 'src/../images/imageNames';
import { formatUTC } from 'src/components/utils';
import { LinkButton } from 'src/components/buttons';
import Link from 'src/components/navigation/Link';
import Section, { TopSection } from 'src/components/layout/Section';
import { Col, Row } from 'src/components/layout/Grid';
import { H2, P } from 'src/components/text';
import Ul, { Li } from 'src/components/layout/Ul';
import CurriculumReactFundamentals from 'src/components/curriculum/CurriculumReactFundamentals';
import Header from 'src/components/layout/Header';
import {
  TrustedBySection,
  AttendeeQuote,
  UpcomingTrainingSection,
  selectUpcomingTrainings,
  selectNthTraining,
} from 'src/components/training';
import { Segment } from 'src/components/elements';
import {
  TECH_REACT,
  TRAINING_TYPE_HALF_CURRICULUM,
  REACT_FUNDAMENTALS_ID,
} from 'src/config/data';
import header from 'src/components/layout/Header.json';
import BlogSection from 'src/components/blog/BlogSection';
import { createMetas } from 'src/components/utils';

const trainingType = TRAINING_TYPE_HALF_CURRICULUM;

const defaultMetas = {
  title: 'React Fundamentals| React GraphQL Academy',
  description:
    'React Fundamentals - learn in 3 days the React fundamentals needed to develop React apps the right way',
  type: 'website',
};

const ReactFundamentals = ({ path, trainings, data }) => {
  const upcomingFundamentalsTrainings = selectUpcomingTrainings({
    trainingId: REACT_FUNDAMENTALS_ID,
    trainingType,
    trainings,
  });
  const nextTraining = selectNthTraining({
    trainings: upcomingFundamentalsTrainings,
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
            label: 'Fundamentals',
          },
        ]}
        tech={TECH_REACT}
        titleLines={['React Fundamentals Immersive Training']}
        subtitle="In 3 days, our coaches will work with you to help you learn the React fundamentals needed to develop React apps the right way"
        bgImageName={BOOTCAMP}
        links={header.landingPageLinks.links}
        trainingType={trainingType}
      />
      <TopSection>
        <Segment>
          <CurriculumReactFundamentals
            trainings={upcomingFundamentalsTrainings}
            pageData={data.sanityTrainingPage}
          />
        </Segment>
      </TopSection>
      <Section>
        <Row>
          <Col md={5} mdOffset={1}>
            <AttendeeQuote
              quote="It's a fantastic experience, we did pair programming so we shared the knowledge, and the coaches are always there with you. It was very intense and very professional"
              fullname="Rafa Fraga"
              job="Software Engineer"
              // need to get the company name!
              youtubeId="hZZksRcqtkc"
            />
          </Col>

          <Col md={4} mdOffset={1}>
            <H2>
              <Link to="#target-audience" name="target-audience" />
              Is the React Fundamentals training right for me?
            </H2>
            <P>
              Not for beginners! This training is ideal for experienced
              programmers with at least 1 year of experience with JavaScript The
              learning pace is going to be extremely rapid and intense, as this
              program is developed during 3 days.
            </P>
            <P>
              Are you unsure if this is the right training for you? Check out
              the required experience{' '}
              <Link to="/react/how-to-choose-our-react-training-combination-that-suits-you-best/">
                here
              </Link>
              .
            </P>
            {/* <Ul>
              <Li>
                <strong>Not for beginners!</strong> Ideal for experienced
                programmers with at least 1 year's experience with JavaScript
              </Li>
              <Li>Extremely rapid, intense learning</Li>
              <Li>Small classes with expert devs</Li>
              <Li>
                Hands-on project-based training - most of the time you'll be
                coding.
              </Li>
            </Ul> */}
            <P>
              {nextTraining && (
                <LinkButton variant="primary" to={nextTraining.toPath}>
                  Next training:{' '}
                  {formatUTC(
                    nextTraining.startDate,
                    nextTraining.utcOffset,
                    'D MMM'
                  )}
                  , {nextTraining.city}
                </LinkButton>
              )}
            </P>
          </Col>
        </Row>
      </Section>
      <FAQSection pageData={data.sanityTrainingPage} />
      <TrustedBySection />
      <BlogSection tags={['react', 'beginner']} />

      <UpcomingTrainingSection trainings={trainings} />
    </React.Fragment>
  );
};

export const query = graphql`
  query reactFundamentals($path: String!) {
    sanityTrainingPage(path: { eq: $path }) {
      ...sanityTrainingPageFragment
    }
  }
`;

export default ReactFundamentals;
