import { createElement } from 'preact';
import clsx from 'clsx';
import type { JSXInternal } from 'preact/src/jsx';

export function Icon({
  icon,
  collection = 'carbon',
  elementType,
  attributes,
  twStyle,
}: {
  icon: string;
  collection?: string;
  elementType?: string;
  twStyle?: string;
  attributes?: (JSXInternal.HTMLAttributes & JSXInternal.SVGAttributes & Record<string, any>) | null;
}) {
  return createElement(elementType || 'div', {
    ...{
      class: clsx(
        `i-${collection}-${icon} dark:i-${collection}-logo-${icon} text-2xl hover:text-gray-300 mt-1 color-white`,
        twStyle
      ),
      ...attributes,
    },
  });
}
