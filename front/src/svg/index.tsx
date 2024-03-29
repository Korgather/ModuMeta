import React from 'react';

export const Bookmark_blank = () => (
  <svg
    aria-label="저장"
    className="bookmark"
    color="#8e8e8e"
    fill="#8e8e8e"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <polygon
      fill="none"
      points="20 21 12 13.44 4 21 4 3 20 3 20 21"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
);

export const Bookmark = () => (
  <svg
    aria-label="삭제"
    className="bookmark"
    color="#262626"
    fill="#262626"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M20 22a.999.999 0 01-.687-.273L12 14.815l-7.313 6.912A1 1 0 013 21V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1z"></path>
  </svg>
);
