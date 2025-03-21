import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from 'react';
import LessonFivePointOne from "../../components/question/LessonFivePointOne";
import LessonFivePointTwo from "../../components/question/LessonFivePointTwo";
import LessonFivePointThree from "../../components/question/LessonFivePointThree";
import LessonFivePointFour from "../../components/question/LessonFivePointFour";
import LessonFivePointFive from "../../components/question/LessonFivePointFive";
import LessonFivePointSix from "../../components/question/LessonFivePointSix";
import LessonFivePointSeven from "../../components/question/LessonFivePointSeven";
import LessonFivePointEight from "../../components/question/LessonFivePointEight";

// Set up localStorage (if needed)
beforeEach(() => {
  // Ensure localStorage is properly set up for testing
  localStorage.setItem("studentId", "testStudentId");
});

/* Lesson 5.1 Tests */
describe("LessonFivePointOne Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonFivePointOne />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Five: Periodic Trends \(Valence Electrons\) - Group 1/i)).toBeInTheDocument();
  });

  test("displays the question prompt and multiple choice options", async () => {
    render(
      <MemoryRouter>
        <LessonFivePointOne />
      </MemoryRouter>
    );

    await screen.findByText(/How does Group 1's group number relate to its valence electrons?/i);
    expect(screen.getByText(/The number of valence electrons is equal to the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/The number of valence electrons is equal to the last digit of the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/It is not./i)).toBeInTheDocument();
  });

  test("allows user to select an answer and submit", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointOne />
        </MemoryRouter>
      );
    });

    const option = screen.getByLabelText(/The number of valence electrons is equal to the group number./i);
    fireEvent.click(option);

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText(/Correct! Click done to go to the Dashboard./i)).toBeInTheDocument();
  });
});

/* Lesson 5.2 Tests */
describe("LessonFivePointTwo Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonFivePointTwo />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Five: Periodic Trends \(Valence Electrons\) - Group 2/i)).toBeInTheDocument();
  });

  test("displays the question prompt and multiple choice options", async () => {
    render(
      <MemoryRouter>
        <LessonFivePointTwo />
      </MemoryRouter>
    );

    await screen.findByText(/How does Group 2's group number relate to its valence electrons?/i);
    expect(screen.getByText(/The number of valence electrons is equal to the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/The number of valence electrons is equal to the last digit of the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/It is not./i)).toBeInTheDocument();
  });

  test("allows user to select an answer and submit", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointTwo />
        </MemoryRouter>
      );
    });

    const option = screen.getByLabelText(/The number of valence electrons is equal to the group number./i);
    fireEvent.click(option);

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText(/Correct! Click done to go to the Dashboard./i)).toBeInTheDocument();
  });
});

/* Lesson 5.3 Tests */
describe("LessonFivePointThree Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonFivePointThree />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Five: Periodic Trends \(Valence Electrons\) - Group 13/i)).toBeInTheDocument();
  });

  test("displays the question prompt and multiple choice options", async () => {
    render(
      <MemoryRouter>
        <LessonFivePointThree />
      </MemoryRouter>
    );

    await screen.findByText(/How does Group 13's group number relate to its valence electrons?/i);
    expect(screen.getByText(/The number of valence electrons is equal to the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/The number of valence electrons is equal to the last digit of the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/It is not./i)).toBeInTheDocument();
  });

  test("allows user to select an answer and submit", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointThree />
        </MemoryRouter>
      );
    });

    const option = screen.getByLabelText(/The number of valence electrons is equal to the last digit of the group number./i);
    fireEvent.click(option);

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText(/Correct! Click done to go to the Dashboard./i)).toBeInTheDocument();
  });
});

/* Lesson 5.4 Tests */
describe("LessonFivePointFour Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonFivePointFour />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Five: Periodic Trends \(Valence Electrons\) - Group 14/i)).toBeInTheDocument();
  });

  test("displays the question prompt and multiple choice options", async () => {
    render(
      <MemoryRouter>
        <LessonFivePointFour />
      </MemoryRouter>
    );

    await screen.findByText(/How does Group 14's group number relate to its valence electrons?/i);
    expect(screen.getByText(/The number of valence electrons is equal to the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/The number of valence electrons is equal to the last digit of the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/It is not./i)).toBeInTheDocument();
  });

  test("allows user to select an answer and submit", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointFour />
        </MemoryRouter>
      );
    });

    const option = screen.getByLabelText(/The number of valence electrons is equal to the last digit of the group number./i);
    fireEvent.click(option);

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText(/Correct! Click done to go to the Dashboard./i)).toBeInTheDocument();
  });
});

