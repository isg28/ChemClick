import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LessonTwoPointOne from "../components/question/LessonTwoPointOne";
import LessonTwoPointTwo from "../components/question/LessonTwoPointTwo";
import LessonTwoPointThree from "../components/question/LessonTwoPointThree";
import LessonTwoPointFour from "../components/question/LessonTwoPointFour";
import LessonTwoPointFive from "../components/question/LessonTwoPointFive";
import LessonTwoPointSix from "../components/question/LessonTwoPointSix";

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === "studentId") return "testStudentId";
    return null;
  });
});

