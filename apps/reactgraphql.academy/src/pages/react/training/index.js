import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import { BLUE } from 'src/config/styles';
import { BOOTCAMP } from 'src/../images/imageNames';
import { LinkButton } from 'src/components/buttons';
import { Link } from 'src/components/navigation';
import Section, { TopSection } from 'src/components/layout/Section';
import { Col, Row } from 'src/components/layout/Grid';
import { H2, P } from 'src/components/text';
import Ul, { Li } from 'src/components/layout/Ul';
import FullCurriculumsReact from '../../../components/curriculum/FullCurriculumsReact';
import Header from 'src/components/layout/Header';
import {
  AttendeeQuote,
  TrustedBySection,
  UpcomingTrainingSection,
} from 'src/components/training';
import { Segment } from 'src/components/elements';
import {
  REACT_BOOTCAMP,
  CONVINCE_THE_BOSS_PDF,
  TECH_REACT,
} from 'src/config/data';
import { WHY_REACTJS_ACADEMY } from 'src/config/images.js';
import { createMetas } from 'src/components/utils';

const metas = {
  title: 'React Training | React GraphQL Academy',
  description:
    'Looking for a React training? Look no more - take your development career to the next level with our React training. Contact us now!',
  image: WHY_REACTJS_ACADEMY,
  type: 'website',
};

const TrainingPage = ({ path, trainings, data }) => {
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
        breadcrumbPath={[
          { to: '/', label: 'Home' },
          {
            to: '/react',
            label: 'React',
          },
          {
            to: path,
            label: 'Training',
          },
        ]}
        tech={TECH_REACT}
        titleLines={['React Training']}
        subtitle="Take your development career to the next level with our React training"
        bgImageName={BOOTCAMP}
        bgColor={BLUE}
        featuredSection={
          <React.Fragment>
            {[
              {
                to: '/react/training/bootcamp',
                children: 'React Bootcamp',
              },
              {
                to: '/react/training/fundamentals/',
                children: 'React Fundamentals',
                px: 1,
              },
              {
                to: '/react/training/advanced',
                children: 'Advanced React',
              },
              {
                to: '/react/training/part-time-bundle',
                children: 'Part-time Bundle',
              },
              {
                to: '/react/training/fundamentals-part-time',
                children: 'Fundamentals PT',
              },
              {
                to: '/react/training/advanced-part-time',
                children: 'Advanced PT',
              },
              {
                to: '/react/training/corporate',
                children: 'Corporate Training',
                variant: 'secondary',
              },
            ].map(({ variant = 'primary', px = 4, ...rest }) => (
              <LinkButton
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mb: 1,
                  px,
                }}
                variant={variant}
                className="main-cta-buttons"
                {...rest}
              />
            ))}
            <Link
              className="training-differences"
              to="/react/curriculum#differences"
            >
              What are the differences?
            </Link>
          </React.Fragment>
        }
        links={[
          {
            text: 'Training Outline',
            to: '#curriculum',
          },
          {
            text: 'Upcoming Training',
            to: '#upcoming-courses',
          },
          {
            text: 'Free Learning Resources',
            to: '#free-learning-resources',
          },
          {
            text: 'Corporate Training',
            to: '#corporate-training',
          },
          {
            text: 'Student Outcomes',
            to: '#student-outcomes',
          },
        ]}
        type={REACT_BOOTCAMP}
      />
      <TopSection>
        <Segment>
          <FullCurriculumsReact
            trainings={trainings}
            pageData={data.sanityTrainingPage}
          />
        </Segment>
      </TopSection>
      <Section>
        <Row>
          <Col md={5} mdOffset={1}>
            <AttendeeQuote
              quote="I've been a developer for 4 years... [After the React training] my manager is in the works to getting me a promotion. I'm happy with how things have turned out!"
              fullname="Lara Ramey"
              job="Software Developer"
              company="Meredith Corporation"
              youtubeId="er9ttTCS86U"
            />
          </Col>
          <Col md={4} mdOffset={1}>
            <Link to="#student-outcomes" name="student-outcomes" />
            <H2>What developers can expect...</H2>
            <P>
              <strong>Not for beginner devs!</strong>{' '}
            </P>
            <P>
              <Link
                className="perfect-course-student"
                to="/blog/are-you-the-perfect-react-graphql-student/"
              >
                Blog: Are YOU the Perfect React Student?
              </Link>
            </P>
            <Ul>
              <Li>
                <strong>Build production ready</strong> React apps.
              </Li>
              <Li>
                Discuss <strong>real-world projects</strong>.
              </Li>
              <Li>
                Learn <strong>best practices</strong>.
              </Li>
              <Li>
                <strong>Mentoring</strong> by our expert coaches.
              </Li>
              <Li>
                <strong>Stay tech-relevent</strong> in modern development.
              </Li>
            </Ul>
            <LinkButton pdf to={CONVINCE_THE_BOSS_PDF}>
              Download: Why Devs Should Learn With Us
            </LinkButton>
          </Col>
        </Row>
      </Section>
      <TrustedBySection showContent />

      <UpcomingTrainingSection trainings={trainings} />
    </React.Fragment>
  );
};

export const query = graphql`
  query reactTrainingPage($path: String!) {
    sanityTrainingPage(path: { eq: $path }) {
      ...sanityTrainingPageFragment
    }
  }
`;

export default TrainingPage;
