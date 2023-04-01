import { Button, Flex, Img } from '@chakra-ui/react';

type Props = {
  filename: string;
  isSmallScreen: boolean;
  screenshotUrl: string;
};

export function ScreenshotModalContent({ filename, isSmallScreen, screenshotUrl }: Props): JSX.Element {
  return (
    <Flex flexDirection="column" gap="2.5rem" display="flex" alignItems="center">
      <Flex justifyContent="center">
        <Img width={isSmallScreen ? '9rem' : 'xs'} src={screenshotUrl} alt="Your timetable" />
      </Flex>
      <Flex textAlign="center" justifyContent="center">
        <Button size="sm" colorScheme="orange" as="a" href={screenshotUrl} download={filename} target="_blank">
          Download your timetable
        </Button>
      </Flex>
    </Flex>
  );
}
