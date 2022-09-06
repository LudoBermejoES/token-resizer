import { changeTokensSizeIfInTheSameGridPosition, storeOriginalPosition } from '../../libs/resize';

export function registerHooks(): void {
  Hooks.on('preUpdateToken', storeOriginalPosition);
  Hooks.on('updateToken', changeTokensSizeIfInTheSameGridPosition);
}
