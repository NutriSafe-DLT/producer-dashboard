import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TablePagination,
  TableSortLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

export default function useTable<T>(
  records: T[],
  headCells: {
    id: any;
    label: string;
    enableSorting?: boolean;
  }[],
  searchAttributes: string[]
) {
  const classes = useStyles();

  const pages: number[] = [5, 10, 25];
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(pages[page]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState();
  const [filterFn, setFilterFn] = useState<{ fn: (input: T[]) => T[] }>({
    fn: (items: T[]) => {
      return items;
    },
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setPage(0);
    handleSearch(searchTerm);
  }, [searchTerm]);

  const TblContainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const TblHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.enableSorting ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => {
                    handleSortRequest(headCell.id);
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              ) : (
                headCell.label
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleSearch = (search: string) => {
    setFilterFn({
      fn: (items) => {
        if (search == "") return items;
        else {
          return items.filter((x) => {
            for (const [key, value] of Object.entries(x)) {
              if (
                searchAttributes.includes(key) &&
                value
                  .toString()
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              ) {
                return true;
              }
            }
            return false;
          });
        }
      },
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const recordsAfterPagingAndSortingAndSearching = () => {
    return stableSort(
      filterFn.fn(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    searchTerm,
    setSearchTerm,
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSortingAndSearching,
  };
}
