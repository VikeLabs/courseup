import { Image } from '@chakra-ui/image';
import { Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';

export default function Landing() {
  const [isLargerThan1100] = useMediaQuery('(min-width: 1100px)');
  console.log(isLargerThan1100);

  return (
    <Grid
      templateColumns={isLargerThan1100 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
      px="150px"
      gap="81px"
      justifyItems="center"
      w="100%"
      h="100%"
      alignItems="center"
    >
      <GridItem w={{ lg: '400px', xl: '639px', xxl: '1000px' }}>
        <Heading fontSize="75.68px" lineHeight="100px" mb="28px">
          Explore UVic Courses
        </Heading>
        <Text fontSize="25.71">CourseUp makes it simple to browse and schedule UVic Courses</Text>
        <Flex alignItems="center" mt="40px" as="a" w="fit-content" target="_blank" href="https://www.vikelabs.ca">
          <Text color="#4C6EA5" fontSize="24.25" mr="5px">
            Built by students @
          </Text>
          <Image src={process.env.PUBLIC_URL + '/assets/vikelabs.svg'} alt="VikeLabs" />
        </Flex>
      </GridItem>
      {isLargerThan1100 && (
        <GridItem maxH="563px" minW="fit-content">
          <Image
            src={process.env.PUBLIC_URL + '/assets/computer.svg'}
            flex="1"
            style={{
              WebkitFilter: 'drop-shadow( 27px 8px 36px rgba(0, 0, 0, .25))',
              filter: 'drop-shadow( 27px 8px 36px rgba(0, 0, 0, .25))',
            }}
          />
        </GridItem>
      )}
    </Grid>
  );
}
