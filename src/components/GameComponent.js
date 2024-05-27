import React from 'react'

export default function GameComponent(props) {

    return (
        <div className= "game-component" onClick={props.handleClick}>{props.result}</div>
    )
}
