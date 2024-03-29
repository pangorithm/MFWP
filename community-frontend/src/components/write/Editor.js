import { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import client from "../../lib/api/client";

const EditorBlock = styled(Responsive)`
  padding-top: 3rem;
  padding-bottom: 1rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 1rem;
  width: 100%;
`;
const PostOptionBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    max-height: 600px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
  iframe {
    width: 90%;
    aspect-ratio: auto 16 / 9;
    background: gray;
  }
`;

const Editor = ({ title, content, password, levelLimit, onChangeField }) => {
  const quillElement = useRef(null);
  const quillInstence = useRef(null);

  useEffect(() => {
    quillInstence.current = new Quill(quillElement.current, {
      theme: "snow",
      placeholder: "내용을 작성하세요...",
      modules: {
        toolbar: {
          container: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block", "link", "image", "video"],

            //[{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            //[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            //[{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean"], // remove formatting button
          ],
          handlers: {
            // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
            image: () => {
              // 1. 이미지를 저장할 input type=file DOM을 만든다.
              const input = document.createElement("input");
              // 속성 써주기
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
              // input이 클릭되면 파일 선택창이 나타난다.

              // input에 변화가 생긴다면 = 이미지를 선택
              input.addEventListener("change", async () => {
                const file = input.files[0];
                // multer에 맞는 형식으로 데이터 만들어준다.
                const formData = new FormData();
                formData.append("file", file); // formData는 키-밸류 구조
                // 백엔드 multer라우터에 이미지를 보낸다.
                try {
                  const result = await client.post("/api/file", formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  });
                  const IMG_URL = result.data.url;
                  const editor = quillInstence.current; // 에디터 객체 가져오기
                  const range = editor.getSelection();
                  editor.insertEmbed(range.index, "image", IMG_URL);
                  onChangeField({
                    key: "content",
                    value: quill.root.innerHTML,
                  });
                } catch (error) {
                  console.log("실패", error);
                }
              });
            },
          },
        },
        ImageResize: {
          parchment: Quill.import("parchment"),
        },
      },
    });

    const quill = quillInstence.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        onChangeField({ key: "content", value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstence.current.root.innerHTML = content;
  }, [content]);

  const onChangeTitle = (e) => {
    if (e.target.value.length <= 50) {
      onChangeField({ key: "title", value: e.target.value });
    }
  };
  const onChangePassword = (e) => {
    if (e.target.value.length <= 20) {
      onChangeField({ key: "password", value: e.target.value });
    }
  };
  const onChangeLevelLimit = (e) => {
    if (e.target.value <= 1000 && e.target.value >= 0) {
      onChangeField({ key: "levelLimit", value: e.target.value });
    }
  };

  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
      />
      <PostOptionBlock>
        <label>
          비밀글
          <input
            placeholder="비밀번호를 입력하세요"
            onChange={onChangePassword}
            value={password}
          />
        </label>
        <label>
          읽기 레벨 제한
          <input
            type="number"
            placeholder="레벨 제한을 입력하세요"
            onChange={onChangeLevelLimit}
            value={levelLimit}
            min="0"
            max="1000"
          />
        </label>
      </PostOptionBlock>
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
      <div>{content.length}/5000</div>
    </EditorBlock>
  );
};

export default Editor;
