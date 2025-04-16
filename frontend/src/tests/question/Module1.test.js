import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LessonOnePointOne from "../../components/question/LessonOnePointOne";
import LessonOnePointTwo from "../../components/question/LessonOnePointTwo";
import LessonOnePointThree from "../../components/question/LessonOnePointThree";
import LessonOnePointFour from "../../components/question/LessonOnePointFour";
import LessonOnePointFive from "../../components/question/LessonOnePointFive";
import LessonOnePointSix from "../../components/question/LessonOnePointSix";
import LessonOnePointSeven from "../../components/question/LessonOnePointSeven";
import LessonOnePointEight from "../../components/question/LessonOnePointEight";
import LessonOnePointNine from "../../components/question/LessonOnePointNine";
import LessonOnePointTen from "../../components/question/LessonOnePointTen";
import LessonOnePointEleven from "../../components/question/LessonOnePointEleven";
import LessonOnePointTwelve from "../../components/question/LessonOnePointTwelve";

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === "studentId") return "testStudentId";
    return null;
  });
});

/* Lesson 1.1 Tests */
describe("LessonOnePointOne Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonOnePointOne />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit One: Uncertainty in Measurement - Tenths Value/i)).toBeInTheDocument();
  });

  test("displays a slider and submit button", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointOne />
      </MemoryRouter>
    );

    await screen.findByRole('slider');
    expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
  });

  test("allows user to change the slider value", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointOne />
      </MemoryRouter>
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '300' } });

    expect(slider.value).toBe('300');
  });
});

/* Lesson 1.2 Tests */
describe("LessonOnePointTwo Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonOnePointTwo />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit One: Uncertainty in Measurement - Tenths Value/i)).toBeInTheDocument();
  });

  test("displays an input field and submit button", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointTwo />
      </MemoryRouter>
    );

    await screen.findByRole('textbox');
    expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
  });

  test("allows user to input a measurement", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointTwo />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '1.5' } });

    expect(input.value).toBe('1.5');
  });
});

/* Lesson 1.3 Tests */
describe("LessonOnePointThree Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonOnePointThree />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit One: Uncertainty in Measurement - Tenths Value/i)).toBeInTheDocument();
  });

  test("displays an input field and submit button", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointThree />
      </MemoryRouter>
    );

    await screen.findByRole('textbox');
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test("allows user to input a measurement", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointThree />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '3.5' } });

    expect(input.value).toBe('3.5');
  });
});

/* Lesson 1.4 Tests */
describe("LessonOnePointFour Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonOnePointFour />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit One: Uncertainty in Measurement - Hundredths Value/i)).toBeInTheDocument();
  });

  test("displays a slider and submit button", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointFour />
      </MemoryRouter>
    );

    await screen.findByRole('slider');
    expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
  });

  test("allows user to change the slider value", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointFour />
      </MemoryRouter>
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '300' } });

    expect(slider.value).toBe('300');
  });
});

/* Lesson 1.5 Tests */
describe("LessonOnePointFive Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonOnePointFive />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit One: Uncertainty in Measurement - Hundredths Value/i)).toBeInTheDocument();
  });

  test("displays an input field and submit button", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointFive />
      </MemoryRouter>
    );

    await screen.findByRole('textbox');
    expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
  });

  test("allows user to input a measurement", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointFive />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '1.23' } });

    expect(input.value).toBe('1.23');
  });
});

/* Lesson 1.6 Tests */
describe("LessonOnePointSix Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonOnePointSix />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit One: Uncertainty in Measurement - Hundreths Value/i)).toBeInTheDocument();
  });

  test("displays an input field and submit button", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointSix />
      </MemoryRouter>
    );

    await screen.findByRole('textbox');
    expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
  });

  test("allows user to input a measurement", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointSix />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '3.45' } });

    expect(input.value).toBe('3.45');
  });
});

/* Lesson 1.7 Tests */
describe("LessonOnePointSeven Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonOnePointSeven />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit One: Uncertainty in Measurement - Tenths Value/i)).toBeInTheDocument();
  });

  test("displays a submit button", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointSeven />
      </MemoryRouter>
    );

    expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
  });

  test("allows user to adjust the meniscus position", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointSeven />
      </MemoryRouter>
    );

    fireEvent.keyDown(window, { key: 'ArrowUp' });
    fireEvent.keyDown(window, { key: 'ArrowDown' });

    expect(screen.getByText(/Current Measurement:/i)).toBeInTheDocument();
  });
});

