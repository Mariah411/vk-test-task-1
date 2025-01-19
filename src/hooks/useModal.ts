import { useState } from "react";

const useModal = (onOk?: any) => {
  const [currElement, setCurrElement] = useState<any>({} as any);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    showModal();
    setCurrElement(item);
  };

  const handleOk = () => {
    console.log(currElement.id);
    setIsModalOpen(false);
    setCurrElement({});
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return {
    currElement,
    isModalOpen,
    handleEdit,
    handleOk,
    handleClose,
    handleCancel,
  };
};

export default useModal;
