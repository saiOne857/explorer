import React from "react";
import { File, Folder } from "../Explorer/types";
import { iconMap } from "../utils";

interface Props {
  onEntryFocus: (e: React.FocusEvent, entry: Folder | File) => void;
  entry: Folder | File;
  id: string;
  handleFileClick: (entry: Folder | File) => void;
  handleContextMenu: (e: React.MouseEvent, entry: Folder | File) => void;
  activeId: string | undefined;
}
const Directory: React.FC<Props> = (props: Props) => {
  const { entry, id, activeId } = props;
  return (
    <div
      onFocus={(e) => props.onEntryFocus(e, entry)}
      tabIndex={0}
      key={id}
      className="file-item"
      onClick={() => props.handleFileClick(entry)}
      onContextMenu={(e) => props.handleContextMenu(e, entry)}
    >
      <div className={`file ${activeId === id ? "file-active" : ""}`}>
        {entry?.type === "folder" ? (
          <img src={iconMap[entry?.type]} className="icon" />
        ) : iconMap[entry?.meta] ? (
          <img src={iconMap[entry?.meta]} className="icon" />
        ) : null}
        {entry?.name}
      </div>
    </div>
  );
};

export default Directory;
