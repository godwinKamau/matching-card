const cards = document.querySelectorAll('.card')
document.querySelector('#gameStart').addEventListener('click',makeArray)

const cardBacks = document.querySelectorAll('.card__face--back')

Array.from(cards).forEach(element => element.addEventListener('click', checkCard))
const cardsArray = Array.from(cards)
let targets = []

// document.querySelectorAll('.card2').addEventListener('click',toggleFlip)

function makeArray() {
    fetch('/randomize')
        .then(res => res.json())
        .then(data => {
            
            data.forEach((elem,index) => {
                console.log(index,elem)
                cardBacks.forEach((card,index2) =>{
                    if (elem.includes(index2)) {
                        card.innerHTML = index
                    }
                })
            })
        
        })
        .catch(err => console.log(err))
}

function checkCard(click) {
    const gamePiece = click.target.nextElementSibling
    if (gamePiece.innerHTML === '' ) {
        return
    }
    // || click.target.parentNode.classList.contains('matched')

    click.target.parentNode.classList.toggle('isflipped')
    if (targets.length < 1) {
        targets.push(gamePiece.innerHTML)
        console.log(targets)
    } else {
        if (gamePiece.innerHTML === targets[0]) {
            //place a new class that takes away the transition
            cards.forEach(card => {
                //could have matched just be nothing and align the logic with conditionals
                // card.classList.add('matched')
                if(card.classList.contains('isflipped')){
                    card.classList.add('matched')
                    
                    const face = card.querySelector('.card__face--back')
                    console.log(face)
                }
            })
        } else {
            setTimeout(()=> {cards.forEach(card => {
                if (card.classList.contains('isflipped') && !card.classList.contains('matched')){
                    card.classList.toggle('isflipped')
                }
            })},1000)
        }
        targets.pop()
        console.log(targets)
    }  
}