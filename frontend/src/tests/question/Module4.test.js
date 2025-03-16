import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LessonFourPointOne from "../../components/question/LessonFourPointOne";
import LessonFourPointTwo from "../../components/question/LessonFourPointTwo";
import LessonFourPointThree from "../../components/question/LessonFourPointThree";

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === "studentId") return "testStudentId";
    if (key === "teacherId") return null;
    return null;
  });
});

// Mock window.alert
beforeAll(() => {
  window.alert = jest.fn();
});

/* Lesson 4.1 Tests */
describe("LessonFourPointOne Component", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LessonFourPointOne />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Unit Four: Periodic Table Classification/i)
    ).toBeInTheDocument();
  });

  test("displays a color selection and periodic table", async () => {
    render(
      <MemoryRouter>
        <LessonFourPointOne />
      </MemoryRouter>
    );

    await screen.findByText(/Metallic Properties/i);
    expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
  });

  test("allows user to select a color", async () => {
    render(
      <MemoryRouter>
        <LessonFourPointOne />
      </MemoryRouter>
    );

    const metalColorButtons = await screen.findAllByText(/Metal/i);

    const correctMetalButton = metalColorButtons.find((el) =>
      el.closest(".color-block")
    );

    expect(correctMetalButton).toBeDefined();
    fireEvent.click(correctMetalButton);

    await new Promise((resolve) => setTimeout(resolve, 500));

  });

  test("allows user to color an element", async () => {
    render(
      <MemoryRouter>
        <LessonFourPointOne />
      </MemoryRouter>
    );

    const metalColorButtons = screen.getAllByText(/Metal/i);
    const correctMetalButton = metalColorButtons.find((el) =>
      el.classList.contains("color-block")
    );
    fireEvent.click(correctMetalButton);

    const sodiumSquares = screen.getAllByText(/Na/i);
    const sodiumSquare = sodiumSquares.find((el) =>
      el.closest(".element-square")
    );

    fireEvent.click(sodiumSquare);

  });

  test("allows user to erase an element color", async () => {
    render(
      <MemoryRouter>
        <LessonFourPointOne />
      </MemoryRouter>
    );

    const metalColorButtons = screen.getAllByText(/Metal/i);
    const correctMetalButton = metalColorButtons.find((el) =>
      el.classList.contains("color-block")
    );
    fireEvent.click(correctMetalButton);

    const sodiumSquares = screen.getAllByText(/Na/i);
    const sodiumSquare = sodiumSquares.find((el) =>
      el.closest(".element-square")
    );

    fireEvent.click(sodiumSquare);

    const eraserButton = screen.getByText(/Clear One/i);
    fireEvent.click(eraserButton);
    fireEvent.click(sodiumSquare);

    expect(sodiumSquare.closest(".element-square")).toHaveStyle(
      "background-color: white"
    );
  });

  test("displays feedback after submitting an answer", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LessonFourPointOne />
        </MemoryRouter>
      );
    });

    const submitButton = screen.getByText(/Submit Answer/i);
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await screen.findByText(/Keep trying!/i);
  });

});


/*  Lesson 4.2 Tests                                              */
describe("LessonFourPointTwo Component", () => {
    test("renders without crashing", () => {
      render(
        <MemoryRouter>
          <LessonFourPointTwo />
        </MemoryRouter>
      );
  
      expect(
        screen.getByText(/Unit Four: Periodic Table Classification/i)
      ).toBeInTheDocument();
    });
  
    test("displays a color selection and periodic table", async () => {
      render(
        <MemoryRouter>
          <LessonFourPointTwo />
        </MemoryRouter>
      );
  
      await screen.findByText(/Group Classification/i);
      expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
    });
  
    test("allows user to color an element", async () => {
        render(
          <MemoryRouter>
            <LessonFourPointTwo />
          </MemoryRouter>
        );
      
        const alkaliButton = await screen.findAllByText(/Alkali/i);
        const correctButton = alkaliButton.find((el) => el.closest(".color-block"));
      
        expect(correctButton).toBeDefined();
        fireEvent.click(correctButton);
      
        const sodiumSquares = screen.getAllByText(/Na/i);
        const sodiumSquare = sodiumSquares.find((el) =>
          el.closest(".element-square")
        );
      
        expect(sodiumSquare).toBeDefined();
        fireEvent.click(sodiumSquare);
      
      });
      
      test("allows user to erase an element color", async () => {
        render(
          <MemoryRouter>
            <LessonFourPointTwo />
          </MemoryRouter>
        );
      
        const alkaliButton = await screen.findAllByText(/Alkali/i);
        const correctButton = alkaliButton.find((el) => el.closest(".color-block"));
      
        fireEvent.click(correctButton);
      
        const sodiumSquares = screen.getAllByText(/Na/i);
        const sodiumSquare = sodiumSquares.find((el) =>
          el.closest(".element-square")
        );
      
        fireEvent.click(sodiumSquare);
      
        const eraserButton = screen.getByText(/Clear One/i);
        fireEvent.click(eraserButton);
        fireEvent.click(sodiumSquare);
      
    });
  
    test("displays feedback after submitting an answer", async () => {
      render(
        <MemoryRouter>
          <LessonFourPointTwo />
        </MemoryRouter>
      );
  
      const submitButton = screen.getByText(/Submit Answer/i);
      fireEvent.click(submitButton);
  
      await screen.findByText(/Keep trying!/i);
    });

});

