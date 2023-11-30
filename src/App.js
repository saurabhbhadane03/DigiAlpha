import React, { useContext } from 'react';
import "./App.css";

import ClassCard from './Form_Compenents/ClassCard';

import { FormContext } from "./ContextStore/FormContext";

function App() {

  const{ formData , AddClass , SubmitData , RequiredCheckFlag} = useContext(FormContext)
  
  return (
    <div>
      <div className="main">
        <div className="add-class-button">
          <button type="button" onClick={AddClass}>+ Add Class</button>
        </div>

        { formData ? 
            formData.map( ( item , id) => (<ClassCard classDetails={item} classId={id} key={id}/>) ) : ""
        }

        <div className="submit-btn">
          <button onClick={SubmitData}>Submit</button>
          <br/>
          <p>{RequiredCheckFlag.errorMessage }{RequiredCheckFlag.submitStatus ? "Data Submitted Successfully" : ""}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
