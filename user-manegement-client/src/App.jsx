import { Suspense } from "react";
import "./App.css";
import User from "./component/User";

const userPromise = fetch("http://localhost:3000/users")
  .then((res) => res.json())
  .catch((error) => console.log(error));

function App() {
  return (
    <>
      <h1>user interface is here </h1>
      <Suspense fallback={<h1>loading...</h1>}>
        <User userPromise={userPromise} />
      </Suspense>
    </>
  );
}

export default App;
