import { SingleMonaco } from 'features';
import { useAppSelector } from 'store/hooks';

const MonacoEditorBox = () => {
    const { selectedFile, allFiles, codebox_id } = useAppSelector(
        (state) => state.codebox,
    );

    return (
        <>
            {Object.keys(allFiles).map(
                (filePath) =>
                    filePath &&
                    filePath === selectedFile && (
                        <SingleMonaco
                            filePath={filePath}
                            language={
                                (filePath.split('.').at(-1)?.toLowerCase() as
                                    | 'js'
                                    | 'jsx'
                                    | 'ts'
                                    | 'tsx'
                                    | 'html'
                                    | 'css'
                                    | 'json') ?? 'javascript'
                            }
                            codebox_id={codebox_id}
                            allFiles={allFiles}
                            key={`monaoc ${filePath}`}
                        />
                    ),
            )}
        </>
    );
};

export default MonacoEditorBox;
