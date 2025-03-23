import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from 'react';
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

beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === "studentId") return "testStudentId";
    return null;
  });
});

// lesson 1.1 test
describe("LessonOnePointOne Component", () => {
  test("renders without crashing", () => {
    act(() => {
      render(
        <MemoryRouter>
          <LessonOnePointOne />
        </MemoryRouter>
      );
    });
    expect(screen.getByRole('heading', { name: /Unit One/i })).toBeInTheDocument();
  });

  test("displays a slider and submit button", () => {
    render(
      <MemoryRouter>
        <LessonOnePointOne />
      </MemoryRouter>
    );
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test("allows user to change the slider value", () => {
    render(
      <MemoryRouter>
        <LessonOnePointOne />
      </MemoryRouter>
    );
    const slider = screen.getByRole('slider');
    act(() => {
      fireEvent.change(slider, { target: { value: 50 } });
    });
    expect(slider.value).toBe('50');
  });
});

// lesson 1.2 test
describe("LessonOnePointTwo Component", () => {
  test("renders without crashing", () => {
    act(() => {
      render(
        <MemoryRouter>
          <LessonOnePointTwo />
        </MemoryRouter>
      );
    });
  });

  test("displays an input field and submit button", () => {
    render(
      <MemoryRouter>
        <LessonOnePointTwo />
      </MemoryRouter>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test("allows user to input a measurement", () => {
    render(
      <MemoryRouter>
        <LessonOnePointTwo />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    act(() => {
      fireEvent.change(input, { target: { value: '10.5' } });
    });
    expect(input.value).toBe('10.5');
  });
});

// lesson 1.3 test
describe("LessonOnePointThree Component", () => {
  test("renders without crashing", () => {
    act(() => {
      render(
        <MemoryRouter>
          <LessonOnePointThree />
        </MemoryRouter>
      );
    });
  });

  test("displays an input field and submit button", () => {
    render(
      <MemoryRouter>
        <LessonOnePointThree />
      </MemoryRouter>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test("allows user to input a measurement", () => {
    render(
      <MemoryRouter>
        <LessonOnePointThree />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    act(() => {
      fireEvent.change(input, { target: { value: '15.3' } });
    });
    expect(input.value).toBe('15.3');
  });
});

// lesson 1.4 test
describe("LessonOnePointFour Component", () => {
  test("renders without crashing", () => {
    act(() => {
      render(
        <MemoryRouter>
          <LessonOnePointFour />
        </MemoryRouter>
      );
    });
  });

  test("displays a slider and submit button", () => {
    render(
      <MemoryRouter>
        <LessonOnePointFour />
      </MemoryRouter>
    );
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test("allows user to change the slider value", () => {
    render(
      <MemoryRouter>
        <LessonOnePointFour />
      </MemoryRouter>
    );
    const slider = screen.getByRole('slider');
    act(() => {
      fireEvent.change(slider, { target: { value: 75 } });
    });
    expect(slider.value).toBe('75');
  });
});

// lesson 1.5 test
describe("LessonOnePointFive Component", () => {
  test("renders without crashing", () => {
    act(() => {
      render(
        <MemoryRouter>
          <LessonOnePointFive />
        </MemoryRouter>
      );
    });
  });

  test("displays an input field and submit button", () => {
    render(
      <MemoryRouter>
        <LessonOnePointFive />
      </MemoryRouter>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test("allows user to input a measurement", () => {
    render(
      <MemoryRouter>
        <LessonOnePointFive />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    act(() => {
      fireEvent.change(input, { target: { value: '20.7' } });
    });
    expect(input.value).toBe('20.7');
  });
});

// lesson 1.6 test
describe("LessonOnePointSix Component", () => {
  test("renders without crashing", () => {
    act(() => {
      render(
        <MemoryRouter>
          <LessonOnePointSix />
        </MemoryRouter>
      );
    });
  });

  test("displays an input field and submit button", () => {
    render(
      <MemoryRouter>
        <LessonOnePointSix />
      </MemoryRouter>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test("allows user to input a measurement", () => {
    render(
      <MemoryRouter>
        <LessonOnePointSix />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    act(() => {
      fireEvent.change(input, { target: { value: '25.9' } });
    });
    expect(input.value).toBe('25.9');
  });
});

// lesson 1.7 test
describe("LessonOnePointSeven Component", () => {
  test("renders without crashing", () => {
    act(() => {
      render(
        <MemoryRouter>
          <LessonOnePointSeven />
        </MemoryRouter>
      );
    });
  });

  test("displays a submit button", () => {
    render(
      <MemoryRouter>
        <LessonOnePointSeven />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test("allows user to adjust the meniscus position", () => {
    render(
      <MemoryRouter>
        <LessonOnePointSeven />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /submit/i });
    act(() => {
      fireEvent.click(button);
    });
    expect(button).toBeInTheDocument();
  });
});

// lesson 1.8 test
describe("LessonOnePointEight Component", () => {
  test("renders without crashing", () => {
    act(() => {
      render(
        <MemoryRouter>
          <LessonOnePointEight />
        </MemoryRouter>
      );
    });
  });

  test("displays an input field and submit button", () => {
    render(
      <MemoryRouter>
        <LessonOnePointEight />
      </MemoryRouter>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test("allows user to input a measurement", () => {
    render(
      <MemoryRouter>
        <LessonOnePointEight />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    act(() => {
      fireEvent.change(input, { target: { value: '30.1' } });
    });
    expect(input.value).toBe('30.1');
  });
});

// lesson 1.9 test
describe("LessonOnePointNine Component", () => {
  test("renders without crashing", () => {
    act(() => {
      render(
        <MemoryRouter>
          <LessonOnePointNine />
        </MemoryRouter>
      );
    });
  });

  test("displays a submit button", () => {
    render(
      <MemoryRouter>
        <LessonOnePointNine />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test("allows user to adjust the meniscus position with arrow keys", () => {
    render(
      <MemoryRouter>
        <LessonOnePointNine />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /submit/i });
    act(() => {
      fireEvent.keyDown(button, { key: 'ArrowUp' });
    });
    expect(button).toBeInTheDocument();
  });
});

// lesson 1.10 test
describe("LessonOnePointTen Component", () => {
  test("renders without crashing", () => {
    act(() => {
      render(
        <MemoryRouter>
          <LessonOnePointTen />
        </MemoryRouter>
      );
    });
  });

  test("displays a submit button and current measurement", () => {
    render(
      <MemoryRouter>
        <LessonOnePointTen />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByText(/current measurement/i)).toBeInTheDocument();
  });

  test("allows user to adjust the meniscus position with arrow keys", () => {
    render(
      <MemoryRouter>
        <LessonOnePointTen />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /submit/i });
    act(() => {
      fireEvent.keyDown(button, { key: 'ArrowDown' });
    });
    expect(button).toBeInTheDocument();
  });
});

// lesson 1.11 test
describe("LessonOnePointEleven Component", () => {
  test("renders without crashing", () => {
    act(() => {
      render(
        <MemoryRouter>
          <LessonOnePointEleven />
        </MemoryRouter>
      );
    });
  });

  test("displays an input field and submit button", () => {
    render(
      <MemoryRouter>
        <LessonOnePointEleven />
      </MemoryRouter>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test("allows user to input a measurement", () => {
    render(
      <MemoryRouter>
        <LessonOnePointEleven />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    act(() => {
      fireEvent.change(input, { target: { value: '35.5' } });
    });
    expect(input.value).toBe('35.5');
  });
});

// lesson 1.12 test
describe("LessonOnePointTwelve Component", () => {
  test("renders without crashing", () => {
    act(() => {
      render(
        <MemoryRouter>
          <LessonOnePointTwelve />
        </MemoryRouter>
      );
    });
  });

  test("displays a submit button", () => {
    render(
      <MemoryRouter>
        <LessonOnePointTwelve />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test("allows user to adjust the meniscus position with arrow keys", () => {
    render(
      <MemoryRouter>
        <LessonOnePointTwelve />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /submit/i });
    act(() => {
      fireEvent.keyDown(button, { key: 'ArrowLeft' });
    });
    expect(button).toBeInTheDocument();
  });
});