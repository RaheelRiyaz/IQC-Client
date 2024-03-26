import { SelectEL } from "../../components/GroupSelect";
import Select from "../../../shared/components/Select";
import DatePicker from "../../../shared/components/DatePicker";
import { Input } from "../../../shared/components/Input";
import { useEffect, useRef, useState } from "react";
import { BASE_SERVICE } from "../../../services/baseService";
import { HttpStatusCode } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../../shared/components/ErrorMessage";

function AddExam() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const subjectId = useRef(null);
  const groupId = useRef(null);
  const navigateTo = useNavigate();

  function handleForm(data) {
    const exam = {
      ...data,
      totalMarks: parseInt(data.totalMarks ? data.totalMarks : 0),
      totalNoOfQuestions: parseInt(
        data.totalNoOfQuestions ? data.totalNoOfQuestions : 0
      ),
      passingMarks: parseInt(data.passingMarks ? data.passingMarks : 0),
      examStatus: parseInt(data.examStatus ? data.examStatus : 3),
      subjectId: subjectId.current,
      groupId: groupId.current,
    };

    if (!exam.groupId || !exam.subjectId) {
      if (!exam.groupId) {
        setError("groupId", {
          message: "Group is required",
        });
      }
      if (!exam.subjectId) {
        setError("subjectId", {
          message: "Subject is required",
        });
      }
      return;
    }

    setLoading(true);

    BASE_SERVICE.Post("exams", exam)
      .then((res) => {
        if (res.data.isSuccess) navigateTo("/admin/exams");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    BASE_SERVICE.Fetch("subjects")
      .then((res) => {
        if (res.status === HttpStatusCode.Ok) {
          setSubjects(res.data?.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubject(e) {
    subjectId.current = e.target.value;
  }

  function handleGroup(e) {
    groupId.current = e ? e : null;
  }

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="flex flex-col gap-4 w-1/2 m-auto border border-gray-100 shadow-xl p-5 rounded-lg mt-5"
    >
      <Input
        placeholder="Title"
        {...register("title", {
          required: {
            value: true,
            message: "Title is required",
          },
        })}
      />
      {errors.title && <ErrorMessage message={errors.title.message} />}
      <div className="flex gap-2 flex-wrap">
        <div className="flex flex-col">
          <SelectEL
            handler={handleGroup}
            {...register("groupId", {
              required: {
                value: true,
                message: "Group is required",
              },
            })}
          />
          {errors.groupId && <ErrorMessage message={errors.groupId.message} />}
        </div>
        <div className="flex flex-col">
          <Select
            handler={handleSubject}
            {...register("subjectId", {
              required: {
                value: true,
                message: "Subject is required",
              },
            })}
            name="Subject"
            options={subjects}
            optName="name"
          />
          {errors.subjectId && (
            <ErrorMessage message={errors.subjectId.message} />
          )}
        </div>
      </div>
      <DatePicker
        {...register("examDateTime", {
          required: {
            value: true,
            message: "Date time is required",
          },
        })}
      />
      {errors.examDateTime && (
        <ErrorMessage message={errors.examDateTime.message} />
      )}

      <Input
        type="number"
        {...register("totalNoOfQuestions", {
          required: {
            value: true,
            message: "Total no of questions is required",
          },
        })}
        placeholder="Total no of questions"
      />
      {errors.totalNoOfQuestions && (
        <ErrorMessage message={errors.totalNoOfQuestions.message} />
      )}

      <Input
        type="number"
        placeholder="Total Marks"
        {...register("totalMarks", {
          required: {
            value: true,
            message: "Total marks is required",
          },
        })}
      />
      {errors.totalMarks && (
        <ErrorMessage message={errors.totalMarks.message} />
      )}
      <Input
        type="number"
        placeholder="Passing Marks"
        {...register("passingMarks", {
          required: {
            value: true,
            message: "Passing marks is required",
          },
        })}
      />
      {errors.passingMarks && (
        <ErrorMessage message={errors.passingMarks.message} />
      )}
      <Input
        type="number"
        placeholder="Exam Status"
        {...register("examStatus", {
          required: {
            value: true,
            message: "Exam status is required",
          },
        })}
      />
      {errors.examStatus && (
        <ErrorMessage message={errors.examStatus.message} />
      )}
      {loading ? (
        <button disabled className="bg-blue-200 p-3 rounded-lg">
          Adding...
        </button>
      ) : (
        <button type="submit" className="bg-blue-200 p-3 rounded-lg">
          Add Exam
        </button>
      )}
    </form>
  );
}

export default AddExam;
