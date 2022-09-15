import Lesson from "../models/Lesson";
import Course from "../models/Course";
import fs from "fs";
import path from "path";
import CourseSection from "../models/CourseSection";
import UserCourse from "../models/UserCourse";
import mongoose from "mongoose";
import UserLesson from "../models/UserLesson";

export class CoursesController {
  static async getUserLesson(req, res) {
    const userLesson = await UserLesson.findOne({
      lessonId: req.params.lessonId,
      userId: res.locals.userId,
    });

    res.send({ userLesson });
  }

  static async updateCurrentTime(req, res) {
    let userLesson = await UserLesson.findOne({
      lessonId: req.params.lessonId,
      userId: res.locals.userId,
    });
    if (!userLesson) {
      userLesson = new UserLesson({ ...req.body, userId: res.locals.userId });
    }

    userLesson.currentTime = req.body.currentTime;
    await userLesson.save();
    res.send(userLesson);
  }

  static async updateLatestVideo(req, res) {
    console.log("here");

    if (!mongoose.isValidObjectId(req.params.userCourseId)) {
      return res.status(400).send("Not valid user course id");
    }

    const userCourse = await UserCourse.findById(req.params.userCourseId);

    userCourse!.latestLessonId = req.body.lessonId;
    await userCourse!.save();

    res.send(userCourse);
  }

  static async enroll(req, res) {
    const userCourse = new UserCourse({
      ...req.body,
      userId: res.locals.userId,
    });
    await userCourse.save();

    res.send(userCourse);
  }

  static async getCourse(req, res) {
    const course = await Course.findById(req.params.id);
    const lessons = await Lesson.find({ courseId: req.params.id });
    const sections = await CourseSection.find({ courseId: req.params.id });

    let userCourse;

    if (res.locals.userId) {
      userCourse = await UserCourse.findOne({
        userId: res.locals.userId,
        courseId: course!._id,
      });
    }

    res.send({ course, lessons, sections, userCourse });
  }

  static async updateLesson(req, res) {
    const section = await Lesson.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.send(section);
  }

  static async updateSection(req, res) {
    const section = await CourseSection.findById(req.params.id);
    section!.name = req.body.name;
    await section!.save();

    res.send(section);
  }

  static async updateLessonOrder(req, res) {
    for (let lesson of req.body.lessons) {
      const dbLesson = await Lesson.findById(lesson.id);
      if (!dbLesson) continue;
      dbLesson!.order = lesson.order;
      dbLesson!.sectionId = lesson.sectionId;
      await dbLesson!.save();
    }

    res.sendStatus(200);
  }

  static async updateSectionOrder(req, res) {
    for (let section of req.body.sections) {
      const dbSection = await CourseSection.findById(section.id);
      if (!dbSection) continue;
      dbSection.order = section.order;
      await dbSection.save();
    }

    res.sendStatus(200);
  }

  static async getLessons(req, res) {
    const lessons = await Lesson.find({
      courseId: req.params.courseId,
    });
    res.send({ lessons });
  }

  static async getSections(req, res) {
    const sections = await CourseSection.find({
      courseId: req.params.courseId,
    });
    res.send(sections);
  }

  static async createSection(req, res) {
    const section = new CourseSection(req.body);
    await section.save();
    res.send(section);
  }

  static async updateCourse(req, res) {
    const course = await Course.findById(req.params.id);
    course!.name = req.body.name;
    course!.price = req.body.price;
    await course!.save();

    res.send(course);
  }

  static async browseCourses(req, res) {
    const perPage = 10;
    const page = req.query.page ? parseInt(req.query.page as string) - 1 : 0;

    const rows = await Course.find()
      .limit(perPage)
      .skip(perPage * page);

    const totalRows = await Course.countDocuments();

    return res.send({ rows, totalRows });
  }

  static async uploadLessonVideo(req, res) {
    const lesson = await Lesson.findById(req.query.lessonId);
    lesson!.filepath = req.file.filename;
    await lesson!.save();

    res.send(lesson);
  }

  static async createCourse(req, res) {
    const course = new Course(req.body);
    await course.save();

    res.send(course);
  }

  static async createLesson(req, res) {
    const lesson = new Lesson({ ...req.body });
    await lesson.save();

    res.send(lesson);
  }

  static async stream(req, res) {
    const range = req.headers.range;
    if (!range) {
      return res.status(400).send("Requires Range header");
    }

    if (!mongoose.isValidObjectId(req.query.lessonId)) {
      return res.status(400).send("No lesson id found");
    }

    const lesson = await Lesson.findById(req.query.lessonId);
    if (!lesson) {
      return res.status(400).send("No file found");
    }

    const videoPath = path.join(
      __dirname,
      "../..",
      "lessons",
      lesson!.filepath
    );
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;
    const videoRange = req.headers.range;
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  }
}
