import { useState } from 'react';
import styles from './BoardForm.module.scss';

export const BoardForm = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className={styles.boardFormWrapper}>
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        type="text"
        placeholder="제목을 입력하세요"
      />
      <input
        onChange={(e) => {
          setContent(e.target.value);
        }}
        value={content}
        type="text"
        placeholder="내용을 입력하세요"
      />
      <button
        className={styles.boardFormAddButton}
        onClick={() => {
          addPost({ title, content });
          setTitle('');
          setContent('');
        }}
      >
        게시글 추가
      </button>
    </div>
  );
};
