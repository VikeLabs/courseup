import { Input, Space } from "antd";

import React from "react";
import { TermButtons } from "./TermButtons";

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

export function SearchBar() {
  return (
    <Space direction="horizontal">
      <Search
        placeholder="Search a course"
        allowClear
        onSearch={onSearch}
        style={{ width: 548 }}
      />
      <TermButtons />
    </Space>
  );
}
