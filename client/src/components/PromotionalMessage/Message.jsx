import Image from "next/image";
import close from "../../assets/x.svg";

export default function Message() {
  return (
    <div className="message-container">
        <div className="message-first"><span>Mensaje promocional</span></div>
        <div className="close"><Image src={close} alt="user" /></div>
    </div>
  )
};  