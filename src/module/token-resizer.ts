// Import TypeScript modules
import { registerHooks } from './util/setup/hooks.js';
let appId = '';
appId = '3';
const globals = {
  appId,
};

declare global {
  const TokenAttractor: typeof globals;
  interface Window {
    TokenAttractor: typeof globals;
  }
  interface LenientGlobalVariableTypes {
    game: Game;
  }
}

window.TokenAttractor = globals;

registerHooks();
