/* eslint-disable react/prop-types */

function Header({ heading, classes = "" }) {
  return (
    <div
      className={`text-teal-500 text-4xl font-bold underline flex justify-center items-center m-4 ${classes}`}
    >
      {heading}
    </div>
  );
}

export default Header;
