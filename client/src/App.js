import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [balance, setBalance] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newBalance, setNewBalance] = useState(0);
  const [newTotalDebt, setNewTotalDebt] = useState(0);

  const [accountList, setAccountList] = useState([]);

  const addAccount = () => {
    axios.post("http://localhost:5000/create", {
      firstName: firstName,
      lastName: lastName,
      age: age,
      balance: balance,
      totalDebt: totalDebt,
    }).then((res) => {
        console.log(res);
      setAccountList([
        ...accountList,
        {
            id: res.data.insertId,
            firstName: firstName,
            lastName: lastName,
            age: age,
            balance: balance,
            totalDebt: totalDebt,
        },
      ]);
    });
  };

  const getAccounts = () => {
    axios.get("http://localhost:5000/accounts").then((response) => {
      setAccountList(response.data);
    });
  };

  const updateAccount = (id) => {
    console.log('here1');
    console.log(id);
    axios.put("http://localhost:5000/update", { 
        id: id, 
        firstName: newFirstName,
        lastName: newLastName,
        age: newAge,
        balance: newBalance,
        totalDebt: newTotalDebt, }).then(
      (response) => {
          console.log('here2')
        setAccountList(
          accountList.map((account) => {
            return account.id == id
              ? {
                    id: account.id,
                    firstName: newFirstName,
                    lastName: newLastName,
                    age: newAge,
                    balance: newBalance,
                    totalDebt: newTotalDebt
                }
              : account;
          })
        );
      }
    );
  };

  const deleteAccount = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`).then((response) => {
      setAccountList(
        accountList.filter((account) => {
          return account.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>First Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <label>Last Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Balance ($):</label>
        <input
          type="number"
          onChange={(event) => {
            setBalance(event.target.value);
          }}
        />
        <label>Total Debt ($):</label>
        <input
          type="number"
          onChange={(event) => {
            setTotalDebt(event.target.value);
          }}
        />
        <button onClick={addAccount}>Add Bank Account</button>
      </div>
      <div className="accounts">
        <button onClick={getAccounts}>Show Accounts</button>

        {accountList.map((account, key) => {
          return (
            <div className="account">
              <div>
                <h3>Account Details</h3>
                <h3>First Name: {account.firstName}</h3>
                <h3>Last Name: {account.lastName}</h3>
                <h3>Age: {account.age}</h3>
                <h3>Balance: {account.balance}</h3>
                <h3>Total Debt: {account.totalDebt}</h3>
              </div>
              <div className="modify">
                <h3>Edit Account (Note All Fields Must be Filled)</h3>
                <label>Edit First Name:</label>
                <input
                type="text"
                onChange={(event) => {
                    setNewFirstName(event.target.value);
                }}
                />
                <label>Edit Last Name:</label>
                <input
                type="text"
                onChange={(event) => {
                    setNewLastName(event.target.value);
                }}
                />
                <label>Edit Age:</label>
                <input
                type="number"
                onChange={(event) => {
                    setNewAge(event.target.value);
                }}
                />
                <label>Edit Balance ($):</label>
                <input
                type="number"
                onChange={(event) => {
                    setNewBalance(event.target.value);
                }}
                />
                <label>Edit Total Debt ($):</label>
                <input
                type="number"
                onChange={(event) => {
                    setNewTotalDebt(event.target.value);
                }}
                />
                <button
                  onClick={() => {
                      console.log(account.id);
                    updateAccount(account.id);
                  }}
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteAccount(account.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
