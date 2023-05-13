import React from "react";
import { useState } from "react";
import {
  AppBOX,
  Appinformation,
  Appemployee,
  Appemployees,
  Appinput,
  Appbutton,
  Apph3,
} from "./App.styled";
import axios from "../api/Index";

export const Page = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeelist, setEmployeeList] = useState([]);
  const [newPosition, setNewPosition] = useState("");

  const AddEmployees = () => {
    axios
      .post("/create", {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      })
      .then((response) => {
        setEmployeeList([
          ...employeelist,
          {
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage,
          },
        ]);
      });
  };

  const GetEmployees = () => {
    axios.get("/employees", {}).then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeePosition = (id) => {
    axios
      .put("/update", {
        position: newPosition,
        id: id,
      })
      .then((response) => {
        console.log("UPDATED");
      });
  };

  const deleteEmployee = (id) => {
    axios.delete(`/delete/${id}`).then((response) => {
      setEmployeeList(
        employeelist.filter((e) => {
          return e.id !== id;
        })
      );
    });
  };
  return (
    <AppBOX>
      <Appinformation>
        <label>NAME</label>
        <Appinput
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>AGE</label>
        <Appinput
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label>COUNTRY</label>
        <Appinput
          type="text"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <label>POSITION</label>
        <Appinput
          type="text"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <label>WAGE</label>
        <Appinput
          type="number"
          onChange={(e) => {
            setWage(e.target.value);
          }}
        />
        <Appbutton onClick={AddEmployees}>ADD EMPLOYEES</Appbutton>
      </Appinformation>
      <Appemployees>
        <Appbutton onClick={GetEmployees}>SHOW EMPLOYEES</Appbutton>
        {employeelist.map((e) => {
          return (
            <Appemployee>
              <div>
                <Apph3>NAME: {e.name}</Apph3>
                <Apph3>AGE: {e.age}</Apph3>
                <Apph3>WAGE: {e.wage}</Apph3>
                <Apph3>POSITION: {e.position}</Apph3>
                <Apph3>COUNTRY: {e.country}</Apph3>
                <div>
                  <Appinput
                    type="text"
                    onChange={(e) => {
                      setNewPosition(e.target.value);
                    }}
                  />
                  <Appbutton
                    onClick={() => {
                      updateEmployeePosition(e.id);
                    }}
                  >
                    UPDATE POSITION
                  </Appbutton>

                  <Appbutton
                    onClick={() => {
                      deleteEmployee(e.id);
                    }}
                  >
                    DELETE
                  </Appbutton>
                </div>
              </div>
            </Appemployee>
          );
        })}
      </Appemployees>
    </AppBOX>
  );
};
