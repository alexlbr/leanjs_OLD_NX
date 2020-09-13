import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { createMetas } from '@leanjs/ui-page';
import { useMagic } from '@leanjs/magic-link';
import {
  PaymentSection,
  formatTraining,
  TrainingItem,
  getTrainingTimings,
} from '@leanjs/ui-academy';
import { PlayMedia } from '@leanjs/ui-icons';
import { useQuery } from '@leanjs/graphql-client';

import ReactBgWithBorder from '../components/layout/Header/ReactBgWithBorder';
import Tick from '../components/icons/Tick';
import { FAQSection } from '../components/display/TrainingPage';
import Layout from '../components/layout/Layout';
import Sheet from '../components/layout/Sheet';
import Link from '../components/navigation/Link';
import Header from '../components/layout/Header';
import { P, H2, H3, H4 } from '../components/display';
import {
  Card,
  Container,
  Grid,
  Box,
  Tabs,
  TabList,
  TabItem,
  TabPanel,
  Ul,
  Li,
  Section,
} from '../components/layout';
import { VideoPlayer } from '../components/display/VideoPlayer';
import Markdown from '../components/display/Markdown';

const metas = {
  title: 'Online React and GraphQL Courses | React GraphQL Academy',
  description:
    'Looking for React and GraphQL online courses? React GraphQL Academy Online offers online courses following our proven teaching method. Enrol now!',
  type: 'website',
};

function CoursePage({ data, pageContext: { trainingId } }) {
  const { loading: loggingInUser } = useMagic();
  const training = data.upmentoring.trainingById;
  const trainingPath = `/${training.slug}-course`;
  const units = training.units || [];
  const title = `Online ${training.title} Course`;

  const trainingInstances =
    data.upmentoring.trainingInstances &&
    data.upmentoring.trainingInstances.edges
      ? data.upmentoring.trainingInstances.edges
          .map(formatTraining())
          .slice(0, 3)
      : [];

  // TODO useMemo variables inside useQuery
  const options = React.useMemo(() => {
    return { variables: { trainingId }, skip: loggingInUser };
  }, [trainingId, loggingInUser]);

  const { data: runTimeData, loading } = useQuery(
    `
      query purchasedTraining($trainingId: ID!) {
          viewer {
              purchasedTraining(trainingId: $trainingId ) { 
                id
              }
          }
          trainingById(id: $trainingId) {
            standardPrice
            currency
            discountPrice {
              currentPrice
              endsOn
            }
          }
      }
    `,
    options
  );

  const purchased = runTimeData?.viewer?.purchasedTraining?.id === trainingId;
  const coverImage =
    data.courseThumbnailImages.nodes[0].childImageSharp.fixed.src;
  const discountPrice = runTimeData?.trainingById?.discountPrice;
  const standardPrice = runTimeData?.trainingById?.standardPrice;
  const currency = runTimeData?.trainingById?.currency;
  const BgLogo = ReactBgWithBorder;

  return (
    <Layout
      breadcrumbPaths={[
        {
          path: '/',
          text: 'Home',
        },
        { text: training.title },
      ]}
    >
      <Helmet
        title={metas.title}
        meta={[
          {
            name: 'description',
            content: metas.description,
          },
        ]}
      >
        {createMetas(metas)}
      </Helmet>
      <BgLogo bgColor="#44B0C5" right={-50}>
        <Header
          title={title}
          subtitle={training.subtitle}
          minHeight="650px"
          bgColors={['#44B0C5']}
          bgImageOpacity={1}
          bgImage={coverImage}
          bgRepeat="repeat"
          bgSize="auto"
          links={[
            {
              text: 'Course layout',
              to: '#course-modules',
            },
            // {
            //   text: 'Is it right for me?',
            //   to: '#target-audience',
            // },
            {
              text: 'FAQs',
              to: '#faqs',
            },
            {
              text: purchased ? 'Thanks' : 'Price',
              to: '#pricing',
            },
          ]}
          info={
            training.previewVideo && (
              <Box sx={{ gridColumn: ['1 / 3'], mb: 5 }}>
                <VideoPlayer
                  poster={training.previewVideo.asset?.posterImageUrl}
                  url={training.previewVideo.asset?.url}
                />
              </Box>
            )
          }
        />
      </BgLogo>
      <Section variant="top">
        <Container>
          <Sheet>
            <H2 sx={{ mt: 0 }}>
              <Link id="course-modules" />
              {training.title} Modules
            </H2>

            <Grid columns={10}>
              {units.reduce((acc, unit, index) => {
                const { published } = unit;
                if (published) {
                  const lessonsCount =
                    (published.videos && published.videos.length) || 0;
                  const { previewVideo } = published;
                  acc.push(
                    <>
                      <Box sx={{ gridColumn: ['2/ -2', '1/ 4'], mb: 5 }}>
                        {previewVideo && (
                          <VideoPlayer
                            posterUrl={previewVideo.asset?.posterImageUrl}
                            url={previewVideo.asset?.url}
                          />
                        )}
                      </Box>
                      <Box
                        sx={{
                          gridColumn: ['1/ -1', '5/ -1'],
                          mb: index < units.length - 1 ? 8 : 0,
                        }}
                      >
                        <H3 sx={{ mt: 0 }}>{published.title}</H3>
                        <Ul variant="inline" sx={{ mb: 4 }}>
                          <Li sx={{ pl: 0 }}>{lessonsCount} lessons</Li>
                          <Li>|</Li>
                          <Li>
                            {' '}
                            {lessonsCount > 0 ? (
                              <>
                                <Link
                                  to={`${trainingPath}/${published.videos[0].slug}`}
                                >
                                  <PlayMedia
                                    fill="#1B1F23"
                                    sx={{ mb: '-7px', mx: 1, width: '16px' }}
                                  />{' '}
                                  Start watching
                                </Link>
                              </>
                            ) : null}
                          </Li>
                          {!purchased && (
                            <>
                              <Li>|</Li>
                              <Li>
                                <Link to="#pricing" sx={{ mt: 3 }}>
                                  Buy course
                                </Link>
                              </Li>
                            </>
                          )}
                        </Ul>
                        <Markdown>{published.description}</Markdown>
                        {published.objectives && published.syllabus ? (
                          <Tabs defaultValue="learning" sx={{ mt: 6 }}>
                            <TabList>
                              <TabItem name="learning">
                                Learning objectives
                              </TabItem>
                              <TabItem name="curriculum">Curriculum</TabItem>
                            </TabList>
                            <TabPanel name="learning"></TabPanel>
                            <TabPanel name="curriculum">
                              <Markdown>{published.syllabus}</Markdown>
                            </TabPanel>
                          </Tabs>
                        ) : (
                          <>
                            <H4>Learning objectives</H4>
                            <Markdown
                              li={({ children = null }) => (
                                <Li
                                  sx={{
                                    position: 'relative',
                                    listStyle: 'none',
                                  }}
                                >
                                  <Tick
                                    width={20}
                                    sx={{
                                      position: 'absolute',
                                      left: '-30px',
                                      top: '8px',
                                    }}
                                  />
                                  {children}
                                </Li>
                              )}
                            >
                              {published.objectives}
                            </Markdown>
                          </>
                        )}
                      </Box>
                    </>
                  );
                  return acc;
                }
              }, [])}
            </Grid>
            <H2>{training.title} Curriculum</H2>
            <Card variant="secondary">
              <Markdown>{training?.description?.syllabus}</Markdown>
            </Card>
            {/* <H2>
              <a id="target-audience" />
              Is this {training.title} course right for me?
            </H2> */}
          </Sheet>
        </Container>
      </Section>
      <FAQSection pageData={data.sanityTrainingPage} />

      <Section variant="secondary">
        <Container>
          <Sheet variant="transparent">
            <Grid columns={10}>
              <Box sx={{ gridColumn: ['1/ -1', '1/ 6'] }}>
                {!purchased ? (
                  <PaymentSection
                    standardPrice={standardPrice}
                    currency={currency}
                    itemId={training.id}
                    type={'Training'}
                    endDate={undefined}
                    onDemand={training.onDemand}
                    loading={loading}
                    discountPrice={discountPrice}
                  />
                ) : (
                  <H2 sx={{ color: 'inverseText' }}>
                    <Link id="pricing" />
                    Thank you for purchasing this course :)
                  </H2>
                )}
              </Box>
            </Grid>
          </Sheet>
        </Container>
      </Section>

      <Section>
        <Container>
          <Sheet variant="transparent">
            <H2 sx={{ mt: 0 }}>
              You can also learn this curriculum in a live training
            </H2>
            <P>
              Alternatively to this online course, you can also join a cohort
              and attend a React Redux Fundamentals live training. Discuss
              real-world problems with experts and work with other devs in any
              of the following training:
            </P>
            <Grid columns={{ minWidth: '300px' }} sx={{ mt: 7 }}>
              {trainingInstances.map((training) => {
                const { dayMonth, duration } = getTrainingTimings({ training });
                return (
                  <TrainingItem
                    key={training.id}
                    isOnline={training.isOnline}
                    cityCountry={training.cityCountry}
                    startDay={dayMonth[0]}
                    startMonth={dayMonth[1]}
                    duration={duration}
                    tech={training.tech}
                    trainingType={training.trainingType}
                    title={training.title}
                    path={training.toPath}
                    className={'alternative-live-training'}
                  />
                );
              })}
            </Grid>
          </Sheet>
        </Container>
      </Section>
    </Layout>
  );
}

