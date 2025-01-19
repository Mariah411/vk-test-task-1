import { Card } from "antd";
import { forwardRef } from "react";
import { IItem } from "../types";

type Props = {
  item: IItem;
  deleteElement: any;
  handleEdit: any;
};

const ListItem = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const { item, deleteElement, handleEdit } = props;

  const itemBody = (
    <Card title={item.title} bordered={true} style={{ maxWidth: 900 }}>
      <p>{item.body}</p>
      <p>item id: {item.id}</p>
      <button onClick={() => deleteElement(item.id)}>Удалить</button>
      <button onClick={() => handleEdit(item)}>Редактировать</button>
    </Card>
    // <>
    //   <h2>{item.title}</h2>
    //   <p>{item.body}</p>
    //   <p>item id: {item.id}</p>
    // </>
  );

  return ref ? <div ref={ref}>{itemBody}</div> : <div>{itemBody}</div>;
});

export default ListItem;
