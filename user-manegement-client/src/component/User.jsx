import React, { use, useState } from "react";

const User = ({ userPromise }) => {
  const data = use(userPromise);
  const [users, setUsers] = useState(data || []);
  console.log(users);

  const cardStyle = {
    width: "250px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
    margin: "10px",
  };

  const headingStyle = {
    marginBottom: "10px",
    color: "#333",
  };

  const paragraphStyle = {
    margin: "5px 0",
    color: "#555",
  };

  const handleUserInput = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const age = e.target.age.value;
    const occupation = e.target.occupation.value;
    const location = e.target.location.value;
    const hobbies = e.target.hobbies.value;

    console.log(name, age, occupation, location, hobbies);
    const userData = { name, age, occupation, location, hobbies };

    // server side --> (1)for post have to mention the method,add an object after the url of the fetch,2) inside the object must mention method "post", mention the headers : which is object itself,5)in the headers mention content-type and the value will be application/json to inform the server that you are sending json data , 6) add body to the fetch option, 7) value of the body will be the data that you want to send to the server , 8) make sure that you use JSON.stringify to convert the data into JSON string
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        e.target.reset();
      });
  };

  return (
    <div>
      <form onSubmit={handleUserInput}>
        <input type="text" name="name" placeholder="name" /> <br />
        <input type="text" name="age" placeholder="age" /> <br />
        <input type="text" name="occupation" placeholder="occupation" /> <br />
        <input type="text" name="location" placeholder="location" /> <br />
        <input type="text" name="hobbies" placeholder="hobbies" />
        <br />
        <input type="submit" value="Submit" />
      </form>
      {users.map((user, index) => (
        <div key={index} style={cardStyle}>
          <h2 style={headingStyle}>{user.name}</h2>
          <p style={paragraphStyle}>
            <strong>Age:</strong> {user.age}
          </p>
          <p style={paragraphStyle}>
            <strong>Occupation:</strong> {user.occupation}
          </p>
          <p style={paragraphStyle}>
            <strong>Location:</strong> {user.location}
          </p>
          <p style={paragraphStyle}>
            <strong>Hobbies:</strong>{" "}
            {Array.isArray(user.hobbies)
              ? user.hobbies.join(", ")
              : user.hobbies}
          </p>
        </div>
      ))}
    </div>
  );
};

export default User;
