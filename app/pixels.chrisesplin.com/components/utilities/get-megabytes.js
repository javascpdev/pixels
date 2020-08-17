export default function getFilenameTag(bytes) {
  let result = String(Math.round((bytes / 1000000) * 100, 2) / 100);

  if (result.length == 1) {
    result += '.';
  }

  return result.padEnd(4, '0');
}
