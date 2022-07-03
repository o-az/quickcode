import { defaultTheme, Provider } from '@adobe/react-spectrum';
import { Editor } from '@/components/editor';

export function App() {
  return (
    <Provider theme={defaultTheme} class="h-full w-[5px]">
      <Editor />
    </Provider>
  );
}
