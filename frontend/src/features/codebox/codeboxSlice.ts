import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from 'console-feed/lib/definitions/Component';
import {
    chatType,
    codeBoxResponseType,
    codeBoxType,
    fileFormat,
    formatCodeType,
    initialChatType,
    intialCodebox,
    setLanguageAction,
    socketCodeboxUser,
    templateFormat,
} from 'Types';
import { codes } from 'Utils/Code';

import Prettier from 'prettier';
import parserJavascript from 'prettier/parser-babel';
import parserTypeScript from 'prettier/parser-typescript';
import parserHtml from 'prettier/parser-html';
import parserCss from 'prettier/parser-postcss';

import * as esbuild from 'esbuild-wasm';

import { socket } from 'Socket/socket';
import {
    ACTIONS_ADD_FILES_CODE_CLIENT,
    ACTIONS_CODE_CLIENT_CODE,
    ACTIONS_REMOVE_FILES_CODE_CLIENT,
    ACTIONS_RENAME_CODE_FILE_CLIENT,
    ACTIONS_RESET_CODE_CLIENT,
} from 'Socket/actions';
import { AppDispatch } from 'store/store';

import { checkFileExists, makeFilePath, isJSON } from 'Utils/Files';
import { fileImportFetchPlugin } from 'Utils/plugins/fileImportFetchPlugin';

const initialState: intialCodebox = {
    codeBoxType: 'LIBRARY',
    language: 'REACT',

    authenticated: 'IDLE',
    qrcode: {
        id: '',
        secure_url: '',
    },
    _id: '',
    name: '',
    codebox_id: '',
    creator: {
        name: '',
        _id: '',
        email: '',
        profile_photo: {
            id: '',
            secure_url: '',
        },
        user_id: '',
        username: '',
    },

    sidebarComponent: 'None',
    consoleLogs: [],
    allFiles: {
        'Loading....': {
            code: '',
        },
    },
    selectedFile: '',

    users: [],
    chats: [],

    esbuildReady: false,
    initializationCompilationState: 'IDLE',
    outputCode: '',
    outputCss: '',
    outputInitError: '',
};

