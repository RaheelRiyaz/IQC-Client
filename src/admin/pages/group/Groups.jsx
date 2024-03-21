import { useState } from "react";
import { useEffect } from "react";
import { BASE_SERVICE } from "../../../services/baseService";
import Loader from "../../../shared/components/Loader";
import Header from "../../components/Header";
function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function handleGroupStatus(groupId) {
    BASE_SERVICE.Fetch(`groups/toggle-status/${groupId}`)
      .then((res) => {
        if (res.data.isSuccess) {
          setGroups(
            groups.map((group) => {
              if (group.id === groupId) {
                return { ...group, isActive: !group.isActive };
              }
              return group;
            })
          );
          console.log("Status updated successfully!");
        } else {
          console.error("Failed to update the status in backend");
        }
      })
      .catch((err) => {
        console.error("Error updating status: ", err);
      });
  }

  useEffect(() => {
    BASE_SERVICE.Fetch("groups")
      .then((res) => {
        if (res.data.isSuccess) {
          setGroups(res.data?.result);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Header heading="Our groups" />
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Batch
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {groups &&
              groups.map((_) => {
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
                    <td className="px-6 py-4">{_.batch}</td>
                    <td className="px-6 py-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value={_.checked}
                          checked={_.isActive ? true : false}
                          onChange={() => handleGroupStatus(_.id)}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Status
                        </span>
                      </label>
                    </td>
                    <td className="px-6 py-4">$1999</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Groups;
