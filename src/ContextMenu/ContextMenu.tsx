import React, { Children, useEffect, useRef } from "react";
import "./style.css";

interface Props {
  x: number;
  y: number;
  onClose: () => void;
  onCopy: () => void;
  onDelete: () => void;
  onRename: () => void;
}

const ContextMenu = ({ x, y, onClose, onCopy, onDelete, onRename }: Props) => {
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (menu?.current) {
      menu?.current?.focus();
    }
  }, []);
  return (
    <div
      className="context-menu"
      style={{ top: y, left: x }}
      ref={menu}
      onBlur={onClose}
      onFocus={() => console.log("focus")}
      tabIndex={0}
    >
      <div onClick={onCopy}>Copy</div>
      <div onClick={onDelete}>Delete</div>
      <div onClick={onRename}>Rename</div>
      <div onClick={onClose}>Close</div>
    </div>
  );
};

export default ContextMenu;
