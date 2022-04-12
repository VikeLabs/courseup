import { Box, Flex, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { LoginModal } from '../lib/Login';
import { supabase } from '../utils/supabaseClient'

type OpenGraphProps = {
  tags: { property: string; content: string }[];
};

function OpenGraph({ tags }: OpenGraphProps) {
  return (
    <>
      {tags.map(({ property, content }) => (
        <meta key={property} property={property} content={content} />
      ))}
    </>
  );
}

// makes the page render at build time.
export const getStaticProps: GetStaticProps<HomePageProps> = async (context) => ({ props: {} });

type HomePageProps = {};

export function HomePage() {
  return (
    <Box>
      <Head>
        <title>CourseUp | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <OpenGraph
          tags={[
            {
              property: 'og:title',
              content: 'CourseUp',
            },
            {
              property: 'og:type',
              content: 'website',
            },
            {
              property: 'og:url',
              content: 'https://courseup.vikelabs.ca/',
            },
            {
              property: 'og:description',
              content: 'Browse and schedule UVic courses, simply.',
            },
          ]}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image" content="https://courseup.vikelabs.dev/assets/laptop.png" />
      </Head>
      <Flex as="header" borderBottom="1px solid gray" justify="space-between">
        <Flex>
          <Text py="1" fontFamily="Arial" fontWeight="extrabold" mx="3">
            COURSEUP
          </Text>
          <Flex gap="1">
            {['Explore', 'Timetable', 'Textbooks', 'Register'].map((t) => (
              <Box
                px="3"
                borderX="1px solid black"
                py="1"
                bgColor="white"
                _hover={{ bgColor: 'black', color: 'white' }}
              >
                <Text fontFamily="Arial">{t}</Text>
              </Box>
            ))}
          </Flex>
        </Flex>
        <Flex>
          {['Sign in', 'Dark', 'GitHub'].map((t) => (
            <Box
              mx="1"
              px="3"
              borderX="1px solid black"
              py="1"
              bgColor="white"
              _hover={{ bgColor: 'black', color: 'white' }}
            >
              <Text fontFamily="Arial">{t}</Text>
            </Box>
          ))}


        </Flex>
      </Flex>
      <LoginModal client={supabase} />
    </Box>
  );
}

export default HomePage;
