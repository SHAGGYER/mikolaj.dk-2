import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import HttpClient from "../../utilities/HttpClient";
import Button from "../../components/Button";
import { Confirm, CustomDialog } from "react-st-modal";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../store/reducers/Common";
import MailView from "./MailView";
import ConfirmDialog from "../../components/ConfirmDialog";
import cogoToast from "cogo-toast";
import styled from "styled-components";
import ComposeMail from "./ComposeMail";

const MailContainer = styled.article`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  gap: 0.5rem;

  .folders {
    min-width: 300px;
    max-width: 300px;
    background-color: white;
    padding: 1rem;

    h3 {
      font-size: 1.27rem;
      margin-bottom: 1.8rem;
    }

    ul {
      li {
        border: 1px solid #ccc;
        padding: 0.5rem;
        border-bottom: 0;
        cursor: pointer;

        &:last-child {
          border-bottom: 1px solid #ccc;
        }
      }
    }
  }

  .mails {
    flex: 1;
  }
`;

const ViewMode = styled.div`
  background-color: white;
  padding: 1rem;
`;

const allColumns = [
  {
    name: "From",
    selector: (key) => key.from,
    width: "200px",
    cell: (row) => (
      <>{!row.seen ? <b>{row.from}</b> : <span>{row.from}</span>}</>
    ),
  },
  {
    name: "To",
    selector: (key) => key.to,
    width: "200px",
  },
  {
    name: "Subject",
    selector: (key) => key.subject,
    width: "250px",
  },
];

const MODE = {
  BROWSE: "browse",
  VIEW: "view",
};

function BrowseMail(props) {
  const [folder, setFolder] = useState("inbox");
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState(MODE.BROWSE);
  const [selectedMail, setSelectedMail] = useState(null);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);
  const [showOnlyWithPhoto, setShowOnlyWithPhoto] = useState(false);
  const [columns, setColumns] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle("Mail"));
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
    fetchRows(1, "inbox");
  }, [showOnlyVerified, showOnlyWithPhoto]);

  const fetchRows = async (page, folder) => {
    const { data } = await HttpClient().get(
      `/api/mail?page=${page}&folder=${folder}`
    );
    setPage(page)
    setRows(data.rows);
    setTotalRows(data.totalRows);
  };

  const handlePageChange = (page) => {
    fetchRows(page, folder);
  };

  const openViewDialog = async (row) => {
    setMode(MODE.VIEW);
    setSelectedMail(row);

    await HttpClient().put(`/api/mail/update-seen/${row._id}`);
  };

  const ContextActions = React.useMemo(() => {
    const handleDelete = async () => {
      const result = await CustomDialog(
        <ConfirmDialog
          title="Delete mail"
          body="You are about to delete mail"
        />
      );
      if (result) {
        setToggleCleared(!toggleCleared);
        await deleteRows(selectedRows.map((x) => x._id));
      }
    };

    const handleRestore = async () => {
      const result = await CustomDialog(
        <ConfirmDialog
          title="Restore mail"
          body="You are about to restore mail"
        />
      );
      if (result) {
        setToggleCleared(!toggleCleared);
        await restoreMail(selectedRows.map((x) => x._id));
      }
    };

    const handleDeletePermanently = async () => {
      const result = await CustomDialog(
        <ConfirmDialog
          title="Delete mail permanently"
          body="You are about to delete mail permanently"
        />
      );
      if (result) {
        setToggleCleared(!toggleCleared);
        await deleteMailsPermanently(selectedRows.map((x) => x._id));
      }
    };

    return (
      <>
        {folder === "inbox" ? (
          <Button onClick={handleDelete}>Delete</Button>
        ) : folder === "trash" ? (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button onClick={handleRestore}>Restore</Button>
            <Button onClick={handleDeletePermanently}>
              Delete Permanently
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  }, [folder, selectedRows]);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const fetchMail = async () => {
    await HttpClient().get("/api/mail/fetch-mail");
    await changeFolder("inbox");
    cogoToast.info("Emails fetched");
  };

  const changeFolder = async (folder) => {
    setRows([])
    await fetchRows(1, folder);
    setFolder(folder);
    setMode(MODE.BROWSE);
  };

  const deleteRows = async (ids) => {
    await HttpClient().post(`/api/mail/delete`, { ids });
    cogoToast.success(`Successfully deleted ${selectedRows.length} rows`);
    setRows([])
    await fetchRows(1, "inbox");

  };

  const restoreMail = async (ids) => {
    await HttpClient().post("/api/mail/restore", { ids });
    await changeFolder("inbox");
    cogoToast.success("Successfully restored mails");
  };

  const deleteMailsPermanently = async (ids) => {
    await HttpClient().post("/api/mail/delete-permanently", { ids });
    await fetchRows(1, "trash");
    cogoToast.success("Successfully restored mails");
  };

  const capitalize = (string) => {
    return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
  };

  const composeMail = async (row = null) => {
    await CustomDialog(<ComposeMail row={row} />);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button onClick={fetchMail}>Fetch Mail</Button>
        <Button onClick={() => composeMail(null)}>Compose Mail</Button>
      </div>
      <MailContainer style={{ marginTop: "1rem" }}>
        <article className="folders">
          <h3>Folders</h3>
          <ul>
            <li onClick={() => changeFolder("inbox")}>Inbox</li>
            <li onClick={() => changeFolder("trash")}>Trash</li>
            <li onClick={() => changeFolder("sent")}>Sent</li>
          </ul>
        </article>

        <article className="mails">
          {mode === MODE.BROWSE && !!rows.length && (
            <>
              <DataTable
                title={capitalize(folder)}
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
          )}

          {mode === MODE.VIEW && (
            <ViewMode>
              <MailView
                row={selectedMail}
                onReply={() => composeMail(selectedMail)}
                onBack={() => changeFolder(folder)}
              />
            </ViewMode>
          )}
        </article>
      </MailContainer>
    </>
  );
}

export default BrowseMail;
