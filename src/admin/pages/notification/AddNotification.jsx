import Header from "../../components/Header";
import { Input } from "../../../shared/components/Input";
import File from "../../../shared/components/File";
import DatePicker from "../../../shared/components/DatePicker";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { BASE_SERVICE } from "../../../services/baseService";
import { useNavigate } from "react-router-dom";

function AddNotification() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm();

  const form = useRef(new FormData());
  const navigateTo = useNavigate();
  function handleFile(e) {
    const file = e.target.files[0];
    form.current.append("file", file);
  }

  function handleForm(data) {
    for (const key in data) {
      form.current.append(key, data[key]);
      console.log(key, data[key]);
    }
    BASE_SERVICE.Post("notifications", form.current)
      .then((res) => {
        console.log(res);
        if (res.data.isSuccess) navigateTo("/admin/notifications");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Header heading={"Notification Form"} />
      <div className="md:w-3/4 m-auto mt-5 min-h-56 h-auto border border-gray-200 shadow-lg rounded-lg p-5">
        <form className="w-full" onSubmit={handleSubmit(handleForm)}>
          <div className="flex justify-evenly items-center flex-wrap w-full">
            <Input
              placeholder="Title"
              classes="md:w-[400px]"
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required",
                },
              })}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
            {/* <Input
              placeholder="Title"
              classes="md:w-[400px]"
              {...register("title")}
            /> */}
          </div>

          <div className="flex justify-start gap-3 items-center flex-wrap w-full">
            <File handler={handleFile} />
            <DatePicker
              placeholder="Date"
              classes="md:w-[400px]"
              {...register("date", {
                required: true,
                message: "Date is required",
              })}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-gray-100 rounded-lg p-2 cursor-pointer mt-2 mx-auto"
            >
              Add Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotification;
