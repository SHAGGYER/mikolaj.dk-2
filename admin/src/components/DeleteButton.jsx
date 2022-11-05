import React, { useState } from "react";
import Button from "./Button";

function DeleteButton({ onSuccess }) {
  const [deleting, setDeleting] = useState(false);

  return (
    <div>
      {!deleting ? (
        <Button $mini variant="error" onClick={() => setDeleting(true)}>
          Delete
        </Button>
      ) : (
        <div className="flex gap-1">
          <Button
            $mini
            variant="success"
            onClick={() => {
              setDeleting(false);
              onSuccess();
            }}
          >
            Yes
          </Button>
          <Button $mini variant="primary" onClick={() => setDeleting(false)}>
            No
          </Button>
        </div>
      )}
    </div>
  );
}

export default DeleteButton;
