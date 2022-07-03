import { useState } from 'preact/hooks';
import { ActionButton, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <TooltipTrigger delay={0}>
      <ActionButton
        isQuiet
        aria-label="Format Code"
        UNSAFE_className="hover:cursor-pointer"
        onPress={(event: MouseEvent) => {
          if (!text) return;
          navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="w-7 text-green hover:text-green-200 text-2xl text-whit mb-2 md:mb-0 md:mt-1"
            viewBox="0 0 48 48"
          >
            <path fill="#43A047" d="M40.6 12.1L17 35.7l-9.6-9.6L4.6 29L17 41.3l26.4-26.4z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            class="w-8 text-2xl text-white mb-1 mt-2 md:mb-0 md:mt-1"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="M4 4.085V10.5a2.5 2.5 0 0 0 2.336 2.495L6.5 13h4.414A1.5 1.5 0 0 1 9.5 14H6a3 3 0 0 1-3-3V5.5a1.5 1.5 0 0 1 1-1.415ZM11.5 2A1.5 1.5 0 0 1 13 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 5 10.5v-7A1.5 1.5 0 0 1 6.5 2h5Zm0 1h-5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5Z"
            />
          </svg>
        )}
      </ActionButton>
      <Tooltip>Copy code</Tooltip>
    </TooltipTrigger>
  );
}
