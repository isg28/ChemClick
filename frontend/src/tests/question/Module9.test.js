import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from 'react';
import LessonNinePointOne from "../../components/question/LessonNinePointOne";
import LessonNinePointTwo from "../../components/question/LessonNinePointTwo";

global.__dropCallbacks__ = [];
let dropCallback = null;

const oneText = "For this question, please use the +/- 1 combs to balance this ion.";
const twoTextOption1 = "For this question, please use the 1 +/- combs to balance this ion.";
const twoTextOption2 = "For this question, please use the 2 +/- combs to balance this ion.";
const threeTextOption1 = "For this question, please use the 3 +/- combs to balance this ion.";
const threeTextOption2 = "For this question, please use the 2 +/- and the 1 +/- combs to balance this ion.";
const threeTextOption3 = "For this question, please use the 1 +/- combs to balance this ion.";

// Mock react-dnd to capture drop callbacks.
jest.mock("react-dnd", () => ({
    DndProvider: ({ children }) => <div>{children}</div>,
    useDrag: () => [{ isDragging: false }, jest.fn()],
    useDrop: (specFunc) => {
        const spec = specFunc();
        global.__dropCallbacks__.push(spec.drop);
        return [{ isOver: false }, jest.fn()];
    },
}));

jest.mock("react-dnd-html5-backend", () => ({}));

beforeEach(() => {
    Storage.prototype.getItem = jest.fn((key) => {
        if (key === "studentId") return "testStudentId";
        return null;
        });
    });

// Reset our global drop callbacks after each test.
afterEach(() => {
    global.__dropCallbacks__ = [];
    jest.restoreAllMocks();
});

