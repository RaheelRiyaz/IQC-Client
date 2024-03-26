import { useEffect, useState } from "react";
import { BASE_SERVICE } from "../../../services/baseService";
import { HttpStatusCode } from "axios";
import { useSelector } from "react-redux";
import Loader from "../../../shared/components/Loader";
function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { notificationFilter } = useSelector((store) => store.notifications);

  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setisLoading(true);
      BASE_SERVICE.Post("notifications/view-notifications", notificationFilter)
        .then((res) => {
          if (res.status === HttpStatusCode.Ok) {
            setNotifications(res.data?.result);
            console.log(res.data.result);
          } else setError(res.data?.message);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => setisLoading(false));
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [notificationFilter]);

  if (error) return <p className="text-red-300">{error}</p>;
  if (isLoading) return <Loader />;
  else
    return (
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Group
              </th>
              <th scope="col" className="px-6 py-3">
                File
              </th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((_) => {
                return (
                  <tr
                    key={_.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-pre-wrap dark:text-white"
                    >
                      {_.title}
                    </th>
                    <td className="px-6 py-4">
                      {new Date(_.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4">
                      {_.group ? _.group : "Not mentioned"}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        target="_blank"
                        href={"http://localhost:5163" + _.filePath}
                        className="bg-gray-200 p-2 rounded-lg"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-2xl text-red-500 mt-2">
                <th>No notification found</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
}

export default Notifications;
