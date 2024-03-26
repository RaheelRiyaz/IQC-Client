import { useForm } from "react-hook-form";
import { Input } from "../../shared/components/Input";
import { BASE_SERVICE } from "../../services/baseService";
import { useState } from "react";
import { UserRole } from "../../enums/enums";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  function handleForm(data) {
    setLoading(true);
    BASE_SERVICE.Post("users/login", data)
      .then((res) => {
        if (res.data.isSuccess) {
          const { userRole, token } = res.data.result;
          sessionStorage.setItem("IQC_Token", JSON.stringify(token));

          switch (userRole) {
            case UserRole.Admin:
              navigateTo("/admin");
              break;
            case UserRole.Student:
              navigateTo("/student");
              break;
            case UserRole.Teacher:
              navigateTo("/teacher");
              break;
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }
  return (
    <form className="max-w-sm mx-auto mt-7" onSubmit={handleSubmit(handleForm)}>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <Input
          id="email"
          placeholder="Email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
              message: "Email format is invalid",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      {loading ? (
        <button
          disabled
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Logging in...
        </button>
      ) : (
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      )}
    </form>
  );
}

export default Login;
