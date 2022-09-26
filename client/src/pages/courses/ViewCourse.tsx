import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router";
import HttpClient from "services/HttpClient";
import { Container, PrimaryButton } from "components/UI";
import { Wrapper } from "components/UI/Wrapper";
import { Subtitle } from "components/UI/Subtitle";
import styled from "styled-components";
import { debounce, throttle } from "lodash";
import { CustomDialog, useDialog } from "react-st-modal";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../../components/Stripe/CheckoutForm";
import PublicContext from "contexts/PublicContext";

const EnrollDialog = ({ total }) => {
  const dialog = useDialog();

  return (
    <div style={{ padding: "1rem" }}>
      <StripeProvider apiKey={import.meta.env.VITE_STRIPE_PUBLIC_KEY}>
        <Elements locale="da">
          <CheckoutForm
            total={total}
            onSuccessfulPayment={() => dialog.close(true)}
          />
        </Elements>
      </StripeProvider>
    </div>
  );
};

const CourseContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;

  .video {
    video {
      width: 100%;
    }
  }

  .sections {
    .section {
      > span {
        font-size: 20px;
        display: block;
        margin-bottom: 1rem;
      }
      margin-bottom: 1rem;
    }

    .lessons {
      article {
        border: 1px solid black;
        cursor: pointer;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;

        &.playing {
          font-weight: bold;
        }
      }
    }
  }
`;

interface IUserLesson {
  userId: string;
  lessonId: string;
  courseId: string;
  currentTime: number;
}

interface Lesson {
  _id: string;
  name: string;
  duration: number;
  filepath: string;
  courseId: string;
  sectionId: string;
  order: number;
  uuid: string;
  freePreview: boolean;
}

function ViewCourse(props) {
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(PublicContext);

  const [intervalId, setIntervalId] = useState<any>(undefined);
  const [userCourse, setUserCourse] = useState<any>(null);
  const [userLesson, setUserLesson] = useState<any>(null);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [sections, setSections] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  useEffect(() => {
    if (id) {
      getCourse();
    }
  }, [id]);

  useEffect(() => {
    const videoElement = document.getElementById("myVideo") as HTMLVideoElement;

    if (selectedLesson) {
      videoElement.addEventListener("ended", onLessonFinished);
      videoElement.addEventListener("timeupdate", onLessonTimeUpdate);

      return () => {
        videoElement.removeEventListener("timeupdate", onLessonTimeUpdate);
        videoElement.removeEventListener("ended", onLessonFinished);
      };
    }
  }, [selectedLesson]);

  const onLessonTimeUpdate = useCallback(
    throttle(async () => {
      console.log(selectedLesson);
      const videoElement = document.getElementById(
        "myVideo"
      ) as HTMLVideoElement;
      const body = {
        currentTime: videoElement.currentTime,
        lessonId: selectedLesson._id,
        courseId: id,
      };

      await HttpClient().post(
        `/api/courses/lesson/current-time/${selectedLesson._id}`,
        body
      );
    }, 1000),
    [selectedLesson]
  );

  const onLessonFinished = async (event) => {
    if (!selectedLesson) return;
    await HttpClient().post(
      `/api/courses/lesson/current-time/${selectedLesson._id}`,
      {
        currentTime: 0,
      }
    );

    setSelectedLesson(null);
    if (!selectedLesson || !autoplayEnabled) return;
    setTimeout(async () => {
      const lesson = lessons.find((x) => x.order === selectedLesson.order + 1);
      if (lesson) {
        await selectLesson(lesson);
      }
    }, 500);
  };

  const getCourse = async () => {
    const { data } = await HttpClient().get<{
      course: any;
      lessons: Lesson[];
      sections: any[];
      userCourse: any;
    }>("/api/courses/" + id);
    setCourse(data.course);
    setLessons(data.lessons);
    setSections(data.sections);
    setUserCourse(data.userCourse);

    if (data.userCourse?.latestLessonId) {
      await selectLesson(
        data.lessons.find((x) => x._id === data.userCourse.latestLessonId),
        data.userCourse
      );
    } else {
      await selectLesson(data.lessons[0]);
    }

    if (!data.userCourse) {
      setAutoplayEnabled(false);
    }
  };

  const enroll = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const result = await CustomDialog(<EnrollDialog total={course?.price} />);
    if (result) {
      const { data } = await HttpClient().post("/api/courses/enroll", {
        courseId: course?._id,
      });
      window.location.reload();
    }
  };

  const getLessonsForSection = (sectionId) => {
    return [...lessons].filter((x) => x.sectionId === sectionId);
  };

  const selectLesson = async (lesson: Lesson, _userCourse?: any) => {
    let usedCourse = userCourse || _userCourse;

    setSelectedLesson(lesson);

    if (usedCourse && lesson) {
      /*
       * Update user course with the current lesson id
       * */

      await HttpClient().put(`/api/courses/lesson/latest/${usedCourse?._id}`, {
        lessonId: lesson?._id,
      });

      const _userCourse = { ...usedCourse };
      _userCourse.latestLessonId = lesson?._id;
      setUserCourse(_userCourse);

      /*
       * User Lesson
       * */

      const { data } = await HttpClient().get<{
        userLesson: IUserLesson | null;
      }>(`/api/courses/lesson/user/${lesson._id}`);
      if (data.userLesson) {
        setUserLesson(data.userLesson);
        const videoElement = document.getElementById(
          "myVideo"
        ) as HTMLVideoElement;
        videoElement.currentTime = data.userLesson.currentTime;
      }
    }
  };

  return (
    <Wrapper>
      <Container>
        <Subtitle>{course?.name}</Subtitle>
        {!userCourse && (
          <div
            style={{ position: "relative", zIndex: 1, marginBottom: "1rem" }}
          >
            <PrimaryButton onClick={enroll}>Enroll</PrimaryButton>
          </div>
        )}
        <CourseContainer>
          <div className="video">
            {selectedLesson && (
              <video
                id="myVideo"
                controls
                autoPlay
                src={`${
                  import.meta.env.VITE_API_URL
                }/api/courses/stream?lessonId=${
                  selectedLesson?._id
                }&token=${localStorage.getItem("token")}`}
              ></video>
            )}
          </div>
          <div className="sections">
            {sections.map((section, sectionIndex) => (
              <div className="section" key={sectionIndex}>
                <span>{section.name}</span>
                <div className="lessons">
                  {getLessonsForSection(section._id)
                    .sort((a, b) => a.order - b.order)
                    .map((lesson, lessonIndex) => (
                      <article
                        onClick={
                          !lesson?.freePreview && !userCourse
                            ? null
                            : () => selectLesson(lesson)
                        }
                        key={lessonIndex}
                        className={
                          lesson._id === userCourse?.latestLessonId
                            ? "playing"
                            : ""
                        }
                      >
                        {!lesson?.freePreview && !userCourse && (
                          <i className="fa-solid fa-lock"></i>
                        )}
                        {lesson.name}
                      </article>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </CourseContainer>
      </Container>
    </Wrapper>
  );
}

export default ViewCourse;
