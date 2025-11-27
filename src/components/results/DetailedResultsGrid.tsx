import styled from "@emotion/styled";
import {
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
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

interface DetailedResultsGridProps {
  results: any[][];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "gray",
    // backgroundColor: theme.palette.primary.main,
    color: "white",
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "lightgray",
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DetailedResultsGrid({
  results,
}: DetailedResultsGridProps) {
  const { contest: contestId } = useParams<{ contest: string }>();

  return (
    <Grid container className="DetailedResultsGrid" justifyContent="center">
      {/* {results.map((r) => <Typography>{JSON.stringify(r)}</Typography>)} */}
      {/* <Typography>{JSON.stringify(results)}</Typography> */}
      <Typography variant="h5">Details</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {results &&
                results[0]?.map((row, index) => (
                  <StyledTableCell key={index} align="center">{row}</StyledTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {results?.map((r, i) =>
              i > 0 ? (
                <StyledTableRow key={r[0]}>
                  {r.map((ri, index) => (
                    <TableCell key={index} align="center">{ri}</TableCell>
                  ))}
                </StyledTableRow>
              ) : (
                ""
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              {results &&
                results[0]?.map((row, index) => (
                  <TableCell key={index} align="center">{row}</TableCell>
                ))}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
}
