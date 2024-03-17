import { useEffect, useState } from "react";
import Exam from "../../cards/Exam";
import { BASE_SERVICE } from "../../../services/baseService";
import { HttpStatusCode } from "axios";

function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    BASE_SERVICE.Fetch("exams").then((res) => {
      if (res.status === HttpStatusCode.Ok) {
        setExams(res.data?.result);
        console.log(res.data.result);
      }
    });
  }, []);

  return (
    <div>
      {exams.map((_) => (
        <Exam  key={_.id} exam={_}/>
      ))}
    </div>
  );
}

export default Exams;
