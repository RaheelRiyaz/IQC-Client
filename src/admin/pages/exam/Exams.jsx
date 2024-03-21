import { useEffect, useState } from "react";
import Exam from "../../cards/Exam";
import { BASE_SERVICE } from "../../../services/baseService";
import { HttpStatusCode } from "axios";
import Loader from "../../../shared/components/Loader";

function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    BASE_SERVICE.Fetch("exams")
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setExams(res.data?.result);
          console.log(res.data.result);
        } else setError(res.message);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p><Loader /></p>;
  if (error) return <p className="text-red-500">{error}</p>;
  else
    return (
      <div>
        {exams.map((_) => (
          <Exam key={_.id} exam={_} />
        ))}
      </div>
    );
}

export default Exams;
