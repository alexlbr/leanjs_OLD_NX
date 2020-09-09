import React from 'react';
import { useMagic } from '@leanjs/magic-link';
import { Flex, Card } from '../components/layout';
import { H1, P, Spinner } from '../components/display';
import {
  Form,
  Field,
  Input,
  Button,
  composeValidators,
  mustBeEmail,
  required,
} from '../components/form';
import Link from '../components/navigation/Link';
import RGALogoDarkBg from '../components/logos/RGALogoDarkBg';
import CheckboxField from '../components/form/CheckboxField';
import { triggerSubscribe } from '../api';

function LoginPage({ navigate, location }) {
  const { login, loggedIn } = useMagic();
  console.log('aaa', location.state);
  if (loggedIn) {
    navigate(location.state?.referrer || '/react-foundation-course/');

    return null;
  }

  return (
    <Flex
      sx={{
        height: '100vh',
        bg: 'secondary',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Flex sx={{ flexDirection: 'column', my: 6 }}>
        <Link to="/" sx={{ mx: 'auto' }}>
          <RGALogoDarkBg width={'200px'} />
        </Link>

        <Card sx={{ maxWidth: '500px', mt: 7 }}>
          <H1 sx={{ textAlign: 'center' }}>Login</H1>
          <Form
            onSubmit={async ({ email, signUpNewsletter }: any) => {
              const token = await login({ email });
              if (token && signUpNewsletter) {
                triggerSubscribe({ email });
              }
            }}
          >
            {({ formSubmitted, submitting }) =>
              formSubmitted ? null : (
                <>
                  <Field
                    component={Input}
                    validate={composeValidators(mustBeEmail, required)}
                    label="Enter your email address and we'll email you a login link:"
                    name="email"
                    placeholder="eg. steve@wozniak.com"
                  />
                  <CheckboxField
                    name="signUpNewsletter"
                    label="Sign up to our newsletter (unsubscribe anytime)"
                    validate={required}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={submitting}
                    className="login-submit-button"
                    sx={{ mt: 4 }}
                  >
                    {submitting ? <Spinner /> : 'Submit'}
                  </Button>
                  <P>
                    We won't spam you as per our{' '}
                    <Link
                      className="footer-privacy-policy"
                      to="https://reactgraphql.academy/privacy-policy/"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </P>
                </>
              )
            }
          </Form>

          <P>
            Do you have problems logging in with your registered email? Please
            contact us at{` `}
            <Link
              to="mailto:hello@reactgraphql.academy?subject=Login%20issue&body=Hi%20RGA%20team,"
              className="login-contact-us-mailto"
            >
              hello@reactgraphql.academy
            </Link>
            .
          </P>
        </Card>
      </Flex>
    </Flex>
  );
}

export default LoginPage;
