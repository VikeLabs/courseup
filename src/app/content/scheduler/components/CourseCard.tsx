/* eslint-disable prettier/prettier */
import { Box, Button, Text, Flex, VStack, Checkbox } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import { CardProps } from '../../../sidebar/components/Card';

export function CourseCard({ subject, title, code, selected, colour }: PropsWithChildren<CardProps>): JSX.Element {
    return (
        <Box
            boxShadow="md"
            cursor="pointer"
        >
            <Flex direction="row">
                <Flex background={colour} alignItems="center" justifyContent="center" mr="10px">
                    <Flex>
                        <Checkbox backgroundColor="whiteAlpha.600" colorScheme="whiteAlpha" iconColor="black" size="lg" mx="7px" />
                    </Flex>
                </Flex>
                <Flex direction="row" alignItems="center" justifyContent="space-between" w="100%" >
                    <VStack alignItems="start" spacing="0" py="2">
                        <Text fontSize="lg" fontWeight="bold">
                            {subject} {code}
                        </Text>
                        <Text fontSize="sm" fontWeight="normal">
                            {title}
                        </Text>
                    </VStack>
                    <VStack alignContent="right" pr="5px" py="5px">
                        <Button background="red" size="sm" alignContent="center" p="0">
                            <Text color="white" fontSize="2xl" ><svg width="17" height="17" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.13858 6.13861L1.21211 1.21214M6.13858 6.13861L11.0651 1.21214M6.13858 6.13861L11.0651 11.0651M6.13858 6.13861L1.21211 11.0651" stroke="white" stroke-width="2" />
                            </svg>
                            </Text>
                        </Button>
                        <Button background="#63B3ED" size="sm">
                            <Text color="white" fontSize="2xl">i</Text>
                        </Button>
                    </VStack>
                </Flex>
            </Flex>
        </Box>
    );
}