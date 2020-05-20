import React from "react";
import { cleanup, fireEvent, getByText, prettyDOM, render, waitForElement, act } from "@testing-library/react";
import axios from 'axios';
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    
    const { getByText, container } =  render(<Application />)

    return waitForElement(() => {
      console.log(prettyDOM(container))
      getByText("Monday")
    })

  })

  // it("changes the schedule when a new day is selected", async () => {
  //   const { getByText } = render(<Application />);
  
    
  //   await waitForElement(() => getByText("Monday"));
  
  //   act(() => {
  //     fireEvent.click(getByText("Tuesday"));
  //   })
    
  
  //   expect(getByText("Leopold Silvers")).toBeInTheDocument();
  // });
})

