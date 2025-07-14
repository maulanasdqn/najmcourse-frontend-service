import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
  $getRoot,
  $isTextNode,
  DOMConversionMap,
  DOMExportOutput,
  DOMExportOutputMap,
  EditorState,
  isHTMLElement,
  Klass,
  LexicalEditor,
  LexicalNode,
  ParagraphNode,
  TextNode,
} from "lexical";
import { defaultTheme } from "./wysiwyg-theme";
import { ToolbarPlugin } from "./wysiwyg-toolbar";
import { parseAllowedColor, parseAllowedFontSize } from "./wysiwyg-config";
import { Form } from "antd";
import { FieldValues, useController } from "react-hook-form";
import { TControlledLexicalEditorProps, TLexicalProps } from "./type";
import { FC, ReactElement, useEffect } from "react";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import "./style.css";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const placeholder = "Input Question";

const removeStylesExportDOM = (editor: LexicalEditor, target: LexicalNode): DOMExportOutput => {
  const output = target.exportDOM(editor);
  if (output && isHTMLElement(output.element)) {
    for (const el of [
      output.element,
      ...output.element.querySelectorAll('[style],[class],[dir="ltr"]'),
    ]) {
      el.removeAttribute("class");
      el.removeAttribute("style");
      if (el.getAttribute("dir") === "ltr") {
        el.removeAttribute("dir");
      }
    }
  }
  return output;
};

const exportMap: DOMExportOutputMap = new Map<
  Klass<LexicalNode>,
  (editor: LexicalEditor, target: LexicalNode) => DOMExportOutput
>([
  [ParagraphNode, removeStylesExportDOM],
  [TextNode, removeStylesExportDOM],
]);

const getExtraStyles = (element: HTMLElement): string => {
  let extraStyles = "";
  const fontSize = parseAllowedFontSize(element.style.fontSize);
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);
  if (fontSize !== "" && fontSize !== "15px") {
    extraStyles += `font-size: ${fontSize};`;
  }
  if (backgroundColor !== "" && backgroundColor !== "rgb(255, 255, 255)") {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color !== "" && color !== "rgb(0, 0, 0)") {
    extraStyles += `color: ${color};`;
  }
  return extraStyles;
};

const constructImportMap = (): DOMConversionMap => {
  const importMap: DOMConversionMap = {};
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode);
      if (!importer) {
        return null;
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element);
          if (
            output?.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output;
          }
          const extraStyles = getExtraStyles(element);
          if (extraStyles) {
            const { forChild } = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent);
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles);
                }
                return textNode;
              },
            };
          }
          return output;
        },
      };
    };
  }

  return importMap;
};

const editorConfig = {
  html: {
    export: exportMap,
    import: constructImportMap(),
  },
  namespace: "NAJM Course WYSIWYG Editor",
  nodes: [ParagraphNode, TextNode],
  onError(error: Error) {
    throw error;
  },
  theme: defaultTheme,
};

const LoadHtmlPlugin = ({ html }: { html: string }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      try {
        const root = $getRoot();
        if (root.getChildren().length === 1 && root.getTextContent() === "") {
          const parser = new DOMParser();
          const dom = parser.parseFromString(html, "text/html");
          const nodes = $generateNodesFromDOM(editor, dom);
          root.clear();
          const validNodes = nodes.filter((node) => {
            try {
              return node && (node.getType() === "paragraph" || node.getType() === "text");
            } catch {
              return false;
            }
          });

          if (validNodes.length > 0) {
            try {
              root.append(...validNodes);
            } catch (error) {
              console.warn("Failed to append nodes, using fallback:", error);
              root.clear();
              const paragraphNode = new ParagraphNode();
              root.append(paragraphNode);
            }
          } else {
            const paragraphNode = new ParagraphNode();
            root.append(paragraphNode);
          }
        }
      } catch (error) {
        console.warn("Failed to load HTML content:", error);
        const root = $getRoot();
        root.clear();
        const paragraphNode = new ParagraphNode();
        root.append(paragraphNode);
      }
    });
  }, [editor, html]);

  return null;
};

const Lexical: FC<TLexicalProps> = (props): ReactElement => {
  const handleChange = (editorState: EditorState, editor: LexicalEditor) => {
    if (!props.onChange) return;
    editorState.read(() => {
      const html = $generateHtmlFromNodes(editor, null)
        .replace(/\n/g, "")
        .replace(/&nbsp;/g, " ");
      props.onChange?.(html);
    });
  };
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <ToolbarPlugin />
      <div className="editor-inner">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              autoFocus={false}
              className="editor-input border border-gray-200 bg-white focus:border-[1px] focus:border-blue-300 rounded-l-lg rounded-r-lg rounded-b-lg"
              aria-placeholder={placeholder}
              placeholder={
                <div className="editor-placeholder text-xs text-gray-300">{props.placeholder}</div>
              }
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <LoadHtmlPlugin html={props.value ?? "<p><br></p>"} />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
      </div>
    </LexicalComposer>
  );
};

export const ControlledWysiwyg = <T extends FieldValues>({
  name,
  control,
  formItemProps,
  label,
  required,
  ...inputProps
}: TControlledLexicalEditorProps<T>): ReactElement => {
  const {
    field: { value, onChange },
    fieldState,
  } = useController({ name, control });

  return (
    <Form.Item
      {...formItemProps}
      label={label}
      required={required}
      validateStatus={fieldState.error ? "error" : ""}
      help={fieldState.error?.message}
    >
      <Lexical placeholder={inputProps.placeholder} value={value} onChange={onChange} />
    </Form.Item>
  );
};
