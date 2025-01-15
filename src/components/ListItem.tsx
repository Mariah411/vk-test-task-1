import { forwardRef } from "react";
import { IItem } from "../types";

type Props = {
  item: IItem;
};

const ListItem = forwardRef((props: Props, ref: React.ForwardedRef<any>) => {
  const { item } = props;

  const itemBody = (
    <>
      <h2>{item.title}</h2>
      <p>{item.body}</p>
      <p>item id: {item.id}</p>
    </>
  );

  return ref ? <div ref={ref}>{itemBody}</div> : <div>{itemBody}</div>;
});

export default ListItem;
