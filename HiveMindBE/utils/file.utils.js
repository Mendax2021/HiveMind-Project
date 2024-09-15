export function convertFileToBLOB(file) {
  return new Blob([file.buffer], { type: file.mimetype });
}
