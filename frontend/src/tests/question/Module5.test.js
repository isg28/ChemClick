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
import LessonFivePointNine from "../../components/question/LessonFivePointNine";
import LessonFivePointTen from "../../components/question/LessonFivePointTen";
import LessonFivePointEleven from "../../components/question/LessonFivePointEleven";
import LessonFivePointTwelve from "../../components/question/LessonFivePointTwelve";

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

/* Lesson 5.9 Tests */
describe("LessonFivePointNine Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonFivePointNine />
      </MemoryRouter>
    );
    expect(screen.getByText(/Unit Five: Periodic Trends \(Valence Electrons\) - Group 18/i)).toBeInTheDocument();
  });

  test("displays the question prompt and multiple choice options", async () => {
    render(
      <MemoryRouter>
        <LessonFivePointNine />
      </MemoryRouter>
    );
    await screen.findByText(/How does Group 18's group number relate to its valence electrons?/i);
    expect(screen.getByText(/The number of valence electrons is equal to the group number\./i)).toBeInTheDocument();
    expect(screen.getByText(/The number of valence electrons is equal to the last digit of the group number\./i)).toBeInTheDocument();
    expect(screen.getByText(/It is not\./i)).toBeInTheDocument();
  });

  test("allows user to select an answer and submit", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointNine />
        </MemoryRouter>
      );
    });

    const option = screen.getByLabelText(/The number of valence electrons is equal to the last digit of the group number\./i);
    fireEvent.click(option);

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });
    
    expect(await screen.findByText(/Correct! Click done to go to the Dashboard\./i)).toBeInTheDocument();
  });
});

/*Lesson 5.10 Tests */
describe("LessonFivePointTen Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonFivePointTen />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Unit Five: Periodic Trends \(Valence Electrons\) - Group 18/i)
    ).toBeInTheDocument();
  });

  test("displays the question prompt and multiple choice options", async () => {
    render(
      <MemoryRouter>
        <LessonFivePointTen />
      </MemoryRouter>
    );

    await screen.findByText(/How does Group 18's group number relate to its valence electrons?/i);
    expect(
      screen.getByText(/The number of valence electrons is equal to the group number./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The number of valence electrons is equal to the last digit of the group number./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/It is not./i)).toBeInTheDocument();
  });

  test("allows user to select an answer and submit", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointTen />
        </MemoryRouter>
      );
    });

    // Select the correct answer based on the component logic ("It is not.")
    const option = screen.getByLabelText(/It is not./i);
    fireEvent.click(option);

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Expect the correct feedback message after submitting
    expect(
      await screen.findByText(/Correct! Click done to go to the Dashboard./i)
    ).toBeInTheDocument();
  });
});

/* Lesson 5.11 Tests */
describe("LessonFivePointEleven Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonFivePointEleven />
      </MemoryRouter>
    );
    expect(
      screen.getByText(
        /Unit Five: Periodic Trends \(Valence Electrons\) - Group 1 and Group 2/i
      )
    ).toBeInTheDocument();
  });

  test("displays the question prompt and multiple choice options", async () => {
    render(
      <MemoryRouter>
        <LessonFivePointEleven />
      </MemoryRouter>
    );

    // Wait for the prompt text to appear
    await screen.findByText(
      /How does Group 1 and Group 2's group number relate to its valence electrons\? View previous answers through images/i
    );
    expect(
      screen.getByText(/The number of valence electrons is equal to the group number\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The number of valence electrons is equal to the last digit of the group number\./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/It is not\./i)).toBeInTheDocument();
  });

  test("allows user to select the correct answer and submit", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointEleven />
        </MemoryRouter>
      );
    });

    // Select the correct answer
    const option = screen.getByLabelText(
      /The number of valence electrons is equal to the group number\./i
    );
    fireEvent.click(option);

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Verify the feedback for the correct answer
    expect(
      await screen.findByText(/Correct! Click done to go to the Dashboard\./i)
    ).toBeInTheDocument();
  });

  test("displays image feedback when the image is clicked", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointEleven />
        </MemoryRouter>
      );
    });

    // Find the image using its alt text and simulate a click
    const image = screen.getByAltText(/Group Element/i);
    fireEvent.click(image);

    // Check that the image feedback message appears
    expect(
      await screen.findByText(/Click and scroll through the images to view previous answers/i)
    ).toBeInTheDocument();
  });
});

/* Lesson 5.12 Tests */
describe("LessonFivePointTwelve Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonFivePointTwelve />
      </MemoryRouter>
    );
    expect(
      screen.getByText(
        /Unit Five: Periodic Trends \(Valence Electrons\) - Group 13 - 18/i
      )
    ).toBeInTheDocument();
  });

  test("displays the question prompt and multiple choice options", async () => {
    render(
      <MemoryRouter>
        <LessonFivePointTwelve />
      </MemoryRouter>
    );

    await screen.findByText(
      /How does Group 13 through Group 18's group number relate to its valence electrons\? View previous answers through images/i
    );
    expect(
      screen.getByText(/The number of valence electrons is equal to the group number\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The number of valence electrons is equal to the last digit of the group number\./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/It is not\./i)).toBeInTheDocument();
  });

  test("allows user to select the correct answer and submit", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointTwelve />
        </MemoryRouter>
      );
    });

    // The correct answer for Lesson 5.12 is:
    // "The number of valence electrons is equal to the last digit of the group number."
    const correctOption = screen.getByLabelText(
      /The number of valence electrons is equal to the last digit of the group number\./i
    );
    fireEvent.click(correctOption);

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(
      await screen.findByText(/Correct! Click done to go to the Dashboard\./i)
    ).toBeInTheDocument();
    // Targeting the button specifically by its role.
    expect(screen.getByRole("button", { name: /Done/i })).toBeInTheDocument();
  });

  test("allows user to select an incorrect answer and submit, then try again", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointTwelve />
        </MemoryRouter>
      );
    });

    // Select an incorrect answer (choose the first option)
    const incorrectOption = screen.getByLabelText(
      /The number of valence electrons is equal to the group number\./i
    );
    fireEvent.click(incorrectOption);

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(
      await screen.findByText(/Incorrect. Please try again\./i)
    ).toBeInTheDocument();
    // Use getByRole to get the button with text "Try Again"
    expect(screen.getByRole("button", { name: /Try Again/i })).toBeInTheDocument();

    // Simulate clicking "Try Again" to reset the state
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Try Again/i }));
    });

    // After trying again, the feedback message should be cleared and the button reverts to "Submit Answer"
    expect(screen.queryByText(/Incorrect. Please try again\./i)).not.toBeInTheDocument();
    expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
  });

  test("displays image feedback when the image is clicked and updates on arrow navigation", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFivePointTwelve />
        </MemoryRouter>
      );
    });

    // Click the image to trigger the image feedback
    const image = screen.getByAltText(/Group Element/i);
    fireEvent.click(image);

    // Verify the initial feedback message is displayed
    expect(
      await screen.findByText(/Click and scroll through the images to view previous answers/i)
    ).toBeInTheDocument();

    // Locate the right arrow button (rendered with the character "❯")
    const rightArrow = screen.getByText("❯");
    fireEvent.click(rightArrow);

    // After clicking next, the feedback should update.
    // For index 1, the message is:
    // "Group 14: The number of valence electrons is equal to the last digit of the group number."
    expect(
      await screen.findByText(/Group 14: The number of valence electrons is equal to the last digit of the group number\./i)
    ).toBeInTheDocument();
  });
});