const codeSlice = createSlice({
    name: 'codebox',
    initialState,
    reducers: {
        setLanguage: (
            state: intialCodebox,
            action: PayloadAction<setLanguageAction>,
        ) => {
            if (
                action.payload.language === 'JAVASCRIPT' ||
                action.payload.language === 'TYPESCRIPT' ||
                action.payload.language === 'CPP' ||
                action.payload.language === 'PYTHON'
            ) {
                state.codeBoxType = 'LANGUAGE';
                state.language = action.payload.language;
            } else {
                state.codeBoxType = 'LIBRARY';
                state.language = action.payload.language;
            }
        },
        setUserJoined: (
            state: intialCodebox,
            action: PayloadAction<codeBoxResponseType>,
        ) => {
            if (
                action.payload.language === 'JAVASCRIPT' ||
                action.payload.language === 'TYPESCRIPT' ||
                action.payload.language === 'CPP' ||
                action.payload.language === 'PYTHON'
            ) {
                state.codeBoxType = 'LANGUAGE';
                state.language = action.payload.language;
            } else {
                state.codeBoxType = 'LIBRARY';
                state.language = action.payload.language;
            }

            state.authenticated = 'AUTHENTICATED';
            state.qrcode = action.payload.qrcode;
            state.name = action.payload.name;
            state.codebox_id = action.payload.codebox_id;
            state.creator = action.payload.creator;
            state._id = action.payload._id;
        },
        resetState: (state: intialCodebox) => {
            state.codeBoxType = 'LIBRARY';
            state.language = 'REACT';

            state.authenticated = 'IDLE';
            state.qrcode = {
                id: '',
                secure_url: '',
            };
            state._id = '';
            state.name = '';
            state.codebox_id = '';
            state.creator = {
                name: '',
                _id: '',
                email: '',
                profile_photo: {
                    id: '',
                    secure_url: '',
                },
                user_id: '',
                username: '',
            };

            state.sidebarComponent = 'None';
            state.consoleLogs = [];

            state.allFiles = {
                'Loading....': {
                    code: '',
                },
            };
            state.selectedFile = '';

            state.users = [];
            state.chats = [];

            // state.esbuildReady = false; cannot uninitalize
            state.initializationCompilationState = 'IDLE';
            state.outputCode = '';
            state.outputCss = '';
            state.outputInitError = '';
        },
        setConsoleLogs: (
            state: intialCodebox,
            action: PayloadAction<Message>,
        ) => {
            state.consoleLogs = [...state.consoleLogs, action.payload];
        },
        clearConsoleLogs: (state: intialCodebox) => {
            state.consoleLogs = [];
        },
        setSidebarComponent: (
            state: intialCodebox,
            action: PayloadAction<{
                component: 'Files' | 'Users' | 'Chat' | 'Collaborate' | 'None';
            }>,
        ) => {
            state.sidebarComponent = action.payload.component;
        },
        setSelectedFile: (
            state: intialCodebox,
            action: PayloadAction<{ filePath: string }>,
        ) => {
            state.selectedFile = action.payload.filePath;
        },
        resetAllFiles: (state: intialCodebox) => {
            state.allFiles = codes[state.language] ?? {
                'Loading....': {
                    code: '',
                },
            };
        },
        changeCode: (
            state: intialCodebox,
            action: PayloadAction<{ code: string; filePath: string }>,
        ) => {
            if (!Object.keys(state.allFiles).includes(action.payload.filePath))
                return state;

            state.allFiles[action.payload.filePath].code = action.payload.code;
        },
        addUsers: (
            state: intialCodebox,
            action: PayloadAction<{
                user: socketCodeboxUser | socketCodeboxUser[];
            }>,
        ) => {
            if (Array.isArray(action.payload.user)) {
                state.users = action.payload.user;
            } else {
                const existingUsers: socketCodeboxUser[] = JSON.parse(
                    JSON.stringify(state.users),
                );

                const isPresent = existingUsers.find(
                    (singleUser) =>
                        // @ts-ignore
                        singleUser.userId === action.payload.user?.userId &&
                        // @ts-ignore
                        singleUser.username === action.payload.user?.username,
                );

                if (!isPresent) {
                    state.users = [...state.users, action.payload.user];
                }
            }
        },
        removeUsers: (
            state: intialCodebox,
            action: PayloadAction<{ userId: string }>,
        ) => {
            const existingUsers: socketCodeboxUser[] = JSON.parse(
                JSON.stringify(state.users),
            );

            state.users = existingUsers.filter(
                (user) => user.userId !== action.payload.userId,
            );
        },
        addChats: (
            state: intialCodebox,
            action: PayloadAction<{ chat: chatType | chatType[] }>,
        ) => {
            if (Array.isArray(action.payload.chat)) {
                state.chats = action.payload.chat;
            } else {
                const existingChats: initialChatType = JSON.parse(
                    JSON.stringify(state.chats),
                );

                const isPresent = existingChats.find(
                    // @ts-ignore
                    (chat) => chat.messageId === action.payload.chat.messageId,
                );

                if (!isPresent) {
                    state.chats = [...state.chats, action.payload.chat];
                }
            }
        },
        changeFileName: (
            state: intialCodebox,
            action: PayloadAction<{ file: fileFormat; fileName: string }>,
        ) => {
            // make new file path
            const newFileName = makeFilePath(
                action.payload.file,
                action.payload.fileName,
            );

            // change file path
            state.allFiles = Object.fromEntries(
                Object.entries(state.allFiles).map(([key, value]) => {
                    if (
                        action.payload.file.type === 'file'
                            ? key === action.payload.file.id
                            : key.indexOf(action.payload.file.id) === 0
                    ) {
                        return [
                            key.replace(action.payload.file.id, newFileName),
                            value,
                        ];
                    }

                    return [key, value];
                }),
            );

            state.selectedFile === action.payload.file.id &&
                (state.selectedFile = newFileName);
        },
        addFile: (
            state: intialCodebox,
            action: PayloadAction<{ file: fileFormat }>,
        ) => {
            const isPresent = checkFileExists(
                action.payload.file,
                state.allFiles,
            );

            if (!!!isPresent) {
                state.allFiles = {
                    ...state.allFiles,
                    [action.payload.file.id as string]: {
                        code: '',
                    },
                };
            }
        },
        removeFile: (
            state: intialCodebox,
            action: PayloadAction<{
                file: fileFormat;
                allFiles: templateFormat;
            }>,
        ) => {
            let finalObj = null;

            // remove files
            if (action.payload.file.type === 'file') {
                finalObj = Object.keys(state.allFiles)
                    .map((key) => {
                        if (key.indexOf(action.payload.file.id) === 0) {
                            return makeFilePath(action.payload.file, '');
                        }
                        return key;
                    })
                    .filter((key) => !!key.match(/\w/));
            } else {
                finalObj = Object.keys(state.allFiles).filter(
                    (key) => key.indexOf(action.payload.file.id) !== 0,
                );
            }

            // make obj
            finalObj = finalObj.reduce((acc, key) => {
                return {
                    ...acc,
                    [key]: action.payload.allFiles[key] ?? {
                        code: '',
                    },
                };
            }, {});

            state.allFiles = finalObj;
        },
        initEsbuild: (state: intialCodebox) => {
            state.initializationCompilationState = 'COMPILING';
            state.outputInitError = '';
        },
        initEsbuildSuccess: (state: intialCodebox) => {
            state.initializationCompilationState = 'COMPILED';
            state.esbuildReady = true;
            state.outputInitError = '';
        },
        initEsbuildFailure: (
            state: intialCodebox,
            action: PayloadAction<{ message: string }>,
        ) => {
            state.esbuildReady = false;
            state.outputInitError = action.payload.message;
            state.initializationCompilationState = 'COMPILED';
        },
        compileStart: (state: intialCodebox) => {
            state.initializationCompilationState = 'COMPILING';
            state.outputInitError = '';
            state.outputCode = '';
            state.outputCss = '';
        },
        compileSuccess: (
            state: intialCodebox,
            action: PayloadAction<{ code: string; css: string }>,
        ) => {
            state.initializationCompilationState = 'COMPILED';
            state.outputInitError = '';
            state.outputCode = action.payload.code;
            state.outputCss = action.payload.css;
        },
        compileError: (
            state: intialCodebox,
            action: PayloadAction<{ message: string }>,
        ) => {
            state.initializationCompilationState = 'COMPILED';
            state.outputCode = '';
            state.outputCss = '';
            state.outputInitError = action.payload.message;
        },
    },
    extraReducers: (builder) => {
        //
    },
});

