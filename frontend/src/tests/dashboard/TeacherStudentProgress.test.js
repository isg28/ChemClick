import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { act } from "react";
import TeacherStudentProgress from "../../components/teacherdashboard/TeacherStudentProgress"; // Adjust path if needed

// Mock API data
const mockStudentProgress = {
  not_started: 5,
  in_progress: 3,
  completed: 2,
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    return new Promise((resolve) => {
      setTimeout(() => { 
        if (url.startsWith("http://localhost:8000/lessons/studentProgress/")) {
          resolve({
            ok: true,
            json: () => Promise.resolve(mockStudentProgress),
          });
        } else {
          resolve(Promise.reject(new Error("API error")));
        }
      }, 100); 
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("TeacherStudentProgress Component", () => {
  test("renders loading state initially", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <TeacherStudentProgress lessonId="lesson1.1" />
        </MemoryRouter>
      );
    });

    expect(screen.getByText("Loading student progress...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading student progress...")).not.toBeInTheDocument();
    });
  });

  test("fetches and displays student progress data", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <TeacherStudentProgress lessonId="lesson1.1" />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Students Not Started: 5")).toBeInTheDocument();
      expect(screen.getByText("Students In Progress: 3")).toBeInTheDocument();
      expect(screen.getByText("Students Finished: 2")).toBeInTheDocument();
    });
  });

  test("handles API failure gracefully", async () => {
    global.fetch.mockImplementation(() =>
      Promise.reject(new Error("API error"))
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <TeacherStudentProgress lessonId="lesson1.1" />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading student progress...")).not.toBeInTheDocument();
      expect(screen.getByText("Students Not Started: 0")).toBeInTheDocument();
      expect(screen.getByText("Students In Progress: 0")).toBeInTheDocument();
      expect(screen.getByText("Students Finished: 0")).toBeInTheDocument();
    });
  });

  test("navigates to statistics page when clicking 'View Full Statistics'", async () => {
    const mockNavigate = jest.fn();
    const lessonId = "lesson1.1"; // The lesson ID passed to the component
    useNavigate.mockReturnValue(mockNavigate);

    await act(async () => {
      render(
        <MemoryRouter>
          <TeacherStudentProgress lessonId={lessonId} />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("View Full Statistics")).toBeInTheDocument();
      fireEvent.click(screen.getByText("View Full Statistics"));
    });

    expect(mockNavigate).toHaveBeenCalledWith(`/statistics/${lessonId}`);
  });

  test("renders loading state and does not fetch data if lessonId is not provided", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <TeacherStudentProgress />
        </MemoryRouter>
      );
    });

    expect(screen.getByText("Loading student progress...")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(screen.getByText("Loading student progress...")).toBeInTheDocument();
  });
});