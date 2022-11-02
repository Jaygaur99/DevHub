import {
    Box,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    Input,
    Tooltip,
    useDisclosure,
    useEditableControls,
} from '@chakra-ui/react';
import React, { memo, useCallback, useLayoutEffect, useState } from 'react';

import { selectFile, FileIcon, DeleteFileModel, renameFile } from 'features';

import { useAppDispatch, useAppSelector } from 'store/hooks';

import { codeboxIcons, fileFormat } from 'Types';

import ErrorToast from 'Utils/Toast/Error';
import { checkFileExists } from 'Utils/Files';

const TreeFile = ({
    onClick,
    currentFile,
    icon,
    setIsOpen,
    setNewFileFolder,
}: {
    currentFile: fileFormat;
    icon: codeboxIcons;
    onClick?: () => void;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    setNewFileFolder?: React.Dispatch<
        React.SetStateAction<'file' | 'directory' | 'none'>
    >;
}) => {
    const { codebox_id, allFiles, selectedFile } = useAppSelector(
        (state) => state.codebox,
    );
    const dispatch = useAppDispatch();
    const isSelected = selectedFile && selectedFile === currentFile.id;
    const [fileName, setFileName] = useState(currentFile.name);

    const depth = useCallback(
        () => currentFile.id.split('/').filter(Boolean).length,
        [currentFile.id],
    );

    const onClickFn = useCallback(() => {
        onClick ? onClick() : selectFile(currentFile.id, dispatch, allFiles);
    }, [allFiles, currentFile.id, dispatch, onClick]);

    const onSubmit = useCallback(() => {
        if (fileName === '' || fileName === currentFile.name) {
            setFileName(currentFile.name);
            return;
        }

        const fileLastExt = fileName.split('.').at(-1);

        if (
            currentFile.type === 'file' &&
            fileLastExt !== 'jsx' &&
            fileLastExt !== 'tsx' &&
            fileLastExt !== 'ts' &&
            fileLastExt !== 'js' &&
            fileLastExt !== 'css' &&
            fileLastExt !== 'html' &&
            fileLastExt !== 'json'
            // &&
            // fileLastExt !== 'svg'
        ) {
            setFileName(currentFile.name);
            ErrorToast('File name is not valid');
            return;
        }

        if (checkFileExists(currentFile, allFiles, fileName)) {
            setFileName(currentFile.name);
            ErrorToast('File name already present');
            return;
        }

        renameFile(dispatch, currentFile, fileName, codebox_id);
    }, [allFiles, codebox_id, currentFile, dispatch, fileName]);

    useLayoutEffect(() => {
        if (fileName === currentFile.name) return;

        setFileName(currentFile.name);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFile.name]);

    return (
        <>
            <Editable
                display="flex"
                alignItems="center"
                paddingLeft={`${depth() === 1 ? 0.7 : (depth() + 1) * 0.45}rem`}
                cursor="pointer"
                paddingRight="0.6rem"
                gap="0.5rem"
                _hover={{ backgroundColor: 'gray.100' }}
                backgroundColor={isSelected ? 'gray.100' : 'inherit'}
                width="100%"
                py="0.2rem"
                key={currentFile.id}
                overflow="scroll"
                flexWrap="nowrap"
                justifyContent="space-between"
                className="hide-scrollbar filetree"
                value={fileName}
                isPreviewFocusable={false}
                onSubmit={onSubmit}
                onChange={(nextValue: string) => {
                    setFileName(nextValue);
                }}
            >
                <Flex
                    alignItems="center"
                    gap="0.5rem"
                    flex="1"
                    onClick={onClickFn}
                >
                    <FileIcon file={icon} />
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
                    <EditablePreview
                        cursor="pointer"
                        display="-webkit-box"
                        as="span"
                        fontSize="0.95rem"
                        fontWeight="medium"
                        wordBreak="break-word"
                        style={{
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                        }}
                        textAlign="unset"
                        background="inherit"
                        borderRadius="unset"
                        padding="unset"
                        transition="unset"
                    />
                </Flex>

                <EditableControls
                    currentFile={currentFile}
                    setIsOpen={setIsOpen}
                    setNewFileFolder={setNewFileFolder}
                />
            </Editable>
        </>
    );
};

const EditableControls = memo(
    ({
        currentFile,
        setIsOpen,
        setNewFileFolder,
    }: {
        currentFile: fileFormat;
        setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
        setNewFileFolder?: React.Dispatch<
            React.SetStateAction<'file' | 'directory' | 'none'>
        >;
    }) => {
        const { getEditButtonProps, isEditing } = useEditableControls();
        const { isOpen, onClose, onOpen } = useDisclosure();

        const createFile = useCallback(() => {
            setIsOpen && setIsOpen((prev) => true);

            setNewFileFolder &&
                setNewFileFolder((prev) => (prev === 'file' ? 'none' : 'file'));
        }, [setIsOpen, setNewFileFolder]);

        const createFolder = useCallback(() => {
            setIsOpen && setIsOpen(() => true);

            setNewFileFolder &&
                setNewFileFolder((prev) =>
                    prev === 'directory' ? 'none' : 'directory',
                );
        }, [setIsOpen, setNewFileFolder]);

        return (
            <>
                {!isEditing && (
                    <>
                        <Flex
                            className="tracking-overflow actions"
                            alignItems="center"
                            flexWrap="nowrap"
                            gap="0.25rem"
                            opacity="0"
                            width="0%"
                            transition="0.2s"
                            pointerEvents="none"
                        >
                            <Tooltip label="Rename" placement="top">
                                <Box
                                    as="span"
                                    _hover={{
                                        opacity: '1',
                                        transform: 'scale(1.35)',
                                    }}
                                    transition="0.2s all linear"
                                    {...getEditButtonProps()}
                                >
                                    <FileIcon file="rename_file" />
                                </Box>
                            </Tooltip>

                            {currentFile.type === 'directory' && (
                                <Tooltip label="New File" placement="top">
                                    <Box
                                        as="span"
                                        _hover={{
                                            opacity: '1',
                                            transform: 'scale(1.35)',
                                        }}
                                        transition="0.2s all linear"
                                        onClick={createFile}
                                    >
                                        <FileIcon file="create_file" />
                                    </Box>
                                </Tooltip>
                            )}

                            {currentFile.type === 'directory' && (
                                <Tooltip label="New Directory" placement="top">
                                    <Box
                                        as="span"
                                        _hover={{
                                            opacity: '1',
                                            transform: 'scale(1.35)',
                                        }}
                                        transition="0.2s all linear"
                                        onClick={createFolder}
                                    >
                                        <FileIcon file="create_directory" />
                                    </Box>
                                </Tooltip>
                            )}

                            <Tooltip label="Delete" placement="top">
                                <Box
                                    as="span"
                                    _hover={{
                                        opacity: '1',
                                        transform: 'scale(1.35)',
                                    }}
                                    transition="0.2s all linear"
                                    onClick={onOpen}
                                >
                                    <FileIcon file="delete_file" />
                                </Box>
                            </Tooltip>
                        </Flex>

                        {/* delete file modal */}
                        <DeleteFileModel
                            isOpen={isOpen}
                            onClose={onClose}
                            currentFile={currentFile}
                        />
                    </>
                )}
            </>
        );
    },
);

// export default memo(TreeFile);
export default TreeFile;