export const resetCodeFn = (
    emit: boolean,
    dispatch: AppDispatch,
    language: codeBoxType,
    codeBoxType: 'LIBRARY' | 'LANGUAGE',
    codebox_id: string,
) => {
    dispatch(resetAllFiles());

    const selectFile = codes[language];

    let initalFilePath = Object.keys(selectFile)[0];

    if (codeBoxType === 'LIBRARY') {
        const ObjectKeys = Object.keys(selectFile);

        if (language === 'REACT')
            ObjectKeys.map(
                (key) =>
                    key.includes('/index.jsx') ||
                    (key.includes('/index.js') && (initalFilePath = key)),
            );

        if (language === 'REACT TYPESCRIPT')
            ObjectKeys.map(
                (key) =>
                    key.includes('/index.tsx') ||
                    key.includes('/index.ts') ||
                    key.includes('/index.jsx') ||
                    (key.includes('/index.js') && (initalFilePath = key)),
            );
    }

    dispatch(
        setSelectedFile({
            filePath: initalFilePath,
        }),
    );

    if (emit) {
        socket.emit(ACTIONS_RESET_CODE_CLIENT, {
            language,
            codeBoxType,
            codebox_id,
        });
    }
};

export const formatCode: formatCodeType = (
    dispatch: AppDispatch,
    selectedFilePath: string,
    codebox_id: string,
    allFiles: templateFormat,
) => {
    const language: 'js' | 'jsx' | 'ts' | 'tsx' | 'css' | 'html' | 'json' =
        (selectedFilePath.split('/').at(-1)?.split('.').at(-1) as
            | 'js'
            | 'jsx'
            | 'ts'
            | 'tsx'
            | 'css'
            | 'html'
            | 'json') ?? 'js';

    const prettifiedCode = Prettier.format(
        allFiles[selectedFilePath].code ?? '',
        {
            parser:
                language === 'js'
                    ? 'babel'
                    : language === 'jsx'
                    ? 'babel'
                    : language === 'ts'
                    ? 'typescript'
                    : language === 'tsx'
                    ? 'babel-ts'
                    : language === 'css'
                    ? 'css'
                    : language === 'html'
                    ? 'html'
                    : language === 'json'
                    ? 'json'
                    : 'babel',
            plugins: [
                parserJavascript,
                parserTypeScript,
                parserHtml,
                parserCss,
            ],
            arrowParens: 'always',
            bracketSameLine: true,
            singleQuote: true,
            semi: true,
            jsxSingleQuote: false,
            tabWidth: 4,
            endOfLine: 'lf',
            htmlWhitespaceSensitivity: 'css',
            jsxBracketSameLine: false,
            printWidth: 80,
            proseWrap: 'preserve',
            quoteProps: 'as-needed',
            requirePragma: false,
            trailingComma: 'all',
            useTabs: false,
        },
    ).replace(/\n$/, '');

    dispatch(changeCode({ code: prettifiedCode, filePath: selectedFilePath }));

    socket.emit(ACTIONS_CODE_CLIENT_CODE, {
        codebox_id,
        code: prettifiedCode,
        filePath: selectedFilePath,
    });
};

