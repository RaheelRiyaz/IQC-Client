/* eslint-disable react/prop-types */
// import { memo } from "react";

import { HttpStatusCode } from "axios";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_SERVICE } from "../../services/baseService";
import { setFilterNotification } from "../../store/Store";

function Select() {
  const [options, setOptions] = useState([]);
  const {
    notificationFilter: { groupId },
  } = useSelector((store) => store.notifications);

  const dispatch = useDispatch();

  useEffect(() => {
    BASE_SERVICE.Fetch("groups")
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setOptions(res.data?.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleChange(value) {
    dispatch(
      setFilterNotification({
        pageNo: 1,
        dateTime: null,
        groupId: value === "" ? null : value,
      })
    );
  }

  return (
    <select
      name=""
      id=""
      value={groupId}
      onChange={(e) => handleChange(e.target.value)}
    >
      <option selected value={null} disabled>
        Select Group
      </option>
      <option value="">None</option>
      {options.map((_, i) => {
        return (
          <option value={_.id} key={i}>
            {_.name} {_.batch}
          </option>
        );
      })}
    </select>
  );
}

export const SelectEL = memo(Select);
