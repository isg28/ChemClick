import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LessonTwoPointOne from "../../components/question/LessonTwoPointOne";
import LessonTwoPointTwo from "../../components/question/LessonTwoPointTwo";
import LessonTwoPointThree from "../../components/question/LessonTwoPointThree";
import LessonTwoPointFour from "../../components/question/LessonTwoPointFour";
import LessonTwoPointFive from "../../components/question/LessonTwoPointFive";
import LessonTwoPointSix from "../../components/question/LessonTwoPointSix";

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === "studentId") return "testStudentId";
    return null;
  });
});

describe("LessonTwoPointOne Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonTwoPointOne />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Two: Identifying the Uncertain Digit/i)).toBeInTheDocument();
  });

  test("displays a question", async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointOne />
      </MemoryRouter>
    );

    await screen.findByText(/Observe the digital scale reading and enter the uncertaint digit \(tenths place\)\./i);
  });

  test("allows user to input an answer", async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointOne />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Enter the uncertain digit/i);
    fireEvent.change(input, { target: { value: ".2" } });

    expect(input.value).toBe(".2");
  });
  test('submit button triggers answer checking', () => {
    render(
      <MemoryRouter>
        <LessonTwoPointOne />
      </MemoryRouter>
    );
    
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });

    fireEvent.click(submitButton);

    expect(screen.getByText(/Incorrect/i)).toBeInTheDocument();
  });
  test('submits the correct answer and shows the Next Question button', async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointOne />
      </MemoryRouter>
    );
  
    const readingText = screen.getByText(/\d+\.\d/); 
    const readingValue = parseFloat(readingText.textContent);
 
    const uncertainDigit = Math.floor((readingValue * 10) % 10); 
 
    const input = screen.getByPlaceholderText(/Enter the uncertain digit/i);
    fireEvent.change(input, { target: { value: uncertainDigit.toString() } });
 
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    fireEvent.click(submitButton);
  
    await screen.findByText(/Correct!/i);  
 
    expect(screen.getByRole('button', { name: /Next Question/i })).toBeVisible();
  });
});
describe("LessonTwoPointTwo Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonTwoPointTwo />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Two: Identifying the Uncertain Digit/i)).toBeInTheDocument();
  });

  test("displays a question", async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointTwo />
      </MemoryRouter>
    );

    await screen.findByText(/Observe the scale reading and determine the uncertain digit \(hundreths place\)\./i);
  });

  test("allows user to input an answer", async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointTwo />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Enter the uncertain digit/i);
    fireEvent.change(input, { target: { value: ".2" } });

    expect(input.value).toBe(".2");
  });
  test('submit button triggers answer checking', () => {
    render(
      <MemoryRouter>
        <LessonTwoPointTwo />
      </MemoryRouter>
    );
    
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });

    fireEvent.click(submitButton);

    expect(screen.getByText(/Incorrect/i)).toBeInTheDocument();
  });
  test('submits the correct answer and shows the Next Question', async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointTwo />
      </MemoryRouter>
    );
  
    const readingText = screen.getByText(/\d+\.\d/); 
    const readingValue = parseFloat(readingText.textContent);
 
    const uncertainDigit = Math.floor((readingValue * 100) % 10); 
 
    const input = screen.getByPlaceholderText(/Enter the uncertain digit/i);
    fireEvent.change(input, { target: { value: uncertainDigit.toString() } });
 
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    fireEvent.click(submitButton);
  
    await screen.findByText(/Correct!/i);  
 
    expect(screen.getByRole('button', { name: /Next Question/i })).toBeVisible();
  });
});
describe("LessonTwoPointThree Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonTwoPointThree />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Two: Reading a Standard \(#\.##\)/i)).toBeInTheDocument();
  });

  test("displays a question", async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointThree />
      </MemoryRouter>
    );

    await screen.findByText(/Place the standard 5g object on the scale and determine whether the reading passes. Hint: the scale measures up to the hundredths place!/i);
  });

  test("allows user to input an answer", async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointThree />
      </MemoryRouter>
    );

    expect(screen.getByText(/Does the reading on the scale pass\?/i)).toBeInTheDocument();
    const radioButtons = screen.getAllByRole('radio');

    fireEvent.click(radioButtons[0]);

    expect(radioButtons[0]).toBeChecked();

    expect(radioButtons[1]).not.toBeChecked();
  });
  test('submit button triggers answer checking', () => {
    render(
      <MemoryRouter>
        <LessonTwoPointThree />
      </MemoryRouter>
    );
    
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });

    fireEvent.click(submitButton);

    expect(screen.getByText(/For this reading to pass/i)).toBeInTheDocument();
  });
  test('submits a correct answer and shows the Next Question button', async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointThree />
      </MemoryRouter>
    );

    expect(screen.getByText(/Does the reading on the scale pass\?/i)).toBeInTheDocument();
 
    const reading = screen.getByText(/\d\.\d\d/).textContent;
    const tenthsPlace = Math.floor((parseFloat(reading) * 10) % 10);
  
    const correctAnswer = tenthsPlace === 0 ? 'Yes' : 'No';

    fireEvent.click(screen.getByLabelText(correctAnswer));
 
    fireEvent.click(screen.getByText('Submit Answer'));

      expect(screen.getByText(/Correct!/)).toBeInTheDocument();
      expect(screen.getByText('Next Question')).toBeInTheDocument();
  });
});
describe("LessonTwoPointFour Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonTwoPointFour />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Two: Reading a Standard \(##\.##\)/i)).toBeInTheDocument();
  });

  test("displays a question", async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointFour />
      </MemoryRouter>
    );

    await screen.findByText(/Place the standard 10g object on the scale and determine whether the reading passes. Hint: the scale measures up to the hundredths place!/i);
  });

  test("allows user to input an answer", async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointFour />
      </MemoryRouter>
    );

    expect(screen.getByText(/Does the reading on the scale pass\?/i)).toBeInTheDocument();
    const radioButtons = screen.getAllByRole('radio');

    fireEvent.click(radioButtons[0]);

    expect(radioButtons[0]).toBeChecked();

    expect(radioButtons[1]).not.toBeChecked();
  });
  test('submit button triggers answer checking', () => {
    render(
      <MemoryRouter>
        <LessonTwoPointFour />
      </MemoryRouter>
    );
    
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });

    fireEvent.click(submitButton);

    expect(screen.getByText(/For this reading to pass/i)).toBeInTheDocument();
  });
  test('submits a correct answer and shows the Next Question button', async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointFour />
      </MemoryRouter>
    );

    expect(screen.getByText(/Does the reading on the scale pass\?/i)).toBeInTheDocument();
 
    const reading = screen.getByText(/\d\.\d\d/).textContent;
    const tenthsPlace = Math.floor((parseFloat(reading) * 10) % 10);
  
    const correctAnswer = tenthsPlace === 0 ? 'Yes' : 'No';

    fireEvent.click(screen.getByLabelText(correctAnswer));
 
    fireEvent.click(screen.getByText('Submit Answer'));

      expect(screen.getByText(/Correct!/)).toBeInTheDocument();
      expect(screen.getByText('Next Question')).toBeInTheDocument();
  });
});
describe("LessonTwoPointFive Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonTwoPointFive />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Two: Reading a Standard \(###\.##\)/i)).toBeInTheDocument();
  });

  test("displays a question", async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointFive />
      </MemoryRouter>
    );

    await screen.findByText(/Place the standard 200g object on the scale and determine whether the reading passes. Hint: the scale measures up to the hundredths place!/i);
  });

  test("allows user to input an answer", async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointFive />
      </MemoryRouter>
    );

    expect(screen.getByText(/Does the reading on the scale pass\?/i)).toBeInTheDocument();
    const radioButtons = screen.getAllByRole('radio');

    fireEvent.click(radioButtons[0]);

    expect(radioButtons[0]).toBeChecked();

    expect(radioButtons[1]).not.toBeChecked();
  });
  test('submit button triggers answer checking', () => {
    render(
      <MemoryRouter>
        <LessonTwoPointFive />
      </MemoryRouter>
    );
    
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });

    fireEvent.click(submitButton);

    expect(screen.getByText(/For this reading to pass/i)).toBeInTheDocument();
  });
  test('submits a correct answer and shows the Next Question button', async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointFive />
      </MemoryRouter>
    );

    expect(screen.getByText(/Does the reading on the scale pass\?/i)).toBeInTheDocument();
 
    const reading = screen.getByText(/\d\.\d\d/).textContent;
    const tenthsPlace = Math.floor((parseFloat(reading) * 10) % 10);
  
    const correctAnswer = tenthsPlace === 0 ? 'Yes' : 'No';

    fireEvent.click(screen.getByLabelText(correctAnswer));
 
    fireEvent.click(screen.getByText('Submit Answer'));

      expect(screen.getByText(/Correct!/)).toBeInTheDocument();
      expect(screen.getByText('Next Question')).toBeInTheDocument();
  });
});
describe("LessonTwoPointSix Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonTwoPointSix />
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Two: Reading a Standard \(#\.###\)/i)).toBeInTheDocument();
  });

  test("displays a question", async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointSix />
      </MemoryRouter>
    );

    await screen.findByText(/Place the standard 5g object on the scale and determine whether the reading passes. Hint: the scale measures up to the thousandths place!/i);
  });

  test("allows user to input an answer", async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointSix />
      </MemoryRouter>
    );

    expect(screen.getByText(/Does the reading on the scale pass\?/i)).toBeInTheDocument();
    const radioButtons = screen.getAllByRole('radio');

    fireEvent.click(radioButtons[0]);

    expect(radioButtons[0]).toBeChecked();

    expect(radioButtons[1]).not.toBeChecked();
  });
  test('submit button triggers answer checking', () => {
    render(
      <MemoryRouter>
        <LessonTwoPointSix />
      </MemoryRouter>
    );
    
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });

    fireEvent.click(submitButton);

    expect(screen.getByText(/For this reading to pass/i)).toBeInTheDocument();
  });
  test('submits a correct answer and shows the Next Question button', async () => {
    render(
      <MemoryRouter>
        <LessonTwoPointSix />
      </MemoryRouter>
    );

    expect(screen.getByText(/Does the reading on the scale pass\?/i)).toBeInTheDocument();
 
    const reading = screen.getByText(/\d\.\d\d/).textContent;
    const tenthsPlace = Math.floor((parseFloat(reading) * 100) % 100);
  
    const correctAnswer = tenthsPlace === 0 ? 'Yes' : 'No';

    fireEvent.click(screen.getByLabelText(correctAnswer));
 
    fireEvent.click(screen.getByText('Submit Answer'));

      expect(screen.getByText(/Correct!/)).toBeInTheDocument();
      expect(screen.getByText('Next Question')).toBeInTheDocument();
  });
});