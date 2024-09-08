"use client";

import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import EditorJS from "@editorjs/editorjs";
import Link from "@editorjs/link";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import ace from "ace-builds";
import "ace-builds/esm-resolver";
import AceCodeEditorJS from "ace-code-editorjs";
import Alert from "editorjs-alert";
import AnyButton from "editorjs-button";
import Header from "editorjs-header-with-alignment";
import Table from "editorjs-table";
import ToggleBlock from "editorjs-toggle-block";
import { forwardRef, useEffect, useRef } from "react";
import Title from "title-editorjs";

import modeJSX from "ace-builds/src-noconflict/mode-jsx?url";
import modeTSX from "ace-builds/src-noconflict/mode-tsx?url";
import modeCSSWorker from "ace-builds/src-noconflict/worker-css?url";
import modeHTMLWorker from "ace-builds/src-noconflict/worker-html?url";
import modeJSWorker from "ace-builds/src-noconflict/worker-javascript?url";
import modePHPWorker from "ace-builds/src-noconflict/worker-php?url";

ace.config.setModuleUrl("ace/mode/tsx", modeTSX);
ace.config.setModuleUrl("ace/mode/jsx", modeJSX);
ace.config.setModuleUrl("ace/mode/html_worker", modeHTMLWorker);
ace.config.setModuleUrl("ace/mode/javascript_worker", modeJSWorker);
ace.config.setModuleUrl("ace/mode/css_worker", modeCSSWorker);
ace.config.setModuleUrl("ace/mode/php_worker", modePHPWorker);

const aceConfig = {
  languages: {
    plain: {
      label: "Plain Text",
      mode: "ace/mode/plain_text",
    },
    html: {
      label: "HTML",
      mode: "ace/mode/html",
    },
    css: {
      label: "CSS",
      mode: "ace/mode/css",
    },
    javascript: {
      label: "Javascript",
      mode: "ace/mode/javascript",
    },
    php: {
      label: "PHP",
      mode: "ace/mode/php",
    },
    tsx: {
      label: "TSX",
      mode: "ace/mode/tsx",
    },
    jsx: {
      label: "JSX",
      mode: "ace/mode/tsx",
    },
  },
};

const TextEditor = (
  ElementId: string,
  content: string,
  readonly: boolean,
  OnChange?: (value: string) => void
) => {
  const rendered = useRef<false | true>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;

      const editor = new EditorJS({
        holder: ElementId,

        minHeight: 0,

        onReady() {
          editor.render({
            blocks: JSON.parse(content),
          });
        },

        onChange(api, event) {
          editor
            .save()
            .then((outputData) => {
              OnChange && OnChange(JSON.stringify(outputData.blocks));
              console.log(outputData.blocks);
            })
            .catch((error) => {
              console.log("Saving failed: ", error);
            });
        },

        tools: {
          header: {
            class: Header,
            shortcut: "CMD+SHIFT+H",
            config: {
              placeholder: "Entrez votre titre",
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 3,
              defaultAlignement: "left",
            },
          },
          toggle: {
            class: ToggleBlock,
            inlineToolbar: true,
          },
          list: List,
          checkList: CheckList,
          delimiter: Delimiter,
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          link: Link,
          title: Title,
          table: Table,
          alert: {
            class: Alert,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+A",
            config: {
              alertTypes: [
                "primary",
                "secondary",
                "info",
                "success",
                "warning",
                "danger",
                "light",
                "dark",
              ],
              defaultType: "primary",
            },
          },
          code: {
            class: AceCodeEditorJS,
            config: aceConfig,
          },
          AnyButton: {
            class: AnyButton,
            inlineToolbar: true,
            config: {
              css: {
                btnColor: "bg-slate-800",
              },
            },
          },
        },
        readOnly: readonly,
      });
      (ref as React.MutableRefObject<any>).current = editor;
    } else {
      return;
    }
  }, [ElementId]);
};

interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

const Editor = forwardRef<HTMLDivElement, EditorProps>(
  ({ value, onChange, readOnly }, ref) => {
    const elementId = "editorjs";
    TextEditor(elementId, value, readOnly ?? false, onChange);

    return <div id={elementId} ref={ref}></div>;
  }
);

export default Editor;
