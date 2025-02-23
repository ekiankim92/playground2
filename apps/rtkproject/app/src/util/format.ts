export const formatDateTime = (dateString?: string): string => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleString();
};

export const isFile = (key?: string): boolean => {
  if (!key) return false;
  return key.includes('.') && !key.endsWith('/');
};

export const formatBytes = (bytes?: number): string => {
  if (bytes === undefined || bytes === null) return '-';
  if (bytes === 0) return '0.00 KB';

  const k = 1000;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
