import "./stylesheets/App.css"
import { Routes, Route } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import Form from "./pages/login"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Form type="log-in" apiUrl="log-in"></Form>}
          ></Route>
          <Route
            path="/sign-up"
            element={<Form type="sign-up" apiUrl="sign-up"></Form>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
