import { ILesson } from "models/ILesson";
import { ISection } from "models/ISection";
import { ICourse } from "models/ICourse";
import HttpClient from "../HttpClient";

export class Course {
  browse = async () => {
    const { data } = await HttpClient().get<ICourse[]>("/api/course");
    return data;
  };

  updateLesson = async (id: string, data: ILesson) => {
    const response = await HttpClient().put<ILesson>(
      "/api/course/lesson/" + id,
      data
    );
    return response.data;
  };

  getById = async (id: string) => {
    const { data } = await HttpClient().get<{
      course: ICourse;
      sections: ISection[];
    }>("/api/course/" + id);
    return data;
  };

  updatePositions = async (lessons: ILesson[]) => {
    await HttpClient().put<void>("/api/course/update-positions", { lessons });
  };

  createSection = async (id: string, section: ISection) => {
    const { data } = await HttpClient().post<ISection>(
      "/api/course/" + id + "/add-section",
      section
    );

    return data;
  };

  saveCourse = async (id: string, course: ICourse) => {
    await HttpClient().put<void>("/api/course/" + id, { course });
  };

  createCourse = async (course: ICourse) => {
    const { data } = await HttpClient().post<ICourse>("/api/course", course);
    return data;
  };

  giveCourse = async (userId: string, courseId: string) => {
    await HttpClient().post<void>("/api/course/give-course", {
      userId: userId,
      courseId: courseId,
    });
  };

  deleteCourse = async (courseId: string) => {
    await HttpClient().delete<void>("/api/course/" + courseId);
  };
}
