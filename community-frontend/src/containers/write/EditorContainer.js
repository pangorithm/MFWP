import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../../components/write/Editor";
import { changeField, initialize } from "../../modules/write";

const EditorContainer = () => {
  const dispatch = useDispatch();
  const { title, content, password, levelLimit } = useSelector(({ write }) => ({
    title: write.title,
    content: write.content,
    password: write.password,
    levelLimit: write.levelLimit,
  }));
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);
  return (
    <Editor
      onChangeField={onChangeField}
      title={title}
      content={content}
      password={password}
      levelLimit={levelLimit}
    />
  );
};

export default EditorContainer;
