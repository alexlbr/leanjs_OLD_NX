import React from 'react';
import { navigate } from 'gatsby';

import { BOOTCAMP } from 'src/../images/imageNames';
import { TopSection } from 'src/components/layout/Section';
import { Col, Row } from 'src/components/layout/Grid';
import { H2, H3, H4, P } from 'src/components/text';
import { Link } from 'src/components/navigation';
import { Segment } from 'src/components/elements';
import { Button } from 'src/components/buttons';
import Header from 'src/components/layout/Header';
import Box from 'src/components/layout/Box';
import { UpcomingTrainingSection } from 'src/components/training';
import { TECH_GRAPHQL } from 'src/config/data';
import { InputField, Form, CheckboxField } from 'src/components/form';
import {
  composeValidators,
  required,
  mustBeEmail,
} from 'src/components/form/validations';
import { aliasComponent } from 'src/components/utils/aliasComponent';
import { EmailInput } from 'src/components/form/Contact';
import { triggerSessionSubscribe } from 'src/api/rest';
import trackUserBehaviour, {
  FORM_SUBMIT,
} from 'src/components/utils/trackUserBehaviour';
import { LIGHT_PINK } from 'src/config/styles';

const NameInput = aliasComponent(InputField);

const SessionInterestGraphQL = ({ path, trainings }) => {
  const handleFormSubmit = ({
    name,
    email,
    subscriptions,
    resources = false,
  }) => {
    triggerSessionSubscribe({
      name,
      email,
      subscriptions: Object.keys(subscriptions),
      resources,
      pathname: 'GraphQL 1 day workshops form',
    });
    trackUserBehaviour({
      event: FORM_SUBMIT,
      payload: {
        interestedInCourse: 'GraphQL',
        formType: 'Interest form',
        subject: Object.keys(subscriptions),
      },
    });
    navigate('/thanks-for-signing-up-for-sessions');
  };

  //   const upcomingBootcamps = selectUpcomingTrainings({
  //     trainings,
  //     trainingId: REACT_BOOTCAMP_ID,
  //   })
  //   const nextBootcamp =
  //     selectNthTraining({
  //       trainings,
  //       trainingId: REACT_BOOTCAMP_ID,
  //       trainingTypeId: FULL_TIME_REACT_ID,
  //     }) || {}
  const nextBootcamp = undefined;
  return (
    <React.Fragment>
      <Header
        breadcrumbPath={[
          { to: '/', label: 'Home' },
          { to: '/graphql', label: 'GraphQL' },
          { to: '/graphql/training/', label: 'Training' },
          { to: path, label: 'Workshops' },
        ]}
        tech={TECH_GRAPHQL}
        breadcrumbBgColor={LIGHT_PINK}
        titleLines={['GraphQL Workshops']}
        subtitle={[
          'Your opportunity tell us what GraphQL workshops you want to see!',
        ]}
        bgImageName={BOOTCAMP}
        training={nextBootcamp}
      />

      <TopSection>
        <Segment>
          <Row>
            <Col md={10} mdOffset={1}>
              <Form
                onSubmit={handleFormSubmit}
                render={({ handleSubmit, valid }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <H2>Tell us what GraphQL workshops you'd like to see</H2>
                      <Row>
                        <Col md={6}>
                          <NameInput
                            label="Your name"
                            name="name"
                            placeholder="eg. Steve Jobs"
                          />
                        </Col>
                        <Col md={6}>
                          <EmailInput
                            validate={composeValidators(mustBeEmail, required)}
                            label="Your best email address"
                            name="email"
                            placeholder="eg. steve@jobs.com"
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <H4>Which subjects are you interested in?</H4>
                        </Col>
                        <Col md={6}>
                          <CheckboxField
                            name="subscriptions.apolloclient"
                            label="GraphQL Relay Modern"
                          />
                          <CheckboxField
                            name="subscriptions.hasura"
                            label="GraphQL with Hasura"
                          />
                        </Col>
                        <Col md={6}>
                          <CheckboxField
                            name="subscriptions.prismabackend"
                            label="GraphQL with Prisma"
                          />
                          <Box sx={{ pt: 3 }}>
                            <Link
                              to="#contact-us"
                              children="Want other workhops? Contact us!"
                            />
                          </Box>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: '2em' }}>
                        <Col>
                          <H3>Free learning resources</H3>
                          <P>
                            We share our learning resources{' '}
                            <strong>
                              directly from our{' '}
                              <Link to="/react/curriculum">
                                <strong>curriculum</strong>
                              </Link>
                            </strong>{' '}
                            and we'd love for you to enjoy and learn from them!{' '}
                          </P>
                          <CheckboxField
                            name="resources"
                            label="I want free learning resources!"
                          />
                        </Col>
                      </Row>
                      <Row style={{ marginTop: '2em' }}>
                        <Col md={3}>
                          <Button
                            sx={{ width: 1 }}
                            variant="primary"
                            type="submit"
                            disabled={!valid}
                          >
                            Submit
                          </Button>
                        </Col>
                        <Col mdOffset={1} md={8}>
                          <P sx={{ pt: 1 }}>
                            We won't spam you as per our{' '}
                            <Link to="/privacy-policy">Privacy Policy</Link>.
                          </P>
                        </Col>
                      </Row>
                    </form>
                  );
                }}
              />
            </Col>
          </Row>
        </Segment>
      </TopSection>

      <UpcomingTrainingSection trainings={trainings} />
    </React.Fragment>
  );
};

export default SessionInterestGraphQL;
