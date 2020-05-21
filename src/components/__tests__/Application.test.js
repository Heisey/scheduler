import React from "react";
import { cleanup, fireEvent, getByText, prettyDOM, render, waitForElement, act, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";
import axios from 'axios';
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    
    const { getByText } =  render(<Application />)
    await waitForElement(() => getByText("Monday"))

    fireEvent.click(getByText("Tuesday"))

    expect(getByText("Leopold Silvers")).toBeInTheDocument()

  })

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    act(() => {
      fireEvent.click(getByText("Tuesday"));
    })
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books and interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />)
  
    await (waitForElement(() => getByText(container, "Archie Cohen")))

    const appointments = getAllByTestId(container, 'appointment')
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, 'Add'))

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones"}
    })
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))
    fireEvent.click(getByText(appointment, 'Save'))
    expect(getByText(appointment, 'Saving')).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'))

    const day = getAllByTestId(container, 'day').find(d => queryByText(d, 'Monday'))

    expect(getByText(day, 'no spots remaining')).toBeInTheDocument()
  })

  it("loads data, cancels the interview by 1 for Monday", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointments = getAllByTestId(container, 'appointment')
    const appointment = appointments[1];
    
    fireEvent.click(getByAltText(appointment, 'Delete'))

    fireEvent.click(getByText(appointment, 'Confirm'))

    expect(getByText(appointment, 'Deleting')).toBeInTheDocument()

    await waitForElement(() => getByAltText(appointment, 'Add'))

    const day = getAllByTestId(container, 'day').find(d => queryByText(d, 'Monday'))

    expect(getByText(day, '2 spots remaining')).toBeInTheDocument()

    console.log(prettyDOM(container))
  })

  it("loads data, update user and doesn't affect spots remaining", async () => {
    
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointments = getAllByTestId(container, 'appointment')
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, 'Edit'))

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Puppy Archie"}
    })

    fireEvent.click(getByAltText(appointment, 'Tori Malcolm'))

    fireEvent.click(getByText(appointment, 'Save'))
    expect(getByText(appointment, 'Saving')).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, 'Puppy Archie'))

    const day = getAllByTestId(container, 'day').find(d => queryByText(d, 'Monday'))

    expect(getByText(day, '1 spot remaining')).toBeInTheDocument()
  })

  it("loads data, shows error when saving", async () => {
    axios.put.mockRejectedValueOnce()
    
    const { container } = render(<Application />);

    await (waitForElement(() => getByText(container, "Archie Cohen")))

    const appointments = getAllByTestId(container, 'appointment')
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, 'Add'))

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Puppy Archie"}
    })

    fireEvent.click(getByAltText(appointment, 'Tori Malcolm'))
    
    fireEvent.click(getByText(appointment, 'Save'))

    expect(getByText(appointment, 'Saving')).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, 'Error'))
  })

  it("loads data, shows error when deleting", async () => {
    axios.delete.mockRejectedValueOnce()
    
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointments = getAllByTestId(container, 'appointment')
    const appointment = appointments[1];
    
    fireEvent.click(getByAltText(appointment, 'Delete'))

    fireEvent.click(getByText(appointment, 'Confirm'))

    expect(getByText(appointment, 'Deleting')).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, 'Error'))
  })
})

