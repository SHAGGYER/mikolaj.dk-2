import React, { useEffect, useMemo, useRef, useState } from "react";
import HttpClient from "../../utilities/HttpClient";
import cogoToast from "cogo-toast";
import { CustomDialog, useDialog } from "react-st-modal";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import styled from "styled-components";
import { v4 } from "uuid";
import FileUploader from "../../components/FileUploader";
import { HoverButton } from "../../components/HoverButton";
import Dropdown from "../../components/Dropdown";
import LessonSettingsDropdown from "../../components/LessonSettingsDropdown";

const PreviewDialog = ({ lessonId }) => {
  return (
    <div style={{ padding: "1rem" }}>
      <video
        controls
        autoPlay
        crossorigin="anonymous"
        src={`${
          import.meta.env.VITE_API_URL
        }/api/courses/stream?token=${localStorage.getItem(
          "token"
        )}&lessonId=${lessonId}`}
      ></video>
    </div>
  );
};

const Section = styled.section`
  position: relative;
  border: 1px solid #ccc;
  padding: 1rem;

  &:hover ${HoverButton} {
    visibility: visible;
  }

  &.highlighted {
    background-color: #ccc;
  }

  nav {
    position: absolute;
    right: 0;
    top: 5px;
    display: flex;
    gap: 0.25rem;
  }
`;

const Lesson = styled.article`
  position: relative;
  border: 1px solid #ccc;
  padding: 1rem;

  &.highlighted {
    background-color: #ccc;
  }

  > nav {
    position: absolute;
    top: 5px;
    display: flex;
    gap: 0.25rem;
    right: 5px;

    button {
      font-size: 12px;
      padding: 0.25rem 0.75rem;
      border-radius: 5px;
    }
  }
`;

