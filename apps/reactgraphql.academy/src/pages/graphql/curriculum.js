import React from 'react';
import { Element, scroller } from 'react-scroll';
import { ThemeProvider } from '@leanjs/ui-core';

import { Table, Thead, Tbody, Tr, Th, Td } from 'src/components/table';
import Section, { TopSection } from 'src/components/layout/Section';
import { Col, Row } from 'src/components/layout/Grid';
import { Li } from 'src/components/layout/Ul';
import { H2Ref, H2, P, H4, H5 } from 'src/components/text';
import { Tick } from 'src/components/icons';
import LinkButton from 'src/components/buttons/LinkButton';
import { tabItemClassName } from '../../components/curriculum/utils';

import {
  Link,
  DEFAULT_SCROLL_OFFSET,
  DEFAULT_SCROLL_DURATION,
} from 'src/components/navigation';
import { Tabs, TabList, TabItem, TabPanel } from 'src/components/layout/Tabs';
import MarketingCard from 'src/components/curriculum/MarketingCard';
import CurriculumGraphQLAPI, {
  LearningObjectivesList as GraphQLAPILearningObjectives,
} from 'src/components/curriculum/CurriculumGraphQLAPI';
import CurriculumGraphQLBootcamp from 'src/components/curriculum/CurriculumGraphQLBootcamp';
import Header from 'src/components/layout/Header';
import {
  UpcomingTrainingSection,
  selectNthTraining,
} from 'src/components/training';
import { Segment } from 'src/components/elements';
import { getURLParameter } from 'src/components/utils/url';
import {
  TECH_GRAPHQL,
  TRAINING_TYPE_HALF_CURRICULUM,
  FULL_TIME,
  GRAPHQL_API_ID,
  GRAPHQL_BOOTCAMP_ID,
  TRAINING_TYPE_FULL_CURRICULUM,
  GRAPHQL_BOOTCAMP,
  GRAPHQL_API,
} from 'src/config/data';
import { LIST_LAYOUT } from 'src/components/curriculum/selectCurriculumLayout';
import { formatUTC } from 'src/components/utils';
import { GRAPHQL_PINK, LIGHT_PINK } from '../../config/styles';
import {
  TdLearningExprience,
  UlLearningExperience,
} from 'src/components/curriculum/LearningExperienceElements';

class GraphQLCurriculum extends React.Component {
  state = {
    active: GRAPHQL_API,
  };

  componentDidMount() {
    const defaultTab = getURLParameter('tab');
    const defaultSection = getURLParameter('section');
    if (defaultTab || defaultSection) {
      this.setActive(defaultTab);
      setTimeout(
        () =>
          scroller.scrollTo(defaultSection || 'curriculum', {
            smooth: true,
            duration: DEFAULT_SCROLL_DURATION,
            offset: DEFAULT_SCROLL_OFFSET,
          }),
        200
      );
    }
  }

  setActive = (active) => {
    this.setState({ active });
  };

