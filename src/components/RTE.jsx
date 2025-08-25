import { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";


export default function RTE({
    name = "content",
    control,
    label = null,
    defaultValue="<p>This is the initial content of the editor.</p>",
}) {
    
    const editorRef = useRef(null);
    
    return (
        <div >
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    {label}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                render={({field: { onChange }}) => (
                    <Editor
                        apiKey='no-api-key'
                        onInit={ (_evt, editor) => editorRef.current = editor }
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
}
