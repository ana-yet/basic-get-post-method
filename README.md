# 👤 User Management App (React + Express)

A simple full-stack app built with **React (frontend)** and **Express.js (backend)** that allows you to fetch and add user data. The server stores users in memory, and the React app lets you view and submit new users.

---

## 📝 Notes

### 🛠 Installation & Setup

**Backend (Express.js)**

```bash
npm init -y                  # Initialize Node project
npm install express cors     # Install dependencies
node server.js               # Start the backend server
```

**Frontend (React)**

```bash
npx create-react-app user-client  # Create React project
cd user-client
npm start                         # Start React development server
```

---

### 🌐 Server Side (Express.js)

**File: `server.js`**

- Built using **Express.js**
- Middleware:
  - `cors()` to enable cross-origin requests (React to Express)
  - `express.json()` to parse incoming JSON request bodies
- Two endpoints:
  - `GET /users` returns an array of user objects
  - `POST /users` accepts a new user and adds it to the in-memory array
- Runs on port `3000` or environment port

**Code Summary:**

```js
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const users = [
  /* predefined array of users */
];

app.get("/", (req, res) => res.send("user server is running"));
app.get("/users", (req, res) => res.send(users));
app.post("/users", (req, res) => {
  const user = req.body;
  users.push(user);
  res.send(user);
});

app.listen(port, () => console.log(`user server running on port ${port}`));
```

📌 **Important:**

- Users are stored in-memory → data resets on server restart.
- Logs incoming POST data for debugging.

---

### ⚛️ Client Side (React)

**Files: `App.js` and `User.js`**

---

#### 📄 `App.js`

- Uses `fetch()` outside the component to load data as a **Promise**
- Uses `Suspense` and React 18’s `use()` hook for suspenseful loading
- Passes user data to the `User` component

**Key Concepts:**

- `Suspense` allows fallback loading UI
- `use()` waits for the promise to resolve before rendering

```js
const userPromise = fetch("http://localhost:3000/users").then((res) =>
  res.json()
);

<Suspense fallback={<h1>loading...</h1>}>
  <User userPromise={userPromise} />
</Suspense>;
```

---

#### 📄 `User.js`

- Uses `use()` to get the resolved user data
- Uses `useState()` to store and display users
- Form for adding a new user
- Handles form submission via `fetch()` with method `POST`
- Adds newly submitted user to the state without refreshing the page

**Form Handling Steps (POST):**

1. Prevent default form behavior
2. Extract values from form inputs
3. Create user object
4. Use `fetch()` to send data to server:
   - method: `"POST"`
   - headers: `"Content-Type": "application/json"`
   - body: `JSON.stringify(userData)`
5. Update local state with new user

```js
const res = await fetch("http://localhost:3000/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
});
```

**User Display:**

- Cards styled using inline styles
- Each user shows: name, age, occupation, location, hobbies

---

### ✅ Key Concepts in Use

| Concept             | Description                            |
| ------------------- | -------------------------------------- |
| `express()`         | Creates a server                       |
| `cors()`            | Enables frontend-backend communication |
| `express.json()`    | Parses JSON body from requests         |
| `useState()`        | Manages user list on frontend          |
| `use()` (React 18+) | Suspense-style data fetching           |
| `fetch()`           | API calls (GET and POST)               |
| `map()`             | Render user cards from array           |
| Inline CSS          | Card styling without CSS files         |

---

### ⚠️ Reminders

- No database used → user data is **not persistent**
- Server must run on `http://localhost:3000`
- React must run on a different port (usually `3001`)
- `use()` requires React 18+ and only works inside components wrapped in `Suspense`

---
