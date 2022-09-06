function storeOriginalPosition(token, changes) {
    if (changes.x || changes.y) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        token.data.originalPosition = game?.canvas?.grid?.grid?.getGridPositionFromPixels(token.data.x, token.data.y) || [
            0, 0,
        ];
    }
}
function divideTokensByPosition(newGridPosition, originalPosition) {
    const tokens = game?.scenes?.active?.data?.tokens || [];
    const tokensInSamePos = tokens.filter((t) => {
        const gridPosition = game?.canvas?.grid?.grid?.getGridPositionFromPixels(t.data.x, t.data.y) || [0, 0];
        return gridPosition[0] === newGridPosition[0] && gridPosition[1] === newGridPosition[1];
    });
    const tokensInTheOldPos = tokens.filter((t) => {
        const gridPosition = game?.canvas?.grid?.grid?.getGridPositionFromPixels(t.data.x, t.data.y) || [0, 0];
        return gridPosition[0] === originalPosition[0] && gridPosition[1] === originalPosition[1];
    });
    return {
        tokensInTheOldPos,
        tokensInSamePos,
    };
}
function reduceTokensInTheSamePosition(tokensInSamePos) {
    for (let i = 0; i < tokensInSamePos.length; i++) {
        const token = tokensInSamePos[i];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        token.beforeResize = {
            x: token.data.x,
            y: token.data.y,
        };
        if (token.data.width === 1) {
            const size = (game?.canvas?.grid?.grid?.w || 0) / 4;
            token.data.width = 0.5;
            token.data.height = 0.5;
            let newX = 0;
            let newY = 0;
            switch (i) {
                case 0:
                    newX = token.data.x;
                    newY = token.data.y + size;
                    break;
                case 1:
                    newX = token.data.x + size * 2;
                    newY = token.data.y + size;
                    break;
            }
            token.data.x = newX;
            token.data.y = newY;
            token.update({ width: 0.5, height: 0.5, x: newX, y: newY });
        }
    }
}
async function restoreTokensIfTheyAreReduced(token, tokensInTheOldPos) {
    if (token.data.width !== 0.5)
        return;
    await token.update({ width: 1, height: 1 });
    const getSnapped = game?.canvas?.grid?.grid?.getSnappedPosition(token.data.x, token.data.y) || [0, 0];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await token.update({ width: 1, height: 1, x: getSnapped.x, y: getSnapped.y });
    if (tokensInTheOldPos.length === 1) {
        for (let i = 0; i < tokensInTheOldPos.length; i++) {
            const token = tokensInTheOldPos[i];
            if (token.data.width === 0.5) {
                token.data.width = 1;
                token.data.height = 1;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await token.update({ width: 1, height: 1, x: token.beforeResize.x, y: token.beforeResize.y });
            }
        }
    }
}
async function changeTokensSizeIfInTheSameGridPosition(token, changes) {
    if (changes.x === undefined && changes.y === undefined)
        return;
    if (!game.user?.isGM)
        return;
    const newGridPosition = game?.canvas?.grid?.grid?.getGridPositionFromPixels(changes.x || token.data.x, changes.y || token.data.y) || [0, 0];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const originalPosition = token.data.originalPosition;
    if (originalPosition[0] === newGridPosition[0] && originalPosition[1] === newGridPosition[1])
        return;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await CanvasAnimation.getAnimation(token.object.movementAnimationName).promise;
    const { tokensInTheOldPos, tokensInSamePos } = divideTokensByPosition(newGridPosition, originalPosition);
    tokensInSamePos.length > 1
        ? reduceTokensInTheSamePosition(tokensInSamePos)
        : restoreTokensIfTheyAreReduced(token, tokensInTheOldPos);
}

function registerHooks() {
    Hooks.on('preUpdateToken', storeOriginalPosition);
    Hooks.on('updateToken', changeTokensSizeIfInTheSameGridPosition);
}

// Import TypeScript modules
let appId = '';
appId = '3';
const globals = {
    appId,
};
window.TokenAttractor = globals;
registerHooks();
//# sourceMappingURL=token-resizer.js.map
