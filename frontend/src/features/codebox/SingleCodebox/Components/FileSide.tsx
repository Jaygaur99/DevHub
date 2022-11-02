import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { sortFiles } from 'Utils/Files';

import { TreeFile, NewFileFolder, FileIcon } from 'features';

import { useAppSelector } from 'store/hooks';

import { codeboxIcons, fileFormat, templateFormat } from 'Types';

const FileSide = () => {
    const { allFiles } = useAppSelector((state) => state.codebox);
    const [createNewFileFolder, setCreateNewFileFolder] = useState<
        'file' | 'directory' | 'none'
    >('none');

    const createFileFolder = useCallback(
        (type: 'file' | 'directory') =>
            setCreateNewFileFolder((prev) => (prev === type ? 'none' : type)),
        [],
    );

    return (
        <>
            <Box
                justifyContent="space-between"
                alignItems="center"
                display="flex"
                borderBottom="2px solid"
                borderColor="gray.300"
                margin="0 0 0.8rem 0"
                p="0.3rem 0.7rem"
                gap="2rem"
            >
                <Text as="span" fontWeight="600" lineHeight="20px">
                    Files
                </Text>
                <Flex
                    className="tracking-overflow actions"
                    alignItems="center"
                    flexWrap="nowrap"
                    gap="0.4rem"
                    width="fit-content"
                    transition="0.2s"
                >
                    <Tooltip label="New File" placement="top">
                        <Box
                            as="span"
                            _hover={{
                                opacity: '1',
                                transform: 'scale(1.35)',
                            }}
                            transition="0.2s all linear"
                            cursor="pointer"
                            opacity="0.8"
                            onClick={() => createFileFolder('file')}
                        >
                            <FileIcon file="create_file" />
                        </Box>
                    </Tooltip>

                    <Tooltip label="New Directory" placement="top">
                        <Box
                            as="span"
                            _hover={{
                                opacity: '1',
                                transform: 'scale(1.35)',
                            }}
                            transition="0.2s all linear"
                            cursor="pointer"
                            opacity="0.8"
                            onClick={() => createFileFolder('directory')}
                        >
                            <FileIcon file="create_directory" />
                        </Box>
                    </Tooltip>
                </Flex>
            </Box>

            <RenderFileTree
                files={
                    createNewFileFolder === 'directory'
                        ? {
                              ...allFiles,
                              '/t_h_i_s_i_s_a_p_r_i_v_a_t_e_f_o_l_d_e_r_n_a_m_e/':
                                  {
                                      code: '',
                                  },
                          }
                        : createNewFileFolder === 'file'
                        ? {
                              ...allFiles,
                              '/t_h_i_s_i_s_a_p_r_i_v_a_t_e_f_i_l_e_n_a_m_e.js':
                                  {
                                      code: '',
                                  },
                          }
                        : allFiles
                }
                createFileFolder={createNewFileFolder}
                setNewFileFolder={setCreateNewFileFolder}
                prefixPath="/"
            />
        </>
    );
};

const RenderFileTree = memo(
    ({
        files,
        createFileFolder,
        setNewFileFolder,
        prefixPath,
    }: {
        files: templateFormat;
        createFileFolder?: 'file' | 'directory' | 'none';
        setNewFileFolder?: React.Dispatch<
            React.SetStateAction<'file' | 'directory' | 'none'>
        >;
        prefixPath: string;
    }) => {
        const fileListWithoutPrefix = Object.keys(files)
            .filter((file) => file.startsWith(prefixPath))
            .map((file) => file.substring(prefixPath.length));

        const filesToShow: fileFormat[] = fileListWithoutPrefix
            .filter((file) => !file.includes('/'))
            .filter((file) => file.includes('.'))
            .map((file) => ({
                id: `${prefixPath}${file}`,
                name: file,
                type: 'file',
            }));

        const directoryToShow: fileFormat[] = [
            ...new Set(
                fileListWithoutPrefix
                    .filter((file) => file.includes('/'))
                    .map((file) => `${prefixPath}${file.split('/')[0]}/`),
            ),
        ].map((file) => ({
            id: file,
            name: file.split('/').filter(Boolean).pop() ?? '',
            type: 'directory',
        }));

        const finalFiles: fileFormat[] = [...filesToShow, ...directoryToShow];

        return (
            <>
                <Box overflowY="auto" className="hide-scrollbar">
                    {finalFiles &&
                        finalFiles
                            ?.sort((file1, file2) => sortFiles(file1, file2))
                            ?.map((file) => (
                                <React.Fragment key={`fragment${file.id}`}>
                                    {(file.id.includes(
                                        '/t_h_i_s_i_s_a_p_r_i_v_a_t_e_f_i_l_e_n_a_m_e.js',
                                    ) ||
                                        file.id.includes(
                                            '/t_h_i_s_i_s_a_p_r_i_v_a_t_e_f_o_l_d_e_r_n_a_m_e/',
                                        )) &&
                                    createFileFolder !== 'none' ? (
                                        <NewFileFolder
                                            currentFile={file}
                                            setNewFileFolder={setNewFileFolder}
                                        />
                                    ) : (
                                        <>
                                            {file.type === 'directory' ? (
                                                <Folder
                                                    currentFile={file}
                                                    key={file.id}
                                                />
                                            ) : (
                                                <>
                                                    <TreeFile
                                                        icon={
                                                            file.name
                                                                .split('.')
                                                                .at(
                                                                    -1,
                                                                ) as codeboxIcons
                                                        }
                                                        currentFile={file}
                                                        key={file.id}
                                                    />
                                                </>
                                            )}
                                        </>
                                    )}
                                </React.Fragment>
                            ))}
                </Box>
            </>
        );
    },
);

const Folder = memo(({ currentFile }: { currentFile: fileFormat }) => {
    const { allFiles, selectedFile } = useAppSelector((state) => state.codebox);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [createNewFileFolder, setCreateNewFileFolder] = useState<
        'file' | 'directory' | 'none'
    >('none');

    const toggleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setIsOpen(() =>
                selectedFile.indexOf(currentFile.id) === 0 ? true : false,
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allFiles, currentFile]);

    return (
        <>
            <TreeFile
                icon={isOpen ? 'OPEN DIRECTORY' : 'CLOSED DIRECTORY'}
                currentFile={currentFile}
                onClick={toggleOpen}
                setIsOpen={setIsOpen}
                setNewFileFolder={setCreateNewFileFolder}
            />
            {isOpen && (
                <>
                    <RenderFileTree
                        files={
                            createNewFileFolder === 'directory'
                                ? {
                                      ...allFiles,
                                      [`${currentFile.id}${
                                          currentFile.type === 'directory'
                                              ? ''
                                              : '/'
                                      }t_h_i_s_i_s_a_p_r_i_v_a_t_e_f_o_l_d_e_r_n_a_m_e/`]:
                                          {
                                              code: '',
                                          },
                                  }
                                : createNewFileFolder === 'file'
                                ? {
                                      ...allFiles,
                                      [`${currentFile.id}${
                                          currentFile.type === 'directory'
                                              ? ''
                                              : '/'
                                      }t_h_i_s_i_s_a_p_r_i_v_a_t_e_f_i_l_e_n_a_m_e.js`]:
                                          {
                                              code: '',
                                          },
                                  }
                                : allFiles
                        }
                        createFileFolder={createNewFileFolder}
                        setNewFileFolder={setCreateNewFileFolder}
                        prefixPath={currentFile.id}
                        key={currentFile.id}
                    />
                </>
            )}
        </>
    );
});

export default memo(FileSide);