export default function CoursesForm({ row }) {
  const [usedRow, setUsedRow] = useState(row);
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [name, setName] = useState(row ? row.name : "");
  const [price, setPrice] = useState(row ? row.price : "");
  const [errors, setErrors] = useState({});

  const dragSection = useRef();
  const dragSectionIdLesson = useRef();
  const [dragSectionId, setDragSectionId] = useState(null);
  const dragOverSection = useRef();

  const dragLesson = useRef();
  const dragOverLesson = useRef();
  const [dragLessonId, setDragLessonId] = useState(null);

  useEffect(() => {
    if (row?._id) {
      getSections(row._id);
      getLessons(row._id);
    }
  }, [row?._id]);

  const getSections = async (courseId) => {
    const { data } = await HttpClient().get(
      `/api/courses/get-sections/${courseId}`
    );
    setSections(data);
  };

  const getLessons = async (courseId) => {
    const { data } = await HttpClient().get(
      `/api/courses/get-lessons/${courseId}`
    );
    setLessons(data.lessons);
  };

  const getLessonsForSection = (sectionId, sectionIndex) => {
    if (sectionIndex >= 0) {
      const _lessons = [...lessons].filter((x, i) => i === sectionIndex);
      return _lessons;
    }

    const _lessons = lessons.filter((x) => x.sectionId === sectionId);
    return _lessons;
  };

  const onSubmit = async () => {
    try {
      const payload = {
        name,
        price,
      };

      const { data } = await HttpClient()[usedRow ? "put" : "post"](
        "/api/courses" + (usedRow ? `/${usedRow._id}` : ""),
        payload
      );
      cogoToast.success(
        `Course ${usedRow ? "updated" : "created"} successfully`
      );
      setUsedRow(data);
    } catch (e) {
      if (e.response.status === 450) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const handleChangeSection = (prop, event, index) => {
    const newSections = [...sections];
    newSections[index][prop] = event.target.value;
    setSections(newSections);
  };

  const handleChangeLesson = (prop, event, uuid) => {
    const newLessons = [...lessons];
    const lesson = newLessons.find((x) => x.uuid === uuid);
    lesson[prop] = event.target.value;
    setLessons(newLessons);
  };

  const saveSection = async (section) => {
    try {
      const payload = {
        name: section.name,
        courseId: usedRow?._id,
      };

      const { data } = await HttpClient()[section._id ? "put" : "post"](
        "/api/courses/section" + (section._id ? `/${section._id}` : ""),
        payload
      );
      cogoToast.success(
        `Course Section ${section ? "updated" : "created"} successfully`
      );
      setUsedRow(data);
    } catch (e) {
      if (e.response.status === 450) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const saveLesson = async (section, lesson) => {
    try {
      const payload = {
        name: lesson.name,
        sectionId: section?._id,
        courseId: usedRow?._id,
        uuid: lesson.uuid,
        filepath: lesson.filepath,
        freePreview: lesson.freePreview,
      };

      const { data } = await HttpClient()[lesson._id ? "put" : "post"](
        "/api/courses/lesson" + (lesson._id ? `/${lesson._id}` : ""),
        payload
      );
      cogoToast.success(
        `Course Lesson ${section ? "updated" : "created"} successfully`
      );
      const newLessons = [...lessons].map((x) => {
        if (x.uuid === lesson.uuid) {
          return {
            ...x,
            _id: data._id,
          };
        }

        return x;
      });
      setLessons(newLessons);
    } catch (e) {
      if (e.response.status === 450) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const dragStartLesson = (e, uuid) => {
    dragLesson.current = uuid;
    console.log("drag start lesson", uuid);
  };

  const dragEnterLesson = (e, uuid) => {
    if (dragSectionId) return;
    dragOverLesson.current = uuid;

    setDragLessonId(uuid);

    const lesson = [...lessons].find((x) => x.uuid === uuid);
    dragSectionIdLesson.current = lesson.sectionId;
    console.log("drag enter section id", dragSectionIdLesson.current);
  };

  const dragLeaveLesson = (e, sectionId) => {};

  const dropLesson = async (e, section) => {
    const copyListItems = [...lessons];
    const dragItemContent = copyListItems.find(
      (x) => x.uuid === dragLesson.current
    );
    dragItemContent.sectionId = dragSectionIdLesson.current;
    console.log("dragSectionIdLesson.current", dragSectionIdLesson.current);
    const newIndex = copyListItems.findIndex(
      (x) => x.uuid === dragOverLesson.current
    );
    const oldIndex = copyListItems.findIndex(
      (x) => x.uuid === dragLesson.current
    );

    copyListItems.splice(oldIndex, 1);
    copyListItems.splice(newIndex, 0, dragItemContent);

    /*
     * Order
     * */

    copyListItems.forEach((x, i) => {
      x.order = i;
    });

    const body = {
      lessons: copyListItems.map((x) => {
        return {
          order: x.order,
          id: x._id,
          sectionId: x.sectionId,
        };
      }),
    };

    /*
     * Reset
     * */

    dragSection.current = null;
    dragOverSection.current = null;
    dragSectionIdLesson.current = null;
    dragOverLesson.current = null;

    setLessons(copyListItems);
    setDragSectionId(null);
    setDragLessonId(null);

    await HttpClient().put("/api/courses/update-lesson-order", body);
  };

  const dragStart = (e, position) => {
    dragSection.current = position;
  };

  const dragEnter = (e, position, sectionId) => {
    dragOverSection.current = position;

    /*
     * If we are dragging a lesson or if the current section
     * is not empty, we don't highlight the section
     * */

    if (dragOverLesson.current && getLessonsForSection(sectionId).length > 0) {
      return;
    }
    setDragSectionId(sectionId);
    dragSectionIdLesson.current = sectionId;
  };

  const dragLeave = (e, sectionId) => {};

  const drop = (e) => {
    const copyListItems = [...sections];
    const dragItemContent = copyListItems[dragSection.current];

    if (!dragItemContent) return;

    copyListItems.splice(dragSection.current, 1);
    copyListItems.splice(dragOverSection.current, 0, dragItemContent);
    dragSection.current = null;
    dragOverSection.current = null;
    console.log("copy list itmes", copyListItems);
    copyListItems.forEach((x, i) => {
      x.order = i;
    });
    setSections(copyListItems);
    setDragSectionId(null);
    setDragLessonId(null);
  };

  const uploadFile = async (section, lesson, file) => {
    const body = new FormData();
    body.append("video", file);
    const { data } = await HttpClient().post(
      `/api/courses/upload-lesson-video?lessonId=${lesson._id}`,
      body
    );
    const _lessons = [...lessons];

    const _lesson = _lessons.find((x) => x._id === lesson._id);
    _lesson.filepath = data.filepath;
    setLessons(_lessons);
  };

  const openPreviewDialog = async (lessonId) => {
    await CustomDialog(<PreviewDialog lessonId={lessonId} />);
  };

  const onLessonChanged = (lesson, uuid) => {
    const _lessons = [...lessons].map((x) => {
      if (x.uuid === uuid) {
        return lesson;
      }
      return x;
    });
    setLessons(_lessons);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ color: "black", fontSize: "2rem", marginBottom: "1rem" }}>
        {!!row ? "Edit" : "Create"} Course
      </h1>

      <div style={{ marginBottom: "1rem" }}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          error={errors.name}
        />

        <TextField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          label="Price"
          error={errors.price}
        />

        <Button onClick={() => onSubmit()}>Save</Button>
      </div>
      {!!usedRow && (
        <div>
          {!sections.length && (
            <Button
              onClick={() => {
                const newSections = [...sections];
                newSections.push({
                  name: "",
                });
                setSections(newSections);
              }}
            >
              Create Section
            </Button>
          )}
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                <Section
                  className={dragSectionId === section._id ? "highlighted" : ""}
                  draggable
                  onDragStart={(e) => dragStart(e, sectionIndex)}
                  onDragEnter={(e) => dragEnter(e, sectionIndex, section._id)}
                  onDragLeave={(e) => dragLeave(e, section._id)}
                  onDragEnd={drop}
                >
                  <nav>
                    <Button onClick={() => saveSection(section)}>Save</Button>
                  </nav>

                  <TextField
                    label="Section Name"
                    value={section?.name}
                    onChange={(e) =>
                      handleChangeSection("name", e, sectionIndex)
                    }
                  />

                  <Button
                    onClick={() => {
                      const newLessons = [...lessons];
                      newLessons.splice(sectionIndex, 0, {
                        sectionId: section?._id,
                        courseId: usedRow?._id,
                        name: "",
                        uuid: v4(),
                      });

                      setLessons(newLessons);
                    }}
                  >
                    Create Lesson
                  </Button>

                  <div>
                    {getLessonsForSection(section?._id)
                      .sort((a, b) => a.order - b.order)
                      .map((lesson, index) => (
                        <Lesson
                          className={
                            dragLessonId === lesson.uuid ? "highlighted" : ""
                          }
                          key={index}
                          draggable
                          onDragStart={(e) => dragStartLesson(e, lesson.uuid)}
                          onDragEnter={(e) => dragEnterLesson(e, lesson.uuid)}
                          onDragLeave={(e) => dragLeaveLesson(e, sectionIndex)}
                          onDragEnd={(e) => dropLesson(e, section)}
                        >
                          <nav>
                            <Button onClick={() => saveLesson(section, lesson)}>
                              Save
                            </Button>
                            {!lesson.filepath && lesson._id ? (
                              <FileUploader
                                handleFile={(file) =>
                                  uploadFile(section, lesson, file)
                                }
                              />
                            ) : !lesson._id ? (
                              <></>
                            ) : (
                              <>
                                <Button
                                  onClick={() => openPreviewDialog(lesson._id)}
                                >
                                  Preview
                                </Button>
                              </>
                            )}

                            <LessonSettingsDropdown
                              lesson={lesson}
                              onLessonChanged={(lesson) =>
                                onLessonChanged(lesson, lesson.uuid)
                              }
                            />
                          </nav>
                          <TextField
                            label="Lesson Name"
                            value={lesson.name}
                            onChange={(e) =>
                              handleChangeLesson("name", e, lesson.uuid)
                            }
                          />
                        </Lesson>
                      ))}
                  </div>
                  <HoverButton
                    onClick={() => {
                      const newSections = [...sections];
                      newSections.splice(sectionIndex + 1, 0, {
                        name: "",
                      });
                      setSections(newSections);
                    }}
                  >
                    +
                  </HoverButton>
                </Section>
              </React.Fragment>
            ))}
        </div>
      )}
    </div>
  );
}
