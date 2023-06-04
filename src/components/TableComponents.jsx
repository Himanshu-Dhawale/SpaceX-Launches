import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableData } from '../store/store';
import { useFilters, usePagination, useTable } from 'react-table';

const TableComponent = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.table);
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: 'Mission Name',
        accessor: 'mission_name',
      },
      {
        Header: 'Rocket Name',
        accessor: 'rocket.rocket_name',
      },
      {
        Header: 'Launch Date',
        accessor: 'launch_date_local',
      },
      {
        Header: 'Launch Site',
        accessor: 'launch_site.site_name_long',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    pageOptions,
    gotoPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    usePagination
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter('mission_name', value);
    setFilterInput(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search something"
        value={filterInput}
        onChange={handleFilterChange}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, idx) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
              {headerGroup.headers.map((column, idx) => (
                <th {...column.getHeaderProps()} key={idx}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell,idx) => {
                  return <td {...cell.getCellProps()} key={}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        {pageOptions.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => gotoPage(pageNumber)}
            disabled={pageIndex === pageNumber}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </>
  );
};

export default TableComponent;

