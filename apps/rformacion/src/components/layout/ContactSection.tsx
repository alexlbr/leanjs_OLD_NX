import React from 'react';
import { Container, Grid, Box } from '.';
import { Section } from './Section';
import { H2, P } from '../display';
import { LinkButton } from '../navigation/Link';

interface Props {
  title: string;
  text: string;
  buttonText: string;
}

function ContactSection({ title, text, buttonText = 'Contáctanos' }: Props) {
  return (
    <Section>
      <Container>
        <H2>{title}</H2>
        <P>{text}</P>
        <P sx={{ textAlign: 'center' }}>
          <LinkButton to="#contact-form">{buttonText}</LinkButton>
        </P>
      </Container>
    </Section>
  );
}

export default ContactSection;
