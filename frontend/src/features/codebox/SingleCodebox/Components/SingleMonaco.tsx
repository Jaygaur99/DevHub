import { Box } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';

import { ContainerLoader } from 'Components';
import { changeCode } from 'features';
import Editor from '@monaco-editor/react';

import { editorConfig } from 'Utils/EditorConfig';

import { templateFormat } from 'Types';

import { useAppDispatch } from 'store/hooks';
import useDebouce from 'Hooks/useDebounce';

import { socket } from 'Socket/socket';
import { ACTIONS_CODE_CLIENT_CODE } from 'Socket/actions';

const SingleMonaco = ({
    filePath,
    language,
    codebox_id,
    allFiles,
}: {
    filePath: string;
    language: 'js' | 'jsx' | 'ts' | 'tsx' | 'html' | 'css' | 'json';
    codebox_id: string;
    allFiles: templateFormat;
}) => {
    const [input, setInput] = useState(allFiles[filePath].code ?? '');
    const debouncedInput = useDebouce(input, 700);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (debouncedInput !== undefined || debouncedInput !== null) {
            if (allFiles[filePath].code === debouncedInput) return;

            socket.emit(ACTIONS_CODE_CLIENT_CODE, {
                codebox_id,
                code: debouncedInput,
                filePath,
            });

            dispatch(changeCode({ code: debouncedInput, filePath: filePath }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedInput, dispatch]);

    useEffect(() => {
        if (allFiles[filePath].code !== input) {
            setInput(allFiles[filePath].code ?? '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allFiles[filePath].code]);

    const beforeMount = (
        monaco: typeof import('monaco-editor/esm/vs/editor/editor.api'),
    ) => {
        (language === 'js' ||
            language === 'jsx' ||
            language === 'ts' ||
            language === 'tsx') &&
            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.Latest,
                module: monaco.languages.typescript.ModuleKind.ESNext,
                allowNonTsExtensions: true,
                lib: ['DOM', 'DOM.Iterable', 'ESNext'],
                noSyntaxValidation: true,
                jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
                allowJs: true,
                esModuleInterop: true,
                noEmit: true,
            });
    };

    const handleChange = (event: string | undefined) => setInput(event ?? '');

    return (
        <>
            <Box flex="1 1 0px" width="100%" height="100%">
                <Editor
                    value={input}
                    height="100%"
                    loading={<ContainerLoader />}
                    onChange={handleChange}
                    language={
                        language === 'js'
                            ? 'javascript'
                            : language === 'css'
                            ? 'css'
                            : language === 'html'
                            ? 'html'
                            : language === 'json'
                            ? 'json'
                            : language === 'jsx'
                            ? 'javascript'
                            : language === 'ts'
                            ? 'typescript'
                            : language === 'tsx'
                            ? 'typescript'
                            : 'javascript'
                    }
                    options={editorConfig(language)}
                    beforeMount={beforeMount}
                />
            </Box>
        </>
    );
};

export default memo(SingleMonaco);
