import React, { PropsWithChildren, useState } from "react";
import { Box, Collapse, Flex, Heading, HStack, IconButton } from "@chakra-ui/react";
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

export function CardDropDown({subject, title, children}: PropsWithChildren<CardProps>): JSX.Element {
    const [isDisplayed, setDisplayed] = useState(false);

    const handleClick = () => {
        setDisplayed(!isDisplayed)
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
                    <HStack>
                        <Heading size="sm" color="black" fontWeight="semibold">{subject}</Heading>
                        <Heading size="sm" color="black" fontWeight="normal">-</Heading>
                        <Heading size="sm" color="black" fontWeight="normal">{title}</Heading>
                    </HStack>
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
