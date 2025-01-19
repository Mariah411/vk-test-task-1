import { Button, Form, FormProps, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
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
  cancel: any;
};

const EditForm = (props: Props) => {
  const { currElement, submit, cancel } = props;

  const [form] = Form.useForm();

  const onFinish: FormProps<Inputs>["onFinish"] = (values) => {
    submit(values);
  };

  const onCancel = () => cancel();

  const onFinishFailed: FormProps<Inputs>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue({ ...currElement });
  }, [currElement]);

  return (
    <Form
      name="editForm"
      form={form}
      style={{ maxWidth: 600 }}
      initialValues={currElement}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item<Inputs> label="ID" name="id">
        <Input disabled />
      </Form.Item>

      <Form.Item<Inputs>
        label="id пользователя"
        name="userId"
        rules={[
          { required: true, message: "Это поле обязательно для заполнения" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<Inputs>
        label="Заголовок"
        name="title"
        rules={[
          { required: true, message: "Это поле обязательно для заполнения" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<Inputs>
        label="Текст поста"
        name="body"
        rules={[
          { required: true, message: "Это поле обязательно для заполнения" },
        ]}
      >
        <TextArea />
      </Form.Item>

      <Space>
        <Form.Item label={null}>
          <Button color="default" onClick={onCancel}>
            Отмена
          </Button>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default EditForm;
