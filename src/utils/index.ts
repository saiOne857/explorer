import jsIcon from "./../images/js.png";
import tsIcon from "./../images/ts.png";
import cssIcon from "./../images/css.png";
import htmlIcon from "./../images/html.png";
import svgIcon from "./../images/svg.png";
import imgIcon from "./../images/img.png";
import folderIcon from "./../images/folder.png";
import { Folder, File } from "../Explorer/types";

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};
interface iconDict<TValue> {
  [id: string]: TValue;
}

export const iconMap: iconDict<string> = {
  js: jsIcon,
  ts: tsIcon,
  html: htmlIcon,
  img: imgIcon,
  svg: svgIcon,
  css: cssIcon,
  folder: folderIcon,
};

export const fileSearch = (data: Folder | File, value: string) => {
  const searchItem = (item: Folder | File) => {
    if (item?.name.includes(value)) {
      results.push(item);
    }

    if (item.type === "folder" && item?.data && Array.isArray(item?.data)) {
      for (const subItem of item.data) {
        searchItem(subItem);
      }
    }
  };

  const results: (Folder | File)[] = [];
  searchItem(data);
  return results;
};
