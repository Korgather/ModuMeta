import React, { SetStateAction, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useQuill } from 'react-quilljs';
import { RangeStatic } from 'quill';
import { IImageList } from '@customTypes/post';
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const theme = 'snow';

interface IQuill {
  onChangeContent: (content: string) => void;
  prevData: {
    category: string | undefined;
    title: string | undefined;
    content: string | undefined;
  };
  images: IImageList[];
  setImages: React.Dispatch<SetStateAction<IImageList[]>>;
}

export default function QuillFactory({
  onChangeContent,
  prevData,
  images,
  setImages,
}: IQuill) {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
      },
      imageDropAndPaste: {
        handler: () => {
          return;
        },
      },
    }),
    []
  );
  const { quill, quillRef, Quill } = useQuill({ theme, modules, formats });
  if (Quill && !quill) {
    const imageDropAndPaste = require('quill-image-drop-and-paste').default;
    Quill.register('modules/imageDropAndPaste', imageDropAndPaste);
  }
  const insertToEditor = (url: string) => {
    const range = quill?.getSelection();
    quill?.insertEmbed((range as RangeStatic).index, 'image', url);
  };

  const saveToServer = async (file: File) => {
    const fd = new FormData();
    fd.append('data', file);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      fd
    );
    const imageURL = process.env.NEXT_PUBLIC_IMG_URL + res.data[0];
    insertToEditor(imageURL);
    return imageURL;
  };
  const selectLocalImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      if (input.files !== null) {
        const file = input.files[0];
        saveToServer(file);
      }
    };
  };

  useEffect(() => {
    if (quill) {
      const onImagePaste = (e: ClipboardEvent) => {
        if (e.clipboardData && e.clipboardData.files[0]) {
          const Url = saveToServer(e.clipboardData.files[0]);
          quill.deleteText(6, 4);
          quill.insertEmbed(10, 'image', Url);
          return quill.insertEmbed(10, 'image', Url);
        }
      };
      prevData.content &&
        quill.clipboard.dangerouslyPasteHTML(`${prevData.content}`);
      quill.on('text-change', () => {
        onChangeContent(quill.root.innerHTML);
        const imgNode = Array.from(document.querySelectorAll('.ql-editor img'));
        if (imgNode.length >= 0) {
          const submitImgList = imgNode
            ?.map((el) => ({
              imagePath: (el as HTMLImageElement).src,
              origFileName: 'clipboardImg',
              fileSize: 3,
            }))
            .filter((el) => el.imagePath.length >= 1);
          setImages(submitImgList);
        }
      });
      quill.getModule('toolbar').addHandler('image', selectLocalImage);
      quill.root.addEventListener('paste', onImagePaste, false);
    }
  }, [quill]);

  return (
    <Wrapper>
      <div ref={quillRef} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 20px 0;
  .ql-container.ql-snow {
    max-height: 500px;
    height: 40vh;
  }
`;
