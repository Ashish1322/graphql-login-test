import { useEffect, useState } from "react";

import "./App.css";
import { useQuery, gql, useMutation } from "@apollo/client";

function App() {
  const [user, setUser] = useState(null);

  // const GET_USER = gql`
  //   query Login($email: String!, $password: String!) {
  //     login(email: $email, password: $password) {
  //       success
  //       data
  //     }
  //   }
  // `;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [filee, setFile] = useState("");
  // const { loading, error, data } = useQuery(GET_USER, {
  //   variables: { email: "a.m2002nov@gmail.con", password: "test@123" },
  // });

  const SIGNUP = gql`
    mutation Mutation(
      $file: Upload!
      $firstName: String!
      $lastName: String!
      $email: String!
      $mobileNumber: String!
      $workStatus: String!
      $currentCity: String!
      $password: String!
    ) {
      signup(
        file: $file
        first_name: $firstName
        last_name: $lastName
        email: $email
        mobile_number: $mobileNumber
        work_status: $workStatus
        current_city: $currentCity
        password: $password
      ) {
        success
        data
      }
    }
  `;

  const [signup] = useMutation(SIGNUP, {
    onCompleted: (data) => console.log(data),
  });

  const handleSignup = (e) => {
    e.preventDefault();

    signup({
      variables: {
        email: email,
        password: password,
        firstName: "Ashish",
        lastName: "Kumar",
        mobileNumber: "7307320365",
        workStatus: "fresher",
        currentCity: "Bangalore",
        file: filee,
      },
    });
  };

  const onFileChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) {
      setFile(file);
    }
  };

  return (
    <div>
      <h1>Signup ( Graph QL Test )</h1>
      <form onSubmit={handleSignup}>
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
        <input type="file" onChange={onFileChange} />
        <br />
        <input type="submit" value="login" />
      </form>
    </div>
  );
}

export default App;
