import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableData } from '../store/store';
import { useFilters, usePagination, useTable } from 'react-table';
import "./Table.css";
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
      {
        Header: 'Details',
        accessor: 'details',
      },
      {
        Header: 'Success',
        accessor: 'launch_success',
        Cell: ({ value }) => (value ? 'Success' : 'Failure'), // Custom Cell renderer
      },
      {
        Header: 'Article',
        accessor: 'links.article_link', // Update accessor to point to the correct property
        Cell: ({ value }) => (
          <a href={value} target="_blank" rel="noopener noreferrer">
            Article
          </a>
        ), // Render link as a clickable anchor tag
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
    <div className="table-container">
      <input
        className="filter-input"
        type="text"
        placeholder="Search something"
        value={filterInput}
        onChange={handleFilterChange}
      />
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="table-row">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="table-header">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="table-body">
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="table-row">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="table-cell">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="pagination-button"
        >
          Previous
        </button>
        {pageOptions.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => gotoPage(pageNumber)}
            disabled={pageIndex === pageNumber}
            className={`pagination-button ${pageIndex === pageNumber ? 'active' : ''}`}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
