import { message } from "antd";

const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: "Успешно",
      duration: 2,
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "Произошла ошибка",
      duration: 2,
    });
  };

  return { contextHolder, successMessage, errorMessage };
};

export default useMessage;