/*  Lesson 4.3 Tests                                              */
describe("LessonFourPointThree Component", () => {
    test("renders without crashing", () => {
      render(
        <MemoryRouter>
          <LessonFourPointThree />
        </MemoryRouter>
      );
  
      expect(
        screen.getByText(/Unit Four: Periodic Table Classification/i)
      ).toBeInTheDocument();
    });
  
    test("displays a color selection and periodic table", async () => {
        render(
          <MemoryRouter>
            <LessonFourPointThree />
          </MemoryRouter>
        );
      
        const metallicButtons = await screen.findAllByText(/Metallic Properties/i);
        const groupButtons = await screen.findAllByText(/Group Classification/i);
      
        const metallicButton = metallicButtons.find((btn) => btn.tagName === "BUTTON");
        const groupButton = groupButtons.find((btn) => btn.tagName === "BUTTON");
      
        expect(metallicButton).toBeInTheDocument();
        expect(groupButton).toBeInTheDocument();
        expect(screen.getByText(/Submit Answer/i)).toBeInTheDocument();
      });
      
  
    test("switches between metallic properties and group classification", async () => {
      render(
        <MemoryRouter>
          <LessonFourPointThree />
        </MemoryRouter>
      );
  
      const metallicButtons = screen.getAllByText(/Metallic Properties/i);
      const groupButtons = screen.getAllByText(/Group Classification/i);
      
      const metallicButton = metallicButtons.find((btn) => btn.tagName === "BUTTON");
      const groupButton = groupButtons.find((btn) => btn.tagName === "BUTTON");
      
  
      fireEvent.click(groupButton);
      expect(groupButton).toHaveClass("active");
      expect(metallicButton).not.toHaveClass("active");
  
      fireEvent.click(metallicButton);
      expect(metallicButton).toHaveClass("active");
      expect(groupButton).not.toHaveClass("active");
    });
  
    test("allows user to select a metallic property color", async () => {
      render(
        <MemoryRouter>
          <LessonFourPointThree />
        </MemoryRouter>
      );
  
      const metalButton = await screen.findAllByText(/Metal/i);
      const correctButton = metalButton.find((el) => el.closest(".color-block"));
  
      expect(correctButton).toBeDefined();
      fireEvent.click(correctButton);
  
      // Wait for UI update before asserting the style
      await new Promise((resolve) => setTimeout(resolve, 500));
  
      expect(correctButton).toHaveStyle("border: 2px solid black");
    });
  
    test("allows user to color an element based on metallic properties", async () => {
      render(
        <MemoryRouter>
          <LessonFourPointThree />
        </MemoryRouter>
      );
  
      const metalButton = await screen.findAllByText(/Metal/i);
      const correctButton = metalButton.find((el) => el.closest(".color-block"));
  
      fireEvent.click(correctButton);
  
      const sodiumSquares = screen.getAllByText(/Na/i);
      const sodiumSquare = sodiumSquares.find((el) =>
        el.closest(".element-square")
      );
  
      expect(sodiumSquare).toBeDefined();
      fireEvent.click(sodiumSquare);
  
      expect(sodiumSquare).toHaveStyle("background: linear-gradient(to right, #ff5447, white)");
    });
  
    test("allows user to color an element based on group classification", async () => {
      render(
        <MemoryRouter>
          <LessonFourPointThree />
        </MemoryRouter>
      );
      const groupButtons = screen.getAllByText(/Group Classification/i);
      
      const groupButton = groupButtons.find((btn) => btn.tagName === "BUTTON");
      fireEvent.click(groupButton);
  
      const alkaliButton = await screen.findAllByText(/Alkali/i);
      const correctButton = alkaliButton.find((el) => el.closest(".color-block"));
  
      fireEvent.click(correctButton);
  
      const sodiumSquares = screen.getAllByText(/Na/i);
      const sodiumSquare = sodiumSquares.find((el) =>
        el.closest(".element-square")
      );
  
      fireEvent.click(sodiumSquare);
  
      expect(sodiumSquare).toHaveStyle("background: linear-gradient(to right, white, yellow)");
    });
  
    test("allows user to erase an element color", async () => {
      render(
        <MemoryRouter>
          <LessonFourPointThree />
        </MemoryRouter>
      );
  
      const metalButton = await screen.findAllByText(/Metal/i);
      const correctButton = metalButton.find((el) => el.closest(".color-block"));
  
      fireEvent.click(correctButton);
  
      const sodiumSquares = screen.getAllByText(/Na/i);
      const sodiumSquare = sodiumSquares.find((el) =>
        el.closest(".element-square")
      );
  
      fireEvent.click(sodiumSquare);
      expect(sodiumSquare).toHaveStyle("background: linear-gradient(to right, #ff5447, white)");
  
      const eraserButton = screen.getByText(/Clear One/i);
      fireEvent.click(eraserButton);
      fireEvent.click(sodiumSquare);
  
      expect(sodiumSquare).toHaveStyle("background: linear-gradient(to right, white, white)");
    });
  
    test("displays feedback after submitting an answer", async () => {
      render(
        <MemoryRouter>
          <LessonFourPointThree />
        </MemoryRouter>
      );
  
      const submitButton = screen.getByText(/Submit Answer/i);
      fireEvent.click(submitButton);
  
      await screen.findByText(/Keep trying!/i);
    });

});


