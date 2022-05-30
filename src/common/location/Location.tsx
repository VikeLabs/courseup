import { Tooltip, useMediaQuery, Text } from '@chakra-ui/react';

export default function Location({
  short,
  long,
  alwaysShort,
}: {
  short?: String;
  long: String;
  alwaysShort?: boolean;
}): JSX.Element {
  const [isMobile] = useMediaQuery('(max-width: 1020px)');
  return short && (alwaysShort || isMobile) ? (
    <Tooltip label={long}>
      <Text>{short}</Text>
    </Tooltip>
  ) : (
    <Text>{long}</Text>
  );
}
