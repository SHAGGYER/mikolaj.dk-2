import { ILesson } from "./ILesson";

export interface ISection {
  _id?: string;
  lessons: ILesson[];
  name: string;
  courseId?: string;
  createdAt?: string;
  updatedAt?: string;
}
