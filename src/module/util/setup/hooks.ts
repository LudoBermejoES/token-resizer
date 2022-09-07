import { changeTokensSizeIfInTheSameGridPosition, storeOriginalPosition } from '../../libs/resize';
import { registerFunctions } from './socketkib';

export function registerHooks(): void {
  Hooks.once('socketlib.ready', registerFunctions);
  Hooks.on('preUpdateToken', storeOriginalPosition);
  Hooks.on('updateToken', changeTokensSizeIfInTheSameGridPosition);
}
