import React, { FC } from "react";
import { Alert } from "react-bootstrap";

function Message(props: React.PropsWithChildren<{ varient?: string }>) {
  return <Alert variant={props.varient}>{props.children}</Alert>;
}

export default Message;
