export default function validateFileSizeLimit(files: FileList, byte: number) {
  /* tslint:disable:prefer-for-of */
  for (let i = 0; i < files.length; i += 1) {
    if (files[i].size > byte) {
      return false;
    }
  }
  return true;
}
