import { useState } from "react";
import { IItem } from "../types";

const useModal = () => {
  const [currElement, setCurrElement] = useState<IItem>({} as IItem);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleEdit = (item: IItem) => {
    showModal();
    setCurrElement(item);
    console.log(currElement);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrElement({} as IItem);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setCurrElement({} as IItem);
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
