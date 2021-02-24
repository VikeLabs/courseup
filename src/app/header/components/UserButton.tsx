import React from "react";

import { UserOutlined } from "@ant-design/icons";
import { YellowButton } from "../shared/styles";

export function UserButton() {
  return <YellowButton shape="circle" icon={<UserOutlined />} />;
}
