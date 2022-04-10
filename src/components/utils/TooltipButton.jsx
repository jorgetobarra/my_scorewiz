/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import {
  Button,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

export default function TooltipButton(props) {
  const {
    text, isDisabled, tooltipText, link, onClick,
  } = props;
  return (
    isDisabled
      ? (
        <Tooltip title={tooltipText}>
          {/* <Button variant="contained" style={{ background: 'lightgrey' }}> */}
          <Button {...props} variant="outlined" style={{ color: 'lightgrey', borderColor: 'lightgrey' }}>
            {text}
          </Button>
        </Tooltip>
      )
      : link
        ? (
          <Link to={link} className="NoLink">
            <Button {...props} variant="contained">
              {text}
            </Button>
          </Link>
        )
        : (
          <Button {...props} variant="contained" onClick={onClick}>
            {text}
          </Button>
        )
  );
}
TooltipButton.propTypes = {
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  tooltipText: PropTypes.string.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func,
};
TooltipButton.defaultProps = {
  link: undefined,
  onClick: () => {},
};
