import React from 'react'
import { LinkButton } from '../components/buttons'
import Section, { TopSection } from '../components/layout/Section'
import Grid, { Col, Row } from '../components/layout/Grid'
import { H2, P } from '../components/text'
import Ul, { Li } from '../components/layout/Ul'
import { CurriculumReactNative } from '../components/curriculum'
import Header from '../components/layout/Header'
import {
  TrustedBySection,
  AttendeeQuote,
  UpcomingTrainingSection,
} from '../components/training'
import { Card } from '../components/elements'
import { CallToActionRow } from '../components/layout/CallToActionNextTrainings'
import { Image } from '../components/elements'
import { BOOTCAMP_RIGHT, POLINA } from '../config/images'
import {
  NotBegginersIcon,
  RunFastIcon,
  TargetIcon,
  TickBadgeIcon,
  BulletIcon,
  PeopleNetWorkIcon,
} from '../components/icons'
import { Breadcrumb } from '../components/navigation'
import { selectTrainings, REACT_NATIVE } from '../config/data'

const trainings = selectTrainings(REACT_NATIVE)

const ReactNativeBoocamp = () => (
  <React.Fragment>
    <Breadcrumb
      path={[
        { to: '/', label: 'Home' },
        { to: '/react-native-bootcamp', label: 'React Native' },
      ]}
    />
    <Header
      titleLines={['React Native Training']}
      subtitle="Intense hands-on React Native training, <br /> return to work as a React Native specialist"
      bgImg="full-time"
    />
    <TopSection>
      <Grid>
        <CallToActionRow>
            <Col sm={6}>
                <LinkButton
                  cta
                  to="#contact-us"
                  children="Signup to our newsletter for latest updates"
                />
            </Col>
            <Col sm={3}>
              <LinkButton
                secondary
                to=""
                children="Next course TBA"
              />
            </Col>
          </CallToActionRow>
        <Card border="shadow">
          <CurriculumReactNative />
        </Card>
      </Grid>
    </TopSection>
    <Section>
      <Grid>
        <Row>
          <Col md={5}>
            <Image src={BOOTCAMP_RIGHT} width="100%" />
          </Col>
          <Col md={5} mdOffset={1}>
            <H2>Is this React Native training right for me?</H2>
            <Ul unstyled>
              <Li>
                <BulletIcon icon={NotBegginersIcon} />
                Ideal for React developers who want to expand their skills into
                React Native. Not for React beginners!
              </Li>
              <Li>
                <BulletIcon icon={RunFastIcon} />
                Extremely rapid, intense learning
              </Li>
              <Li>
                <BulletIcon icon={TickBadgeIcon} />
                Small classes with expert developer coaches - roughly one for
                every four students
              </Li>
              <Li>
                <BulletIcon icon={TargetIcon} />
                Hands-on project-based training - most of the time you'll be
                coding.
              </Li>
              <Li>
                <BulletIcon icon={PeopleNetWorkIcon} />
                Join a growing network of alumni for advice, knowledge and
                social fun!
              </Li>
            </Ul>
            {/* <P>
              <LinkButton cta to="/react-native-bootcamp-london">
                Next React Native: 17th Sept, London >>
              </LinkButton>
            </P>
            */}
          </Col>
        </Row>
      </Grid>
    </Section>
    <Section>
      <Grid>
        <Row>
          <Col lg={10} lgOffset={1}>
            <AttendeeQuote
              quote="I like how friendly the training was. I loved spending time pair programming and then sharing what we'd learnt from each other - that was the best bit. I would definitely recommend [ReactJS Academy]."
              fullname="Polina Stoyanova"
              job="Front-end and UX developer"
              company="tray.io"
              profilePicUrl={POLINA}
            />
          </Col>
        </Row>
      </Grid>
    </Section>
    <TrustedBySection />
    <UpcomingTrainingSection />
  </React.Fragment>
)

export default ReactNativeBoocamp
