import Image from "next/image";
import { useState } from "react";
import close from "../../assets/x.svg";

export default function Message() {
  const [closeMessage, setCloseMessage] = useState(false);
  const handleClick = () => {
    setCloseMessage(true);
  };

  if (closeMessage) return <></>;

  return (
    <div className="message-container">
      <div className="message-first">
        <span>Mensaje promocional</span>
      </div>
      <div className="close">
        <Image onClick={handleClick} src={close} alt="user" />
      </div>
    </div>
  );
}
