import React from 'react'
import styled from 'styled-components'
import { DARK_BLUE } from '../../config/styles'
import Box from './Box'
import Grid, { Col, Row } from './Grid'

export const MOB_SECTION_MARGIN_Y = 5

export const getVariantProps = (variants, variantProps) =>
  variants && variants.reduce
    ? variants.reduce(
        (acc, variant) => ({
          ...acc,
          ...(variantProps[variant] || {}),
        }),
        {}
      )
    : variantProps[variants] || {}

const sectionVariantProps = {
  dark: {
    backgroundColor: DARK_BLUE,
    pt: 0,
    pb: 0,
  },
  darkMob: {
    backgroundColor: [DARK_BLUE, 'transparent'],
  },
}

const StyledSection = styled(Box)`
  p:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

const Section = ({ children, ...rest }) => (
  <StyledSection
    {...getVariantProps(rest.variant || rest.variants, sectionVariantProps)}
    {...rest}
  >
    <Grid>{children}</Grid>
  </StyledSection>
)

Section.defaultProps = {
  pt: [4, 4],
  pb: [4, 4],
  mt: [2, 3],
  mb: [2, 3],
  display: ['inline-block', 'block'],
  box: 'section',
}
Section.displayName = 'Section'

export const TopSection = styled(Section)``
TopSection.defaultProps = {
  position: 'relative',
  mt: [0, -125],
}
TopSection.displayName = 'TopSection'

export const ColSection = ({ col, col2, ...rest }) => {
  const variantProps = getVariantProps(
    rest.variants || rest.variant,
    colSectionVariantProps
  )
  const col1Props =
    col && col2 ? variantProps.col1 || {} : { md: 10, mdOffset: 1 }
  const Col1 = <Col {...col1Props}>{col}</Col>
  const Col2 = col2 && <Col {...(variantProps.col2 || {})}>{col2}</Col>

  return (
    <Section {...rest}>
      <Row>
        {Col1}
        {Col2}
      </Row>
    </Section>
  )
}

const colSectionVariantProps = {
  thin: {
    col1: {
      md: 5,
      mdOffset: 1,
    },
    col2: {
      md: 4,
      mdOffset: 1,
      mt: [5, 0],
    },
  },
  thinLeft: {
    col1: {
      md: 5,
      mdOffset: 1,
    },
    col2: {
      md: 5,
      mdOffset: 1,
      mt: [5, 0],
    },
  },
  thinRight: {
    col1: {
      md: 6,
    },
    col2: {
      md: 4,
      mdOffset: 1,
      mt: [5, 0],
    },
  },
}

ColSection.defaultProps = {
  variant: 'thin',
}

export default Section
