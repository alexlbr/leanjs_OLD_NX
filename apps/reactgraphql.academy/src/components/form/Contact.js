import React, { useState } from 'react';
import { navigate } from 'gatsby';

import { WHITE } from '../../config/styles';
import Link from '../navigation/Link';
import { Button } from '../buttons';
import { H3, P } from '../text';
import { InputField, Form } from '.';
import { Col, Row } from '../layout/Grid';
import { getComponentAliaser } from '../utils/aliasComponent';
import { composeValidators, required, mustBeEmail } from './validations';
import { triggerSubscribe } from '../../api/rest';
import { Newsletter } from '../elements';
import Spinner from '../form/Spinner';

const aliasInput = getComponentAliaser(InputField);
const aliasH3 = getComponentAliaser(H3);

export const EmailInput = aliasInput();
export const ThanksTitle = aliasH3();

export const THANKS_MESSAGE = 'Thanks for submitting!';

const ContactForm = ({
  triggerSubscribe,
  addContactUsLink = false,
  simplified = false,
  variant = 'primary',
  newsletterAnchorName = '',
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleFormSubmit = async ({ email }) => {
    await triggerSubscribe({ email });
    setFormSubmitted((prevState) => !prevState);
    navigate('/thanks-for-signing-up');
  };

  return (
    <React.Fragment>
      {!simplified && (
        <React.Fragment>
          <H3>
            {addContactUsLink ? <a name="contact-us" /> : null}
            Contact us
          </H3>
          <P>
            You can call us during working hours on: +44 20 8123 8184, or email
            us at:{' '}
            <Link
              to="mailto:hello@reactgraphql.academy?subject=Training%20Query&body=Hi%20RGA%20team!"
              className="footer-contact-us-mailto"
            >
              hello@reactgraphql.academy
            </Link>
          </P>
          <P>
            Otherwise, you can contact us socially on{' '}
            <Link
              to="https://twitter.com/reactgqlacademy"
              className="footer-contact-us-links"
            >
              Twitter
            </Link>
            ,{' '}
            <Link
              to="https://www.instagram.com/reactgraphqlacademy/"
              className="footer-contact-us-links"
            >
              Instagram
            </Link>{' '}
            and{' '}
            <Link
              to="https://www.facebook.com/reactgraphqlacademy/"
              className="footer-contact-us-links"
            >
              Facebook
            </Link>
            .
          </P>
        </React.Fragment>
      )}
      <Newsletter showCTA={false} anchorName={newsletterAnchorName} />
      <Row>
        <Col>
          <Form onSubmit={handleFormSubmit}>
            {({ valid, formSubmitted, submitting }) =>
              formSubmitted ? null : (
                <>
                  <EmailInput
                    validate={composeValidators(mustBeEmail, required)}
                    label="Your email address:"
                    name="email"
                    placeholder="eg. steve@wozniak.com"
                    color={WHITE}
                  />
                  <Button
                    variant={variant || 'primary'}
                    type="submit"
                    disabled={submitting}
                    className="newsletter-submit-button"
                  >
                    {submitting ? <Spinner /> : 'Submit email'}
                  </Button>
                </>
              )
            }
          </Form>
          <P sx={{ pt: 3 }}>
            We won't spam you as per our{' '}
            <Link className="footer-privacy-policy" to="/privacy-policy">
              Privacy Policy
            </Link>
            .
          </P>
          <P>
            Looking to{' '}
            <Link to="/unsubscribe/" className="footer-unsubscribe">
              unsubscribe?
            </Link>
          </P>
        </Col>
      </Row>
      {formSubmitted ? (
        <Row>
          <Col>
            <ThanksTitle sx={{ my: 3 }}>{THANKS_MESSAGE}</ThanksTitle>
          </Col>
        </Row>
      ) : null}
    </React.Fragment>
  );
};

ContactForm.defaultProps = {
  triggerSubscribe,
};

export default React.memo(ContactForm);
