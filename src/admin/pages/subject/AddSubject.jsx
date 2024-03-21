import { useForm } from "react-hook-form";
import { Input } from "../../../shared/components/Input";
import { BASE_SERVICE } from "../../../services/baseService";
import { useNavigate } from "react-router-dom";
function AddSubject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigateTo = useNavigate();

  function handleForm(data) {
    BASE_SERVICE.Post("subjects", { name: data.name })
      .then((res) => {
        if (res.data.isSuccess) navigateTo("/admin/subjects");
      })
      .catch((err) => console.log(err));
  }
  return (
    <form className="w-52" onSubmit={handleSubmit(handleForm)}>
      <Input
      placeholder="Name"
        {...register("name", {
          required: {
            value: true,
            message: "Name is required",
          },
        })}
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <button type="submit" className="bg-gray-100 mt-2 rounded-lg p-2">
        Add Subject
      </button>
    </form>
  );
}

export default AddSubject;
