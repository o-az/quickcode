import { useEffect, useState, useCallback, useRef } from 'preact/hooks';
import { js_beautify } from 'js-beautify';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { json } from '@codemirror/lang-json';
import CodeMirror, { useCodeMirror, type ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import type { ViewUpdate } from '@codemirror/view';
import Split from '@uiw/react-split';
import {
  ActionButton,
  Item,
  Keyboard,
  Menu,
  MenuTrigger,
  Tooltip,
  TooltipTrigger,
  NumberField,
} from '@adobe/react-spectrum';
import { CopyButton } from '@/components/copy-button';
import { autocompletion } from '@codemirror/autocomplete';
import { linter } from '@codemirror/lint';
import { useWindowSize } from '@/hooks/use-window-size';
import clsx from 'clsx';

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
    if (editorRef.current) editorHook.setContainer(editorRef.current);
  }, [editorRef.current]);

  const { width, height } = useWindowSize();

  return (
    <main class="bg-transparent h-full min-h-full w-full border-none shadow-none overflow-y-autol">
      <header class="w-full mx-4 mt-1 border-b border-b-gray-600 pb-2 space-x-4 flex justify-between bg-[#191a29] px-5">
        {Number(width) > 768 ? (
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
                try {
                  const { minify } = await import('terser');
                  const minified = await minify(code);
                  setCode(minified.code || code);
                } catch (error) {
                  console.log('Only JavaScript can be minified');
                }
              }}
            >
              compress
            </ActionButton>
          </div>
        ) : (
          <MenuTrigger>
            <ActionButton>Edit</ActionButton>
            <Menu UNSAFE_className="pl-3">
              <Item key="cut" textValue="cut">
                <NumberField
                  artia-label="indent size"
                  defaultValue={2}
                  minValue={2}
                  width="15px"
                  UNSAFE_className="pt-2"
                  isReadOnly={!code}
                  onChange={(value: number) => formatCode({ formatOptions: { indent_size: value } })}
                />
                <Keyboard>Indent</Keyboard>
              </Item>
            </Menu>
          </MenuTrigger>
        )}
        <div class="flex space-x-3 pr-2">
          <CopyButton text={code} />
          <TooltipTrigger delay={0}>
            <ActionButton
              UNSAFE_className="hover:cursor-pointer"
              isQuiet
              aria-label="Format Code"
              onPress={(event: MouseEvent) => {
                if (!code) return;
                formatCode({ event });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                class="text-2xl w-6 mb-1 md:mb-0 mt-1.5 md:mt-1"
                viewBox="0 0 256 256"
              >
                <rect width="24.381" height="12.19" x="182.857" y="48.762" fill="#56B3B4" rx="5" />
                <rect width="73.143" height="12.19" y="243.81" fill="#EA5E5E" rx="5" />
                <rect width="48.762" height="12.19" x="146.286" y="146.286" fill="#BF85BF" rx="5" />
                <rect width="60.952" height="12.19" x="73.143" y="146.286" fill="#EA5E5E" rx="5" />
                <rect width="60.952" height="12.19" y="146.286" fill="#56B3B4" rx="5" />
                <rect width="73.143" height="12.19" y="195.048" fill="#BF85BF" rx="5" />
                <rect width="73.143" height="12.19" y="97.524" fill="#BF85BF" rx="5" />
                <rect width="134.095" height="12.19" x="60.952" y="24.381" fill="#F7BA3E" rx="5" />
                <rect width="48.762" height="12.19" y="24.381" fill="#EA5E5E" rx="5" />
                <rect width="24.381" height="12.19" x="48.762" y="219.429" fill="#F7BA3E" rx="5" />
                <rect width="24.381" height="12.19" x="48.762" y="73.143" fill="#56B3B4" rx="5" />
                <rect width="36.571" height="12.19" y="219.429" fill="#56B3B4" rx="5" />
                <rect width="36.571" height="12.19" y="73.143" fill="#F7BA3E" rx="5" />
                <rect width="24.381" height="12.19" x="158.476" y="219.429" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="60.952" height="12.19" x="85.333" y="219.429" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="60.952" height="12.19" x="195.048" y="219.429" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="109.714" height="12.19" x="97.524" y="121.905" fill="#56B3B4" rx="5" />
                <rect width="48.762" height="12.19" x="36.571" y="121.905" fill="#F7BA3E" rx="5" />
                <rect width="24.381" height="12.19" y="121.905" fill="#EA5E5E" rx="5" />
                <rect width="60.952" height="12.19" x="109.714" y="48.762" fill="#BF85BF" rx="5" />
                <rect width="97.524" height="12.19" y="48.762" fill="#56B3B4" rx="5" />
                <rect width="121.905" height="12.19" x="36.571" y="170.667" fill="#F7BA3E" rx="5" />
                <rect width="24.381" height="12.19" y="170.667" fill="#BF85BF" rx="5" />
                <rect width="73.143" height="12.19" x="146.286" y="73.143" fill="#EA5E5E" rx="5" />
                <rect width="73.143" height="12.19" x="146.286" y="97.524" fill="#F7BA3E" rx="5" />
                <rect width="158.476" height="12.19" fill="#56B3B4" rx="5" />
                <rect width="85.333" height="12.19" x="170.667" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="36.571" height="12.19" x="170.667" y="170.667" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="36.571" height="12.19" x="219.429" y="170.667" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="48.762" height="12.19" x="207.238" y="146.286" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="48.762" height="12.19" x="207.238" y="24.381" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="36.571" height="12.19" x="219.429" y="121.905" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="36.571" height="12.19" x="219.429" y="48.762" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="24.381" height="12.19" x="231.619" y="73.143" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="24.381" height="12.19" x="231.619" y="97.524" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="121.905" height="12.19" x="134.095" y="195.048" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="36.571" height="12.19" x="85.333" y="195.048" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="73.143" height="12.19" x="182.857" y="243.81" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="85.333" height="12.19" x="85.333" y="243.81" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="48.762" height="12.19" x="85.333" y="73.143" fill="#D0D4D8" opacity=".5" rx="5" />
                <rect width="48.762" height="12.19" x="85.333" y="97.524" fill="#D0D4D8" opacity=".5" rx="5" />
              </svg>
            </ActionButton>

            <Tooltip placement="bottom" defaultOpen={true}>
              Format code
            </Tooltip>
          </TooltipTrigger>
          <a href="https://github.com/o-az" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              class="text-2xl w-6 mt-1 hover:color-blue"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M21.035 5.257c.91 1.092 1.364 2.366 1.364 3.822c0 5.277-3.002 6.824-5.823 7.279c.364.637.455 1.365.455 2.093v3.73c0 .455-.273.728-.637.728a.718.718 0 0 1-.728-.728v-3.73a2.497 2.497 0 0 0-.728-2.093l.455-1.183c2.821-.364 5.733-1.274 5.733-6.187c0-1.183-.455-2.275-1.274-3.185l-.182-.727a4.04 4.04 0 0 0 .09-2.73c-.454.09-1.364.273-2.91 1.365l-.547.09a13.307 13.307 0 0 0-6.55 0l-.547-.09C7.57 2.71 6.66 2.437 6.204 2.437c-.273.91-.273 1.91.09 2.73l-.181.727c-.91.91-1.365 2.093-1.365 3.185c0 4.822 2.73 5.823 5.732 6.187l.364 1.183c-.546.546-.819 1.274-.728 2.002v3.821a.718.718 0 0 1-.728.728a.718.718 0 0 1-.728-.728V20.18c-3.002.637-4.185-.91-5.095-2.092c-.455-.546-.819-1.001-1.274-1.092c-.09-.091-.364-.455-.273-.819c.091-.364.455-.637.82-.455c.91.182 1.455.91 2 1.547c.82 1.092 1.639 2.092 4.095 1.547v-.364c-.09-.728.091-1.456.455-2.093c-2.73-.546-5.914-2.093-5.914-7.279c0-1.456.455-2.73 1.365-3.822c-.273-1.273-.182-2.638.273-3.73l.455-.364C5.749 1.073 7.023.8 9.66 2.437a13.673 13.673 0 0 1 6.642 0C18.851.708 20.216.98 20.398 1.072l.455.364c.455 1.274.546 2.548.182 3.821z"
              />
            </svg>
          </a>
        </div>
      </header>
      <Split
        mode={Number(width) > 768 ? 'horizontal' : 'vertical'}
        renderBar={({ onMouseDown, onMouseMove, ...props }) => {
          return (
            <div {...props} class="shadow-none bg-transparent border">
              {/*eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div
                onMouseDown={onMouseDown as any}
                onMouseMove={onMouseMove as any}
                class={clsx(
                  `bg-[#ffd6f7] border shadow-none text-center mx-auto border-2 boder-[#ffd6f7] w-[368px] md:w-[1px] h-[1px] md:h-full`
                )}
              />
            </div>
          );
        }}
      >
        <section
          class="h-1/2 md:h-full md:min-h-[1px] md:h-1/12 max-h-full w-full md:w-1/2 p-3 pl-0 bg-transparent"
          ref={editorRef}
        />
        <section class="h-1/2 md:h-full md:min-h-[1px] md:h-1/12 max-h-full w-full md:w-1/2 p-3 pl-0 bg-transparent">
          {code && (
            <CodeMirror
              {...codeMirrorOptions({
                value: code,
                onChange,
                readOnly: true,
              })}
            />
          )}
        </section>
      </Split>
    </main>
  );
}
