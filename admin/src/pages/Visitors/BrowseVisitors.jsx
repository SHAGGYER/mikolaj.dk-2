import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import HttpClient from "../../utilities/HttpClient";
import Button from "../../components/Button";
import { Confirm, CustomDialog } from "react-st-modal";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../store/reducers/Common";
import VisitorView from "./VisitorView";

const allColumns = [
  {
    name: "IP Address",
    selector: (key) => key.ipAddress,
    width: "200px",
  },
  {
    name: "Visited Pages",
    selector: (key) => key.visitedPagesCount,
  },
  {
    name: "Country",
    selector: (key) => key.country,
  },
];

function BrowseUsers(props) {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);
  const [showOnlyWithPhoto, setShowOnlyWithPhoto] = useState(false);
  const [columns, setColumns] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle("Users"));
  }, []);

  useEffect(() => {
    setColumns([
      ...allColumns,
      {
        name: "Actions",
        cell: (row) => (
          <div style={{ display: "flex", gap: "0.25rem" }}>
            <Button
              type="primary"
              size="xs"
              onClick={() => openViewDialog(row)}
            >
              View
            </Button>
          </div>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    fetchRows(1);
  }, [showOnlyVerified, showOnlyWithPhoto]);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const fetchRows = async (page) => {
    const { data } = await HttpClient().get(`/api/visitor?page=${page}`);
    setRows(data.rows);
    setTotalRows(data.totalRows);
  };

  const handlePageChange = (page) => {
    fetchRows(page);
  };

  const openViewDialog = async (row) => {
    await CustomDialog(<VisitorView row={row} />);
  };

  return (
    <>
      <DataTable
        title="Visitors"
        columns={columns}
        data={rows}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
      />
    </>
  );
}

export default BrowseUsers;
