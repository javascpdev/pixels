export default function getFilenameTag(filename) {
  const splitableFilename = filename.replace(/[-|/|_|.]/g, '|');
  const tags = splitableFilename.split('|').slice(0, -1);

  return tags;
}
