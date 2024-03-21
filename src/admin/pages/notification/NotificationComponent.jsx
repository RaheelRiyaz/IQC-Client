import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { SelectEL } from "../../components/Select";
import { setFilterNotification } from "../../../store/Store";
import Notifications from "./Notifications";
import Pagination from "../../../shared/components/Pagination";
import DatePicker from "../../../shared/components/DatePicker";
import NavigateBtn from "../../../shared/components/NavigateBtn";

function NotificationComponent() {
  const { notificationFilter } = useSelector((store) => store.notifications);
  const dispatch = useDispatch();

  function handlePagination(pageNo) {
    dispatch(
      setFilterNotification({
        pageNo: pageNo,
      })
    );
  }

  function handlePreviousNext(buttonType) {
    if (buttonType === "next") {
      dispatch(
        setFilterNotification({
          pageNo: notificationFilter.pageNo + 1,
        })
      );
    } else {
      dispatch(
        setFilterNotification({
          pageNo: notificationFilter.pageNo - 1,
        })
      );
    }
  }

  function handleFilterGroup(value) {
    console.log(value);
    console.log(notificationFilter);
    dispatch(
      setFilterNotification({
        pageNo: 1,
      })
    );
  }

  function handleDateFilter(date) {
    if (!date) {
      dispatch(
        setFilterNotification({
          dateTime: null,
          pageNo: 1,
        })
      );
      return;
    }
    dispatch(
      setFilterNotification({
        dateTime: date,
        pageNo: 1,
      })
    );
  }

  return (
    <div>
      <Header heading="Our Notifications" />
      <NavigateBtn placeholder={"Add Notification +"} route="add" />

      <div className="flex justify-between items-center gap-3 m-2 flex-wrap">
        <SelectEL
          handler={handleFilterGroup}
          options={[
            {
              name: "Select a group",
              value: "",
            },
            {
              name: "Bemina",
              value: 2,
            },
            {
              name: "Degree",
              value: 3,
            },
          ]}
        />
        <DatePicker handler={handleDateFilter} />
      </div>
      <Notifications />
      <div className="absolute bottom-9 left-[50%] mx-auto">
        <Pagination
          handler={handlePagination}
          handlePreviousNext={handlePreviousNext}
        />
      </div>
    </div>
  );
}

export default NotificationComponent;
