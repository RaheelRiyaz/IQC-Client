import { forwardRef, memo } from "react";

/* eslint-disable react/prop-types */
function SelectEL({ name, classes, options, optName,handler }, ref) {
  return (
    <select
      ref={ref}
      id="countries"
      onChange={(e)=>handler(e)}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 outline-none p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${classes}`}
    >
      <option selected>Choose a {name}</option>
      {options &&
        options.map((_) => {
          return (
            <option key={_.id} value={_.id}>
              {_[optName]}
            </option>
          );
        })}
    </select>
  );
}
const Select = memo(forwardRef(SelectEL));
export default Select;
