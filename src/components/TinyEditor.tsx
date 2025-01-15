import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { memo } from "react";
import { useTheme } from "next-themes";

interface IProps {
  editorRef: React.MutableRefObject<TinyMCEEditor | null>;
  initialValue?: string;
  value?: string;
  onEditorChange?: (value: string) => void;
}

const darkModeSettings = {
  skin: "oxide-dark",
  content_css: "dark",
  content_style: `
    body {
      background-color: #141b1e;
      color: #ffffff;
    }
    .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
      color: #666;
    }
  `,
};

function TinyEditor({
  editorRef,
  initialValue = "",
  value,
  onEditorChange,
}: IProps) {
  const { theme } = useTheme();

  const onInit = (_evt: any, editor: TinyMCEEditor) => {
    editorRef.current = editor;
  };

  return (
    <>
      {/* {!isLoaded && <Loader />} */}
      <Editor
        apiKey={import.meta.env.VITE_TINY_API_KEY}
        onInit={onInit}
        initialValue={initialValue}
        value={value}
        onEditorChange={(value) => {
          if (onEditorChange) onEditorChange(value);
        }}
        init={{
          ...(theme === "dark" ? darkModeSettings : {}),
          height: 350,
          menubar: true,

          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | link image" +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help | code",
        }}
      />
    </>
  );
}

export default memo(TinyEditor);
