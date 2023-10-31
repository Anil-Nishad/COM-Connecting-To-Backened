import React, { useEffect, useRef, useState } from "react";
import ProductList from "./components/ProductList";
//select.form-select
import axios, { AxiosError, CanceledError } from "axios";
import apiClient from "./services/api-client";

const connect = () => console.log("Connecting");
const disconnect = () => console.log("Disconnecting");

interface User {
  id: number;
  name: string;
}

//const App = () => {
function App() {
  // const ref = useRef<HTMLInputElement>(null);
  // //after Render
  // useEffect(() => {
  //   //Side Effect
  //   if (ref.current) ref.current.focus();
  // });

  /*useEffect(() => {
    document.title = "My App";
  });*/
  // const [category, setCategory] = useState("");
  /*useEffect(() => {
    connect();
    return () => disconnect();
  });*/

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  /*useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => console.log(response, response.data));
  });
  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((response) =>
        console.log(response.data[0].id, response.data[0].name)
      );
  });*/
  useEffect(() => {
    // get -> promise -> res/err
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => setError(error.message));
  }, []);

  // Cancelling a Fetch Request
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setLoading(false);
      });
    // add this line of code to remove repetion
    // But in strict mode it is not working
    // .finally(() => {setLoading(false)})
    return () => controller.abort();
  }, []);

  // Working with Async and Await
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        setError((error as AxiosError).message);
      }
    };
    fetchUsers();
  }, []);
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((error) => {
        setError(error.message);
        setUsers(originalUsers);
      });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Anil" };
    setUsers([newUser, ...users]);
    // axios
    //   .post("https://jsonplaceholder.typicode.com/users", newUser)
    apiClient
      .post("/users", newUser)
      .then((res) => setUsers([res.data, ...users]))
      //.then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    axios
      .patch(
        "https://jsonplaceholder.typicode.com/users/" + user.id,
        updatedUser
      )
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };
  return (
    <div>
      {/* <input ref={ref} type="text" className="form-control" /> */}
      {/* <select
        className="form-select"
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value=""></option>
        <option value="Category">Category</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} /> */}
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
