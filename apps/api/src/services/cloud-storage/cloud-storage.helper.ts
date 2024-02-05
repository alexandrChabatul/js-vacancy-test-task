export const getFileKey = (url: string) => {
  const decodedUrl = decodeURI(url);
  const { pathname } = new URL(decodedUrl);

  return pathname.substring(1);
};

export const getImageUrl = (bucketName: string, fileName: string): string => {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/${fileName}`;
};
