import React from "react";
import backImg from "../assets/js-badge.svg";

const Card=({card, handleChoice, flipped,disabled})=>{
    const handleClick=()=>{
        if(!disabled){
            handleChoice(card)
        }
    }

    return(
        <div className="card">
            <div className={flipped?"flipped":""}>
                <img className='front' src={card.src} alt="card-front"/>
                <img 
                    className='back' 
                    src={backImg} 
                    alt="card-back"
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}

export default Card;