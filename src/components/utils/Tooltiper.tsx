/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import {
  Tooltip,
} from '@mui/material';
import React from 'react';

interface TooltipperProps {
  isDisabled: boolean;
  tooltipText: string;
}

export default function Tooltiper({ isDisabled, tooltipText, children }: React.PropsWithChildren<TooltipperProps>) {
  return (
    isDisabled
      ? (
        <Tooltip title={tooltipText}>
          <>{children}</>
        </Tooltip>
      )
      : (
        <>{children}</>
      )
  );
}
