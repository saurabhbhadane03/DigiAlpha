import React, { useContext } from "react";

import ClassForm from "./ClassForm";

import { FormContext } from "../ContextStore/FormContext";

export default function ClassCard(props) {

  const { formData, AddStudent } = useContext(FormContext);

  const classdata = formData[props.classId];
  
  return (
    <div className="main-class-box">
      <h2>Class - {props.classId + 1}</h2>
      <div className="class-box">
        {classdata ? classdata.map((item , id) => <ClassForm studentId={id} classId={props.classId} key={id} studentdata={item}/>) : ""}
        <div className="add-student-button">
          <button type="button" onClick={() => AddStudent(props.classId)}>
            + Add Student
          </button>
        </div>
      </div>
    </div>
  );
}
