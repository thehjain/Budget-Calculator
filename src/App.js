import "./App.css";
import { useState } from "react";

import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "uuid/dist/v4";

const initialExpense = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 },
];

// console.log(initialExpense);

function App() {
  const [expenses, setExpenses] = useState(initialExpense);
  // *********************Functionality*************
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {

      if(edit){
        let tempExpenses= expenses.map(item => {
          return item.id===id?{...item,charge,amount} : item
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({type: "success",text: "item edited"});
      }
      else{
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added " });
      }

      
      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount value has to be bigger than zero`,
      });
    }
  };

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };

  const handleEdit = (id) => {
    let expense=expenses.find(item => item.id === id);
    let {charge,amount}=expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <div>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        Total Spending:
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </div>
  );
}

export default App;
