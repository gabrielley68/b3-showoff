import React from 'react';
import "./Controls.scss";
import {compose} from "redux";
import {connect} from "react-redux";
import {getPlayerHp, isGameStarted, isPlayerTurn} from "../../Store/Reducer/game";
import {attack, heal} from "../../Store/Action/game";
import {TweenMax} from 'gsap';

class Controls extends React.Component {

    componentDidMount() {
        TweenMax.to(this.refs.ControlPanel, 2, {
            opacity: 1
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.refs.hp.style.width = this.props.healthPoint * 2 + 'px';
        this.refs.hp.innerHTML = this.props.healthPoint + '/100'
    }

    playAttack(){
        if(this.props.isPlayerTurn) {
            let valeur = 10 + Math.floor(Math.random() * 16);
            this.props.dispatch(attack(false, valeur));
            TweenMax.to(document.querySelector('.Button'), 0.1, {
                x: "+=20",
                yoyo: true,
                repeat: 5
            });
            TweenMax.to(document.querySelector('.Button'), 0.1, {
                x: "-=20",
                yoyo: true,
                repeat: 5
            });
        }
    }

    playerHeal(){
        if(this.props.isPlayerTurn) {
            let valeur = 15 + Math.floor(Math.random() * 16);
            this.props.dispatch(heal(false, valeur));
            TweenMax.to(document.querySelector("#playerHealEffect"), 1, {
                scale: 5,
                onStart: () => {TweenMax.set(document.querySelector('#playerHealEffect'), {opacity: 0.75})},
                onComplete: () => {TweenMax.set(document.querySelector('#playerHealEffect'), {scale: 0, opacity: 0})}
            });
        }
    }

    render() {
        return (
            <div className={"Controls"} ref={"ControlPanel"}>
                <div id={"playerHealEffect"}/>
                <div className="PlayerHpContainer">
                    <div ref={"hp"} className={"PlayerHp"}>
                        100/100
                    </div>
                </div>
                <div className="Controls-grid">
                    <div className="Controls-item" onClick={() => this.playAttack()}>
                        Attack
                    </div>
                    <div className="Controls-item" onClick={() => this.playerHeal()}>
                        Heal
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    gameStarted: isGameStarted(state),
    isPlayerTurn: isPlayerTurn(state),
    healthPoint: getPlayerHp(state)
});

const enhance = compose(connect(mapStateToProps));
export default enhance(Controls);
