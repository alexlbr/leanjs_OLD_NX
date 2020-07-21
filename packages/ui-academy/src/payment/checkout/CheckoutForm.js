import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {
  Button,
  Span,
  P,
  H4,
  H5,
  FormGroup,
  Input,
  Flex,
  Box,
  Spinner,
  Alert,
} from '@leanjs/ui-core';
import {
  Form,
  CheckboxField,
  Field,
  composeValidators,
  mustBeEuVat,
  required,
  mustBeCvc,
  mustBeEmail,
  mustBeCardNumber,
  mustBeCardDate,
} from '@leanjs/ui-final-form';
import { Link } from '@leanjs/ui-link';

// import { Span, P, H4, H5 } from '../../text';
// import { Button, LinkButton } from '../../buttons';
// import { FormGroup, InputField, Form, CheckboxField } from '../../form';
// import {
//   composeValidators,
//   mustBeEuVat,
//   required,
//   mustBeCvc,
//   mustBeEmail,
//   mustBeCardNumber,
//   mustBeCardDate,
// } from '../../form/validations';
// import { Row, Col } from '../../layout/Grid';
import { Price } from '../';

// import { WHITE, BROWN, GREY, FONT_FAMILY } from '../../../config/styles';

import Ribbon from '../Ribbon';

import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
  formatPrice,
} from '../utils';
import { getComponentAliaser } from '../utils';

const InputField = (props) => <Field {...props} component={Input} />;

const SCREEN_XS_MAX = '767px';
const SCREEN_SM_MIN = '768px';
const WHITE = '#fff';
const BROWN = '#979797';
const GREY = '#c4c4c4';
const FONT_FAMILY = `font-family: 'Barlow', sans-serif;`;

const LinkButton = (props) => <Button as={Link} {...props} />;
// These aliases enable the relevant elements to be selected by Enzyme for testing
// Have caution when updating these names as you will then need to update the tests as well.
const aliasLink = getComponentAliaser(Link);
const aliasInput = getComponentAliaser(InputField);
const aliasLinkButton = getComponentAliaser(LinkButton);
const aliasPrice = getComponentAliaser(Price);
const aliasButton = getComponentAliaser(Button);
const aliasCheckbox = getComponentAliaser(CheckboxField);
export const AddCompanyDetailsButton = aliasLink();
export const EUVATNumberField = aliasInput();
export const ValidateViesButton = aliasLinkButton();
export const ShowVoucherButton = aliasLink();
export const ValidateVoucherButton = aliasButton();
export const TotalPayablePrice = aliasPrice();
export const VoucherInput = aliasInput();
export const NameInput = aliasInput();
export const EmailInput = aliasInput();
export const NewsletterCheckbox = aliasCheckbox();
export const CCNameInput = aliasInput();
export const CCNumberInput = aliasInput();
export const CCExpiryInput = aliasInput();
export const CCCVCInput = aliasInput();
export const SubmitPaymentFormButton = aliasButton();

// const QuantityActions = styled(Flex)``
// QuantityActions.defaultProps = {
//   sx: {
//     textAlign: 'center',
//     mx: 0,
//     my: 1,
//   },
// }
const QuantityActions = ({ sx = {}, ...rest }) => (
  <Flex
    sx={{
      textAlign: 'center',
      mx: 0,
      my: 1,
      ...sx,
    }}
    {...rest}
  />
);

const QuantityButton = styled(Button)`
  font-size: 1.16rem !important;
  @media (max-width: ${SCREEN_XS_MAX}) {
    padding-right: 18px !important;
    padding-left: 18px !important;
  }
`;

const Quantity = styled.span`
  ${FONT_FAMILY} align-self: center;
  text-align: center;
  font-size: 1.16rem;
  display: inline-block;
  border-bottom: 1px solid ${BROWN};
  border-top: 1px solid ${BROWN};
  padding-top: 11px;
  padding-bottom: 12px;
  background-color: ${WHITE};
  @media (max-width: ${SCREEN_XS_MAX}) {
    width: 36px;
  }
  @media (min-width: ${SCREEN_SM_MIN}) {
    width: 48px;
  }
`;

const TotalPrice = styled(Span)`
  display: inline-block;
`;

const RowNumTickets = styled.div`
  display: flex;
`;

// const CheckoutH4 = styled(H4)``
// CheckoutH4.defaultProps = {
//   sx: {
//     pb: '6px',
//     m: '18px 0 9px',
//     borderBottom: '1px solid',
//     borderColor: GREY,
//   },
// }

