interface DownloadFileOptions {
  data: any;
  fileName: string;
  contentType?: string;
}

export const downloadFile = async ({ data, fileName, contentType = 'image/png' }: DownloadFileOptions) => {
  try {
    const blob = data instanceof Blob ? data : new Blob([data], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('다운로드에 실패하였습니다. ', error);
    throw error;
  }
};
