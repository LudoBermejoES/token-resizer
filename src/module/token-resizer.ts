// Import TypeScript modules
import { registerHooks } from './util/setup/hooks.js';
import { registerFunctions, SockerLibSocket } from './util/setup/socketkib';
const globals = {};

declare global {
  const TokenResizer: typeof globals & { socket: SockerLibSocket };
  interface Window {
    TokenResizer: typeof globals;
  }
  interface LenientGlobalVariableTypes {
    game: Game;
  }
}

window.TokenResizer = globals;

registerHooks();