describe("LessonNinePointOne Component", () => {
    test("renders without crashing", () => {
        render(
            <MemoryRouter>
                <LessonNinePointOne />
            </MemoryRouter>
        );
    
        expect(screen.getByText(/Unit Nine: Ionic Compounds/i)).toBeInTheDocument();
    });
    test("renders all draggable ion comb images", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointOne />
                </MemoryRouter>
            );
        });
        const ionTypes = ["+1", "-1", "+2", "-2", "+3", "-3"];
        ionTypes.forEach((type) => {
                expect(screen.getByAltText(`Ion ${type}`)).toBeInTheDocument();
            });
        });

    test("displays incorrect feedback when no ions dropped", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointOne />
                </MemoryRouter>
            );
        });
        // Click submit without dropping any ion
        const submitButton = screen.getByRole("button", { name: /Submit Answer/i });
        fireEvent.click(submitButton);
            await waitFor(() => {
                expect(screen.getByText(/Incorrect/i)).toBeInTheDocument();
            });
        });

    test("renders header, instructions, and draggable ions", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointOne />
                </MemoryRouter>
            );
        });
        expect(screen.getByText("ChemClicks Assignments")).toBeInTheDocument();
        expect(screen.getByText(/please use/i)).toBeInTheDocument();
        const ionTypes = ["+1", "-1", "+2", "-2", "+3", "-3"];
        ionTypes.forEach((type) => {
            expect(screen.getByAltText(`Ion ${type}`)).toBeInTheDocument();
        });
    });

    test("removes a dropped ion when remove button is clicked", async () => {
        // Force Math.random so that the component always picks the same ion (assumed to be +1).
        jest.spyOn(Math, "random").mockReturnValue(0);
    
        // Render the component.
        await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointOne />
                </MemoryRouter>
            );
        });
    
        // Wait until the drop callback is registered.
        await waitFor(() => expect(global.__dropCallbacks__.length).toBeGreaterThan(0));
    
        // Simulate a drop event for a -1 comb.
        act(() => {
            global.__dropCallbacks__[0]({ ionType: "-1", src: "fake-negative-ion" });
        });
    
        // Find the remove button. We query for a button whose trimmed text content is "X".
        const removeButton = await screen.findByText((content, element) => {
            return element.tagName.toLowerCase() === "button" && content.trim() === "X";
        });
        expect(removeButton).toBeInTheDocument();
    
        // Click the remove button.
        fireEvent.click(removeButton);
    
        // After removal, the drop zone should display "Drop Ions Here".
        await waitFor(() => {
            expect(screen.getByText("Drop Ions Here")).toBeInTheDocument();
            });
        });
    
    test("displays correct feedback and clears drop zone when correct ion is dropped and submitted", async () => {
        // Force Math.random so that the component always selects the same ion (assumed to be +1).
        jest.spyOn(Math, "random").mockReturnValue(0);
        
        await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointOne />
                </MemoryRouter>
            );
        });
        
        // Wait for the drop callback to be registered.
        await waitFor(() => expect(global.__dropCallbacks__.length).toBeGreaterThan(0));
        
        // For a +1 ion, the correct answer requires a -1 comb.
        act(() => {
            global.__dropCallbacks__[0]({ ionType: "-1", src: "fake-negative-ion" });
        });
        
        // Click the submit button.
        const submitButton = screen.getByRole("button", { name: /Submit Answer/i });
        fireEvent.click(submitButton);
        
        // Wait for "Correct!" feedback to appear.
        await waitFor(() => {
            expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
        });
        
        // Verify that the drop zone is cleared by checking for a <p> element with text "Drop Ions Here".
        await waitFor(() => {
            expect(
                screen.getByText((content, element) =>
                element.tagName.toLowerCase() === "p" && content.trim() === "Drop Ions Here"
                )
            ).toBeInTheDocument();
            });
        });
    test("generates correct question for +1 ion", async () => {
            // Force Math.random to return 0 so that Math.floor(0*6)=0, selecting "+1".
            const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValueOnce(0);
            await act(async () => {
                render(
                    <MemoryRouter>
                        <LessonNinePointOne />
                    </MemoryRouter>
                );
            });
            expect(screen.getByText(oneText)).toBeInTheDocument();
            mathRandomSpy.mockRestore();
        });
        
    test("generates correct question for -1 ion", async () => {
        // Force Math.random to return 0.2 so that Math.floor(0.2*6)=1, selecting "-1".
        const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValueOnce(0.2);
        await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointOne />
                </MemoryRouter>
            );
        });
            expect(screen.getByText(oneText)).toBeInTheDocument();
            mathRandomSpy.mockRestore();
        });
        
    test("generates correct question for +2 ion with random number 1", async () => {
        // For +2 ion: first call returns 0.35 (index 2: "+2"), second call returns 0 yielding randomNumber = 1.
        const mathRandomSpy = jest.spyOn(Math, "random")
            .mockReturnValueOnce(0.35)
            .mockReturnValueOnce(0);
            await act(async () => {
                render(
                    <MemoryRouter>
                        <LessonNinePointOne />
                    </MemoryRouter>
                );
            });
            expect(screen.getByText(twoTextOption1)).toBeInTheDocument();
            mathRandomSpy.mockRestore();
    });
        
    test("generates correct question for +2 ion with random number 2", async () => {
        // For +2 ion: first call returns 0.35, second call returns 0.99 yielding randomNumber = 2.
        const mathRandomSpy = jest.spyOn(Math, "random")
            .mockReturnValueOnce(0.35)
            .mockReturnValueOnce(0.99);
            await act(async () => {
                render(
                    <MemoryRouter>
                        <LessonNinePointOne />
                    </MemoryRouter>
                );
            });
            expect(screen.getByText(twoTextOption2)).toBeInTheDocument();
            mathRandomSpy.mockRestore();
    });
        
    test("generates correct question for -2 ion with random number 1", async () => {
        // For -2 ion: first call returns 0.55 (index 3: "-2"), second call returns 0.
        const mathRandomSpy = jest.spyOn(Math, "random")
            .mockReturnValueOnce(0.55)
            .mockReturnValueOnce(0);
                await act(async () => {
                render(
                    <MemoryRouter>
                        <LessonNinePointOne />
                    </MemoryRouter>
                );
            });
            expect(screen.getByText(twoTextOption1)).toBeInTheDocument();
            mathRandomSpy.mockRestore();
    });
        
    test("generates correct question for -2 ion with random number 2", async () => {
        // For -2 ion: first call returns 0.55, second call returns 0.99.
        const mathRandomSpy = jest.spyOn(Math, "random")
            .mockReturnValueOnce(0.55)
            .mockReturnValueOnce(0.99);
                await act(async () => {
                render(
                    <MemoryRouter>
                        <LessonNinePointOne />
                    </MemoryRouter>
                );
            });
            expect(screen.getByText(twoTextOption2)).toBeInTheDocument();
            mathRandomSpy.mockRestore();
    });
        
    test("generates correct question for +3 ion with random number 1", async () => {
            // For +3 ion: first call returns 0.7 (index 4: "+3"), second call returns 0.
            const mathRandomSpy = jest.spyOn(Math, "random")
            .mockReturnValueOnce(0.7)
            .mockReturnValueOnce(0);
            await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointOne />
                </MemoryRouter>
            );
        });
        expect(screen.getByText(threeTextOption1)).toBeInTheDocument();
        mathRandomSpy.mockRestore();
    });
        
    test("generates correct question for +3 ion with random number 2", async () => {
        // For +3 ion: first call returns 0.7, second call returns 0.5 (yielding randomNumber = 2).
    const mathRandomSpy = jest.spyOn(Math, "random")
        .mockReturnValueOnce(0.7)
        .mockReturnValueOnce(0.5);
        await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointOne />
                </MemoryRouter>
            );
        });
        expect(screen.getByText(threeTextOption2)).toBeInTheDocument();
        mathRandomSpy.mockRestore();
    });
        
    test("generates correct question for +3 ion with random number 3", async () => {
        // For +3 ion: first call returns 0.7, second call returns 0.99 (yielding randomNumber = 3).
            const mathRandomSpy = jest.spyOn(Math, "random")
            .mockReturnValueOnce(0.7)
            .mockReturnValueOnce(0.99);
            await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointOne />
                </MemoryRouter>
            );
        });
        expect(screen.getByText(threeTextOption3)).toBeInTheDocument();
        mathRandomSpy.mockRestore();
    });
        
    test("generates correct question for -3 ion with random number 1", async () => {
            // For -3 ion: first call returns 0.9 (index 5: "-3"), second call returns 0.
        const mathRandomSpy = jest.spyOn(Math, "random")
            .mockReturnValueOnce(0.9)
            .mockReturnValueOnce(0);
        await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointOne />
                </MemoryRouter>
            );
        });
            expect(screen.getByText(threeTextOption1)).toBeInTheDocument();
            mathRandomSpy.mockRestore();
    });
        
    test("generates correct question for -3 ion with random number 2", async () => {
            // For -3 ion: first call returns 0.9, second call returns 0.5.
        const mathRandomSpy = jest.spyOn(Math, "random")
            .mockReturnValueOnce(0.9)
            .mockReturnValueOnce(0.5);
            await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointOne />
                </MemoryRouter>
            );
        });
            expect(screen.getByText(threeTextOption2)).toBeInTheDocument();
            mathRandomSpy.mockRestore();
        });
        
    test("generates correct question for -3 ion with random number 3", async () => {
            // For -3 ion: first call returns 0.9, second call returns 0.99.
            const mathRandomSpy = jest.spyOn(Math, "random")
            .mockReturnValueOnce(0.9)
            .mockReturnValueOnce(0.99);
            await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointOne />
                </MemoryRouter>
            );
        });
            expect(screen.getByText(threeTextOption3)).toBeInTheDocument();
            mathRandomSpy.mockRestore();
    });
});