export const selectFile = (
    filePath: string,
    dispatch: AppDispatch,
    allFiles: templateFormat,
) =>
    Object.keys(allFiles).includes(filePath) &&
    dispatch(setSelectedFile({ filePath }));

export const renameFile = (
    dispatch: AppDispatch,
    file: fileFormat,
    fileName: string,
    codebox_id: string,
) => {
    dispatch(changeFileName({ file, fileName }));

    socket.emit(ACTIONS_RENAME_CODE_FILE_CLIENT, {
        file,
        fileName,
        codebox_id,
    });
};

export const createFileFolder = (
    dispatch: AppDispatch,
    file: fileFormat,
    codebox_id: string,
) => {
    dispatch(addFile({ file }));

    socket.emit(ACTIONS_ADD_FILES_CODE_CLIENT, {
        file,
        codebox_id,
    });
};

export const removeFileFolder = (
    dispatch: AppDispatch,
    codebox_id: string,
    file: fileFormat,
    allFiles: templateFormat,
) => {
    if (!checkFileExists(file, allFiles)) return;

    dispatch(removeFile({ file, allFiles }));

    socket.emit(ACTIONS_REMOVE_FILES_CODE_CLIENT, {
        file,
        codebox_id,
    });
};

export const initializeEsbuild = async (dispatch: AppDispatch) => {
    dispatch(initEsbuild());

    await esbuild
        .initialize({
            worker: true,
            wasmURL: 'https://www.unpkg.com/esbuild-wasm@0.14.51/esbuild.wasm',
        })
        .then(() => dispatch(initEsbuildSuccess()))
        .catch(async (error) => {
            let output = `Build failed with ${error?.errors?.length} error(s):\n\n`;

            let formatted = await esbuild.formatMessages(error?.errors, {
                kind: 'error',
            });

            formatted.forEach((str) => {
                output += str;
            });

            dispatch(initEsbuildFailure({ message: output ?? error.message }));
        });
};

