import { NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';
import { minioClient, BUCKET_NAME, ensureBucketExists } from '#/lib/object-storage/minio';
import { validateRequest } from '#/lib/auth/server';
import type { Api } from '#/types/router';

export type UploadResult = {
  fileName: string;
  url: string;
};
export const POST: Api<void, UploadResult> = async (req) => {
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ success: false, message: '未登录' });
  }

  try {
    await ensureBucketExists();

    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: '缺少参数 file' });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: '文件大小不能超过 10MB' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const originalName = file.name;
    const extension = originalName.split('.').pop();
    const fileName = `${createId()}.${extension}`;

    await minioClient.putObject(BUCKET_NAME, fileName, buffer, buffer.length, {
      'Content-Type': file.type,
      'Original-Name': originalName,
    });

    const fileUrl = `${process.env.FILES_URL}/${BUCKET_NAME}/${fileName}`;

    return NextResponse.json({
      success: true,
      message: '文件上传成功',
      data: {
        fileName,
        url: fileUrl,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: `文件上传失败: ${error}` });
  }
};
