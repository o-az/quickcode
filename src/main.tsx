import { render } from 'preact';
import { App } from './app';
import './index.css';
import 'virtual:uno.css';
import '@unocss/reset/tailwind.css';

render(<App />, document.getElementById('app') as unknown as HTMLElement);
