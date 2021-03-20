import { IconButton, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { GrSearch } from 'react-icons/gr';
import { SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';

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
    <form noValidate action="" role="search" onSubmit={handleSubmit}>
      <InputGroup size="sm">
        <Input
          placeholder="Search for anything"
          bg="white"
          value={currentRefinement}
          onChange={handleChange}
          onSubmit={(e) => e.preventDefault()}
        />
        <InputRightAddon p="0">
          <IconButton aria-label="Search" borderRadius="0" size="sm" icon={<GrSearch />} />
        </InputRightAddon>
      </InputGroup>
    </form>
  );
}

type Props = SearchBoxProvided & {
  onChange?: (query: string) => void;
  onSubmit?: (query: string) => void;
};

export const Search = connectSearchBox<Props>(SearchBox);