/* Lesson 5.5 Tests */
describe("LessonFivePointFive Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonFivePointFive />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Five: Periodic Trends \(Valence Electrons\) - Group 15/i)).toBeInTheDocument();
  });

  test("displays the question prompt and multiple choice options", async () => {
    render(
      <MemoryRouter>
        <LessonFivePointFive />
      </MemoryRouter>
    );

    await screen.findByText(/How does Group 15's group number relate to its valence electrons?/i);
    expect(screen.getByText(/The number of valence electrons is equal to the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/The number of valence electrons is equal to the last digit of the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/It is not./i)).toBeInTheDocument();
  });

  test("allows user to select an answer and submit", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointFive />
        </MemoryRouter>
      );
    });

    const option = screen.getByLabelText(/The number of valence electrons is equal to the last digit of the group number./i);
    fireEvent.click(option);

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText(/Correct! Click done to go to the Dashboard./i)).toBeInTheDocument();
  });
});

/* Lesson 5.6 Tests */
describe("LessonFivePointSix Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonFivePointSix />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Five: Periodic Trends \(Valence Electrons\) - Group 16/i)).toBeInTheDocument();
  });

  test("displays the question prompt and multiple choice options", async () => {
    render(
      <MemoryRouter>
        <LessonFivePointSix />
      </MemoryRouter>
    );

    await screen.findByText(/How does Group 16's group number relate to its valence electrons?/i);
    expect(screen.getByText(/The number of valence electrons is equal to the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/The number of valence electrons is equal to the last digit of the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/It is not./i)).toBeInTheDocument();
  });

  test("allows user to select an answer and submit", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointSix />
        </MemoryRouter>
      );
    });

    const option = screen.getByLabelText(/The number of valence electrons is equal to the last digit of the group number./i);
    fireEvent.click(option);

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText(/Correct! Click done to go to the Dashboard./i)).toBeInTheDocument();
  });
});

/* Lesson 5.7 Tests */
describe("LessonFivePointSeven Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonFivePointSeven />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Five: Periodic Trends \(Valence Electrons\) - Group 17/i)).toBeInTheDocument();
  });

  test("displays the question prompt and multiple choice options", async () => {
    render(
      <MemoryRouter>
        <LessonFivePointSeven />
      </MemoryRouter>
    );

    await screen.findByText(/How does Group 17's group number relate to its valence electrons?/i);
    expect(screen.getByText(/The number of valence electrons is equal to the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/The number of valence electrons is equal to the last digit of the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/It is not./i)).toBeInTheDocument();
  });

  test("allows user to select an answer and submit", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointSeven />
        </MemoryRouter>
      );
    });

    const option = screen.getByLabelText(/The number of valence electrons is equal to the last digit of the group number./i);
    fireEvent.click(option);

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText(/Correct! Click done to go to the Dashboard./i)).toBeInTheDocument();
  });
});

/* Lesson 5.8 Tests */
describe("LessonFivePointEight Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonFivePointEight />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Five: Periodic Trends \(Valence Electrons\) - Group 18/i)).toBeInTheDocument();
  });

  test("displays the question prompt and multiple choice options", async () => {
    render(
      <MemoryRouter>
        <LessonFivePointEight />
      </MemoryRouter>
    );

    await screen.findByText(/How does Group 18's group number relate to its valence electrons?/i);
    expect(screen.getByText(/The number of valence electrons is equal to the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/The number of valence electrons is equal to the last digit of the group number./i)).toBeInTheDocument();
    expect(screen.getByText(/It is not./i)).toBeInTheDocument();
  });

  test("allows user to select an answer and submit", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointEight />
        </MemoryRouter>
      );
    });

    const option = screen.getByLabelText(/It is not./i);
    fireEvent.click(option);

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText(/Correct! Click done to go to the Dashboard./i)).toBeInTheDocument();
  });
});