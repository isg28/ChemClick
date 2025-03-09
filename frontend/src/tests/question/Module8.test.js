import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LessonEightPointOne from "../../components/question/LessonEightPointOne";
import LessonEightPointTwo from "../../components/question/LessonEightPointTwo";
import LessonEightPointThree from "../../components/question/LessonEightPointThree";
import LessonEightPointFour from "../../components/question/LessonEightPointFour";

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === "studentId") return "testStudentId";
    return null;
  });
});

/* Lesson 8.1 Tests */
describe("LessonEightPointOne Component", () => {
    test("renders without crashing", () => {
      render(
        <MemoryRouter>
          <LessonEightPointOne />
        </MemoryRouter>
      );
  
      expect(screen.getByText(/Unit Eight: Positive Monatomic Ions/i)).toBeInTheDocument();
    });
  
    test("displays a question", async () => {
      render(
        <MemoryRouter>
          <LessonEightPointOne />
        </MemoryRouter>
      );
  
      await screen.findByText(/What is the symbol for:|What is the name for:/i);
    });
  
    test("allows user to input an answer", async () => {
      render(
        <MemoryRouter>
          <LessonEightPointOne />
        </MemoryRouter>
      );
  
      const input = screen.getByPlaceholderText(/Enter the symbol|Enter the name/i);
      fireEvent.change(input, { target: { value: "H1-" } });
  
      expect(input.value).toBe("H1-");
    });
  });

/* Lesson 8.2 Tests */
describe("LessonEightPointTwo Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonEightPointTwo />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Eight: Negative Monatomic Ions/i)).toBeInTheDocument();
  });

  test("displays a question", async () => {
    render(
      <MemoryRouter>
        <LessonEightPointTwo />
      </MemoryRouter>
    );

    await screen.findByText(/What is the symbol for:|What is the name for:/i);
  });

  test("allows user to input an answer", async () => {
    render(
      <MemoryRouter>
        <LessonEightPointTwo />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Enter the symbol|Enter the name/i);
    fireEvent.change(input, { target: { value: "H1-" } });

    expect(input.value).toBe("H1-");
  });
});

/* Lesson 8.3 Tests */
describe("LessonEightPointThree Component", () => {
    test("renders without crashing", () => {
      render(
        <MemoryRouter>
          <LessonEightPointThree />
        </MemoryRouter>
      );
  
      expect(screen.getByText(/Unit Eight: Positive Monatomic Ions/i)).toBeInTheDocument();
    });
  
    test("displays a question", async () => {
      render(
        <MemoryRouter>
          <LessonEightPointThree />
        </MemoryRouter>
      );
  
      await screen.findByText(/What is the symbol for:|What is the name for:/i);
    });
  
    test("allows user to input an answer", async () => {
      render(
        <MemoryRouter>
          <LessonEightPointThree />
        </MemoryRouter>
      );
  
      const input = screen.getByPlaceholderText(/Enter the symbol|Enter the name/i);
      fireEvent.change(input, { target: { value: "H1-" } });
  
      expect(input.value).toBe("H1-");
    });
  });

  /* Lesson 8.4 Tests */
describe("LessonEightPointFour Component", () => {
    test("renders without crashing", () => {
      render(
        <MemoryRouter>
          <LessonEightPointFour />
        </MemoryRouter>
      );
  
      expect(screen.getByText(/Unit Eight: Mixed Practice/i)).toBeInTheDocument();
    });
  
    test("displays a question", async () => {
      render(
        <MemoryRouter>
          <LessonEightPointFour />
        </MemoryRouter>
      );
  
      await screen.findByText(/What is the symbol for:|What is the name for:/i);
    });
  
    test("allows user to input an answer", async () => {
      render(
        <MemoryRouter>
          <LessonEightPointFour />
        </MemoryRouter>
      );
  
      const input = screen.getByPlaceholderText(/Enter the symbol|Enter the name/i);
      fireEvent.change(input, { target: { value: "H1-" } });
  
      expect(input.value).toBe("H1-");
    });
  });
