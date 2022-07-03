import { json } from '@codemirror/lang-json';
import { useEffect, useState, useCallback, useRef } from 'preact/hooks';
import { js_beautify } from 'js-beautify';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import CodeMirror, { useCodeMirror, type ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import type { ViewUpdate } from '@codemirror/view';
import Split from '@uiw/react-split';
import { ActionButton, NumberField } from '@adobe/react-spectrum';
import { Icon } from '@/components/icon';
import { CopyButton } from '@/components/copy-button';
import { minify } from 'terser';
import { autocompletion } from '@codemirror/autocomplete';
import { linter } from '@codemirror/lint';

const codeMirrorOptions = (options: ReactCodeMirrorProps) => ({
  height: '100%',
  width: '100%',
  theme: dracula,
  linter,
  extensions: [javascript({ jsx: true, typescript: true }), json(), python(), autocompletion()],
  ...options,
});

export function Editor() {
  const [code, setCode] = useState('');

  const formatCode = ({
    event,
    formatOptions,
  }: {
    event?: MouseEvent;
    formatOptions?: js_beautify.JSBeautifyOptions;
  } = {}) => {
    const formattedCode = js_beautify(code, { indent_size: 2, ...formatOptions });
    setCode(formattedCode);
  };

  const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => setCode(value), []);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorHook = useCodeMirror({ ...codeMirrorOptions({ value: code, onChange }) });

  useEffect(() => {
    if (editorRef.current) {
      editorHook.setContainer(editorRef.current);
    }
  }, [editorRef.current]);

  return (
    <main class="bg-[#272a36] h-full min-h-full w-full border-none shadow-none overflow-y-auto">
      <header class="w-full mx-4 mt-1 border-b border-b-gray-600 pb-2 space-x-4 flex justify-between max-w-[95%]">
        <div class="flex space-x-4">
          <NumberField
            label="Indent"
            labelPosition="side"
            artia-label="indent size"
            defaultValue={2}
            minValue={2}
            width="15px"
            UNSAFE_className="pr-20"
            isReadOnly={!code}
            onChange={(value: number) => formatCode({ formatOptions: { indent_size: value } })}
          />
          <p />
          <ActionButton UNSAFE_className="ml-24" onPress={formatCode} artia-label="format button">
            format
          </ActionButton>
          <ActionButton
            UNSAFE_className="ml-24"
            artia-label="compress button"
            onPress={async () => {
              const minified = await minify(code);
              setCode(minified.code || code);
            }}
          >
            compress
          </ActionButton>
        </div>
        <CopyButton text={code} />
        <a href="https://github.com/o-az" target="_blank" rel="noopener noreferrer">
          <Icon icon="logo-github" />
        </a>
      </header>
      <Split
        class="h-full w-full border-none shadow-none"
        renderBar={({ onMouseDown, ...props }) => {
          return (
            <div {...props} class="shadow-none bg-transparent border-none">
              {/*eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div onMouseDown={onMouseDown as any} class="border-none shadow-none bg-[#172236] w-2" />
            </div>
          );
        }}
      >
        <section class="h-full min-h-full w-[55%] p-3 pl-0 border-none" ref={editorRef} />
        <section class="h-[100%] max-h-full w-[55%] p-3 pl-0 border-none">
          <CodeMirror
            {...codeMirrorOptions({
              value: code,
              onChange,
              readOnly: true,
            })}
          />
        </section>
      </Split>
    </main>
  );
}
