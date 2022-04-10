/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import {
  Tooltip,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function Tooltiper(props) {
  const {
    isDisabled, tooltipText, children,
  } = props;
  return (
    isDisabled
      ? (
        <Tooltip title={tooltipText}>
          {children}
        </Tooltip>
      )
      : (
        <>{children}</>
      )
  );
}
Tooltiper.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  tooltipText: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};
Tooltiper.defaultProps = {
};
