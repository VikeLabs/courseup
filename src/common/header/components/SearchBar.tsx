'use client';
import React, { ChangeEvent } from 'react';

import { FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react';
import { SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';

import { useSmallScreen } from 'lib/hooks/useSmallScreen';

type SearchBoxProps = {
  currentRefinement: string;
  isSearchStalled: boolean;
  refine: (value: string) => void;
  onChange?: (query: string) => void;
  onSubmit?: (query: string) => void;
};

function SearchBox({ currentRefinement, isSearchStalled, refine, onChange, onSubmit }: SearchBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    refine(e.currentTarget.value);
    onChange && onChange(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit !== undefined && onSubmit(currentRefinement);
  };

  return (
    <form noValidate action="" role="search" onSubmit={handleSubmit} style={{
      width: '100%',
    }}>
      <InputGroup>
        <FormControl id="courseSearch">
          <FormLabel margin={0}>
            <Input
              placeholder="Search for courses..."
              width={{ base: '100%', xl: 'md' }}
              height={12}
              fontSize={['lg', 'xl']}
              value={currentRefinement}
              onChange={handleChange}
              aria-label="Search for courses"
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
