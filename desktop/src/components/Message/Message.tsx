import "./Message.css";

type Props = {
  sender: "user" | "assistant";
  text: string;
};

export default function Message({ sender, text }: Props) {
  return (
    <div className={`message ${sender}`}>
      <div className="message-bubble">
        {text}
      </div>
    </div>
  );
}