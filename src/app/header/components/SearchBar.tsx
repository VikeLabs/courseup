import { IconButton, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { GrSearch } from 'react-icons/gr';
import { connectSearchBox } from 'react-instantsearch-dom';

type SearchBoxProps = {
  currentRefinement: string;
  isSearchStalled: boolean;
  refine: (value: string) => void;
  onChange?: (value: string) => void;
};

function SearchBox({ currentRefinement, isSearchStalled, refine, onChange }: SearchBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    refine(e.currentTarget.value);
    onChange && onChange(e.currentTarget.value);
  };

  const handleSubmit = () => {};

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

const CustomSearchBox = connectSearchBox(SearchBox);

type SearchProps = {
  onChange?: (value: string) => void;
};

export function Search({ onChange }: SearchProps): JSX.Element {
  return <CustomSearchBox />;
}