/* Lesson 9.2 Tests */
describe("LessonNinePointTwo Component", () => {
    test("renders without crashing", () => {
        render(
            <MemoryRouter>
                <LessonNinePointTwo />
            </MemoryRouter>
        );
    
        expect(screen.getByText(/Unit Nine: Ionic Compounds/i)).toBeInTheDocument();
    });
    test("renders all draggable ion comb images", async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointOne />
                </MemoryRouter>
            );
        });
        const ionTypes = ["+1", "-1", "+2", "-2", "+3", "-3"];
        ionTypes.forEach((type) => {
                expect(screen.getByAltText(`Ion ${type}`)).toBeInTheDocument();
            });
        });

    test("displays error when a negative ion is dropped in the positive drop zone", async () => {
        // Drop zone 1 only accepts positive ions.
        await act(async () => {
            render(
                <MemoryRouter>
                    <LessonNinePointTwo />
                </MemoryRouter>
            );
        });
        await waitFor(() => expect(global.__dropCallbacks__.length).toBeGreaterThanOrEqual(2));
        act(() => {
            global.__dropCallbacks__[0]({ ionType: "-1", src: "fake-negative-ion" });
        });
        await waitFor(() => {
            expect(screen.getByText(/Only positive ions can go here!/i)).toBeInTheDocument();
        });
    });

    test("displays error when a positive ion is dropped in the negative drop zone", async () => {
        // Drop zone 2 only accepts negative ions.
        await act(async () => {
        render(
            <MemoryRouter>
                <LessonNinePointTwo />
            </MemoryRouter>
            );
        });
        await waitFor(() => expect(global.__dropCallbacks__.length).toBeGreaterThanOrEqual(2));
        act(() => {
            global.__dropCallbacks__[1]({ ionType: "+1", src: "fake-positive-ion" });
        });
        await waitFor(() => {
            expect(screen.getByText(/Only negative ions can go here!/i)).toBeInTheDocument();
        });
    });

    test("removes a dropped ion from positive drop zone when remove button is clicked", async () => {
        await act(async () => {
        render(
            <MemoryRouter>
                <LessonNinePointTwo />
            </MemoryRouter>
            );
        });
        await waitFor(() => expect(global.__dropCallbacks__.length).toBeGreaterThanOrEqual(2));
        act(() => {
            global.__dropCallbacks__[0]({ ionType: "+1", src: "fake-positive-ion" });
        });
        const removeButton = await screen.findByText((content, element) =>
            element.tagName.toLowerCase() === "button" && content.trim() === "X"
        );
        expect(removeButton).toBeInTheDocument();
        fireEvent.click(removeButton);
        await waitFor(() => {
          // We expect the positive drop zone to show "Drop Ions Here"
        expect(screen.getAllByText("Drop Ions Here").length).toBeGreaterThan(0);
        });
    });
    
    test("removes a dropped ion from negative drop zone when remove button is clicked", async () => {
        await act(async () => {
        render(
            <MemoryRouter>
                <LessonNinePointTwo />
            </MemoryRouter>
            );
        });
        await waitFor(() => expect(global.__dropCallbacks__.length).toBeGreaterThanOrEqual(2));
        act(() => {
            global.__dropCallbacks__[1]({ ionType: "-2", src: "fake-negative-ion" });
        });
        const removeButton = await screen.findByText((content, element) =>
            element.tagName.toLowerCase() === "button" && content.trim() === "X"
        );
        expect(removeButton).toBeInTheDocument();
        fireEvent.click(removeButton);
        await waitFor(() => {
        expect(screen.getAllByText("Drop Ions Here").length).toBeGreaterThan(0);
        });
    });

    test("displays correct feedback and resets state when correct ions and formula are submitted", async () => {
        const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0.16);
        await act(async () => {
          render(
            <MemoryRouter>
              <LessonNinePointTwo />
            </MemoryRouter>
          );
        });
        // Instead of matching the entire question text exactly, we check that the heading contains key words.
        const headings = screen.getAllByRole("heading", { level: 1 });
        const questionHeading = headings.find((h) =>
          /sodium \(Na\).*sulfur \(S\)/i.test(h.textContent)
        );
        expect(questionHeading).toBeDefined();
        mathRandomSpy.mockRestore();
    
        // For sodium-sulfur, correct ions are: ["+1", "+1", "-2"].
        await waitFor(() => expect(global.__dropCallbacks__.length).toBeGreaterThanOrEqual(2));
        act(() => {
          // Drop two positive ions into zone1.
            global.__dropCallbacks__[0]({ ionType: "+1", src: "fake-positive-ion" });
            global.__dropCallbacks__[0]({ ionType: "+1", src: "fake-positive-ion" });
          // Drop one negative ion into zone2.
            global.__dropCallbacks__[1]({ ionType: "-2", src: "fake-negative-ion" });
        });
    
        const baseInputs = screen.getAllByPlaceholderText("Base");
        const superInputs = screen.getAllByPlaceholderText("Charge");
        const subInputs = screen.getAllByPlaceholderText("Ion");
    
        fireEvent.change(baseInputs[0], { target: { value: "Na" } });
        fireEvent.change(superInputs[0], { target: { value: "1+" } });
        fireEvent.change(subInputs[0], { target: { value: "2" } });
        fireEvent.change(baseInputs[1], { target: { value: "S" } });
        fireEvent.change(superInputs[1], { target: { value: "2-" } });
        fireEvent.change(subInputs[1], { target: { value: "1" } });
    
        const submitButton = screen.getByRole("button", { name: /Submit Answer/i });
        fireEvent.click(submitButton);
    
        await waitFor(() => {
            expect(screen.getByText(/✅ Correct! Great job!/i)).toBeInTheDocument();
        });
        // Because state reset is delayed by setTimeout (1500ms), extend waitFor timeout.
        await waitFor(() => {
            expect(screen.getAllByText("Drop Ions Here").length).toBeGreaterThan(0);
        }, { timeout: 3000 });
        // Verify that formula inputs have been reset.
        expect(baseInputs[0].value).toBe("");
        expect(superInputs[0].value).toBe("");
        expect(subInputs[0].value).toBe("");
        expect(baseInputs[1].value).toBe("");
        expect(superInputs[1].value).toBe("");
        expect(subInputs[1].value).toBe("");
    });
    
});