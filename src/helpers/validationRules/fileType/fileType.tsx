export default function validateType(files: FileList, listType: string[]) {
  /* tslint:disable:prefer-for-of */
  for (let i = 0; i < files.length; i += 1) {
    if (
      !files[i].type.match('image') ||
      listType.indexOf(files[i].type.split('/')[1]) === -1
    ) {
      return false;
    }
  }
  return true;
}
