import { useEffect } from "react";
import { useState } from "react";
import { BASE_SERVICE } from "../../../services/baseService";
import Header from "../../components/Header";
import Loader from "../../../shared/components/Loader";
import NavigateBtn from "../../../shared/components/NavigateBtn";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function handleSubjectStatus(subjectId) {
    BASE_SERVICE.Fetch(`subjects/toggle-status/${subjectId}`)
      .then((res) => {
        if (res.data.isSuccess) {
          console.log("Status changed");
          setSubjects((_) => {
            return _.map((subject) => {
              if (subject.id === subjectId)
                return { ...subject, isAvailable: !subject.isAvailable };
              return subject;
            });
          });
        } else console.log("Something Went wrong");
      })
      .catch((err) => setError(err.message));
  }

  useEffect(() => {
    BASE_SERVICE.Fetch("subjects")
      .then((res) => {
        if (res.data.isSuccess) {
          setSubjects(res.data?.result);
        } else setError(res.data.message);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div>
      <Header heading="Our Subjects" />
      <NavigateBtn placeholder={"Add Subject +"} route="add"/>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.length > 0 ? (
                subjects.map((_) => {
                  return (
                    <tr
                      key={_.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {_.name}
                      </th>
                      <td className="px-6 py-4">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value={_.checked}
                            checked={_.isAvailable ? true : false}
                            onChange={() => handleSubjectStatus(_.id)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {_.isAvailable ? "Available" : "Not Available"}
                          </span>
                        </label>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-2xl text-red-500 mt-2">
                  <th>No Subject found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Subjects;