export const compileCode = async (
    dispatch: AppDispatch,
    rawCode: templateFormat,
) => {
    dispatch(compileStart());

    try {
        const result = await esbuild.build({
            entryPoints: [
                isJSON(rawCode?.['/buildConfig.json']?.code)
                    ? JSON.parse(rawCode['/buildConfig.json'].code).entry_file
                    : 'index',
            ],
            bundle: true,
            minify: true,
            write: false,
            outdir: '/codebox',
            format: 'iife',
            plugins: [
                fileImportFetchPlugin({
                    allFiles: rawCode,
                }),
            ],
            target: 'esnext',
            jsx: 'automatic',
            jsxImportSource: 'react',
            tsconfig:
                rawCode['/tsconfig.json'] &&
                isJSON(rawCode?.['/tsconfig.json']?.code)
                    ? JSON.parse(rawCode['/tsconfig.json'].code)
                    : `{
                "compilerOptions": {
                    "allowJs": true,
                    "esModuleInterop": true,
                    "forceConsistentCasingInFileNames": true,
                    "isolatedModules": true,
                    "lib": ["DOM", "DOM.Iterable", "ESNext"],
                    "module": "ESNext",
                    "noEmit": true,
                    "resolveJsonModule": true,
                    "skipLibCheck": true,
                    "strict": true,
                    "useUnknownInCatchVariables": false,
                    "target": "ESNext",
                },
              }`,
        });

        dispatch(
            compileSuccess({
                code: result.outputFiles?.[0]?.text ?? '',
                css: result.outputFiles?.[1]?.text ?? '',
            }),
        );
    } catch (error) {
        let output = `Build failed with ${error?.errors?.length} error(s):\n\n`;

        let formatted = await esbuild.formatMessages(error?.errors, {
            kind: 'error',
        });

        formatted.forEach((str) => {
            output += str;
        });

        dispatch(compileError({ message: output ?? error.message }));
    }
};

export const transformCode: (
    rawCode: string,
    fileExtension: 'js' | 'ts',
) => Promise<{ type: 'error' | 'code'; code: string }> = async (
    rawCode,
    fileExtension,
) => {
    let finalCode: { type: 'error' | 'code'; code: string } = {
        type: 'error',
        code: '',
    };

    try {
        const result = await esbuild.transform(rawCode, {
            minify: true,
            format: 'iife',
            platform: 'browser',
            tsconfigRaw: `{
                "compilerOptions": {
                    "allowJs": true,
                    "esModuleInterop": true,
                    "forceConsistentCasingInFileNames": true,
                    "isolatedModules": true,
                    "lib": ["DOM", "DOM.Iterable", "ESNext"],
                    "module": "ESNext",
                    "noEmit": true,
                    "resolveJsonModule": true,
                    "skipLibCheck": true,
                    "strict": true,
                    "useUnknownInCatchVariables": false,
                    "target": "ESNext",
                },
              }`,
            loader:
                fileExtension === 'js'
                    ? 'js'
                    : fileExtension === 'ts'
                    ? 'ts'
                    : 'js',
        });

        finalCode = { type: 'code', code: result.code ?? '' };
    } catch (error) {
        let output = `Failed with ${error?.errors?.length} error(s):\n\n`;

        let formatted = await esbuild.formatMessages(error?.errors, {
            kind: 'error',
        });

        formatted.forEach((str) => {
            output += str;
        });

        finalCode = { type: 'error', code: output ?? error.message };
    }

    return finalCode;
};

export const codeReducer = codeSlice.reducer;
export const {
    setLanguage,
    setUserJoined: setUserJoinedCodebox,
    resetState: resetCodeboxState,
    setConsoleLogs,
    clearConsoleLogs,
    setSidebarComponent,
    setSelectedFile,
    resetAllFiles,
    changeCode,
    addUsers,
    removeUsers,
    addChats,
    changeFileName,
    addFile,
    removeFile,
    initEsbuild,
    initEsbuildFailure,
    initEsbuildSuccess,
    compileStart,
    compileError,
    compileSuccess,
} = codeSlice.actions;
