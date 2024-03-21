/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useEffect } from "react";
import { HttpStatusCode } from "axios";
import { BASE_SERVICE } from "../../services/baseService";
import Loader from "../../shared/components/Loader";
function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    BASE_SERVICE.Fetch("")
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setStudents(res.data?.result);
          console.log(res.data.result);
        } else setError(res.data?.message);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setisLoading(false));
  }, []);

  if (error) return <p className="text-red-300">{error}</p>;
  if (isLoading)
    return (
        <Loader />
    );
  else return <div>Students work</div>;
}

export default Students;