const CheckoutH4 = ({ sx = {}, ...rest }) => (
  <H4
    sx={{
      pb: '6px',
      m: '18px 0 9px',
      borderBottom: '1px solid',
      borderColor: GREY,
      ...sx,
    }}
    {...rest}
  />
);

const RibbonBottomContainer = styled('div')`
  position: relative;
  > div {
    top: 0;
    @media (min-width: ${SCREEN_SM_MIN}) {
      right: -42px !important;
    }
    @media (max-width: ${SCREEN_XS_MAX}) {
      top: -2px;
      right: -10px !important;
    }
  }
`;

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVoucherDisplayed: !!props.voucher,
      isCompanyDetailsDisplayed: false,
    };
  }

  toggleDisplayVoucherSection = () => {
    this.setState({ isVoucherDisplayed: !this.state.isVoucherDisplayed });
  };

  toggleDisplayCompanyDetails = () => {
    this.setState({
      isCompanyDetailsDisplayed: !this.state.isCompanyDetailsDisplayed,
    });
  };

  onSubmitClicked = () => {
    // window.dataLayer = window.dataLayer || []
    // function gtag() {
    //   dataLayer.push(arguments)
    // }
    // gtag('event', 'conversion', { 'send_to': 'AW-877316317/d5TtCOmF_IoBEN2Rq6ID' });
  };

  render() {
    const {
      quantity,
      removeCourse,
      addCourse,
      priceQuantity,
      currentPriceQuantity,
      currency,
      vatRate,
      pay,
      isVoucherValidationInProgress,
      validateVoucher,
      voucher,
      resetVoucher,
      isVoucherValid,
      companyVat,
      isPaymentInProgress,
      paymentErrorMessage,
      showSubscribeToNewsletter,
      trialTraingInstance,
      isDonationTicket,
    } = this.props;
    const { isVoucherDisplayed, isCompanyDetailsDisplayed } = this.state;
    const discount = priceQuantity - currentPriceQuantity;
    const ticketVat = !vatRate
      ? 0
      : currentPriceQuantity - currentPriceQuantity * vatRate;

    return (
      <Fragment>
        <Helmet
          script={[
            {
              type: 'text/javascript',
              src: 'https://js.stripe.com/v2/',
              async: true,
            },
          ]}
        />
        <Flex>
          <Box sx={{ flex: 1 }}>
            <Span>
              {isDonationTicket ? 'Increase donation' : 'Number of tickets:'}
            </Span>
            <RowNumTickets>
              <QuantityActions>
                <QuantityButton
                  variant="secondary"
                  onClick={removeCourse}
                  children="-"
                />
                <Quantity children={quantity} />
                <QuantityButton
                  variant="secondary"
                  onClick={addCourse}
                  children="+"
                />
              </QuantityActions>
            </RowNumTickets>
          </Box>
          <Box sx={{ flex: 1 }}>
            <TotalPrice>
              {isDonationTicket ? 'Donation amount' : 'Price'}
            </TotalPrice>
            <P sx={{ textAlign: 'center' }}>
              <Price sx={{ mr: 1, mt: 1 }}>
                {formatPrice(currency, currentPriceQuantity, vatRate)}
              </Price>
              <br />

              {currentPriceQuantity < priceQuantity ? (
                <Span sx={{ textDecoration: 'line-through' }}>
                  (Full price: {formatPrice(currency, priceQuantity, vatRate)})
                </Span>
              ) : null}
            </P>
          </Box>
        </Flex>
        {isDonationTicket && (
          <Box sx={{ pb: 3 }}>
            <P>
              The ticket only grants access to one person to the event. More
              about the donation{' '}
              <Link to="/blog/join-our-meetups-and-support-minorities-in-tech#why_we_charge_a_nominal_fee">
                here
              </Link>
              .
            </P>
          </Box>
        )}

        {trialTraingInstance || priceQuantity > 200 ? (
          <Box mb={3}>
            <H5 sx={{ mb: 1, borderBottom: 'none' }}>Not ready to buy?</H5>
            {trialTraingInstance && (
              <LinkButton
                sx={{ mb: 2, mr: 3 }}
                to={trialTraingInstance.toPath}
                variant="primary"
              >
                Try first
              </LinkButton>
            )}

            {priceQuantity > 200 && (
              <LinkButton
                sx={{ mb: 2 }}
                to="mailto:lena@leanjs.com?subject=Pay in installments&body=Hi Lena,%0D%0A%0D%0APlease, let me know how I could spread the cost of the training and pay in installments.%0D%0A%0D%0AThank you!"
              >
                Pay in installments
              </LinkButton>
            )}
          </Box>
        ) : null}
        <Form
          onSubmit={pay}
          render={({ submitting, submitFailed, valid, values }) => {
            return (
              <>
                <CheckoutH4>Personal details</CheckoutH4>
                <NameInput
                  validate={required}
                  label="Your name:"
                  name="name"
                  placeholder="eg. Steve Jobs"
                />
                <EmailInput
                  validate={composeValidators(mustBeEmail, required)}
                  label="Your email address:"
                  name="email"
                  placeholder="eg. steve@jobs.com"
                />
                {showSubscribeToNewsletter && (
                  <Fragment>
                    <P>
                      Sign me up to learn about cutting-edge React & GraphQL
                      thinking plus the latest news on our courses. We won't
                      spam you, as per our{' '}
                      <Link to="/privacy-policy">Privacy Policy</Link>.
                    </P>
                    <NewsletterCheckbox
                      name="meetupSubscribe"
                      label="Subscribe me"
                    />
                  </Fragment>
                )}
                {isCompanyDetailsDisplayed ? (
                  <Fragment>
                    <FormGroup>
                      <Link onClick={this.toggleDisplayCompanyDetails}>
                        - Hide company details
                      </Link>
                    </FormGroup>
                    <InputField
                      label="Company name:"
                      name="companyName"
                      placeholder="eg. Acme Inc"
                      validate={required}
                    />
                    <EUVATNumberField
                      label="EU VAT number:"
                      name="companyVat"
                      placeholder="eg. GB256547555"
                      validate={composeValidators(mustBeEuVat, required)}
                      onChange={companyVat.resetVatRate}
                    />
                    <ValidateViesButton
                      disabled={
                        companyVat.isViesValid ||
                        companyVat.isViesValidationInProgress
                      }
                      onClick={() => companyVat.validateVies(values.companyVat)}
                    >
                      {companyVat.isViesValidationInProgress
                        ? 'Validating...'
                        : companyVat.isViesValid
                        ? 'VAT number validated'
                        : 'Validate EU VAT and update taxes'}
                    </ValidateViesButton>
                  </Fragment>
                ) : (
                  <FormGroup>
                    <AddCompanyDetailsButton
                      onClick={this.toggleDisplayCompanyDetails}
                    >
                      + Add company details
                    </AddCompanyDetailsButton>
                  </FormGroup>
                )}
                <CheckoutH4>Payment details</CheckoutH4>
                <CCNameInput
                  label="Name on card:"
                  name="CCname"
                  placeholder="eg. Steve Jobs"
                  validate={required}
                />
                <CCNumberInput
                  label="Card number:"
                  name="CCnumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  autoComplete="cc-number"
                  autoCorrect="no"
                  autoCapitalize="no"
                  spellCheck="no"
                  format={formatCreditCardNumber}
                  validate={composeValidators(mustBeCardNumber, required)}
                />
                <Flex>
                  <Box sx={{ flex: 1 }}>
                    <CCExpiryInput
                      label="Expiry date:"
                      name="CCexpiry"
                      placeholder="MM / YY"
                      maxLength="9"
                      format={formatExpirationDate}
                      validate={composeValidators(mustBeCardDate, required)}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <CCCVCInput
                      label="CVC:"
                      name="CCcvc"
                      placeholder="XXX"
                      maxLength="6"
                      format={formatCVC}
                      validate={composeValidators(mustBeCvc, required)}
                    />
                  </Box>
                </Flex>
                {isVoucherDisplayed ? (
                  <Fragment>
                    <FormGroup>
                      <Link onClick={this.toggleDisplayVoucherSection}>
                        - Hide discount voucher
                      </Link>
                    </FormGroup>
                    <VoucherInput
                      label="Discount voucher:"
                      name="voucher"
                      placeholder="Type your code here"
                      onChange={(e) => resetVoucher(e.target.value)}
                      value={voucher}
                      meta={{
                        pristine: !(isVoucherValid === false),
                        invalid: !isVoucherValid,
                        error:
                          isVoucherValid === false
                            ? 'The voucher is not valid'
                            : null,
                      }}
                    />
                    <FormGroup>
                      <ValidateVoucherButton
                        width={1}
                        disabled={
                          isVoucherValid || isVoucherValidationInProgress
                        }
                        onClick={() => validateVoucher(voucher)}
                        variant="secondary"
                      >
                        {isVoucherValidationInProgress
                          ? 'Validating...'
                          : isVoucherValid
                          ? 'Valid Voucher'
                          : 'Validate voucher'}
                      </ValidateVoucherButton>
                    </FormGroup>
                  </Fragment>
                ) : (
                  <FormGroup>
                    <ShowVoucherButton
                      onClick={this.toggleDisplayVoucherSection}
                    >
                      + Add discount voucher
                    </ShowVoucherButton>
                  </FormGroup>
                )}
                <RibbonBottomContainer>
                  <CheckoutH4>Pricing breakdown</CheckoutH4>
                  {currentPriceQuantity &&
                  priceQuantity - currentPriceQuantity > 0 ? (
                    <Ribbon>
                      You save{' '}
                      {formatPrice(
                        currency,
                        priceQuantity - currentPriceQuantity,
                        vatRate
                      )}
                      !
                    </Ribbon>
                  ) : (
                    ''
                  )}
                </RibbonBottomContainer>
                <Flex>
                  <Box sx={{ flex: 5 }}>
                    <Span>Full ticket price:</Span>
                  </Box>
                  <Box sx={{ flex: 7 }}>
                    <Span>{formatPrice(currency, priceQuantity, 0)}</Span>
                  </Box>
                </Flex>
                {priceQuantity !== currentPriceQuantity ? (
                  <Flex>
                    <Box sx={{ flex: 5 }}>
                      <Span>Your ticket price:</Span>
                    </Box>
                    <Box sx={{ flex: 7 }}>
                      <Span>
                        {formatPrice(currency, currentPriceQuantity, 0)}
                      </Span>
                    </Box>
                  </Flex>
                ) : null}
                <Flex>
                  <Box sx={{ flex: 5 }}>
                    <Span>
                      {`VAT (${
                        vatRate ? Math.round((vatRate - 1) * 100) : 0
                      }%):`}
                    </Span>
                  </Box>

                  <Box sx={{ flex: 7 }}>
                    <Span>
                      +{formatPrice(currency, Math.abs(ticketVat), 0)}
                    </Span>
                  </Box>
                </Flex>
                {discount ? (
                  <Flex>
                    <Box sx={{ flex: 5 }}>
                      <Span>Discounts:</Span>
                    </Box>
                    <Box sx={{ flex: 7 }}>
                      <Span>-{formatPrice(currency, discount, vatRate)}</Span>
                    </Box>
                  </Flex>
                ) : null}
                <Flex>
                  <Box sx={{ flex: 5 }}>
                    <Span>Total payable:</Span>
                  </Box>
                  <Box sx={{ flex: 7 }}>
                    {' '}
                    <TotalPayablePrice>
                      {formatPrice(currency, currentPriceQuantity, vatRate)}
                    </TotalPayablePrice>
                  </Box>
                </Flex>
                <Box sx={{ py: 8 }}>
                  <P>
                    By purchasing a training, you agree to our{' '}
                    <Link target="_blank" to="/terms-of-service">
                      Terms of Service
                    </Link>{' '}
                    &{' '}
                    <Link target="_blank" to="/code-of-conduct">
                      Code of conduct
                    </Link>
                  </P>
                  {submitFailed && !valid ? (
                    <Alert test-id="danger-alert" variant="danger">
                      Please fix the errors above
                    </Alert>
                  ) : null}

                  {paymentErrorMessage ? (
                    <Alert data-testid="danger-alert" variant="danger">
                      There was an error processing your credit card. Please
                      check your credit card with your bank. If the problem
                      persists contact{' '}
                      <Link to="mailto:hello@reactgraphql.academy">
                        hello@reactgraphql.academy
                      </Link>
                    </Alert>
                  ) : null}
                  <SubmitPaymentFormButton
                    type="submit"
                    variant="primary"
                    sx={{ width: '100%' }}
                    onClick={this.onSubmitClicked}
                    disabled={submitting || isPaymentInProgress}
                  >
                    {submitting || isPaymentInProgress ? (
                      <Spinner />
                    ) : (
                      'Place Order'
                    )}
                  </SubmitPaymentFormButton>
                </Box>
              </>
            );
          }}
        />
      </Fragment>
    );
  }
}

export default CheckoutForm;