export const query = graphql`
  query getTraining(
    $trainingId: ID!
    $path: String!
    $coverImageRegex: String!
  ) {
    courseThumbnailImages: allFile(
      filter: {
        absolutePath: { regex: $coverImageRegex }
        extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
      }
    ) {
      nodes {
        publicURL
        name
        childImageSharp {
          fixed(width: 1200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
    sanityTrainingPage(path: { eq: $path }) {
      ...sanityTrainingPageFragment
    }
    upmentoring {
      trainingById(id: $trainingId) {
        title
        subtitle
        slug
        id
        onDemand
        description {
          objectives
          syllabus
        }
        previewVideo {
          asset {
            url
            posterImageUrl
          }
        }
        units {
          published {
            title
            objectives
            syllabus
            description
            previewVideo {
              asset {
                url
                posterImageUrl
              }
            }
            videos {
              title
              slug
            }
          }
        }
      }
      trainingInstances(
        filter: {
          ownerId: "5aaa9b07f146e5cfafad189e"
          startDate: future
          trainingIds: [
            "@VFJBOjVkMDExNGI3MDYwNTFiN2QzYmNiMGNmOQ"
            "@VFJBOjVlMzg1NGQ2NmJmZDIzMDAwMjM4NjQ3Zg=="
          ]
        }
        orderBy: { sort: startDate, direction: ASC }
      ) {
        edges {
          node {
            __typename
            id
            startDate
            utcOffset
            endDate
            isOnline
            city
            cityCountry
            daysOfTheWeek
            address
            venueName
            mapUrl
            standardPrice
            currency
            title
            training {
              id
              slug
              customFieldsValues {
                values
                fieldId
              }
            }
            trainingInstanceType {
              name
              title
              id
            }
          }
        }
      }
    }
  }
`;

export default CoursePage;
