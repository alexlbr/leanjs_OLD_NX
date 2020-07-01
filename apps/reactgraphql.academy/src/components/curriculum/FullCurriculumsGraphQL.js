import React from 'react';
import { Col, Row } from '../layout/Grid';
import { H4, H2 } from '../text';
import { Tabs, TabList, TabItem, TabPanel } from '../layout/Tabs';
import CurriculumGraphQLBootcamp from './CurriculumGraphQLBootcamp';
import { tabItemClassName } from './utils';
import { Overview } from '../../components/training/PageContent';
import selectUpcomingTrainings from '../training/selectUpcomingTrainings';
import { GRAPHQL_BOOTCAMP, GRAPHQL_API, TECH_GRAPHQL } from '../../config/data';
import CurriculumGraphQLAPI from './CurriculumGraphQLAPI';

const FullCurriculumsGraphQL = ({ trainings, pageData }) => {
  const commonCurriculumProps = {
    trainings,
    showTitle: false,
  };
  const allGraphQLPartTimes = selectUpcomingTrainings({
    trainings,
    type: GRAPHQL_BOOTCAMP,
  });

  return (
    <React.Fragment>
      <Row>
        <Col lg={10} lgOffset={1}>
          <H2>GraphQL training from industry experts</H2>
          {pageData && pageData._rawOverview && (
            <Overview _rawOverview={pageData._rawOverview} />
          )}
          <H4>Choose a GraphQL training</H4>
        </Col>
      </Row>
      <Tabs defaultValue={GRAPHQL_API}>
        <Row>
          <Col lgOffset={1} md={11}>
            <TabList>
              <TabItem
                tech={TECH_GRAPHQL}
                className={tabItemClassName}
                name={GRAPHQL_API}
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
          </Col>
        </Row>
        <TabPanel name={GRAPHQL_BOOTCAMP}>
          <CurriculumGraphQLBootcamp {...commonCurriculumProps} />
        </TabPanel>
        <TabPanel name={GRAPHQL_API}>
          <CurriculumGraphQLAPI
            trainings={allGraphQLPartTimes}
            showTitle={false}
          />
        </TabPanel>
      </Tabs>
    </React.Fragment>
  );
};

export default FullCurriculumsGraphQL;