/* Lesson 1.8 Tests */
describe("LessonOnePointEight Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonOnePointEight />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit One: Uncertainty in Measurement - Tenths Value/i)).toBeInTheDocument();
  });

  test("displays an input field and submit button", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointEight />
      </MemoryRouter>
    );

    await expect(screen.getByText(/Enter the measurement shown:/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
  });

  test("allows user to input a measurement", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointEight />
      </MemoryRouter>
    );

    const input = screen.getByTestId("lesson-one-point-eight-input")
    fireEvent.change(input, { target: { value: '5.5' } });

    expect(input.value).toBe('5.5');
  });
});

/* Lesson 1.9 Tests */
describe("LessonOnePointNine Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonOnePointNine />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit One: Uncertainty in Measurement - Tenths Value/i)).toBeInTheDocument();
  });

  test("displays a submit button", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointNine />
      </MemoryRouter>
    );

    expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
  });

  test("allows user to adjust the meniscus position with arrow keys", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointNine />
      </MemoryRouter>
    );
  
    const water = screen.getByAltText('Water');
    expect(water).toHaveStyle('top: 42.5%'); // Initial position
  
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect(water).toHaveStyle('top: 41%'); // Updated position after ArrowUp
  
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(water).toHaveStyle('top: 42.5%'); // Updated position after ArrowDown
  });
});

/* Lesson 1.10 Tests */
describe("LessonOnePointTen Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonOnePointTen />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit One: Uncertainty in Measurement - Tenths Value/i)).toBeInTheDocument();
  });

  test("displays a submit button and current measurement", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointTen />
      </MemoryRouter>
    );

    expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Measurement:/i)).toBeInTheDocument();
  });

  test("allows user to adjust the meniscus position with arrow keys", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointTen />
      </MemoryRouter>
    );

    fireEvent.keyDown(window, { key: 'ArrowUp' });
    fireEvent.keyDown(window, { key: 'ArrowDown' });

    expect(screen.getByText(/Current Measurement:/i)).toBeInTheDocument();
  });
});

/* Lesson 1.11 Tests */
describe("LessonOnePointEleven Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonOnePointEleven />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit One: Uncertainty in Measurement - Hundredths Value/i)).toBeInTheDocument();
  });

  test("displays an input field and submit button", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointEleven />
      </MemoryRouter>
    );

    await expect(screen.getByText(/Enter the measurement shown:/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
  });

  test("allows user to input a measurement", async () => {
    render(
      <MemoryRouter>
        <LessonOnePointEleven />
      </MemoryRouter>
    );

    const input = screen.getByTestId("lesson-one-point-eleven-input")
    fireEvent.change(input, { target: { value: '2.50' } });

    expect(input.value).toBe('2.50');
  });
});

/* Lesson 1.12 Tests */
describe("LessonOnePointTwelve Component", () => {
    test("renders without crashing", () => {
      render(
        <MemoryRouter>
          <LessonOnePointTwelve />
        </MemoryRouter>
      );
  
      expect(screen.getByText(/Unit One: Uncertainty in Measurement - Tenths Value/i)).toBeInTheDocument();
    });
  
    test("displays a submit button and instructions", async () => {
      render(
        <MemoryRouter>
          <LessonOnePointTwelve />
        </MemoryRouter>
      );
  
      expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
      expect(screen.getByText(/Use the up and down arrow keys to show the measurement of/i)).toBeInTheDocument();
    });
  
    test("allows user to adjust the meniscus position with arrow keys", async () => {
      render(
        <MemoryRouter>
          <LessonOnePointTwelve />
        </MemoryRouter>
      );
  
      const promptText = screen.getByText(/Use the up and down arrow keys to show the measurement of/i);
      expect(promptText).toBeInTheDocument();
  
      fireEvent.keyDown(window, { key: 'ArrowUp' });
      fireEvent.keyDown(window, { key: 'ArrowDown' });
  
      const water = screen.getByAltText('Water');
      expect(water).toHaveStyle('top: 42.5%');
    });
});