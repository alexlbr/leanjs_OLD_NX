import React from 'react';
import { graphql } from 'gatsby';

import { Header } from '../components/layout/Header';
import { Container, Grid, Box, Ul, Li } from '../components/layout';
import { Section } from '../components/layout/Section';
import { H2, H3, P, Image } from '../components/display';
import { Card } from '../components/layout/Card';
import { BLUE, YELLOW, GREEN } from '../config/theme';
import Link, { LinkButton } from '../components/navigation/Link';

function Index(props) {
  const imageDemo = props.data.coverImage.childImageSharp.fixed;

  return (
    <>
      <Header
        bgFixedImage={imageDemo}
        title={'Escribir aquí el porqué el usuario desea comprar aquí'}
        subtitle="Escribir aquí lo que vendemos sin que ocupe mas de dos lineas"
        bgColors={['#031430', BLUE, BLUE, GREEN, YELLOW]}
        bgGradientOpacity={1}
        callToAction={<LinkButton variant="primary">Ver cursos</LinkButton>}
      />

      <Section>
        <Container>
          <H2 sx={{ mt: 0 }}>Cursos</H2>
          <Grid columns={{ minWidth: '300px' }}>
            {[1, 2, 3].map(() => (
              <Card variant="primary">
                <Link to="">
                  <Image
                    // fixed={fixedImage}
                    src={imageDemo.src}
                    sx={{ mb: 0, maxHeight: '200px' }}
                  />
                </Link>
                <Box sx={{ p: 3, mt: 1 }}>
                  <Link to="">
                    <H3 sx={{ mt: 0 }}>Titulo del curso</H3>
                  </Link>
                  <P>Explicacion breve</P>
                  <LinkButton variant="primary">Ver curso</LinkButton>
                </Box>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section variant="primary">
        <Container>
          <H2 sx={{ mt: 0 }}>Esto es una seccion muy destacada</H2>
          <P>
            Lorem ipsum sdfadf asd fasfs orem ipsum sdfadf asd fasfs orem ipsum
            sdfadf asd fasfs orem ipsum sdfadf asd fasfs orem ipsum sdfadf asd
            fasfs orem ipsum sdfadf asd fasfs orem ipsum sdfadf asd fasfs orem
            ipsum sdfadf asd fasfs orem ipsum sdfadf asd fasfs orem ipsum sdfadf
            asd fasfs orem ipsum sdfadf asd fasfs{' '}
          </P>
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid columns={12}>
            <Box
              sx={{
                gridColumn: ['1/ -1', '2/ 6'],
              }}
            >
              <Card variant="secondary">
                <Image src={imageDemo.src} />
                <P>
                  "Este curso me gusto mucho porque bla bla bla bla bla bla bla
                  bla bla bla bla bla bla bla bla"
                </P>
                <P>Pepito Gomez [LINK PERFIL SOCIAL]</P>
                <LinkButton>Leer mas testiminios</LinkButton>
              </Card>
            </Box>
            <Box
              sx={{
                gridColumn: ['1/ -1', '7/ -1'],
              }}
            >
              <H2 sx={{ mt: 0 }}>Es ReinvantaFormacion adecuada para mí?</H2>
              <P>
                Lorem ipsum sdfadf asd fasfs orem ipsum sdfadf asd fasfs orem
                ipsum sdfadf asd fasfs orem ipsum sdfadf asd fasfs orem ipsum
                sdfadf asd fasfs orem ipsum sdfadf asd fasfs orem ipsum sdfadf
                asd fasfs orem ipsum sdfadf asd fasfs orem ipsum sdfadf asd
                fasfs orem ipsum sdfadf asd fasfs orem ipsum sdfadf asd fasfs{' '}
              </P>
              <Ul>
                <Li>Motivo 1 bla bla bla</Li>
                <Li>Motivo 2 bla bla bla</Li>
                <Li>Motivo 3 bla bla bla</Li>
              </Ul>
            </Box>
          </Grid>
        </Container>
      </Section>

      <Section variant="secondary">
        <Container>
          <H2 sx={{ mt: 0 }}>Esto es una seccion destacada</H2>
          <P>
            Lorem ipsum sdfadf asd fasfs orem ipsum sdfadf asd fasfs orem ipsum
            sdfadf asd fasfs orem ipsum sdfadf asd fasfs orem ipsum sdfadf asd
            fasfs orem ipsum sdfadf asd fasfs orem ipsum sdfadf asd fasfs orem
            ipsum sdfadf asd fasfs orem ipsum sdfadf asd fasfs orem ipsum sdfadf
            asd fasfs orem ipsum sdfadf asd fasfs{' '}
          </P>
        </Container>
      </Section>

      <Section>
        <Container>
          <H2 sx={{ mt: 0 }}>Articulos</H2>
          <Grid columns={{ minWidth: '300px' }}>
            {[1, 2, 3].map(() => (
              <Card>
                <Link to="">
                  <Image
                    // fixed={fixedImage}
                    src={imageDemo.src}
                    sx={{ mb: 0, maxHeight: '200px' }}
                  />
                </Link>
                <Box sx={{ p: 3, mt: 1 }}>
                  <Link to="">
                    <H3 sx={{ mt: 0 }}>Titulo del post</H3>
                  </Link>
                  <P>
                    Lorem ipsum asfa lsfak sdfa asfa lsfak sdfa asfa lsfak sdfa
                    asfa lsfak sdfa...
                  </P>
                  <Link to="">Leer mas</Link>
                </Box>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
}

export const query = graphql`
  query {
    coverImage: file(
      absolutePath: { regex: "/welcome/" }
      extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
    ) {
      publicURL
      name
      childImageSharp {
        fixed(width: 1200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default Index;
