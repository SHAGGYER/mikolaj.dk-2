import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import HttpClient from "../../utilities/HttpClient";
import Button from "../../components/Button";
import { Confirm, CustomDialog } from "react-st-modal";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../store/reducers/Common";
import ConfirmDialog from "../../components/ConfirmDialog";
import cogoToast from "cogo-toast";
import CoursesForm from "./CoursesForm";

const allColumns = [
  {
    name: "Name",
    selector: (key) => key.name,
    width: "200px",
  },
];

export default function BrowseCourses(props) {
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [columns, setColumns] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchRows(1);
  }, []);

  useEffect(() => {
    dispatch(setPageTitle("Courses"));
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

  const deleteRows = async (ids) => {
    await HttpClient().post("/api/courses/delete", { ids });
    cogoToast.success(`Successfully deleted ${selectedRows.length} rows`);
    await fetchRows(1);
  };

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const fetchRows = async (page) => {
    const { data } = await HttpClient().get(`/api/courses?page=${page}`);
    setRows(data.rows);
    setTotalRows(data.totalRows);
  };

  const handlePageChange = (page) => {
    fetchRows(page);
  };

  const openViewDialog = async (row) => {
    const result = await CustomDialog(<CoursesForm row={row} />);
    await fetchRows(1);
  };

  const ContextActions = React.useMemo(() => {
    const handleDelete = async () => {
      const result = await CustomDialog(
        <ConfirmDialog
          title="Delete course"
          body="You are about to delete course"
        />
      );
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
    const result = await CustomDialog(<CoursesForm />);
    if (result) {
      await fetchRows(1);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <Button onClick={openCreateDialog}>New Course</Button>
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
