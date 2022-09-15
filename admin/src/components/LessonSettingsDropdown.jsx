import React, { useEffect, useId, useState } from "react";
import Dropdown from "./Dropdown";

function LessonSettingsDropdown({ lesson, onLessonChanged }) {
  const [freePreview, setFreePreview] = useState(lesson.freePreview);
  const id = useId();

  useEffect(() => {
    const _lesson = { ...lesson };
    _lesson.freePreview = freePreview;
    onLessonChanged(_lesson);
  }, [freePreview]);

  return (
    <div>
      <Dropdown
        btnCmp={<i className="fa-solid fa-cog" />}
        component={
          <div>
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <label htmlFor={id}>Free Preview</label>
              <input
                type="checkbox"
                id={id}
                checked={!!freePreview}
                onChange={(e) => setFreePreview(e.target.checked)}
              />
            </div>
          </div>
        }
      />
    </div>
  );
}

export default LessonSettingsDropdown;
