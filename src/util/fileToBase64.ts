export const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.readAsDataURL(file);
    r.onload = () => resolve(r.result);
    r.onerror = (e) => reject(e);
  });
};
