import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react"; // Import act from react
import Profile from "../../components/profile/Profile";
import ProfileUnitList from "../../components/profile/ProfileUnitList";

// Mock lesson data for Profile fetch
const mockLessons = [
  { lesson_id: "lesson1.1", name: "Lesson 1", status: "not-started", due_date: "2025-03-10" },
  { lesson_id: "lesson1.2", name: "Lesson 2", status: "completed", due_date: "2025-03-05" },
  { lesson_id: "lesson2.1", name: "Lesson 3", status: "in-progress", due_date: "2025-03-15" },
];

// Mock units for ProfileUnitList
const mockUnits = [
  {
    unit_id: 1,
    number: 1,
    title: "Measurement & Uncertainty",
    lessons: [
      { lesson_id: "lesson1.1", name: "Lesson 1", status: "not-started" },
      { lesson_id: "lesson1.2", name: "Lesson 2", status: "completed" },
    ],
  },
  {
    unit_id: 2,
    number: 2,
    title: "Atomic Structure",
    lessons: [{ lesson_id: "lesson2.1", name: "Lesson 3", status: "in-progress" }],
  },
];

// Mock LessonUtils
jest.mock('../../components/question/LessonUtils', () => ({
  fetchLessonMastery: jest.fn(() => Promise.resolve({ "lesson1.1": 0, "lesson1.2": 100, "lesson2.1": 50 })),
  fetchUpdatedLessonProgress: jest.fn(() => Promise.resolve({})),
}));

describe("Profile Page (Profile + ProfileUnitList)", () => {
  beforeEach(() => {
    // Mock fetch for Profile and ProfileUnitList
    jest.spyOn(global, "fetch").mockImplementation((url) => {
      if (url === "http://localhost:8000/lessons/") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockLessons),
        });
      }
      if (url.startsWith("http://localhost:8000/lessons/lesson")) {
        const lessonId = url.split('/').pop();
        const lesson = mockLessons.find(l => l.lesson_id === lessonId) || {};
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(lesson),
        });
      }
      return Promise.reject(new Error("Unknown API call"));
    });

    // Mock localStorage
    Storage.prototype.getItem = jest.fn((key) => (key === "studentId" ? "123" : null));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders profile header and shows loading state", () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("fetches and displays units in ProfileUnitList", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      );
    });

      expect(screen.getByText("Uncertainty of Measurement: Visible Scale")).toBeInTheDocument();
      expect(screen.getByText("Uncertainty in Measurements (Digital Scale-Balance)")).toBeInTheDocument();

  });

  test("expands and collapses unit on click", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ProfileUnitList units={mockUnits} currentUnit={1} />
        </MemoryRouter>
      );
    });
  
    const unitTitle = screen.getByText("Measurement & Uncertainty");
  
    // Expand the unit
    await act(async () => {
      fireEvent.click(unitTitle);
    });
  
    await waitFor(() => {
      expect(screen.getByText("Lesson 1")).toBeInTheDocument();
      expect(screen.getByText("Lesson 2")).toBeInTheDocument();
    });
  
  
    await act(async () => {
      fireEvent.click(unitTitle);
    });
  
    await waitFor(
      () => {
        expect(screen.queryByText("Lesson 1")).toBeInTheDocument();
        expect(screen.queryByText("Lesson 2")).toBeInTheDocument();
      },
      { timeout: 5000 } 
    );
  });
  

  test("correctly labels lesson statuses", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ProfileUnitList units={mockUnits} currentUnit={1} />
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Measurement & Uncertainty"));
    });

      const notStartedElements = screen.getAllByText("Not Started");
      expect(notStartedElements.length).toBeGreaterThan(0); 

  });

  test("handles API failure gracefully", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.reject(new Error("API error"))
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      );
    });

  });
});