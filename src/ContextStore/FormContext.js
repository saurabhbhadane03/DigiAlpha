import React, { useState } from "react";

import { createContext } from "react";

const FormContext = createContext();

export default function FormContextProvider(props) {
  const [RequiredCheckFlag, setRequiredCheckFlag] = useState({
    errorMessage : "",
    submitStatus : false
  });

  const [formData, setFormData] = useState([
    [
      {
        firstName: "",
        lastName: "",
        gender: "",
      },
    ],
  ]);

  function AddClass() {
    setFormData((PrevClasses) => {
      return [
        ...PrevClasses,
        [
          {
            firstName: "",
            lastName: "",
            gender: "",
          },
        ],
      ];
    });
  }

  function AddStudent(classId) {
    setFormData((formDataArr) => {
      return formData.map((item, id) => {
        if (classId === id)
          return [
            ...item,
            {
              firstName: "",
              lastName: "",
              gender: "",
            },
          ];
        else return item;
      });
    });
  }

  function addStudentDetails(studentObj, classId, studentId) {
    setFormData((formData) => {
      return formData.map((classItems, id) => {
        if (classId === id)
          return classItems.map((studentData, stdId) => {
            if (stdId === studentId) return studentObj;
            else return studentData;
          });
        else return classItems;
      });
    });
  }

  function SubmitData() {

    const missingcheckArr = formData.map((classItem) => {
      const filtered = classItem.filter((studentItem) => {
        return (
          studentItem.firstName === "" ||
          studentItem.lastName === "" ||
          studentItem.gender === ""
        );
      });

      return filtered;
    });
    
    const RequiredCheck = missingcheckArr.flat()
    if (RequiredCheck.length) {
      setRequiredCheckFlag( prevState => {
        return {
          errorMessage : "Fill the Required details to submit form",
          submitStatus : false
        }
      } );
    } else {

      setRequiredCheckFlag( prevState => {
        return {
          errorMessage : "",
          submitStatus : true
        }
      } );
      localStorage.setItem("StudentData", JSON.stringify(formData));

      window.location.reload(true)
    }
    
  }

  

  return (
    <FormContext.Provider
      value={{
        formData,
        AddClass,
        AddStudent,
        addStudentDetails,
        SubmitData,
        RequiredCheckFlag,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
}

export { FormContextProvider, FormContext };
