import React from 'react';
import Section from './CurriculumSection';
import { LinkButton } from '../buttons';
import { TECH_GRAPHQL } from '../../config/data';
import selectCurriculumLayout from './selectCurriculumLayout';
import CorpTrainingFacts from './CorpTrainingKeyFacts';

const CurriculumCorporateGraphQL = ({ layout }) => {
  const tech = TECH_GRAPHQL;
  const commonProps = {
    showLinkToCurriculum: false,
    enableToggle: false,
    tech,
    isOpen: false,
  };
  const firstHalf = (
    <React.Fragment>
      <Section
        {...commonProps}
        title="Day 1 - GraphQL API Fundamentals"
        name="day1"
        subTitle="Nodejs and GraphQL fundamentals"
      />
      <Section
        {...commonProps}
        title="Day 2 - Advanced GraphQL API"
        name="day2"
        subTitle="Implement a GraphQL API, Advanced Schema, Performance"
      />
      <Section
        {...commonProps}
        title="Day 3 - Real-world GraphQL API"
        name="day3"
        subTitle="Data sources and GraphQL in production considerations"
      />
      <Section
        {...commonProps}
        title="Day 4 - Production-ready GraphQL & React"
        name="day4"
        subTitle="Testing GraphQL, replacing redux with GraphQL and production tooling"
      />
    </React.Fragment>
  );
  const secondHalf = (
    <React.Fragment>
      <Section
        {...commonProps}
        title="GraphQL & React"
        name="day5"
        subTitle="Apollo Client, Advanced Queries and mutations"
      />
      <LinkButton sx={{ mt: 4 }} to="#contact-us" children="Contact Us" />
    </React.Fragment>
  );

  return selectCurriculumLayout({
    firstHalf,
    secondHalf,
    layout,
    tech,
    content: <CorpTrainingFacts />,
    curriculumTitle: 'GraphQL Training Curriculum Example',
  });
};

export default CurriculumCorporateGraphQL;
