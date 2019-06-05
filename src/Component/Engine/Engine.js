import React from 'react';
import Button from "../Button/Button";
import Controls from "../Controls/Controls";
import {compose} from "redux";
import {connect} from "react-redux";
import {getEnemyHp, getPlayerHp, isGameStarted, isPlayerTurn} from "../../Store/Reducer/game";
import {attack, heal} from "../../Store/Action/game";
import {TweenMax} from "gsap";

class Engine extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props.enemyHp <= 0){
            alert('You won !');
        }
        else if(this.props.playerHp <= 0){
            alert('You loose !');
        }
        else if(!this.props.isPlayerTurn){
            //On attend 1s et le bot joue
            setTimeout(() => {
                //25% de chance de ce heal
                if(Math.random() <= 0.25){
                    let valeur = 15 + Math.floor(Math.random() * 16);
                    this.props.dispatch(heal(true, valeur));
                    TweenMax.to(document.querySelector("#enemyHealEffect"), 1, {
                        scale: 5,
                        onStart: () => {TweenMax.set(document.querySelector('#enemyHealEffect'), {opacity: 0.75})},
                        onComplete: () => {console.log('test', this); TweenMax.set(document.querySelector('#enemyHealEffect'), {scale: 0, opacity: 0})}
                    });
                } else {
                    let valeur = 10 + Math.floor(Math.random() * 16);
                    this.props.dispatch(attack(true, valeur));
                    TweenMax.to(document.querySelector('.Controls'), 0.1, {
                        x: "+=20",
                        yoyo: true,
                        repeat: 5
                    });
                    TweenMax.to(document.querySelector('.Controls'), 0.1, {
                        x: "-=20",
                        yoyo: true,
                        repeat: 5
                    });
                }}, 1000);
        }
    }

    render() {
        return (
            <div className="Engine">
                <Button/>
                { this.props.gameStarted && <Controls/>}
            </div>
        );
    }
}

const mapStateToProps = state =>({
    gameStarted: isGameStarted(state),
    isPlayerTurn: isPlayerTurn(state),
    enemyHp: getEnemyHp(state),
    playerHp: getPlayerHp(state)
});

const enhance = compose(connect(mapStateToProps));
export default enhance(Engine);
