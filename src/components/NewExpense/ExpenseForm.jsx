import React, { useState } from "react";
import "./ExpenseForm.css";

const defaultValues = {
  enteredTitle: "",
  enteredDate: "",
  enteredAmount: "",
};

const ExpenseForm = (props) => {
  const [userInput, setUserInput] = useState(defaultValues);

  const changeValuesHandler = (key) => {
    return (e) => {
      setUserInput((prevState) => {
        return {
          ...prevState,
          [key]: e.target.value,
        };
      });
    };
  };

  const postData = async () => {
    await fetch(
      "https://expense-tracker-b172e-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        body: JSON.stringify({
          title: userInput.enteredTitle,
          amount: userInput.enteredAmount,
          date: new Date(userInput.enteredDate),
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    props.getData();
    setUserInput({
      enteredAmount: "",
      enteredTitle: "",
      enteredDate: "",
    });
  };

  return (
    <div>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={userInput.enteredTitle}
            onChange={changeValuesHandler("enteredTitle")}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={userInput.enteredAmount}
            onChange={changeValuesHandler("enteredAmount")}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2025-12-31"
            value={userInput.enteredDate}
            onChange={changeValuesHandler("enteredDate")}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button onClick={postData}>Add Expense</button>
      </div>
    </div>
  );
};

export default ExpenseForm;
