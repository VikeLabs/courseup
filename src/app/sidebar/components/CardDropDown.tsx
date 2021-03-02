import React, { PropsWithChildren, useState } from "react";
import { Box, Collapse, Flex, IconButton, Text, VStack } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export interface CardProps {
    /*
    * The subject
    * Ex/ CSC
    */
    subject: string;
    /*
    * The subject title
    * Ex/ Computer Science
    */
    title: string;
}

export function CardDropDown({ subject, title, children }: PropsWithChildren<CardProps>): JSX.Element {
    const [isDisplayed, setDisplayed] = useState(false);

    const handleClick = () => {
        setDisplayed(!isDisplayed);
    }

    return (
        <Flex direction="column">
            <Box
                p="1em"
                mt="1em"
                bgColor="white"
                color="black"
                boxShadow="lg"
            >
                <Flex direction="row" alignItems="center" justifyContent="space-between">
                    <VStack alignItems="start">
                        <Text fontSize="sm" color="black" fontWeight="bold">{subject}</Text>
                        <Text fontSize="xs" color="black" fontWeight="normal">{title}</Text>
                    </VStack>
                    <IconButton
                        p="0.5em"
                        onClick={handleClick}
                        background="none"
                        aria-label="See Courses"
                        size="xs"
                        icon={<ChevronDownIcon />}
                    />
                </Flex>
            </Box>

            <Collapse in={isDisplayed} animateOpacity>
                {children}
            </Collapse>
        </Flex>
    );
}
