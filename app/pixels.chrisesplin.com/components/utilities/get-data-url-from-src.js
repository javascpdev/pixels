export default async function getDataUrlFromSrc(src) {
  return new Promise(async (resolve, reject) => {
    try {
      const img = await getImgFromSrc(src);
      const canvas = document.createElement('canvas');

      canvas.width = img.width;
      canvas.height = img.height;

      canvas.getContext('2d').drawImage(img, 0, 0);

      resolve(canvas.toDataURL());
    } catch (error) {
      reject(error);
    }
  });
}

async function getImgFromSrc(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');

    img.setAttribute('crossorigin', 'anonymous');
    img.onload = () => resolve(img);
    img.onerror = (e) => reject;

    img.src = src;
  });
}
