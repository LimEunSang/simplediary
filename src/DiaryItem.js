import React, { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";
import EmotionSelect from "./EmotionSelect";

const DiaryItem = ({ id, author, content, emotion, created_date }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const [localEmotion, setLocalEmotion] = useState(emotion);

  const [lastModifyTime, setLastModifyTime] = useState(
    new Date(created_date).toLocaleString()
  );

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
    setLocalEmotion(emotion);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent, localEmotion);
      setLastModifyTime(new Date().toLocaleString());
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          {isEdit ? (
            <>
              작성자 : {author} | 감정점수{" "}
              <EmotionSelect
                value={localEmotion}
                onChange={(e) => setLocalEmotion(e.target.value)}
              />
            </>
          ) : (
            <>
              작성자 : {author} | 감정점수 : {emotion}
            </>
          )}
        </span>
        <br />
        <span className="date">
          최초 작성 : {new Date(created_date).toLocaleString()}
          <br />
          최근 수정 : {lastModifyTime}
        </span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
