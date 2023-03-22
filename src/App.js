import { useEffect, useState } from 'react';
import './App.css'; 
import Card from './components/Card';
import tiger from "./assets/tiger.png";
import dog from "./assets/dog.jpg";
import duck from "./assets/duck.jpg";
import kangaroo from "./assets/kangaroo.jpg";
import panda from "./assets/panda.jpg";
import girraffe from "./assets/jiraf.png";

const cardsData=[
  {src:panda, matched:false},
  {src:tiger, matched:false},
  {src:duck, matched:false},
  {src:dog, matched:false},
  {src:girraffe, matched:false},
  {src:kangaroo, matched:false}
]

function App() {

  const [cards, setCards]=useState([]);
  const [turns,setTurns]=useState(0);
  const [firstCard,setFirstCard]=useState(null);
  const [secondCard, setSecondCard]=useState(null);
  const [disabled,setDisabled]=useState(false)

  //shuffle cards
  const shuffleCards=()=>{
    const shuffledCards = [...cardsData, ...cardsData].sort(()=>{
      return Math.random()-0.5}).map((card)=>{
      return (
        {...card, id:Math.random()}
      )
    });

    setCards(shuffledCards);
    setTurns(0);
  }

  //choose two cards
  const handleChoice=(card)=>{
    firstCard ? setSecondCard(card):setFirstCard(card);
  }

  //comparing selected cards
  useEffect(()=>{
    if(firstCard && secondCard){
      if(firstCard.src===secondCard.src){
        setDisabled(true)
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src===firstCard.src){
              return {...card, matched:true}
            }
            else{
              return card
            }
          })
        })
        reserTurn()       
      }
      else{
        reserTurn()
      }
    }
  },[firstCard, secondCard])

  //reset choices and increment turns
  const reserTurn=()=>{
    setFirstCard(null);
    setSecondCard(null);
    setTurns((prevTurns)=>(prevTurns+1))
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Magic Cards </h1>
      <button onClick={shuffleCards}>Start !</button>

      <div className='card-grid'>
        {
          cards.map((card)=>{
            return(
             <Card 
                card={card}  
                key={card.id}
                handleChoice={handleChoice}
                flipped={card===firstCard || card===secondCard || card.matched}
                disabled={disabled}
              />
            )
          })
        }
      </div>
      
      {
        turns?  (
          <h3>Turns : {turns}</h3>
        ) :(
          <div></div>
        )
      }
    </div>

  );
}

export default App