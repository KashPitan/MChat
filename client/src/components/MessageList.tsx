import React, { FC } from "react";
import MessageItem from "./MessageItem";
import { messageType } from "../types";

const MessageList: FC<{ messages: messageType[] }> = ({
  messages,
}): JSX.Element => {
  return (
    <>
      <h1>Messages</h1>
      {messages.length > 0 ? (
        <>
          <ol className="collection">
            {messages.map((message: messageType, index: number) => (
              <MessageItem key={index.toString()} message={message} />
            ))}
          </ol>
        </>
      ) : (
        <p>No messages</p>
      )}
    </>
  );
};

export default MessageList;
