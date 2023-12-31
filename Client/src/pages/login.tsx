import { Routes, Route } from "react-router-dom"
import InputGroup from "../components/inputgroup"
import LoginCircles from "../components/loginCircles"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import BreadCrumb from "../components/breadcrumb"
import { useAppDispatch } from "../app/hooks"
import { useAppSelector } from "../app/hooks"
import { postUser, enableCrumbs } from "../slices/userSlice"

interface formProps {
  type: "log-in" | "sign-up"
  apiUrl: string
}
export interface dataInterface {
  apiUrl: string,
  username: string,
  password: string
}
function Form(props: formProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [validForm, setValidForm] = useState(true)
  
  const nav = useNavigate()
  const dispatch = useAppDispatch()

  const userStatus = useAppSelector(state => state.User.loginstatus)
  const userCreated = useAppSelector(state => state.User.userCreated)
  const crumbStatus = useAppSelector(state => state.User.visibleCrumbs)

  const usernameHandle = (e: any) => {
    setUsername((username) => e.target.value)
  }
  const passwordHandle = (e: any) => {
    setPassword((password) => e.target.value)
  }

  const checkForm = async (e: FormEvent) => {
    e.preventDefault()

    if (username === "" || password === "") setValidForm((validForm) => false)
    else {
      const {type, apiUrl} = props
      const data = await dispatch(postUser({apiUrl, username, password}))
      dispatch(enableCrumbs())

      data.payload ? setValidForm((validForm) => true) : setValidForm((validForm) => false)
      
      if (props.type === "sign-up") nav("/")
      else nav("/")
    }
  }
  return (
    <div
      className={`min-h-screen min-w-[100vw] ${
        props.type === "sign-up" ? "bg-black" : "bg-red-900"
      } flex flex-col p-5 justify-center items-center xl:flex-row xl:justify-between xl:p-10`}
    >
      <LoginCircles></LoginCircles>
      <form
        onSubmit={checkForm}
        action="post"
        role="form"
        className="bg-white z-10 p-7 rounded flex flex-col gap-5 min-w-[60%] md:min-w-[50%] lg:min-w-[30%]"
      >
        <h1 className="font-bold text-3xl">{props.type}</h1>
        <InputGroup
          dataLabel="username"
          labelRole="user-label"
          inputType="text"
          inputRole="username-input"
          inputPlaceholder="Username"
          value={username}
          onChange={usernameHandle}
        ></InputGroup>
        <InputGroup
          dataLabel="password"
          labelRole="password-label"
          inputType="password"
          inputRole="user-password"
          inputPlaceholder="Password"
          value={password}
          onChange={passwordHandle}
        ></InputGroup>
        {validForm ? (
          <></>
        ) : (
          <span className="p-2 bg-red-900 text-white rounded-lg text-center font-bold">
            Invalid Username or Password
          </span>
        )}

        {props.type === "log-in" ? (
          <>
            <button
              role="submit-login"
              aria-label="form submit button"
              formAction="submit"
              className="bg-yellow-400 rounded-md font-semibold p-3 text-md hover:bg-yellow-500"
              type="submit"
            >
              Log in
            </button>
            <button
              role="sign-up"
              className="bg-fuchsia-400 rounded-md text-white p-3 text-md hover:bg-fuchsia-500 font-semibold"
              type="button"
              onClick={() => {
                nav("/sign-up")
              }}
            >
              Sign up
            </button>
          </>
        ) : (
          <button
            role="sign-up"
            className="bg-fuchsia-400 rounded-md text-white p-3 text-md hover:bg-fuchsia-500 font-semibold"
            type="submit"
            formAction="submit"
          >
            Sign up
          </button>
        )}
      </form>
      {
        userStatus === "failure" && crumbStatus ? <BreadCrumb status="error" text="An unexpected error has occurred. Please try again!"></BreadCrumb> : null
      }
      {
        (userStatus === "success" || userStatus === "no attempt") && crumbStatus ? 
          userCreated ? 
            <BreadCrumb  status="success" text="Your account has been created."></BreadCrumb> 
            : <BreadCrumb status="success" text="You have been logged in!"></BreadCrumb> 
        : null
      }
    </div>
  )
}

export default Form
