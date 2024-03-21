/* eslint-disable react/prop-types */

import { memo } from "react";

function HeaderFun({ heading, classes = "" }) {
  return (
    <div
      className={`text-teal-500 text-4xl font-bold underline flex justify-center items-center m-4 ${classes}`}
    >
      {heading}
    </div>
  );
}
const Header = memo(HeaderFun);
export default Header;
