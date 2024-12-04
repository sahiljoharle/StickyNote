import { useRef, useEffect, useState } from "react";
import Trash from "../icons/Trash";
import { setNewOffset } from "../utils";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  let [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  let mouseStartpos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  const textAreaRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  const autoGrow = (textAreaRef) => {
    const { current } = textAreaRef;
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";
  };

  const mouseDown = (e) => {
    mouseStartpos.x = e.clientX;
    mouseStartpos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartpos.x - e.clientX,
      y: mouseStartpos.y - e.clientY,
    };
    mouseStartpos.x = e.clientX;
    mouseStartpos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        onMouseDown={mouseDown}
        style={{ background: colors.colorHeader }}
      >
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
