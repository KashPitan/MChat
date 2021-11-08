import React, { FC } from "react";

const MessageItem: FC<{message: string}> = ({message}): JSX.Element => {
  return (
    <>
      <li className="collection-item">
        <h1>Message: {message}</h1>
      </li>
    </>
  );
};
export default MessageItem;