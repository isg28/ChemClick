import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";

import LessonSixPointOne from "../../components/question/LessonSixPointOne";
import LessonSixPointTwo from "../../components/question/LessonSixPointTwo";
import LessonSixPointThree from "../../components/question/LessonSixPointThree";
import LessonSixPointFour from "../../components/question/LessonSixPointFour";
import LessonSixPointFive from "../../components/question/LessonSixPointFive";
import LessonSixPointSix from "../../components/question/LessonSixPointSix";
import LessonSixPointSeven from "../../components/question/LessonSixPointSeven";
import LessonSixPointEight from "../../components/question/LessonSixPointEight";
import LessonSixPointNine from "../../components/question/LessonSixPointNine";
import LessonSixPointTen from "../../components/question/LessonSixPointTen";
import LessonSixPointEleven from "../../components/question/LessonSixPointEleven";
import LessonSixPointTwelve from "../../components/question/LessonSixPointTwelve";
import LessonSixPointThirteen from "../../components/question/LessonSixPointThirteen";
import LessonSixPointFourteen from "../../components/question/LessonSixPointFourteen";
import LessonSixPointFifteen from "../../components/question/LessonSixPointFifteen";
import LessonSixPointSixteen from "../../components/question/LessonSixPointSixteen";
import LessonSixPointSeventeen from "../../components/question/LessonSixPointSeventeen";
import LessonSixPointEighteen from "../../components/question/LessonSixPointEighteen";
import LessonSixPointNineteen from "../../components/question/LessonSixPointNineteen";
import LessonSixPointTwenty from "../../components/question/LessonSixPointTwenty";


const lessons = [
    { component: LessonSixPointOne, name: "LessonSixPointOne" },
    { component: LessonSixPointTwo, name: "LessonSixPointTwo" },
    { component: LessonSixPointThree, name: "LessonSixPointThree" },
    { component: LessonSixPointFour, name: "LessonSixPointFour" },
    { component: LessonSixPointFive, name: "LessonSixPointFive" },
    { component: LessonSixPointSix, name: "LessonSixPointSix" },
    { component: LessonSixPointSeven, name: "LessonSixPointSeven" },
    { component: LessonSixPointEight, name: "LessonSixPointEight" },
    { component: LessonSixPointNine, name: "LessonSixPointNine" },
    { component: LessonSixPointTen, name: "LessonSixPointTen" },
    { component: LessonSixPointEleven, name: "LessonSixPointEleven" },
    { component: LessonSixPointTwelve, name: "LessonSixPointTwelve" },
    { component: LessonSixPointThirteen, name: "LessonSixPointThirteen" },
    { component: LessonSixPointFourteen, name: "LessonSixPointFourteen" },
    { component: LessonSixPointFifteen, name: "LessonSixPointFifteen" },
    { component: LessonSixPointSixteen, name: "LessonSixPointSixteen" },
    { component: LessonSixPointSeventeen, name: "LessonSixPointSeventeen" },
    { component: LessonSixPointEighteen, name: "LessonSixPointEighteen" },
    { component: LessonSixPointNineteen, name: "LessonSixPointNineteen" },
    { component: LessonSixPointTwenty, name: "LessonSixPointTwenty" },
];



const testLessonComponent = (LessonComponent, lessonId) => {
    describe(`Tests for ${lessonId}`, () => {
        it("renders the lesson component correctly", () => {
            render(
                <MemoryRouter>
                    <LessonComponent />
                </MemoryRouter>
            );
            expect(screen.getByText(/Unit Six: Forming Monatomic Ions/i)).toBeInTheDocument();
        });


        it("submits the answer and provides feedback", () => {
            render(
                <MemoryRouter>
                    <LessonComponent />
                </MemoryRouter>
            );

            const submitButton = screen.getByText(/Submit Answer/i);
            fireEvent.click(submitButton);

            expect(screen.getByText(/Incorrect|Correct/i)).toBeInTheDocument();
        });

        if (lessonId !== "LessonSixPointTwo" && lessonId !== "LessonSixPointTen" && lessonId !== "LessonSixPointEighteen") {
            it("should add an electron when the 'Add Electron' button is clicked", () => {
                render(
                    <MemoryRouter>
                        <LessonComponent />
                    </MemoryRouter>
                );
        
                // Get the initial number of valence electrons displayed
                const valenceElectronsText = screen.getByText(/Valence Electrons:/i);
                const initialValenceElectrons = parseInt(valenceElectronsText.textContent.match(/\d+/)[0]);
        
                // Get the 'Add Electron' button
                const addElectronButton = screen.getByText(/Add Electron/i);
        
                // Click the 'Add Electron' button
                fireEvent.click(addElectronButton);
        
                // Get the updated valence electrons text
                const updatedValenceElectronsText = screen.getByText(/Valence Electrons:/i);
                const updatedValenceElectrons = parseInt(updatedValenceElectronsText.textContent.match(/\d+/)[0]);
        
                // Check that the valence electrons increased by 1
                expect(updatedValenceElectrons).toBe(initialValenceElectrons + 1);
            });
        
            it("should remove an electron when the 'Remove Electron' button is clicked", () => {
                render(
                    <MemoryRouter>
                        <LessonComponent />
                    </MemoryRouter>
                );
        
                // Get the initial number of valence electrons displayed
                const valenceElectronsText = screen.getByText(/Valence Electrons:/i);
                const initialValenceElectrons = parseInt(valenceElectronsText.textContent.match(/\d+/)[0]);
        
                // Get the 'Remove Electron' button
                const removeElectronButton = screen.getByText(/Remove Electron/i);
        
                // Click the 'Remove Electron' button
                fireEvent.click(removeElectronButton);
        
                // Get the updated valence electrons text
                const updatedValenceElectronsText = screen.getByText(/Valence Electrons:/i);
                const updatedValenceElectrons = parseInt(updatedValenceElectronsText.textContent.match(/\d+/)[0]);
        
                // Check that the valence electrons decreased by 1
                expect(updatedValenceElectrons).toBe(initialValenceElectrons - 1);
            });
        }
    });
};

beforeEach(() => {
    Storage.prototype.getItem = jest.fn((key) => {
        if (key === "studentId") return "testStudentId";
        return null;
    });
});

lessons.forEach(({ component, name }) => {
    testLessonComponent(component, name);
});
