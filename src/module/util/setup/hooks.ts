import { changeTokensSizeIfInTheSameGridPosition, storeOriginalPosition } from '../resize';

export function registerHooks(): void {
  Hooks.on('preUpdateToken', storeOriginalPosition);
  Hooks.on('updateToken', changeTokensSizeIfInTheSameGridPosition);
}
