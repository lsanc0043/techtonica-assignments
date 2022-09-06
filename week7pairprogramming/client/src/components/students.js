import { useState, useEffect } from "react";

const Students = (props) => {
  const [students, setStudents] = useState([]);

  const loadData = () => {
    fetch("http://localhost:8080/api/students")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStudents(data);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1>Hello from {props.school}</h1>
      {students.map((student, index) => {
        return (
          <p key={index}>
            {student.firstname} {student.lastname}
          </p>
        );
      })}
    </div>
  );
};

export default Students;
