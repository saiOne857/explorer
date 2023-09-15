import React, { useEffect, useRef, useState } from "react";
import "./style.css"; // Create your CSS file for styling
import ContextMenu from "../ContextMenu";
import jsIcon from "./../images/js.png";
import tsIcon from "./../images/ts.png";
import cssIcon from "./../images/css.png";
import htmlIcon from "./../images/html.png";
import svgIcon from "./../images/svg.png";
import imgIcon from "./../images/img.png";
import folderIcon from "./../images/folder.png";
import Header from "../Header";
import { File, Folder } from "./types";
import { fileSearch } from "../utils";
import Directory from "../Directory";
import FileEntry from "../FileEntry";

const Files: Folder | File = {
  type: "folder",
  name: "parent",
  data: [
    {
      type: "folder",
      name: "root",
      data: [
        {
          type: "folder",
          name: "src",
          data: [
            {
              type: "file",
              meta: "js",
              name: "index.js",
            },
          ],
        },
        {
          type: "folder",
          name: "public",
          data: [
            {
              type: "file",
              meta: "ts",
              name: "index.ts",
            },
          ],
        },
        {
          type: "file",
          meta: "html",
          name: "index.html",
        },
        {
          type: "folder",
          name: "data",
          data: [
            {
              type: "folder",
              name: "images",
              data: [
                {
                  type: "file",
                  meta: "img",
                  name: "image.png",
                },
                {
                  type: "file",
                  meta: "img",
                  name: "image2.webp",
                },
              ],
            },
            {
              type: "file",
              meta: "svg",
              name: "logo.svg",
            },
          ],
        },
        {
          type: "file",
          meta: "css",
          name: "style.css",
        },
      ],
    },
  ],
};
interface iconDict<TValue> {
  [id: string]: TValue;
}

const iconMap: iconDict<string> = {
  js: jsIcon,
  ts: tsIcon,
  html: htmlIcon,
  img: imgIcon,
  svg: svgIcon,
  css: cssIcon,
  folder: folderIcon,
};

const FileExplorer: React.FC = () => {
  const [fileData, setFileData] = useState(Files);
  const [selectedFile, setSelectedFile] = useState<Folder | File | null>(Files);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeId, setActiveId] = useState<string | undefined>();
  const entryInFocus = useRef<Folder | File | null>(null);
  const [searchResults, setSearchtResults] = useState<(Folder | File)[]>([]);

  const handleFileClick = (entry: Folder | File | null) => {
    debugger;
    if (entry?.type === "folder") {
      setSelectedFile(entry);
      setSearchtResults([]);
      setSearchTerm("");
    } else {
      setActiveId(entry?.name);
    }
  };
  const handleContextMenu = (
    e: React.MouseEvent,
    entry: Folder | File | null
  ) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setSelectedFile(entry);
  };

  const onEntryFocus = (e: React.FocusEvent, entry: Folder | File | null) => {
    if (e) {
      console.log(JSON.stringify(entry), "2");
      entryInFocus.current = entry;
    }
  };

  const handleKeyDown = (e: any) => {
    console.log(e.key);
    switch (e.key) {
      case "Enter":
        console.log(JSON.stringify(entryInFocus), "1");
        if (entryInFocus?.current?.type === "folder") {
          setSelectedFile(entryInFocus?.current);
        } else {
          setActiveId(entryInFocus?.current?.name);
        }
        break;
      case "c":
      case "C":
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const results = fileSearch(Files, searchTerm);
      setSearchtResults(results);
    } else {
      setSearchtResults([]);
      setSearchTerm("");
    }
  }, [searchTerm]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCopy = (name: string) => {
    console.log(`Copying file  ${name}`);
    setContextMenu(null);
  };

  const handleDelete = (name: string) => {
    console.log(`Deleting file  ${name}`);
    setContextMenu(null);
  };

  const handleRename = (name: string) => {
    console.log(`Renaming file  ${name}`);
    setContextMenu(null);
  };

  if (searchResults.length > 0 || searchTerm.length > 0) {
    return (
      <div className="explorer">
        <Header
          enableRoot={selectedFile?.name === "parent"}
          goToRoot={() => handleFileClick(fileData)}
          onSearch={setSearchTerm}
          searchText={searchTerm}
        />
        {searchResults.length > 0 && searchTerm.length > 0 && (
          <div className="wrapper">
            {searchResults?.map((item: Folder | File, index: number) => {
              const id = item.name;
              return (
                <Directory
                  activeId={activeId}
                  id={id}
                  onEntryFocus={onEntryFocus}
                  handleFileClick={handleFileClick}
                  handleContextMenu={handleContextMenu}
                  entry={item}
                />
              );
            })}
          </div>
        )}
        {searchResults.length == 0 && searchTerm.length > 0 && (
          <div className="wrapper">no results</div>
        )}
        {contextMenu && selectedFile && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
            onCopy={() => handleCopy(selectedFile?.name)}
            onDelete={() => handleDelete(selectedFile?.name)}
            onRename={() => handleRename(selectedFile?.name)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="explorer">
      <Header
        enableRoot={selectedFile?.name === "parent"}
        goToRoot={() => handleFileClick(fileData)}
        onSearch={setSearchTerm}
        searchText={searchTerm}
      />
      <div className="wrapper">
        {selectedFile?.type === "folder" ? (
          selectedFile?.data?.map((item: Folder | File) => {
            const id = item.name;
            return (
              <Directory
                activeId={activeId}
                id={id}
                onEntryFocus={onEntryFocus}
                handleFileClick={handleFileClick}
                handleContextMenu={handleContextMenu}
                entry={item}
              />
            );
          })
        ) : (
          <FileEntry
            activeId={activeId}
            id={selectedFile?.name}
            onEntryFocus={onEntryFocus}
            handleFileClick={handleFileClick}
            handleContextMenu={handleContextMenu}
            entry={selectedFile}
          />
        )}
      </div>
      {contextMenu && selectedFile && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onCopy={() => handleCopy(selectedFile?.name)}
          onDelete={() => handleDelete(selectedFile?.name)}
          onRename={() => handleRename(selectedFile?.name)}
        />
      )}
    </div>
  );
};

export default FileExplorer;
