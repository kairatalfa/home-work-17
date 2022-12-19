import "./App.css";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-b172e-default-rtdb.firebaseio.com/expense.json"
      );
      const data = await response.json();
      const dataFromFireBase = [];

      for (const key in data) {
        dataFromFireBase.push({
          title: data[key].title,
          amount: data[key].amount,
          date: data[key].date,
        });
      }
      setData(dataFromFireBase);
    } catch (error) {
      console.log(error.massage);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <NewExpense getData={getData} />
      <Expenses expenses={data} />
    </div>
  );
}

export default App;
