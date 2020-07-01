import React from 'react';
import { H3, P } from '../text';
import Link from '../navigation/Link';
import { LinkButton } from '../buttons';

const CorpTrainingFacts = () => (
  <React.Fragment>
    <H3 sx={{ pt: [4, 0] }}>
      How tailored is training? <a name="how-tailored" />
    </H3>
    <P>
      As any training progresses and we discover issues your developers have, we
      quickly adapt our learning methods to ensure meaningful learning.
      {/* If you
      want to learn using <strong>your</strong> codebase{' '}
      <Link to="#custom-training">click here.</Link> */}
    </P>
    <a name="dev-level" />
    <H3>Level expertise across your team</H3>
    <P>
      If you're looking to change your tech stack, avoiding risk is key. So
      knowing developers are on the same skill level can really help.
    </P>
    <P>
      Great for experienced developers who know JavaScript, our training is a
      deep dive into React, GraphQL or React Native.
    </P>
    <a name="pricing" />
    <H3>Pricing, locations, scheduling </H3>
    <P>
      We have run private trainings worldwide and work around your schedule.
    </P>
    <P>
      For pricing information, it's best to{' '}
      <Link to="mailto:hello@reactgraphql.academy">email us</Link> to get a
      tailored quote but our <strong>Key Facts PDF</strong> has information
      regarding pricing too.
    </P>
    <LinkButton
      pdf
      primary
      to="https://firebasestorage.googleapis.com/v0/b/reactgraphqlacademy.appspot.com/o/pdfs%2FCorporate%20Team%20Training%20with%20React%20GraphQL%20Academy.pdf?alt=media&"
    >
      Team Training - Key Facts
    </LinkButton>
  </React.Fragment>
);

export default CorpTrainingFacts;
