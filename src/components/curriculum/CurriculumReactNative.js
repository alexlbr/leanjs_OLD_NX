import React from 'react'
import { H1Ref } from '../text'
import Link from '../navigation/Link'
import { LinkButton } from '../buttons'
import Section, { List, curriedToggleNavigateTo } from './CurriculumSection'
import { Col, Row } from '../layout/Grid'
import ReactNativeFoundationSession from './sessions/native/ReactNativeFoundationSession'
import ReactNativeNavigationSession from './sessions/native/ReactNativeNavigationSession'
import ReactNativeAnimationsSession from './sessions/native/ReactNativeAnimationsSession'
import ReactNativeGesturesSession from './sessions/native/ReactNativeGesturesSession'
import ReactNativeOfflineAndAssetCreationSession from './sessions/native/ReactNativeOfflineAndAssetCreationSession'
import ReactNativePushNotificationSession from './sessions/native/ReactNativePushNotificationSession'
import ReactNativeTestingSession from './sessions/native/ReactNativeTestingSession'
import ReactNativeNativeModulesSession from './sessions/native/ReactNativeNativeModulesSession'
import ReactNativeProductionSession from './sessions/native/ReactNativeProductionSession'
import SectionCTA from './SectionCTA'

import { REACT_NATIVE } from '../../config/data'
import selectCurriculumLayout, { LIST_TWO_COL } from './selectCurriculumLayout'

const CurriculumReactNative = ({
  showTitle = true,
  enableToggle,
  isOpen,
  toggleNavigateTo = `/curriculum?tab=${REACT_NATIVE}`,
  showLinkToCurriculum = true,
  layout,
}) => {
  const toggleNavigateToSection = curriedToggleNavigateTo(toggleNavigateTo)
  const commonProps = {
    enableToggle,
    toggleNavigateTo: toggleNavigateToSection,
    type: REACT_NATIVE,
    isOpen,
  }
  const firstHalf = (
    <React.Fragment>
      <Section
        {...commonProps}
        title="React Native Day 1"
        name="day1"
        subTitle="Foundation, Navigation, and Animations"
      >
        <ReactNativeFoundationSession title="Foundation" />
        <ReactNativeNavigationSession title="Navigation" />
        <ReactNativeAnimationsSession title="Animations" />
      </Section>
    </React.Fragment>
  )

  const secondHalf = (
    <React.Fragment>
      <Section
        {...commonProps}
        title="React Native Day 2"
        name="day2"
        subTitle="Gestures, Offline, Assets Management & Push Notifications"
      >
        <ReactNativeGesturesSession title="Gestures" />
        <ReactNativeOfflineAndAssetCreationSession title="Handling Offline & Assets Management" />
        <ReactNativePushNotificationSession title="Push Notifications" />
      </Section>
      <Section
        {...commonProps}
        title="React Native Day 3"
        name="day3"
        subTitle="Testing, Native Modules & Release to Production"
      >
        <ReactNativeTestingSession title="Testing in React Native" />
        <ReactNativeNativeModulesSession title="Native Modules" />
        <ReactNativeProductionSession title="Release to Production" />
      </Section>
      {showLinkToCurriculum && (
        <SectionCTA>
          <LinkButton secondary to={`/curriculum?tab=${REACT_NATIVE}`}>
            Full curriculum>>
          </LinkButton>
        </SectionCTA>
      )}
    </React.Fragment>
  )

  return (
    <React.Fragment>
      {showTitle ? (
        <Row>
          <Col lg={10} lgOffset={layout != LIST_TWO_COL && 1}>
            <H1Ref>
              React Native Curriculum
              <Link to="#curriculum" name="curriculum">
                #
              </Link>
            </H1Ref>
          </Col>
        </Row>
      ) : (
        ''
      )}
      {selectCurriculumLayout({ firstHalf, secondHalf, layout })}
    </React.Fragment>
  )
}

export default CurriculumReactNative
