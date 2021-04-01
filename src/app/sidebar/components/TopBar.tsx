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

export interface TopBarProps {
  /**
   * Current selected subject, appears as heading
   */
  selectedSubject?: string;
  /**
   * Back button click handler
   */
  handleTopBarBackClick(): void;
  onFilter?: (filter: boolean) => void;
}

export function TopBar({ selectedSubject, handleTopBarBackClick, onFilter }: TopBarProps): JSX.Element {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      bg="white"
      top="0"
      m="0"
      boxShadow="md"
      zIndex={10}
      borderColor="gray.200"
      borderBottomWidth="2px"
      borderBottomStyle="solid"
    >
      <Flex justifyContent="space-between" alignItems="center" p="3">
        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" color="black" onClick={handleTopBarBackClick}>
              Subjects
            </BreadcrumbLink>
          </BreadcrumbItem>
          {selectedSubject && (
            <BreadcrumbItem color="black">
              <Text fontWeight="semibold">{selectedSubject}</Text>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
        <Box>
          <Button onClick={onToggle} size="xs" color="black">
            Filters
          </Button>
        </Box>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box p="3" color="white" shadow="md" borderColor="gray.200" borderTopWidth="2px" borderTopStyle="solid">
          <FormControl>
            <Flex justifyContent="space-between" w="100%">
              <FormLabel color="black" htmlFor="email-alerts" mb="0" fontSize="sm">
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
