import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IItem } from "../types";

type Inputs = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type Props = {
  currElement: IItem;
  submit: any;
};

const EditForm = (props: Props) => {
  const { currElement, submit } = props;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: {} as Inputs });
  const onSubmit: SubmitHandler<Inputs> = (data) => submit(data);

  useEffect(() => {
    reset(currElement);
  }, [currElement, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("id")} disabled />

      <input {...register("userId", { required: true })} />

      <input {...register("title")} />
      <input {...register("body")} />
      {/* {errors.userId && <span>This field is required</span>} */}

      <input type="submit" />
    </form>
  );
};

export default EditForm;
