import React, { FC } from "react";
import { messageType } from "../types";

const MessageItem: FC<{ message: messageType }> = ({
  message,
}): JSX.Element => {
  return (
    <>
      <li className="collection-item">
        <h4>{message.sender}</h4>
        <h1>Message: {message.message}</h1>
      </li>
    </>
  );
};
export default MessageItem;
