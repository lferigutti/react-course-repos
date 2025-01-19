import {useState} from "react";
import Input from "./Input.jsx";
import {hasMinLength, isEmail, isNotEmpty} from "../util/validation.js";

export default function Login() {

  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const [didEdit, setDidEdit] = useState({
    email:false,
    password: false
  })
  const validPassword = hasMinLength(formValues.password, 6) && isNotEmpty(formValues.password)
  const validEmail = isEmail(formValues.email) && isNotEmpty(formValues.email)

  function handleSubmit(event) {
    event.preventDefault()
    if(validPassword && validEmail){
      console.log(formValues)
      handleReset();
    }
  }

  function handleReset(){
    setFormValues({
      email: '',
      password: ''
    })
    setDidEdit({
      email: false,
      password: false
    })
  }

  function handleBlur(id, event) {
    setDidEdit((prevState)=> ({
      ...prevState,
      [id]: true
    }))
  }

  function handleOnChange(id, value) {
    setFormValues((prevState)=>({
      ...prevState,
      [id]: value
    }))
    setDidEdit((prevState)=> ({
      ...prevState,
      [id]: false
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="control-row">
          <Input
            label="Email"
            id="email"
            type="email"
            name="email"
            onChange={(event)=> handleOnChange('email', event.target.value)}
            value={formValues.email}
            error={!validEmail && didEdit.email && 'Please Enter a valid Email'}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            onBlur={(event)=> handleBlur('password', event)}
            onChange={(event)=> handleOnChange('password', event.target.value)}
            value={formValues.password}
            error={!validPassword && didEdit.password && "Error: Password must be at leas 6 characters long"}
          />
      </div>
      <p className="form-actions">
        <button type="button" className="button button-flat" onClick={handleReset}>Reset</button>
        <button type="submit" className="button">Login</button>
      </p>
    </form>
  );
}
