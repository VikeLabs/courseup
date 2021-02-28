import React, { useState } from "react";
import { Box, Collapse, Flex, Heading, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Colors } from "../shared/styles";

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
    /*
    * The list of courses for this subject
    */
    courses: JSX.Element[];
}

export function CardDropDown(props: CardProps): JSX.Element {
    const [isDisplayed, setDisplayed] = useState(false);

    const handleClick = () => {
        setDisplayed(!isDisplayed)
    }

    return (
        <Flex direction="column">
            <StyledBox>
                <Flex direction="row" alignItems="center" justifyContent="space-between">
                    <Heading size="sm" color={Colors.black} fontWeight={"normal"}>
                        {props.subject} - {props.title}
                    </Heading>
                    <StyledIconButton
                        onClick={handleClick}
                        background="none"
                        aria-label="See Courses"
                        size="xs"
                        icon={<ChevronDownIcon />}
                    />
                </Flex>
            </StyledBox>

            <Collapse in={isDisplayed} animateOpacity>
                {props.courses}
            </Collapse>
        </Flex>
    );
}

const StyledBox = styled(Box)`
    background-color: ${Colors.white};
    color: ${Colors.black};
    padding: 1em;
    margin-top: 1em;
`

const StyledIconButton = styled(IconButton)`
    padding: 0.5em;
`
