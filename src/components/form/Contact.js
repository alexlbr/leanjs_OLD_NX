import React, { Component } from 'react'
import styled from 'styled-components'

import DefaultLink from '../navigation/Link'
import { InputButton } from '../buttons/Button'
import {
  H3 as DefaultH3,
  Label as DefaultLabel,
  P as DefaultP,
  H4 as DefaultH4,
} from '../text'
import DefaultInput, { ErrorMessage } from './Input'
import { Col, Row } from '../layout/Grid'
import { WHITE, FONT_FAMILY } from '../../config/styles'
import { TickBadgeIcon } from '../icons'
import { validate } from 'email-validator'

const H3 = styled(DefaultH3)`
  color: ${WHITE};
`

const P = styled(DefaultP)`
  color: ${WHITE};
`
const Label = styled(DefaultLabel)`
  color: ${WHITE};
`
const Link = styled(DefaultLink)`
  color: ${WHITE};
`
const Input = styled(DefaultInput)`
  background-color: ${WHITE};
`

const Unsubscribe = styled(P)`
  padding-top: 25px;
`

const ColField = styled(Col)`
  padding-top: 5px;
  padding-bottom: 5px;
`

const ThanksTitle = styled(H3)`
  margin: 1em 0;
` //TODO: animate this later

const Form = styled.form`
  display: block;
  width: 100%;

  label {
    display: block;
    margin-bottom: 8px;
  }

  input[type='email'] {
    border-color: transparent;
    border-width: 0;
  }

  input[type='submit'] {
    margin-top: 8px;
  }
`

class ContactForm extends Component {
  state = {
    email: '',
    formSubmited: false,
    emailValid: false,
  }
  handleFormSubmit = e => {
    e.preventDefault()
    this.setState({ formSubmited: true })
    window &&
      window.Autopilot &&
      window.Autopilot.run('associate', {
        _simpleAssociate: true,
        Email: this.state.email,
        custom: {
          'string--From--Path': window.location.pathname,
        },
      })
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('event', 'conversion', {
      send_to: 'AW-877316317/d5TtCOmF_IoBEN2Rq6ID',
    })
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value }, this.validateEmail)
  }

  validateEmail = () => {
    let emailValid = validate(this.state.email)
    this.setState({ emailValid })
  }

  render() {
    const { email, emailValid } = this.state
    const isValid = emailValid && email.length > 0
    const { addContactUsLink, simplified } = this.props

    return (
      <React.Fragment>
        {!simplified &&
          <React.Fragment>
                <H3>
              {addContactUsLink ? <a name="contact-us" /> : null}
              Contact us
            </H3>
            <P>
              The best way to contact us is by emailing us at{' '}
              <Link to="mailto:hello@reactjsacademy.com">
                hello@reactjs.academy
              </Link>
              .{' '}
            </P>
            <P>
              Otherwise, you can contact us socially on{' '}
              <Link to="https://twitter.com/reactjsacademy">Twitter</Link>,{' '}
              <Link to="https://www.instagram.com/reactjsacademy/">Instagram</Link>{' '}
              and{' '}
              <Link to="https://www.facebook.com/reactjsacademy/">Facebook</Link> or
              visit our <Link to="/about-us">About Us page</Link> and directly
              contact one of our coaches.{' '}
            </P>
          </React.Fragment>
        }
        <H3>Signup to our newsletter</H3>
        <P>
          Enter your email below and we'll email you with our <strong>latest training
          and free learning resources</strong>. And no, we don't spam you with anything
          else, as per our <Link to="/privacy-policy">Privacy Policy</Link>.
        </P>
        <Row>
          <Col>
            <Form
              id="subscribe-form"
              onSubmit={this.handleFormSubmit}
              style={this.state.formSubmited ? { display: 'none' } : {}}
            >
              <Label htmlFor="email">
                <P>Your email address:</P>
              </Label>
              <Input
                type="email"
                value={email}
                onChange={this.handleEmailChange}
                name="email"
                placeholder="name@email.com"
              />
              {email.length > 0 ? (
                emailValid ? null : (
                  <ErrorMessage>must enter a valid email</ErrorMessage>
                )
              ) : null}

              <InputButton cta value="Submit email" disabled={!isValid} />
            </Form>
          </Col>
        </Row>
        {this.state.formSubmited ? (
          <Row>
            <Col>
              <ThanksTitle>thanks for submitting!</ThanksTitle>
            </Col>
          </Row>
        ) : null}
        <Unsubscribe>
          Looking to unsubscribe? contact us at{' '}
          <Link to="mailto:unsubscribe@reactjs.academy">
            unsubscribe@reactjs.academy
          </Link>
        </Unsubscribe>
      </React.Fragment>
    )
  }
}

export default ContactForm
