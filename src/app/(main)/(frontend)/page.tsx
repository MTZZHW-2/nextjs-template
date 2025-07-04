'use client';

import { useRef } from 'react';
import { useAsyncEffect } from 'ahooks';

export default function Home() {
  const editorRef = useRef<HTMLDivElement>(null);

  useAsyncEffect(async () => {
    try {
      const config = {
        documentType: 'word',
        // document: {
        //   fileType: 'docx',
        //   key: 'example-doc-key', // 文件唯一标识，每次打开要不同
        //   title: '示例文档.docx',
        //   referenceData: {
        //     fileKey: 'BCFA2CED',
        //     instanceId: 'https://static.galleryepic.xyz',
        //   },
        //   url: 'https://static.galleryepic.xyz/%E6%A3%80%E6%B5%8B%E6%8A%A5%E5%91%8A.docx', // 改成你的文件地址
        // },
        // editorConfig: {
        //   mode: 'view', // 或 'view' 只读
        // },
        height: '100%',
        width: '100%',
      };

      const script = document.createElement('script');
      script.src = 'http://localhost:8080/web-apps/apps/api/documents/api.js'; // ONLYOFFICE 服务地址
      script.onload = () => {
        // @ts-ignore
        const docEditor = new DocsAPI.DocEditor('onlyoffice-container', config);
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error('初始化文档编辑器失败:', error);
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div id="onlyoffice-container" style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
