import React, { useEffect, useId, useState } from "react";
import Dropdown from "./Dropdown";

function CourseSettingsDropdown({ course, onCourseChanged }) {
  const [published, setPublished] = useState(course.published);
  const [clicked, setClicked] = useState(false);
  const id = useId();

  useEffect(() => {
    if (clicked) {
      console.log("here");
      const _course = { ...course };
      _course.published = published;
      onCourseChanged(_course);
      setClicked(false);
    }
  }, [published, clicked]);

  const handleOnChange = (checked) => {
    setPublished(checked);
    setClicked(true);
  };

  return (
    <div style={{ position: "absolute", top: 10, right: 10 }}>
      <Dropdown
        btnCmp={<i className="fa-solid fa-cog" />}
        component={
          <div>
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <label htmlFor={id}>Published</label>
              <input
                type="checkbox"
                id={id}
                checked={!!published}
                onChange={(e) => handleOnChange(e.target.checked)}
              />
            </div>
          </div>
        }
      />
    </div>
  );
}

export default CourseSettingsDropdown;
