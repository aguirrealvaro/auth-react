import { FunctionComponent } from "react";
import { StyledIcon } from "styled-icons/types";

type IconProps = {
  icon: StyledIcon;
  size?: string;
  color?: string;
};

export const Icon: FunctionComponent<IconProps> = ({
  icon: Icon,
  size = "30px",
  color = "#000",
}) => {
  return <Icon size={size} style={{ color }} />;
};
