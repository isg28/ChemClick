import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LessonThreePointOne from "../../components/question/LessonThreePointOne";
import LessonThreePointTwo from "../../components/question/LessonThreePointTwo";

beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === "studentId") return "testStudentId";
    return null;
  });
});


describe("LessonThreePointOne Component", () => {
    test("renders without crashing", () => {
      render(
        <MemoryRouter>
          <LessonThreePointOne />
        </MemoryRouter>
      );
  
      expect(screen.getByText(/Unit Three: Atomic Structure - 2:8:8:2 Pattern/i)).toBeInTheDocument();
    });
  
    test("displays a question", async () => {
      render(
        <MemoryRouter>
          <LessonThreePointOne />
        </MemoryRouter>
      );
  
      await screen.findByText((content) =>
    content.includes("Look at the element") &&
    content.includes("add the amount of electrons and protons you think the element requires")
    );
    });
  
    test('nucleus selection enables proton controls', () => {
        render(
          <MemoryRouter>
            <LessonThreePointOne />
          </MemoryRouter>
        );
  
        const addProtonButton = screen.getByRole('button', { name: /Add Proton/i });
        const removeProtonButton = screen.getByRole('button', { name: /Remove Proton/i });
  
        expect(addProtonButton).toBeDisabled();
        expect(removeProtonButton).toBeDisabled();
 
        const nucleus = screen.getByTestId('nucleus-three-point-one');
        fireEvent.click(nucleus);

        expect(addProtonButton).not.toBeDisabled();
        expect(removeProtonButton).not.toBeDisabled();
      });
    
      test('shell selection enables electron controls', () => {
        render(
          <MemoryRouter>
            <LessonThreePointOne />
          </MemoryRouter>
        );

        const addElectronButton = screen.getByRole('button', { name: /Add Electron/i });
        const removeElectronButton = screen.getByRole('button', { name: /Remove Electron/i });
  
        expect(addElectronButton).toBeDisabled();
        expect(removeElectronButton).toBeDisabled();
  
        const firstShell = screen.getByTestId('shell-click-zone-0');
        fireEvent.click(firstShell);

        expect(addElectronButton).not.toBeDisabled();
        expect(removeElectronButton).not.toBeDisabled();
      });
    
      test('can add and remove protons after selecting nucleus', () => {
        render(
          <MemoryRouter>
            <LessonThreePointOne />
          </MemoryRouter>
        );
 
        const addProtonButton = screen.getByRole('button', { name: /Add Proton/i });
        const removeProtonButton = screen.getByRole('button', { name: /Remove Proton/i });
        const nucleus = screen.getByTestId('nucleus-three-point-one');

        fireEvent.click(nucleus);

        fireEvent.click(addProtonButton);

        const protonCounter = screen.getByText('1');
        expect(protonCounter).toBeInTheDocument();

        fireEvent.click(addProtonButton);
        expect(screen.getByText('2')).toBeInTheDocument();
  
        fireEvent.click(removeProtonButton);
        expect(screen.getByText('1')).toBeInTheDocument();
  
        fireEvent.click(removeProtonButton);
        
        expect(screen.queryByText('1')).not.toBeInTheDocument();
      });
    
      test('can add and remove electrons after selecting a shell', () => {
        render(
          <MemoryRouter>
            <LessonThreePointOne />
          </MemoryRouter>
        );
        
        const addElectronButton = screen.getByRole('button', { name: /Add Electron/i });
        const removeElectronButton = screen.getByRole('button', { name: /Remove Electron/i });
        
        const firstShell = screen.getByTestId('shell-click-zone-0');
        fireEvent.click(firstShell);
        
        expect(addElectronButton.textContent).toContain('Add Electron (0000)');

        fireEvent.click(addElectronButton);

        expect(addElectronButton.textContent).toContain('Add Electron (1000)');

        fireEvent.click(addElectronButton);
        expect(addElectronButton.textContent).toContain('Add Electron (2000)');

        fireEvent.click(removeElectronButton);
        expect(addElectronButton.textContent).toContain('Add Electron (1000)');

        fireEvent.click(removeElectronButton);
        expect(addElectronButton.textContent).toContain('Add Electron (0000)');
      });
    
      test('can switch between different shells', () => {
        render(
          <MemoryRouter>
            <LessonThreePointOne />
          </MemoryRouter>
        );
    
        const addElectronButton = screen.getByRole('button', { name: /Add Electron/i });
  
        const shell1 = screen.getByTestId('shell-click-zone-0');
        const shell2 = screen.getByTestId('shell-click-zone-1');
        const shell3 = screen.getByTestId('shell-click-zone-2');
        const shell4 = screen.getByTestId('shell-click-zone-3');

        fireEvent.click(shell1);
        fireEvent.click(addElectronButton);
        expect(addElectronButton.textContent).toContain('Add Electron (1000)');
    
        fireEvent.click(shell2);
        fireEvent.click(addElectronButton);
        expect(addElectronButton.textContent).toContain('Add Electron (1100)');
   
        fireEvent.click(shell3);
        fireEvent.click(addElectronButton);
        expect(addElectronButton.textContent).toContain('Add Electron (1110)');
  
        fireEvent.click(shell4);
        fireEvent.click(addElectronButton);
        expect(addElectronButton.textContent).toContain('Add Electron (1111)');
      });
    
      test('submit button triggers answer checking and shows next button on correct answer', async () => {
        render(
          <MemoryRouter>
            <LessonThreePointOne />
          </MemoryRouter>
        );
 
        const elementText = await screen.findByText(/Look at the element/i);
 
        console.log('Full text:', elementText.textContent);
  
        const fullText = elementText.textContent;
        const elementNameMatch = fullText.match(/element\s+([A-Za-z]+)/i);
        const elementName = elementNameMatch ? elementNameMatch[1] : null;
        
        console.log('Extracted Element:', elementName);
        
        if (!elementName) {
          throw new Error('Could not extract element name from text');
        }
    
        const atomicNumber = getAtomicNumber(elementName);
        console.log('Atomic Number:', atomicNumber);
        
        if (atomicNumber === 0) {
          throw new Error(`Unknown element or atomic number: ${elementName}`);
        }
      
        const nucleus = screen.getByTestId('nucleus-three-point-one');
        fireEvent.click(nucleus);
      
        const addProtonButton = screen.getByRole('button', { name: /Add Proton/i });
        for (let i = 0; i < atomicNumber; i++) {
          fireEvent.click(addProtonButton);
        }
  
        const shellCapacities = [2, 8, 8, 2];

        const shellClickZones = [
          screen.getByTestId('shell-click-zone-0'),
          screen.getByTestId('shell-click-zone-1'),
          screen.getByTestId('shell-click-zone-2'),
          screen.getByTestId('shell-click-zone-3'),
        ];
      
        const addElectronButton = screen.getByRole('button', { name: /Add Electron/i });
        let remainingElectrons = atomicNumber; 
        
        for (let shellIndex = 0; shellIndex < shellCapacities.length && remainingElectrons > 0; shellIndex++) {
          
          fireEvent.click(shellClickZones[shellIndex]);
          console.log(`Selected shell: ${shellIndex}`);

          const electronsToAdd = Math.min(shellCapacities[shellIndex], remainingElectrons);
          
          for (let i = 0; i < electronsToAdd; i++) {
            fireEvent.click(addElectronButton);
            console.log(`Added electron ${i+1} to shell ${shellIndex}`);
          }
          
          remainingElectrons -= electronsToAdd;
        }
      
        console.log('All electrons added. Submitting answer...');

        const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
        fireEvent.click(submitButton);

        expect(screen.getByText(/Correct!/i)).toBeInTheDocument();

        expect(screen.getByText("Next Question")).toBeInTheDocument();
      });
      function getAtomicNumber(elementName) {
        const elements = {
          Hydrogen: 1,
          Helium: 2,
          Lithium: 3,
          Beryllium: 4,
          Boron: 5,
          Carbon: 6,
          Nitrogen: 7,
          Oxygen: 8,
          Fluorine: 9,
          Neon: 10,
          Sodium: 11,
          Magnesium: 12,
          Aluminum: 13,
          Silicon: 14,
          Phosphorous: 15,
          Sulfur: 16,
          Chlorine: 17,
          Argon: 18,
          Potassium: 19,
          Calcium: 20
        };
        return elements[elementName] || 0; 
      }
      test('shell highlighting when answer is incorrect', async () => {
        render(
          <MemoryRouter>
            <LessonThreePointOne />
          </MemoryRouter>
        );
        expect(screen.getByText(/Look at the element/)).toBeInTheDocument();
    
        const shellClickZone = screen.getByTestId('shell-click-zone-0');
        fireEvent.click(shellClickZone);
    
        const addElectronButton = screen.getByText(/Add Electron/);
        fireEvent.click(addElectronButton);
    
        const nucleus = screen.getByTestId('nucleus-three-point-one');
        fireEvent.click(nucleus);
    
        const addProtonButton = screen.getByText(/Add Proton/);
        fireEvent.click(addProtonButton);
   
        const submitButton = screen.getByText('Submit Answer');
        fireEvent.click(submitButton);
  
        expect(screen.getByText(/Incorrect/)).toBeInTheDocument();
    
        const shellElements = screen.getAllByTestId('shell-visual-ring-three-point-one');
          
        let hasRedBorder = false;
        shellElements.forEach(shell => {
        const style = window.getComputedStyle(shell);
        if (style.borderColor.includes('255, 0, 0')) {
              hasRedBorder = true;
        }
          
          
        expect(hasRedBorder).toBe(true);
        });
      });
  });

