import {
  Center,
  Grid,
  GridItem,
  Flex,
  Text,
  LinkBox,
  Box,
  Collapse,
  Alert,
  CloseButton,
  Link,
  AlertDescription,
} from '@chakra-ui/react';

import { useSessionStorage } from 'lib/hooks/storage/useSessionStorage';

import { NavButtons } from '../components/NavButtons';
import { Search } from '../components/SearchBar';
import { TermButtons } from '../components/TermButtons';

export interface HeaderProps {
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
}
/**
 * Primary UI component for content
 */
export function HeaderContainer({ onSearchChange }: HeaderProps): JSX.Element {
  const [banner, setBanner] = useSessionStorage('user:banner', true);
  return (
    <Box zIndex={1000}>
      <Collapse in={banner} animateOpacity>
        <Alert status="success" alignItems="center" justifyContent="center" variant="solid">
          <AlertDescription>
            ☕ Hey! We're holding <b>office hours</b> and a <b>backend developer workshop</b> for CourseUp on June, 19th
            at 11 am PDT on the{' '}
            <Link href="https://discord.gg/ZhpnafrxKQ" fontWeight="bold" isExternal>
              VikeLabs Discord!
            </Link>{' '}
            <Link href="https://github.com/VikeLabs/courseup/discussions/218" isExternal>
              Click here to learn more!
            </Link>
          </AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setBanner(false)} />
        </Alert>
      </Collapse>
      <Grid
        templateColumns="repeat(3, 1fr)"
        as="header"
        py="1.5"
        px="8"
        boxShadow="md"
        bg="#82cbee"
        zIndex={100}
        maxH="56px"
      >
        <GridItem colSpan={1}>
          <Flex justifyContent="space-between" alignContent="center" alignItems="flex-start">
            <LinkBox as={Link} to="/" bg="transparent" border="none" ml={5}>
              <Text fontSize="xl" fontWeight="bold" color="white">
                CourseUp
              </Text>
            </LinkBox>
            <NavButtons />
          </Flex>
        </GridItem>
        <GridItem colStart={2}>
          <Center>
            <Search onChange={onSearchChange} />
          </Center>
        </GridItem>
        <GridItem colStart={3}>
          <TermButtons />
        </GridItem>
      </Grid>
    </Box>
  );
}
