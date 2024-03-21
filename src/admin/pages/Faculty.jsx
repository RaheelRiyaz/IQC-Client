import { useEffect, useState } from "react";
import { HttpStatusCode } from "axios";
import Header from "../components/Header";
import { BASE_SERVICE } from "../../services/baseService";
import Loader from "../../shared/components/Loader";

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    BASE_SERVICE.Fetch("users/faculty")
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setFaculty(res.data?.result);
          console.log(res.data.result);
        } else setError(res.data?.message);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setisLoading(false));
  }, []);

  if (error) return <p className="text-red-300">{error}</p>;
  if (isLoading) return <Loader />;
  else
    return (
      <div className="relative overflow-x-auto">
        <Header heading="Our Faculty"/>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((_) => {
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
                  <td className="px-6 py-4">{_.email}</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
}

export default Faculty;
