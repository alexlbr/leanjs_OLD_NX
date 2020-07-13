import React from 'react';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';

import Form, {
  required,
  composeValidators,
  mustBeEmail,
} from '../components/form/Form';
import CheckboxField from '../components/form/CheckboxField';
import InputField from '../components/form/InputField';
// import Link, { styleChildLinkColor, MailtoLink } from "../navigation/Link"
import Button from '../components/buttons/Button';
import { Strong } from '../components/text';
import Spinner from '../components/elements/Spinner';
import { sendMessage } from '../api';
import Menu from '../components/navigation/menu';
import Section from '../components/layout/Section';
import Ul, { Li } from '../components/layout/Ul';
import { WHITE, DARKGREY, LIGHTGREY } from '../config/styles';
import Grid, { Col, Row } from '../components/layout/Grid';
import Image from '../components/elements/Image';
import {
  H1,
  H2 as StyledH2,
  H3,
  H4,
  H3a,
  P,
  SupportingText,
} from '../components/text';
import Box from '../components/layout/Box';
import Flex from '../components/layout/Flex';
import Link from '../components/navigation/Link';
import { GitHubIcon, TwitterIcon } from '../resources/icons';

const H2 = styled(StyledH2)`
  margin-top: 50px;
`;

function renderIcon(url = '') {
  let Icon;
  if (url.indexOf('twitter.com') > -1) {
    Icon = TwitterIcon;
  } else if (url.indexOf('github.com') > -1) {
    Icon = GitHubIcon;
  }

  return Icon ? <Icon fill={LIGHTGREY} /> : null;
}

const IndexPage = () => (
  <React.Fragment>
    <Menu />
    <Section dark sx={{ paddingTop: '150px' }}>
      <Grid>
        <Row>
          <Col md={7}>
            <H1>JavaScript Architecture For Business Optimization Webinar</H1>
            <SupportingText>July 14, 2020</SupportingText>
            <SupportingText>10:00 - 11:00 CEST</SupportingText>
            <SupportingText>This event is remote & free</SupportingText>
            <P>
              These are challenging times for tech leaders. The future is no
              more uncertain than the present. We have to build and/or customize
              products, company websites, CMSes, marketing tools, APIs, etc in a
              global environment that demands more speed and agility, with
              sometimes fewer resources.
            </P>
            <P sx={{ paddingBottom: 0 }}>
              Many of the products and tools that support businesses nowadays
              rely heavily on JavaScript. In this webinar, we'll be discussing
              different software, architectures, and processes to optimize the
              JavaScript of our organizations.
            </P>
            <H2>Who should attend this</H2>
            <Ul>
              <Li>CTOs</Li>
              <Li>Technical Directors</Li>
              <Li>Software Architects</Li>
              <Li>Tech Leads</Li>
              <Li>JavaScript Developers</Li>
            </Ul>
            <H2>This webinar is ideal for you if</H2>
            <Ul>
              <Li>
                You are looking for ways to reduce costs while keeping the
                high-quality of your Web-based products.
              </Li>
              <Li>
                Your company has fewer developers now and it can't afford
                reducing the velocity of the product team/s.
              </Li>
              <Li>
                You want to find an internal and cost-effective solution to
                launch new products faster.
              </Li>
              <Li>
                Your company had to lay off the CTO, CIO, Solution Architect or
                any tech decision-maker, and now it needs to make critical
                decisions about Web-based system architectures.
              </Li>
            </Ul>
            <H2>Meet our speaker</H2>
            <Flex sx={{ mr: 5, mb: 4, flexDirection: 'column' }}>
              <Flex>
                <Image
                  circle
                  src="https://media-exp1.licdn.com/dms/image/C4E03AQFT2RQ6m75u9w/profile-displayphoto-shrink_400_400/0?e=1598486400&v=beta&t=o7_Xkn6mFy9VzusPMZA9iPqY7I3Fi7rGSZlJWuxJAa4"
                  sx={{
                    display: 'flex',
                    width: ['85px'],
                    height: ['85px'],
                    minWidth: '85px',
                    mr: 2,
                    mb: 1,
                  }}
                  alt={`Alex Lobera`}
                />
                <Box sx={{ color: WHITE }}>
                  <H3 style={{ marginBottom: '15px' }}>Alex Lobera</H3>
                  <P sx={{ pb: 1 }}>
                    Founder at LeanJS and React GraphQL Academy
                  </P>
                  {[
                    'https://twitter.com/alex_lobera',
                    'https://github.com/alexlbr',
                  ].map((url) => (
                    <Link to={url} sx={{ marginRight: '20px' }}>
                      {renderIcon(url)}
                    </Link>
                  ))}
                </Box>
              </Flex>
            </Flex>
            <P>
              Experienced entrepreneur and tech decision-maker. Passionate about
              Lean, JavaScript, and modern Web-based architectures. Public
              speaker at international conferences such as JavaScript
              Conference, React Week New York, and React Day Berlin. 15 years of
              experience in the software industry. Open source developer.
              Interested in digital products that make a social impact.
            </P>
          </Col>
          <Col mdOffset={1} md={4}>
            <StickyBox offsetTop={120}>
              <Form onSubmit={sendMessage}>
                {({ submitting, submitSucceeded }) =>
                  submitSucceeded ? (
                    <>
                      <Strong large color={WHITE}>
                        Thank you for your submission! We will be in touch
                        shortly.
                      </Strong>
                      <P>
                        If you haven’t received an email with the Zoom link it
                        might be because of your email settings. Please, contact
                        lena@leanjs.com to get a link to the Webinar
                      </P>
                    </>
                  ) : (
                    <React.Fragment>
                      <InputField
                        color={WHITE}
                        label="Full name (required)"
                        name="webinar-name"
                        placeholder="eg. Steve Jobs"
                        validate={required}
                      />
                      <InputField
                        color={WHITE}
                        label="Email (required)"
                        name="webinar-email"
                        placeholder="eg. name@company.com"
                        validate={composeValidators(mustBeEmail, required)}
                      />
                      <InputField
                        color={WHITE}
                        label="Company (required)"
                        name="webinar-company"
                        validate={required}
                      />
                      <InputField
                        color={WHITE}
                        label="Job title (required)"
                        name="webinar-job"
                        validate={required}
                      />
                      <CheckboxField
                        color={WHITE}
                        name="sign-up-newsletter"
                        label="Sign up to the LeanJS newsletter"
                      />
                      <P sx={{ color: WHITE }}>
                        We won't spam you as per our{' '}
                        <Link
                          className="footer-privacy-policy"
                          to="/privacy-policy"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </P>
                      <Button type="submit">
                        {submitting ? (
                          <Spinner color={DARKGREY} />
                        ) : (
                          'Sign up for the webinar'
                        )}
                      </Button>
                    </React.Fragment>
                  )
                }
              </Form>
            </StickyBox>
          </Col>
        </Row>
      </Grid>
    </Section>
  </React.Fragment>
);

export default IndexPage;
