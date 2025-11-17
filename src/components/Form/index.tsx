import { useState } from "react";
import SignIn from "@components/SignIn/";
import SignUp from "@components/SignUp/";

const Form = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <>{isLoginForm ? <SignIn onToggleForm={toggleForm} /> : <SignUp onToggleForm={toggleForm} />}</>
  );
};

export default Form;
