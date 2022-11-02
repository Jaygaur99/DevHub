import { Editable, EditableInput, Flex, Input } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { createFileFolder, FileIcon } from 'features';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { fileFormat } from 'Types';

import ErrorToast from 'Utils/Toast/Error';
import { checkFileExists, makeFilePath } from 'Utils/Files';

const NewFileFolder = ({
    currentFile,
    setNewFileFolder,
}: {
    currentFile: fileFormat;
    setNewFileFolder?: React.Dispatch<
        React.SetStateAction<'file' | 'directory' | 'none'>
    >;
}) => {
    const { allFiles, codebox_id } = useAppSelector((state) => state.codebox);
    const [newFile, setNewFile] = useState<fileFormat>({
        ...currentFile,
        name: '',
    });
    const disptach = useAppDispatch();

    const depth = useCallback(
        () => currentFile.id.split('/').filter(Boolean).length,
        [currentFile.id],
    );

    const onSubmit = useCallback(() => {
        if (newFile.name === '' || newFile.name.split('.').at(0) === '') {
            ErrorToast('Name not valid');
            setNewFileFolder && setNewFileFolder('none');
            return;
        }

        const fileLastExt = newFile.name.split('.').at(-1);
        if (
            currentFile.type === 'file' &&
            fileLastExt !== 'jsx' &&
            fileLastExt !== 'tsx' &&
            fileLastExt !== 'ts' &&
            fileLastExt !== 'js' &&
            fileLastExt !== 'css' &&
            fileLastExt !== 'html'
        ) {
            ErrorToast('File name is not valid');
            setNewFileFolder && setNewFileFolder('none');
            return;
        }

        if (checkFileExists(newFile, allFiles)) {
            ErrorToast('File name already present');
            setNewFileFolder && setNewFileFolder('none');
            return;
        }

        setNewFileFolder && setNewFileFolder('none');
        createFileFolder(disptach, newFile, codebox_id);
    }, [
        allFiles,
        codebox_id,
        currentFile.type,
        disptach,
        newFile,
        setNewFileFolder,
    ]);

    return (
        <>
            <Editable
                display="flex"
                alignItems="center"
                paddingLeft={`${depth() === 1 ? 0.7 : (depth() + 1) * 0.45}rem`}
                cursor="pointer"
                paddingRight="0.6rem"
                gap="0.5rem"
                backgroundColor="inherit"
                width="100%"
                py="0.2rem"
                key={currentFile.id}
                overflow="scroll"
                flexWrap="nowrap"
                justifyContent="space-between"
                className="hide-scrollbar filetree"
                value={newFile.name}
                startWithEditView
                onSubmit={onSubmit}
                onChange={(nextValue: string) => {
                    setNewFile((prev) => ({
                        ...prev,
                        id: makeFilePath(newFile, nextValue),
                        name: nextValue,
                    }));
                }}
                onCancel={() => setNewFileFolder && setNewFileFolder('none')}
            >
                <Flex
                    alignItems="center"
                    gap="0.5rem"
                    flex="1"
                    padding="0.2rem 0rem"
                >
                    <FileIcon
                        file={
                            newFile.type === 'directory'
                                ? 'CLOSED DIRECTORY'
                                : 'new_file'
                        }
                    />
                    <Input
                        as={EditableInput}
                        _focus={{}}
                        _active={{}}
                        _hover={{}}
                        boxShadow="unset!important"
                        outlineOffset="unset!important"
                        padding="0.1rem 0.2rem !important"
                        fontSize="0.9rem !important"
                        outline="1px solid !important"
                        outlineColor="gray.800 !important"
                        height="100% !important"
                        borderRadius="unset !important"
                        border="unset !important"
                    />
                </Flex>
            </Editable>
        </>
    );
};

export default NewFileFolder;
