import { useEffect, useState } from "react";

import "./App.css";
import { useQuery, gql } from "@apollo/client";

function App() {
  const [user, setUser] = useState(null);

  const GET_USER = gql`
    query Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        success
        data
      }
    }
  `;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { email: "a.m2002nov@gmail.con", password: "test@123" },
  });

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>{error.message}</h1>;

  console.log(data);
  return (
    <div>
      <h1>Login ( Graph QL Test )</h1>
      <form>
        <input
          onChange={(e) => setEmail(e.currentTarget.value)}
          type="text"
          placeholder="Enter Email"
        />
        <br />
        <input
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
          placeholder="Enter Pass"
        />
        <br />
        <input type="submit" value="login" />
      </form>
    </div>
  );
}

export default App;
