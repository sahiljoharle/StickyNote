import { useRef, useEffect } from "react";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  let position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);

  const textAreaRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  const autoGrow = (textAreaRef) => {
    const { current } = textAreaRef;
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="card-header" style={{ background: colors.colorHeader }}>
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          ref={textAreaRef}
          defaultValue={body}
          style={{ color: colors.colorText }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
