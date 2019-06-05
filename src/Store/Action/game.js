export const START_GAME = 'START_GAME';
export const ATTACK = 'ATTACK';
export const HEAL = 'HEAL';

export const StartGame = () => ({
    type: START_GAME
});

export const attack = (enemyAttack, valeur) => ({
    type: ATTACK,
    enemyAttack: enemyAttack,
    valeur: valeur
});

export const heal = (enemyHeal, valeur) => ({
    type: HEAL,
    enemyHeal: enemyHeal,
    valeur: valeur
});
