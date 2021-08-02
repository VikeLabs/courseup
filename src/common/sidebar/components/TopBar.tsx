import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';

import { useIsDarkMode } from 'lib/hooks/useIsDarkMode';

export interface TopBarProps {
  /**
   * Back button click handler
   */
  onFilter?: (filter: boolean) => void;
}

export function TopBar({ onFilter }: TopBarProps): JSX.Element {
  const { isOpen, onToggle } = useDisclosure();
  const { term } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isDarkMode = useIsDarkMode();

  const subject = location.pathname.split('/')[3];
  const route = location.pathname.split('/')[1];

  const pid = searchParams.get('pid');

  return (
    <Box
      bgColor={isDarkMode ? 'dark.main' : 'white'}
      top="0"
      m="0"
      boxShadow="md"
      zIndex={10}
      borderBottomWidth="2px"
      borderBottomStyle="solid"
    >
      <Flex justifyContent="space-between" alignItems="center" p="3">
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={{ pathname: `/${route}/${term}/`, search: pid ? `?pid=${pid}` : undefined }}>
              Subjects
            </BreadcrumbLink>
          </BreadcrumbItem>
          {subject && (
            <BreadcrumbItem>
              <Text fontWeight="semibold">{subject}</Text>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
        <Box>
          <Button onClick={onToggle} size="xs">
            Filters
          </Button>
        </Box>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box p="3" shadow="md" borderTopWidth="2px" borderTopStyle="solid">
          <FormControl>
            <Flex justifyContent="space-between" w="100%">
              <FormLabel htmlFor="email-alerts" mb="0" fontSize="sm">
                Only Show Courses in Session
              </FormLabel>
              <Switch id="email-alerts" onChange={(e) => onFilter && onFilter(e.currentTarget.checked)} />
            </Flex>
          </FormControl>
        </Box>
      </Collapse>
    </Box>
  );
}