  render() {
    const { path, trainings } = this.props;
    const commonCurriculumProps = {
      section: { enableToggle: true },
      showTitle: false,
      layout: LIST_LAYOUT,
      showLinkToCurriculum: false,
    };
    const trainingBootcamp = selectNthTraining({
      trainings,
      trainingType: TRAINING_TYPE_FULL_CURRICULUM,
      trainingId: GRAPHQL_BOOTCAMP_ID,
    });
    const trainingPartTime = selectNthTraining({
      trainings,
      trainingId: GRAPHQL_API_ID,
      trainingType: TRAINING_TYPE_HALF_CURRICULUM,
      trainingInstanceTypeName: FULL_TIME,
    });

    return (
      <ThemeProvider
        theme={{
          colors: {
            tech: GRAPHQL_PINK,
          },
        }}
      >
        <Header
          breadcrumbPath={[
            { to: '/', label: 'Home' },
            {
              to: '/graphql',
              label: 'GraphQL',
            },
            {
              to: path,
              label: 'Curriculum',
            },
          ]}
          links={[
            {
              text: 'Differences in our GraphQL training ',
              to: '#differences',
            },
            { text: 'Full curriculums', to: '#curriculum' },
          ]}
          tech={TECH_GRAPHQL}
          breadcrumbBgColor={LIGHT_PINK}
          titleLines={['GraphQL curriculum']}
          subtitle="We're proud to say that our curriculum is the most<br /> up-to-date on the market - there really is<br />nowhere better to learn GraphQL."
          bgColor={GRAPHQL_PINK}
        />
        <TopSection>
          <Segment>
            <Row>
              <Col lg={10} lgOffset={1}>
                <H2Ref>
                  <Link to="#differences" name="differences" />
                  Our GraphQL training - what are the differences?
                </H2Ref>
              </Col>
            </Row>
            <Row>
              <Col lg={10} lgOffset={1}>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Curriculum</Th>
                      <Th tech={TECH_GRAPHQL}>Complete</Th>
                      <Th
                        tech={TECH_GRAPHQL}
                        trainingType={TRAINING_TYPE_HALF_CURRICULUM}
                      >
                        API
                      </Th>
                      <Th
                        tech={TECH_GRAPHQL}
                        trainingType={TRAINING_TYPE_HALF_CURRICULUM}
                      >
                        Client
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Schema Design</Td>
                      <Td>
                        <Tick />
                      </Td>
                      <Td>
                        <Tick />
                      </Td>
                      <Td />
                    </Tr>
                    <Tr>
                      <Td>Security & Error Handling</Td>
                      <Td>
                        <Tick />
                      </Td>
                      <Td>
                        <Tick />
                      </Td>
                      <Td />
                    </Tr>
                    <Tr>
                      <Td>Apollo Federation</Td>
                      <Td>
                        <Tick />
                      </Td>
                      <Td>
                        <Tick />
                      </Td>
                      <Td />
                    </Tr>

                    <Tr>
                      <Td>Hasura</Td>
                      <Td>
                        <Tick />
                      </Td>
                      <Td>
                        <Tick />
                      </Td>
                      <Td />
                    </Tr>
                    <Tr>
                      <Td>Tooling and best practices</Td>
                      <Td>
                        <Tick />
                      </Td>
                      <Td>
                        <Tick />
                      </Td>
                      <Td />
                    </Tr>
                    <Tr>
                      <Td>Apollo Client</Td>
                      <Td>
                        <Tick />
                      </Td>
                      <Td />
                      <Td>
                        <Tick />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Caching and performance</Td>
                      <Td>
                        <Tick />
                      </Td>
                      <Td />
                      <Td>
                        <Tick />
                      </Td>
                    </Tr>
                    <Tr>
                      <TdLearningExprience strong="Immersive">
                        For accelerated <br />
                        learning
                      </TdLearningExprience>
                      <Td verticalAlign="top">
                        <LinkButton
                          variant="secondary"
                          to="/graphql/training/bootcamp"
                          className="training-curriculum-clicks"
                        >
                          Bootcamp
                        </LinkButton>
                        <UlLearningExperience>
                          <Li>4 days</Li>
                          <Li>9 am to 6 pm</Li>
                          <Li>In-person and remote</Li>
                          <Li>Starting at £1390</Li>
                          <Li>API + Client</Li>
                        </UlLearningExperience>
                      </Td>
                      <Td verticalAlign="top">
                        <LinkButton
                          variant="secondary"
                          to="/graphql/training/api"
                          className="training-curriculum-clicks"
                        >
                          API
                        </LinkButton>
                        <UlLearningExperience>
                          <Li>3 days</Li>
                          <Li>9 am to 6 pm</Li>
                          <Li>In-person and remote</Li>
                          <Li>Starting at £995</Li>
                        </UlLearningExperience>
                      </Td>
                      <Td verticalAlign="top">
                        <LinkButton
                          variant="secondary"
                          to="/graphql/training/workshops/apollo-client"
                          className="training-curriculum-clicks"
                        >
                          Client
                        </LinkButton>
                        <UlLearningExperience>
                          <Li>1 day</Li>
                          <Li>9 am to 6 pm</Li>
                          <Li>In-person and remote</Li>
                          <Li>Starting at £395</Li>
                        </UlLearningExperience>
                      </Td>
                    </Tr>
                    {/* <Tr>
                      <TdLearningExprience strong="Part-time (PT)">
                        For minimum <br />
                        work disruption
                      </TdLearningExprience>
                      <Td verticalAlign="top">
                        <LinkButton
                          variant="secondary"
                          to="/graphql/training/part-time-bundle"
                          className="training-curriculum-clicks"
                        >
                          Part-time Bundle
                        </LinkButton>
                        <UlLearningExperience>
                          <Li>4 weeks</Li>
                          <Li>
                            <strong>6 hours a week</strong>
                          </Li>
                          <Li>In-person and remote</Li>
                          <Li>Starting at £1395</Li>
                          <Li>API + Client</Li>
                        </UlLearningExperience>
                      </Td>
                      <Td verticalAlign="top">
                        <LinkButton
                          variant="secondary"
                          to="/graphql/training/api-part-time/"
                          className="training-curriculum-clicks"
                        >
                          API Part-time
                        </LinkButton>
                        <UlLearningExperience>
                          <Li>3 weeks</Li>
                          <Li>
                            <strong>6 hours a week</strong>
                          </Li>
                          <Li>In-person and remote</Li>
                          <Li>Starting at £995</Li>
                        </UlLearningExperience>
                      </Td>
                      <Td verticalAlign="top">
                        <LinkButton
                          variant="secondary"
                          to="/graphql/training/workshops/apollo-client"
                          className="training-curriculum-clicks"
                        >
                          Client Part-time
                        </LinkButton>
                        <UlLearningExperience>
                          <Li>1 week</Li>
                          <Li>
                            <strong>6 hours a week</strong>
                          </Li>
                          <Li>In-person and remote</Li>
                          <Li>Starting at £395</Li>
                        </UlLearningExperience>
                      </Td>
                    </Tr> */}
                  </Tbody>
                </Table>
                <H5>Also available...</H5>
                <Row>
                  {[
                    {
                      to: '/graphql/training/corporate/',
                      txt: 'Corporate GraphQL team training',
                    },
                    { to: '/react/training/', txt: 'React training' },
                  ].map(({ to, txt }) => (
                    <Col md={6}>
                      <LinkButton
                        className="training-curriculum-clicks"
                        to={to}
                        sx={{
                          mt: [2, 0],
                          display: 'block',
                        }}
                      >
                        {txt}
                      </LinkButton>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Segment>
        </TopSection>
        <Section>
          <Row>
            <Col lg={10} lgOffset={1}>
              <Element name="curriculum" />
              <H2>Choose a curriculum:</H2>
              <Tabs
                defaultValue={GRAPHQL_API}
                onChange={this.setActive}
                value={this.state.active}
              >
                <TabList>
                  <TabItem
                    className={tabItemClassName}
                    name={GRAPHQL_API}
                    tech={TECH_GRAPHQL}
                  >
                    GraphQL API
                  </TabItem>
                  <TabItem
                    tech={TECH_GRAPHQL}
                    className={tabItemClassName}
                    name={GRAPHQL_BOOTCAMP}
                  >
                    GraphQL Bootcamp
                  </TabItem>
                </TabList>
                <TabPanel name={GRAPHQL_BOOTCAMP}>
                  <P>
                    <strong>
                      On completion of the GraphQL Bootcamp each student will:
                    </strong>
                  </P>
                  <CurriculumGraphQLBootcamp.LearningObjectivesList />
                  <H4>GraphQL Bootcamp Curriculum:</H4>
                  <Row>
                    <Col lg={1} lgOffset={1} />
                    <Col lg={9}>
                      <CurriculumGraphQLBootcamp
                        {...commonCurriculumProps}
                        marketingCard={
                          trainingBootcamp && (
                            <MarketingCard
                              heading="Next GraphQL Bootcamp"
                              className="training-curriculum-next-training-cta"
                              to={trainingBootcamp && trainingBootcamp.toPath}
                              buttonText={`${
                                trainingBootcamp.city
                              } GraphQL Bootcamp, ${formatUTC(
                                trainingBootcamp.startDate,
                                trainingBootcamp.utcOffset,
                                'D MMM'
                              )}  `}
                            />
                          )
                        }
                      />
                    </Col>
                  </Row>
                </TabPanel>
                <TabPanel name={GRAPHQL_API}>
                  <P>
                    <strong>
                      On completion of the GraphQL API training each student
                      will:
                    </strong>
                  </P>
                  <GraphQLAPILearningObjectives />

                  <H4>GraphQL API Curriculum:</H4>
                  <Row>
                    <Col lg={1} lgOffset={1} />
                    <Col lg={9}>
                      <CurriculumGraphQLAPI
                        {...commonCurriculumProps}
                        marketingCard={
                          trainingPartTime && (
                            <MarketingCard
                              heading="Next GraphQL API training"
                              text={`Learn from the best from anywhere!`}
                              className="training-curriculum-next-training-cta"
                              to={trainingPartTime && trainingPartTime.toPath}
                              buttonText={`${formatUTC(
                                trainingPartTime.startDate,
                                trainingPartTime.utcOffset,
                                'D MMM'
                              )}, ${
                                trainingPartTime.isOnline
                                  ? 'remote'
                                  : trainingPartTime.city
                              }`}
                            />
                          )
                        }
                      />
                    </Col>
                  </Row>
                </TabPanel>
              </Tabs>
            </Col>
          </Row>
        </Section>
        <UpcomingTrainingSection trainings={trainings} />
      </ThemeProvider>
    );
  }
}

export default GraphQLCurriculum;
