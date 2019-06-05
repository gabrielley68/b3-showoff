import {START_GAME, ATTACK, HEAL} from "../Action/game";

const initialGame = {
    gameStarted: false,
    playerTurn: true,
    enemyHp: 100,
    playerHp: 100,
};

function heal(actualHp, healValue){
    actualHp += healValue;
    return actualHp > 100 ? 100 : actualHp;
}

const game = (state = initialGame, action) => {
    switch(action.type){
        case START_GAME:
            return {
                ...state,
                gameStarted: true
            };
        case ATTACK:
            return {
                ...state,
                playerTurn: !state.playerTurn,
                enemyHp: action.enemyAttack ? state.enemyHp : state.enemyHp - action.valeur,
                playerHp: action.enemyAttack ? state.playerHp - action.valeur : state.playerHp
            };
        case HEAL:
            return {
                ...state,
                playerTurn: !state.playerTurn,
                enemyHp: action.enemyHeal ? heal(state.enemyHp, action.valeur) : state.enemyHp,
                playerHp: action.enemyHeal ? state.playerHp : heal(state.playerHp,action.valeur)
            };
        default:
            return state;
    }
};

export const isGameStarted = state => state.gameStarted;
export const isPlayerTurn = state => state.playerTurn;
export const getEnemyHp = state => state.enemyHp;
export const getPlayerHp = state => state.playerHp;

export {game}