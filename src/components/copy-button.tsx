import { useState } from 'preact/hooks';
import { Icon } from '@/components/icon';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  if (copied) return <Icon icon="checkmark" elementType="button" twStyle="text-green hover:text-green-200" />;
  return (
    <Icon
      icon="copy-20-regular"
      collection="fluent"
      elementType="button"
      attributes={{
        onClick: event => {
          event.preventDefault();
          if (!text) return;
          navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        },
      }}
    />
  );
}
