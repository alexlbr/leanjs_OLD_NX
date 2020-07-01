/* eslint no-undef: 0 */
import React from 'react';

import { BOOTCAMP } from '../../images/imageNames';
import { TopSection } from '../components/layout/Section';
import { Col, Row } from '../components/layout/Grid';
import { H2, P } from '../components/text';
import { RootHeader as Header } from '../components/layout/Header';
import Link from '../components/navigation/Link';
import { Segment } from '../components/elements';
import trackUserBehaviour, {
  CHECKOUT_PAYMENT_SUCCESS,
} from '../components/utils/trackUserBehaviour';

function gtag(...args) {
  window.dataLayer = window.dataLayer || [];
  dataLayer.push(...args);
}

class PaymentConfirmation extends React.Component {
  componentDidMount() {
    const { trackUserBehaviour } = this.props;
    const { makePayment: { payment = {} } = {}, trainingInstanceId = '' } =
      this.props.location.state || {};
    try {
      const { amount = 100, id } = payment;

      //conversion
      gtag('event', 'conversion', {
        send_to: 'AW-877316317/KPHjCIHC7ocBEN2Rq6ID',
        currency: 'GBP',
        value: amount * 0.01,
        transaction_id: id ? `${trainingInstanceId}_${id}` : '',
      });

      const payload = {
        payment,
        trainingInstanceId,
        metadata: JSON.parse(payment.metadata || '{}'),
      };

      if (id) {
        trackUserBehaviour({
          event: CHECKOUT_PAYMENT_SUCCESS,
          payload,
        });
      }
    } catch (err) {
      // TODO
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header
          titleLines={['Thanks!']}
          subtitle="We can’t wait to help you on your React journey."
          bgImageName={BOOTCAMP}
          fullHeight={false}
        />
        <TopSection>
          <Segment>
            <Row>
              <Col md={5} mdOffset={1}>
                <H2>What happens now?</H2>
                <P>
                  You should shortly receive an order confirmation and receipt
                  in your email. Your ticket along with further details about
                  the training you’ve signed up to will be sent within 24 hours.
                  Just check your inbox soon (be sure to check your spam folder
                  if you can’t see it).
                </P>
                <P>
                  If you have any questions, please don’t hesitate to contact
                  us. You can email us:{' '}
                  <Link to="mailto:hello@reactgraphql.academy">
                    hello@reactgraphql.academy
                  </Link>{' '}
                  or you can contact us on social media.
                </P>
              </Col>
              <Col md={4} mdOffset={1} />
            </Row>
          </Segment>
        </TopSection>
      </React.Fragment>
    );
  }
}

PaymentConfirmation.defaultProps = {
  trackUserBehaviour,
};

export default PaymentConfirmation;
