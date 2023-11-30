import React, { useContext, useEffect, useState } from "react";

import { FormContext } from "../ContextStore/FormContext";

import { nanoid } from "nanoid";

export default function ClassForm(props) {
  const Id = nanoid();

  const { addStudentDetails } = useContext(FormContext);

  const [inputForm, setInputForm] = useState({
    firstName: props.studentdata.firstName,
    lastName: props.studentdata.lastName,
    gender: props.studentdata.gender,
  });

  const[ textValidation , setTextValidation ] = useState(false)

  function validateTextOnly(inputText) {
    var regex = /^[a-zA-Z\s]+$/;
    return regex.test(inputText);
  }

  function handleChange(e) {
    const { name, value, type } = e.target;
    console.log(value)
    if (validateTextOnly(value) || value === "") {
      if (type === "radio") {
        setInputForm((prevFormData) => {
          return {
            ...prevFormData,
            gender: value,
          };
        });
      } else {
        setInputForm((prevFormData) => {
          return {
            ...prevFormData,
            [name]: value,
          };
        });
      }
      setTextValidation(false)
    }
    else{
      setTextValidation(true)
    }

    console.log(name, "-", value, "-");
    //await  addStudentDetails( inputForm , props.classId , props.studentId)
  }

  useEffect(() => {
    addStudentDetails(inputForm, props.classId, props.studentId);
  }, [inputForm]);

  return (
    <div className="student-box">
      <h3>Student - {props.studentId + 1} <small>{textValidation ?"  *Text value only allowed" : ""}</small></h3>
      <div className="class-box-content">
        <div className="form-input">
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name "
            name="firstName"
            value={inputForm.firstName}
            onChange={(e) => handleChange(e)}
          />
          <small>{inputForm.firstName ? "" : "Required *"}</small>
        </div>

        <div className="form-input">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name "
            name="lastName"
            value={inputForm.lastName}
            onChange={handleChange}
          />
          <small>{inputForm.lastName ? "" : "Required *"}</small>
        </div>

        <div className="form-input ">
          <label>Gender</label>
          <div className="radio-input">
            <div className="form-input-radio">
              <input
                type="radio"
                name={`gender-${Id}`}
                checked={inputForm.gender === "male"}
                value="male"
                onChange={handleChange}
              />
              <label>Male</label>
            </div>
            <div className="form-input-radio">
              <input
                type="radio"
                name={`gender-${Id}`}
                checked={inputForm.gender === "female"}
                value="female"
                onChange={handleChange}
              />
              <label>Female</label>
            </div>
            <div className="form-input-radio">
              <input
                type="radio"
                name={`gender-${Id}`}
                checked={inputForm.gender === "other"}
                value="other"
                onChange={handleChange}
              />
              <label>Other</label>
            </div>
          </div>
          <small>{inputForm.gender ? "" : "Required *"}</small>
        </div>
      </div>
    </div>
  );
}
