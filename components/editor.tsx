"use client";

import YooptaEditor, {
  createYooptaEditor,
  YooptaContentValue,
} from "@yoopta/editor";

import Accordion from "@yoopta/accordion";
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list";
import Blockquote from "@yoopta/blockquote";
import Callout from "@yoopta/callout";
import Code from "@yoopta/code";
import Embed from "@yoopta/embed";
import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings";
import Link from "@yoopta/link";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import { BulletedList, NumberedList, TodoList } from "@yoopta/lists";
import {
  Bold,
  CodeMark,
  Highlight,
  Italic,
  Strike,
  Underline,
} from "@yoopta/marks";
import Paragraph from "@yoopta/paragraph";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";

import { useEffect, useMemo, useRef } from "react";

const plugins = [
  Paragraph,
  Accordion,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  NumberedList,
  BulletedList,
  TodoList,
  Code,
  Link,
  Embed,
  // Image.extend({
  //   options: {
  //     async onUpload(file) {
  //       const data = await uploadToCloudinary(file, "image");

  //       return {
  //         src: (data as any).secure_url,
  //         alt: "cloudinary",
  //         sizes: {
  //           width: (data as any).width,
  //           height: (data as any).height,
  //         },
  //       };
  //     },
  //   },
  // }),
  // Video.extend({
  //   options: {
  //     onUpload: async (file) => {
  //       const data = await uploadToCloudinary(file, "video");
  //       return {
  //         src: (data as any).secure_url,
  //         alt: "cloudinary",
  //         sizes: {
  //           width: (data as any).width,
  //           height: (data as any).height,
  //         },
  //       };
  //     },
  //     onUploadPoster: async (file) => {
  //       const image = await uploadToCloudinary(file, "image");
  //       return (image as any).secure_url;
  //     },
  //   },
  // }),
  // File.extend({
  //   options: {
  //     onUpload: async (file) => {
  //       const response = await uploadToCloudinary(file, "auto");
  //       if (typeof response === "object" && response !== null) {
  //         return {
  //           src: (response as any).secure_url,
  //           format: (response as any).format,
  //           name: (response as any).name,
  //           size: (response as any).bytes,
  //         };
  //       }
  //       throw new Error("La réponse de Cloudinary n'est pas valide");
  //     },
  //   },
  // }),
];

const TOOLS = {
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

function MyEditor({ value, onChange, readOnly = false }: EditorProps) {
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);

  function handleChange(value: YooptaContentValue) {
    console.log("value", value);
    onChange && onChange(JSON.stringify(value));
  }

  useEffect(() => {
    editor.on("change", handleChange);
    return () => {
      editor.off("change", handleChange);
    };
  }, [editor]);

  return (
    <div className="" ref={selectionRef}>
      <YooptaEditor
        className="-mb-28"
        editor={editor}
        plugins={plugins}
        tools={TOOLS}
        marks={MARKS}
        selectionBoxRoot={selectionRef}
        autoFocus
        width={"100%"}
        readOnly={readOnly}
        value={value ? (JSON.parse(value) as YooptaContentValue) : undefined} // Conversion explicite via 'unknown'
      />
    </div>
  );
}

export default MyEditor;
