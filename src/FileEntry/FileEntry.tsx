import React from "react";
import { File, Folder } from "../Explorer/types";
import { iconMap } from "../utils";

interface Props {
  onEntryFocus: (e: React.FocusEvent, entry: File | null) => void;
  entry: File | null;
  id: string | undefined;
  handleFileClick: (entry: File | null) => void;
  handleContextMenu: (e: React.MouseEvent, entry: File | null) => void;
  activeId: string | undefined;
}
const FileEntry: React.FC<Props> = (props: Props) => {
  const { entry, id, activeId, onEntryFocus, handleContextMenu } = props;
  return (
    <div
      key={id}
      tabIndex={0}
      onFocus={(e) => onEntryFocus(e, entry)}
      className="file-item"
      onContextMenu={(e) => handleContextMenu(e, entry)}
    >
      <div className={`file ${activeId === entry?.name ? "file-active" : ""}`}>
        {entry?.type == "file" ? (
          <img src={iconMap[entry?.meta]} className="icon" />
        ) : null}
        {entry?.name}
      </div>
    </div>
  );
};

export default FileEntry;
