import { Button } from "antd";
import styled from "styled-components";

export const YellowButton = styled(Button)`
  --antd-wave-shadow-color: #f2c94c;
  &.ant-btn-primary {
    background: #f2c94c;
    border-color: #a88c35;
  }
  &.ant-btn-default:hover,
  &.ant-btn-default:focus {
    color: #f2c94c;
    border-color: #a88c35;
  }
  &.ant-btn-circle:hover,
  &.ant-btn-circle:focus,
  &.ant-btn-circle:active {
    color: #f2c94c;
    border-color: #a88c35;
  }
`;