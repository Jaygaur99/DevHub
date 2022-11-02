import { fileFormat, templateFormat } from 'Types';

const sortFiles = (file1: fileFormat, file2: fileFormat) => {
    let first;

    if (file1.type === file2.type) {
        if (file1.name > file2.name) first = file2;
        else first = file1;
    } else if (file1.type === 'directory') {
        first = file1;
    } else {
        first = file2;
    }

    return first === file1 ? -1 : 1;
};

const makeFilePath = (file: fileFormat, newFilePath: string): string => {
    let filePath: string[] | string = file.id.split('/');
    filePath[filePath.length - Number(`${file.type === 'directory' ? 2 : 1}`)] =
        newFilePath;
    filePath = filePath.join('/');
    return filePath;
};

const checkFileExists = (
    file: fileFormat,
    allFiles: templateFormat,
    newFileName?: string,
): boolean => {
    const newFilePath = newFileName ? makeFilePath(file, newFileName) : file.id;

    return !!Object.keys(allFiles)
        .map((filePath) =>
            file.type === 'file'
                ? filePath === newFilePath
                : filePath.indexOf(newFilePath) === 0,
        )
        .filter(Boolean)
        .pop();
};

const isJSON = (str: string) => {
    try {
        return JSON.parse(str) && !!str;
    } catch (e) {
        return false;
    }
};

export { sortFiles, makeFilePath, checkFileExists, isJSON };
