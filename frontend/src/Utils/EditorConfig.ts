import { editor } from 'monaco-editor';

export const editorConfig = (
    language: string,
): editor.IStandaloneEditorConstructionOptions => ({
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: 'on',
    accessibilitySupport: 'auto',
    autoIndent: 'advanced',
    automaticLayout: true,
    codeLens: true,
    colorDecorators: true,
    contextmenu: true,
    autoClosingDelete: 'always',
    comments: {
        ignoreEmptyLines: true,
        insertSpace: true,
    },
    wordWrapOverride1: 'on',
    wordWrapOverride2: 'on',
    'semanticHighlighting.enabled': 'configuredByTheme',
    language: language,
    cursorBlinking: 'blink',
    cursorSmoothCaretAnimation: false,
    cursorStyle: 'line',
    disableLayerHinting: false,
    disableMonospaceOptimizations: false,
    dragAndDrop: false,
    fixedOverflowWidgets: false,
    folding: true,
    foldingStrategy: 'auto',
    fontLigatures: false,
    formatOnPaste: false,
    formatOnType: false,
    hideCursorInOverviewRuler: false,
    links: true,
    mouseWheelZoom: false,
    multiCursorMergeOverlapping: true,
    multiCursorModifier: 'alt',
    overviewRulerBorder: true,
    overviewRulerLanes: 2,
    quickSuggestions: true,
    quickSuggestionsDelay: 100,
    readOnly: false,
    renderControlCharacters: false,
    renderFinalNewline: true,
    renderLineHighlight: 'all',
    renderWhitespace: 'none',
    revealHorizontalRightPadding: 30,
    roundedSelection: true,
    rulers: [],
    scrollBeyondLastColumn: 5,
    scrollBeyondLastLine: true,
    selectOnLineNumbers: true,
    selectionClipboard: true,
    selectionHighlight: true,
    showFoldingControls: 'mouseover',
    smoothScrolling: false,
    suggestOnTriggerCharacters: true,
    wordBasedSuggestions: true,
    // eslint-disable-next-line
    wordSeparators: `~!@#$%^&*()-=+[{]}\|;:'",.<>/?`,
    wordWrap: 'off',
    wordWrapBreakAfterCharacters: '\t})]?|&,;',
    wordWrapBreakBeforeCharacters: '{([+',
    wordWrapColumn: 80,
    wrappingIndent: 'none',
    fontFamily: 'League Mono',
    multiCursorPaste: 'full',
    snippetSuggestions: 'bottom',
    tabCompletion: 'on',
    bracketPairColorization: {
        enabled: true,
    },
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    hover: {
        enabled: true,
    },
});
