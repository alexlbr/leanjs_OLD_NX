import React, { useState } from 'react';

import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { WHITE, DARK_GREY, DARK_BLUE } from '../config/styles';
import { WHY_REACTJS_ACADEMY } from '../config/images.js';
import { HOME_PAGE } from '../../images/imageNames';
import Link from '../components/navigation/Link';
import { LinkButton } from '../components/buttons';
import { TopSection, ColSection } from '../components/layout/Section';
import { Col, Row } from '../components/layout/Grid';
import { H2 } from '../components/text';
import AttendeeQuote from '../components/training/AttendeeQuote';
import Ul, { Li } from '../components/layout/Ul';
import FullCurriculumsImmersive from '../components/curriculum/FullCurriculumsImmersive';
import FullCurriculumsPartTime from '../components/curriculum/FullCurriculumsPartTime';
import { createMetas } from '../components/utils';
import { RootHeader as Header } from '../components/layout/Header';
import { getNextTrainingByTrainingId } from '../components/training/selectUpcomingTrainings';
import Segment from '../components/elements/Segment';
import TrustedBySection from '../components/training/TrustedBySection';
import UpcomingTrainingSection from '../components/training/UpcomingTrainingSection';
import Box from '../components/layout/Box';

const metas = {
  title: 'React & GraphQL Expert Training | React GraphQL Academy',
  description:
    'Looking for React and GraphQL expert training? React GraphQL Academy (formerly React Academy) offers in-person real-world training by our experts. Contact us now!',
  image: WHY_REACTJS_ACADEMY,
  type: 'website',
};

const StyledTabItem = styled(Link).attrs((props) => ({
  className: 'select-technology',
}))`
  &:first-child {
    box-shadow: -5px -5px 15px -5px rgba(0, 0, 0, 0.26);
  }
  &:last-child {
    box-shadow: 5px -5px 15px -5px rgba(0, 0, 0, 0.26);
  }
  position: relative;
  z-index: 1;
  border-bottom: none;
  text-decoration: none;
`;
const StyledTabTitle = ({ sx = {}, ...rest }) => (
  <Box sx={{ color: WHITE, pb: 1, ...sx }} {...rest} />
);

const TabItem = ({ variant = 'default', sx = {}, ...rest }) => (
  <StyledTabItem
    sx={{
      border: '1px solid',
      p: 3,
      borderColor: DARK_BLUE,
      display: 'inline-block',
      ...(variant ? tabItemVariantProps[variant] : {}),
      ...sx,
    }}
    {...rest}
  />
);

export const tabItemVariantProps = {
  default: {
    color: WHITE,
    backgroundColor: DARK_BLUE,
  },
  active: {
    color: DARK_GREY,
    bg: WHITE,
    textShadow: 'bold',
  },
};

const TAB_REACT = 'react';
const TAB_GRAPHQL = 'graphql';

const IndexPage = ({ trainings }) => {
  const [selectedTab, setTab] = useState(TAB_GRAPHQL);

  const featuredTrainings = [
    // react bootcamp
    getNextTrainingByTrainingId({
      trainings,
      trainingId: '@VFJBOjVhMTZmMGVhNDkzOWE2MDFmZTJkYjcwMQ==',
    }),
    // react trial
    getNextTrainingByTrainingId({
      trainings,
      trainingId: '@VFJBOjVlMzg1NGQ2NmJmZDIzMDAwMjM4NjQ3Zg==',
    }),
    // gql trial
    // getNextTrainingByTrainingId({
    //   trainings,
    //   trainingId: '@VFJBOjVlMzQ5Mjc1Nzc4ZTg4MDAwMjExMzQ3NA==',
    // }),
  ].filter((t) => t);

  return (
    <React.Fragment>
      <Helmet
        title={metas.title}
        meta={[
          {
            name: 'description',
            content: metas.description,
          },
        ]}
      >
        {createMetas(metas)}
      </Helmet>
      <Header
        featuredTrainings={featuredTrainings}
        titleLines={[
          'Take your dev career further',
          'with React GraphQL Academy',
        ]}
        subtitle="In-person & remote training from industry experts."
        bgImageName={HOME_PAGE}
      />
      <TopSection sx={{ mt: [0, -225] }}>
        <Row>
          <Col lgOffset={1} lg={11}>
            <StyledTabTitle>Select learning experience: </StyledTabTitle>
            <TabItem
              onClick={() => setTab(TAB_REACT)}
              to="#tab-curriculum"
              variant={selectedTab === TAB_REACT ? 'active' : undefined}
            >
              Immersive
            </TabItem>
            <TabItem
              variant={selectedTab === TAB_GRAPHQL ? 'active' : undefined}
              onClick={() => setTab(TAB_GRAPHQL)}
              to="#tab-curriculum"
            >
              Part-time (PT)
            </TabItem>
            <Link name="tab-curriculum" />
          </Col>
        </Row>
        <Segment sx={{ pt: [4, 7] }}>
          {selectedTab === TAB_REACT ? (
            <FullCurriculumsImmersive trainings={trainings} />
          ) : (
              <FullCurriculumsPartTime trainings={trainings} />
            )}
        </Segment>
      </TopSection>
      <ColSection
        col={
          <AttendeeQuote
            quote="As a freelance developer, I was tired of doing online courses on my own without live support. [The training] was fantastic - the teachers didn't leave a single question unanswered."
            fullname="Rafa Fraga"
            job="Software Engineer"
            youtubeId="hZZksRcqtkc"
          />
        }
        col2={
          <React.Fragment>
            <H2>Is React GraphQL Academy right for me?</H2>
            <Ul>
              <Li>
                For working developers - <strong>not for beginners!</strong>
              </Li>
              <Li>
                <strong>Hands-on project-based</strong> training.
              </Li>
              <Li>
                <strong>collaborative</strong> learning environment.
              </Li>
              <Li>
                <Link to="/react/training/bootcamp" className="is-it-for-me">
                  Bootcamps
                </Link>{' '}
                for accelerated learning.
              </Li>
              <Li>
                <Link to="/react/training/part-time/" className="is-it-for-me">
                  Part-time training
                </Link>{' '}
                for accelerated learning.
              </Li>
            </Ul>
            <LinkButton
              to="/blog/are-you-the-perfect-react-graphql-student/"
              className="is-it-for-me-cta"
            >
              Blog: Are YOU the Perfect Bootcamp Student?
            </LinkButton>
          </React.Fragment>
        }
      />
      <TrustedBySection showContent />
      <UpcomingTrainingSection trainings={trainings} />
    </React.Fragment>
  );
};

export default IndexPage;
