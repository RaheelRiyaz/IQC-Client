/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { memo } from "react";

import { forwardRef, memo, useEffect, useState } from "react";
import { BASE_SERVICE } from "../../services/baseService";
import { HttpStatusCode } from "axios";

function GroupSelect({ handler }, ref) {
  const [selectedVal, setSelectedVal] = useState(null);
  const [options, setOptions] = useState([]);

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

  function handleOnChange(groupId) {
    setSelectedVal(groupId);
    handler(groupId);
  }

  return (
    <select
      ref={ref}
      className="border border-gray-300 rounded-lg p-2 outline-none cursor-pointer"
      value={selectedVal}
      onChange={handler ? (e) => handleOnChange(e.target.value) : null}
    >
      <option selected value={null} disabled>
        Select Group
      </option>
      <option value="">None</option>
      {options && options.map((_, i) => {
        return (
          <option value={_.id} key={i}>
            {_.name} {_.batch}
          </option>
        );
      })}
    </select>
  );
}

export const SelectEL = memo(forwardRef(GroupSelect));
