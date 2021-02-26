import { Input, Space } from "antd";

import React from "react";
import { TermButtons } from "./TermButtons";

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

type Props = {
  setTerm: React.Dispatch<React.SetStateAction<string>>;
};

export function SearchBar({ setTerm }: Props) {
  return (
    <Space direction="horizontal">
      <Search
        placeholder="Search a course"
        allowClear
        onSearch={onSearch}
        style={{ width: 548 }}
      />
      <TermButtons setTerm={setTerm} />
    </Space>
  );
}