describe("LessonThreePointTwo Component", () => {
    test("renders without crashing", () => {
      render(
        <MemoryRouter>
          <LessonThreePointTwo/>
        </MemoryRouter>
      );
  
      expect(screen.getByText(/Unit Three: Atomic Structure - Valence Electrons/i)).toBeInTheDocument();
    });
  
    test("displays a question", async () => {
      render(
        <MemoryRouter>
          <LessonThreePointTwo/>
        </MemoryRouter>
      );

        await screen.findByText((content) =>
            content.includes("Look at the Bohr Model for the element") &&
            content.includes(". Click on each valence electron, until all the valence electrons are purple")
        );
    });
    test("check electron clicking", async () => {
        render(
          <MemoryRouter>
            <LessonThreePointTwo/>
          </MemoryRouter>
        );
    const electrons = screen.getAllByTestId('electron-three-point-two');

    expect(electrons.length).toBeGreaterThan(0);

    fireEvent.click(electrons[0]);

    expect(electrons[0]).toHaveClass('selected');

    fireEvent.click(electrons[0]);

    expect(electrons[0]).not.toHaveClass('selected');
  });
  test('submit button triggers answer checking', () => {
    render(
      <MemoryRouter>
        <LessonThreePointTwo />
      </MemoryRouter>
    );
    
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });

    fireEvent.click(submitButton);

    expect(screen.getByText(/Incorrect/i)).toBeInTheDocument();
  });
  test("highlighted shell appears after incorrect answer", async () => {
    render(
      <MemoryRouter>
        <LessonThreePointTwo/>
      </MemoryRouter>
    );

    const submitButton = screen.getByText("Submit Answer");
    fireEvent.click(submitButton);

    expect(screen.getByText(/Incorrect/i)).toBeInTheDocument();

    const highlightedShell = screen.getAllByTestId('highlighted-shell');
    expect(highlightedShell).toBeTruthy();
  });
  test("next question button appears after correct answer", async () => {
    render(
      <MemoryRouter>
        <LessonThreePointTwo />
      </MemoryRouter>
    );

    const prompt = await screen.findByText(/Look at the Bohr Model for the element/i);

    const elementNameMatch = prompt.textContent.match(/element\s+(\w+)/);
    const elementName = elementNameMatch ? elementNameMatch[1] : null;

    const electrons = screen.getAllByTestId('electron-three-point-two');

    const correctValue = elementName === "Hydrogen" ? 1 : 
                         elementName === "Helium" ? 2 :
                         elementName === "Lithium" ? 1 : 
                         elementName === "Beryllium" ? 2 :
                         elementName === "Boron" ? 3 :
                         elementName === "Carbon" ? 4 :
                         elementName === "Nitrogen" ? 5 :
                         elementName === "Oxygen" ? 6 : 
                         elementName === "Fluorine" ? 7 :
                         elementName === "Neon" ? 8 :
                         elementName === "Sodium" ? 1 :
                         elementName === "Magnesium" ? 2 :
                         elementName === "Aluminum" ? 3 :
                         elementName === "Silicon" ? 4 :
                         elementName === "Phosphorous" ? 5 :
                         elementName === "Sulfur" ? 6 :
                         elementName === "Chlorine" ? 7 :
                         elementName === "Argon" ? 8 :
                         elementName === "Potassium" ? 1 :
                         elementName === "Calcium" ? 2 :
                         2;
    
    for (let i = 0; i < correctValue; i++) {
      fireEvent.click(electrons[i]);
    }

    const submitButton = screen.getByText("Submit Answer");
    fireEvent.click(submitButton);

    const feedback = await screen.findByTestId("lesson-three-point-two-feedback");
    expect(feedback.textContent).toBe("Correct!");

    expect(screen.getByText("Next Question")).toBeInTheDocument();
  });
});
