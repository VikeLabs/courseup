import React, { ChangeEvent } from 'react';

import { FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react';
import { SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { useMatch, useNavigate } from 'react-router';

import { getCurrentTerm } from 'lib/utils';

type SearchBoxProps = {
  currentRefinement: string;
  isSearchStalled: boolean;
  refine: (value: string) => void;
  onChange?: (query: string) => void;
  onSubmit?: (query: string) => void;
};

function SearchBox({ currentRefinement, isSearchStalled, refine, onChange, onSubmit }: SearchBoxProps) {
  const calendarMatch = useMatch('/calendar/*');
  const scheduleMatch = useMatch('/schedule/*');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!calendarMatch && !scheduleMatch) navigate(`/calendar/${getCurrentTerm()}`);
    refine(e.currentTarget.value);
    onChange && onChange(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit !== undefined && onSubmit(currentRefinement);
  };

  return (
    <form noValidate action="" role="search" onSubmit={handleSubmit}>
      <InputGroup size="sm" mx="4">
        <FormControl id="courseSearch">
          <FormLabel margin={0}>
            <Input
              placeholder="Search for courses..."
              bg="white"
              borderRadius="md"
              width={['xs', 'sm', 'md']}
              height={8}
              fontSize={['sm']}
              value={currentRefinement}
              onChange={handleChange}
              aria-label="Search for courses..."
            />
          </FormLabel>
        </FormControl>
      </InputGroup>
    </form>
  );
}

type Props = SearchBoxProvided & {
  onChange?: (query: string) => void;
  onSubmit?: (query: string) => void;
};

export const Search = connectSearchBox<Props>(SearchBox);
