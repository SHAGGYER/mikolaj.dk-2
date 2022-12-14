import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import HttpClient from "../../utilities/HttpClient";
import Button from "../../components/Button";
import { Confirm, CustomDialog } from "react-st-modal";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../store/reducers/Common";
import HobbiesForm from "./HobbiesForm";
import cogoToast from "cogo-toast";
import { ConfirmDialog } from "../../components/ConfirmDialog";

const allColumns = [
  {
    name: "Name",
    selector: (key) => key.name,
    width: "200px",
  },
];

function BrowseHobbies(props) {
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);
  const [showOnlyWithPhoto, setShowOnlyWithPhoto] = useState(false);
  const [columns, setColumns] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle("Hobbies"));
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

  const deleteRows = async (ids) => {
    await HttpClient().post(`/api/resource/hobby/delete`, { ids });
    cogoToast.success(`Successfully deleted ${selectedRows.length} rows`);
    await fetchRows(1);
  };

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const fetchRows = async (page) => {
    const { data } = await HttpClient().get(`/api/resource/hobby?page=${page}`);
    setRows(data.rows);
    setTotalRows(data.totalRows);
  };

  const handlePageChange = (page) => {
    fetchRows(page);
  };

  const openViewDialog = async (row) => {
    const result = await CustomDialog(<HobbiesForm row={row} />);
    if (result) {
      await fetchRows(1);
    }
  };

  const ContextActions = React.useMemo(() => {
    const handleDelete = async () => {
      const result = await Confirm("Sure?");
      if (result) {
        setToggleCleared(!toggleCleared);
        await deleteRows(selectedRows.map((x) => x._id));
      }
    };

    return (
      <>
        <Button onClick={handleDelete}>Delete</Button>
      </>
    );
  }, [selectedRows]);

  const openCreateDialog = async () => {
    const result = await CustomDialog(<HobbiesForm />);
    if (result) {
      await fetchRows(1);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <Button onClick={openCreateDialog}>New Hobby</Button>
      </div>
      <DataTable
        title="All Hobbies"
        columns={columns}
        data={rows}
        selectableRows
        contextActions={ContextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
      />
    </>
  );
}

export default BrowseHobbies;
