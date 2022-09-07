export const imageElementToBlob = async (img: HTMLImageElement) => {
  const { naturalWidth, naturalHeight } = img;
  const canvas = document.createElement('canvas');
  canvas.width = naturalWidth;
  canvas.height = naturalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return null;
  }
  ctx.drawImage(img, 0, 0, naturalWidth, naturalHeight);
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve);
  });
  return blob;
};
