import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import Form from 'components/Appointment/Form/Form';

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it('renders without crashing', () => {
    const fn = jest.fn()
    render(
      <Form 
        onChange={fn}
        interviewers={[]}
      />
    );
  })

  it("renders without student name if not provided", () => {
    const fn = jest.fn()
    const { getByPlaceholderText } = render((
      <Form 
        onChange={fn}
        interviewers={[]}
      />)
    )
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const fn = jest.fn()
    const { getByTestId } = render((
      <Form
        onChange={fn}
        interviewers={[]}
        name="Lydia Miller-Jones"
      />
    ))
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const fn = jest.fn()
    const onSave = jest.fn()
    const { getByText } = render((
      <Form
        onChange={fn}
        onSelectError={fn}
        interviewers={interviewers}
        onSave={onSave}
      />
    ))
    fireEvent.click(getByText("Save"))
    // expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn()
    const fn = jest.fn()
    const { getByText, queryByText } = render(
      <Form
        onSelectError={fn}
        interviewers={interviewers}
        interviewer={1}
        onSave={onSave}
        name="Lydia Miller-Jones"
        onChange={fn}
      />
    )

    fireEvent.click(getByText("Save"))
    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
  
    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("submits the name entered by the user", () => {
    const fn = jest.fn()
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form 
        interviewers={interviewers} 
        interviewer={1}
        onSave={onSave} 
        onChange={fn}
      />
    );
  
    const input = getByPlaceholderText("Enter Student Name");
  
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByText("Save"));
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the input field", () => {
    const fn = jest.fn()
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
        interviewer={1}
        onChange={fn}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    // expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
})