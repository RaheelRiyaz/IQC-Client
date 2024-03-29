/* eslint-disable react/prop-types */
function Exam({ exam }) {
  return (
    <>
      <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Title: {exam?.title}
          </h5>
        </a>
        <h3 className="mb-3 text-gray-500 dark:text-gray-400">
          Subject :{exam?.subject}
        </h3>
        <h1 className="text-xl font-semibold text-gray-500">
          Totalmarks :{exam?.totalMarks}
        </h1>
        <h1 className="text-xl font-semibold text-gray-500">
          Examdate :{exam?.examDateTime}
        </h1>
        <h1 className="text-xl font-semibold text-gray-500">
          Passingmarks :{exam?.passingMarks}
        </h1>
        <h1 className="text-xl font-semibold text-gray-500">
          Total Questions :{exam?.totalNoOfQuestions}
        </h1>
        <div>
          Exam Status :
          <strong
            className={
              exam?.examStatus === 1
                ? "text-green-500"
                : exam?.examStatus === 3
                ? "text-red-400"
                : "text-blue-500"
            }
          >
            {exam?.examStatus == 1
              ? "Conducted"
              : exam?.examStatus === 3
              ? "Postponed"
              : "Yet to be Conducted"}
          </strong>
        </div>
        <a className="inline-flex font-medium items-center text-blue-600 hover:underline">
          See our guideline
          <svg
            className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
            />
          </svg>
        </a>
      </div>
    </>
  );
}

export default Exam;
