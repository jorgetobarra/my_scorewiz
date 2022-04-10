/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import {
  Fade,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { mapResultsToGrid } from '../../services/helpers';
import { getContest } from '../../services/localStorageService';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'gray',
    // backgroundColor: theme.palette.primary.main,
    color: 'white',
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'lightgray',
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function DetailedResultsGrid({ results }) {
  const { contest: contestId } = useParams();

  return (
    <Grid container className="DetailedResultsGrid" justifyContent="center">
      {/* {results.map((r) => <Typography>{JSON.stringify(r)}</Typography>)} */}
      {/* <Typography>{JSON.stringify(results)}</Typography> */}
      <Typography variant="h5">Details</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {results && results[0]?.map((row) => <StyledTableCell align="center">{row}</StyledTableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {results?.map((r, i) => (
              i > 0 ? (
                <StyledTableRow
                  key={r[0]}
                >
                  {r.map((ri) => (
                    <TableCell align="center">
                      {ri}
                    </TableCell>
                  ))}
                </StyledTableRow>
              ) : ''
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              {results && results[0]?.map((row) => <TableCell align="center">{row}</TableCell>)}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
}
DetailedResultsGrid.propTypes = {
  results: PropTypes.array.isRequired,
};
