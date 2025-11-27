import { Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

interface TooltipButtonProps {
  text: string;
  isDisabled: boolean;
  tooltipText: string;
  link?: string;
  onClick?: () => void;
}

export default function TooltipButton({
  text,
  isDisabled,
  tooltipText,
  link,
  onClick = () => {},
  ...props
}: TooltipButtonProps & React.ComponentProps<typeof Button>) {
  return isDisabled ? (
    <Tooltip title={tooltipText}>
      {/* <Button variant="contained" style={{ background: 'lightgrey' }}> */}
      <Button
        {...props}
        variant="outlined"
        style={{ color: "lightgrey", borderColor: "lightgrey" }}
      >
        {text}
      </Button>
    </Tooltip>
  ) : link ? (
    <Link to={link} className="NoLink">
      <Button {...props} variant="contained">
        {text}
      </Button>
    </Link>
  ) : (
    <Button {...props} variant="contained" onClick={onClick}>
      {text}
    </Button>
  );
}
