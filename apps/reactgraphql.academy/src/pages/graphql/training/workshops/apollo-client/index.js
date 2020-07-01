import React from 'react';
import { Helmet } from 'react-helmet';

import { LONDON_BOOTCAMP } from 'src/../images/imageNames';
import Section, { TopSection } from 'src/components/layout/Section';
import { Col, Row } from 'src/components/layout/Grid';
import { H2Ref, H3, P } from 'src/components/text';
import Ul, { Li } from 'src/components/layout/Ul';
import CurriculumGraphQLApollo from 'src/components/curriculum/workshops/CurriculumGraphQLApollo';
import { Segment } from 'src/components/elements';
import Header from 'src/components/layout/Header';
import { BOOTCAMP_COLLAB } from 'src/config/images';
import {
  UpcomingTrainingSection,
  AttendeeQuote,
  getNextTrainingByTrainingId,
} from 'src/components/training';
import { Link } from 'src/components/navigation';
import {
  TECH_GRAPHQL,
  TRAINING_TYPE_WORKSHOP,
  GRAPHQL_WORKSHOP_APOLLO_CLIENT_ID,
} from 'src/config/data';
import { createMetas } from 'src/components/utils';
import { breadcrumbWorkshopName } from './config.json';
import NextTrainingButton from 'src/components/training/NextTrainingButton';
import { LIGHT_PINK } from 'src/config/styles';

const trainingId = GRAPHQL_WORKSHOP_APOLLO_CLIENT_ID;

const metas = {
  title: 'GraphQL Apollo Client Training | React GraphQL Academy',
  description:
    'Looking for a GraphQL Client training? Consume real-world GraphQL APIs. In-person GraphQL Apollo Client training from industry experts Contact us now!',
  image: BOOTCAMP_COLLAB,
  type: 'website',
};

const GraphQLApolloClientWorkshop = ({ path, trainings, data }) => {
  const nextTraining = getNextTrainingByTrainingId({
    trainings,
    trainingId,
  });

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
          { to: '/graphql', label: 'GraphQL' },
          { to: '/graphql/training/', label: 'Training' },
          { to: '/graphql/training/workshops', label: 'Workshops' },
          {
            to: path,
            label: breadcrumbWorkshopName,
          },
        ]}
        breadcrumbBgColor={LIGHT_PINK}
        tech={TECH_GRAPHQL}
        titleLines={['GraphQL Apollo Client']}
        subtitle="Create production-ready React applications with the most community-driven GraphQL client"
        links={[
          { text: 'Workshop Agenda', to: '#curriculum' },
          { text: 'Is this right for me?', to: '#target-audience' },
        ]}
        bgImageName={LONDON_BOOTCAMP}
        trainingType={TRAINING_TYPE_WORKSHOP}
      />
      <TopSection>
        <Segment>
          <CurriculumGraphQLApollo
            trainings={trainings}
            trainingId={trainingId}
            pageData={data.sanityTrainingPage}
            enableToggle
            section={{ isOpen: true }}
          />
        </Segment>
      </TopSection>

      <Section>
        <Row>
          <Col md={5} mdOffset={1}>
            <AttendeeQuote
              tech={TECH_GRAPHQL}
              quote="As a freelance developer, I was tired of doing online courses on my own without live support. [The training] was fantastic - the teachers didn't leave a single question unanswered."
              fullname="Rafa Fraga"
              job="Software Engineer"
              youtubeId="hZZksRcqtkc"
            />
          </Col>
          <Col md={4} lgOffset={1}>
            <H2Ref>
              Is this one day workshop right for me? Are you...{' '}
              <Link to="#target-audience" name="target-audience">
                #
              </Link>
            </H2Ref>
            <Ul>
              <Li>
                A developer with some experience developing React applications?
              </Li>
              <Li>
                Familiar with front-end technologies like React, JavaScript,
                CSS, and HTML?
              </Li>
              <Li>
                Taking a step forward to become a GraphQL Specialist able to
                make critical decisions about the architecture of an
                application.
              </Li>
            </Ul>
            <P>
              If you've said 'yes' to these, this workshop could be for you!
            </P>
            <H3>Not for beginner devs!</H3>
            <P>This is not a learn-to-code workshop!</P>
            <NextTrainingButton type="workshop" training={nextTraining} />
          </Col>
        </Row>
      </Section>

      <UpcomingTrainingSection trainings={trainings} />
    </React.Fragment>
  );
};

export const query = graphql`
  query graphqlWorkshopApolloClientTrainingPage($path: String!) {
    sanityTrainingPage(path: { eq: $path }) {
      ...sanityTrainingPageFragment
    }
  }
`;

export default GraphQLApolloClientWorkshop;
