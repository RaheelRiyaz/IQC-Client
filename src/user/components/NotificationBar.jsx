/* eslint-disable react/no-unknown-property */
import { memo, useState, useEffect } from "react";
import { BASE_SERVICE } from "../../services/baseService";
import { HttpStatusCode } from "axios";
function NotificationBarEL() {
  const [index, setIndex] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    BASE_SERVICE.Post("notifications/view-notifications", {
      pageNo: 1,
      pageSize: 5,
    })
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setNotifications(res.data?.result);
          console.log(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      setIndex((_) => (_ === notifications.length - 1 ? 0 : _ + 1));
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [index, notifications.length]);

  return (
    <div className="bg-gray-50 p-2">
      <marquee behavior="scroll" direction="left">{notifications[index]?.title}</marquee>
    </div>
  );
}
const NotificationBar = memo(NotificationBarEL);
export default NotificationBar;
