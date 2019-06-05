import React from 'react';
import {StartGame} from "../../Store/Action/game";
import {getEnemyHp, isGameStarted} from "../../Store/Reducer/game";
import {compose} from "redux";
import {connect} from "react-redux";
import {TweenMax} from 'gsap';

import './Button.scss'
class Button extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!prevProps.gameStarted && this.props.gameStarted){
            TweenMax.to(this.refs.evilButton, 2, {
                y: -window.innerHeight/3
            });
        }
        this.refs.hp.style.width = this.props.healthPoint * 2 + 'px';
        this.refs.hp.innerHTML = this.props.healthPoint + '/100';
    }

    render() {
        return (
            <div ref="evilButton" className="Button">
                <button className="button" onClick={() => this.props.dispatch(StartGame())}>
                    Let's go
                </button>
                {this.props.gameStarted &&
                    <div className={"healthBarContainer"}>
                        <div ref="hp" className={"healthBar"}>
                            100/100
                        </div>
                    </div>
                }
                <div id={"enemyHealEffect"}/>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    gameStarted: isGameStarted(state),
    healthPoint: getEnemyHp(state)
});

const enhance = compose(connect(mapStateToProps));
export default enhance(Button)