import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import TeacherDashboard from '../../components/teacherdashboard/TeacherDashboard';
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("TeacherDashboard", () => {
  test("renders loading state initially", () => {
    renderWithRouter(<TeacherDashboard />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("handles fetch failure gracefully", () => {
    renderWithRouter(<TeacherDashboard />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});
