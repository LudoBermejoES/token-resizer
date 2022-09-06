// Import TypeScript modules
import { registerHooks } from './util/setup/hooks.js';
const globals = {};

declare global {
  interface Window {
    TokenResizer: typeof globals;
  }
  interface LenientGlobalVariableTypes {
    game: Game;
  }
}

registerHooks();
