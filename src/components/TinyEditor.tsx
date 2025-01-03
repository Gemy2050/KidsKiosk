import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
// import Loader from "./Loader";
import { memo, useState } from "react";

interface IProps {
  editorRef: React.MutableRefObject<TinyMCEEditor | null>;
  initialValue?: string;
}

function TinyEditor({ editorRef, initialValue = "" }: IProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const onInit = (_evt: any, editor: TinyMCEEditor) => {
    editorRef.current = editor;
  };

  const handleEditorInit = () => {
    console.log(isLoaded);
    if (setIsLoaded) setIsLoaded(true);
  };

  return (
    <>
      {/* {!isLoaded && <Loader />} */}
      <Editor
        apiKey={import.meta.env.VITE_TINY_API_KEY}
        onInit={onInit}
        initialValue={initialValue}
        init={{
          height: 350,
          menubar: true,
          setup: (editor) => {
            editor.on("init", handleEditorInit);
          },

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
