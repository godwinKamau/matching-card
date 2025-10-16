const cards = document.querySelectorAll('.card')
document.querySelector('#gameStart').addEventListener('click',makeArray)

const cardBacks = document.querySelectorAll('.card__face--back')

Array.from(cards).forEach(element => element.addEventListener('click', checkCard))
const cardsArray = Array.from(cards)
let targets = []

// document.querySelectorAll('.card2').addEventListener('click',toggleFlip)

function makeArray() {
    const searchParam = document.querySelector('#searchParam').value.split(' ').join('+')
    console.log(searchParam)
    fetch(`/randomize?search=${searchParam}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.photos)
            console.log(data.randArray)
            data.randArray.forEach((elem,index) => {
                console.log(index,elem)
                cardBacks.forEach((card,index2) =>{
                    if (elem.includes(index2)) {
                        card.style.background = `url(${data.photos[index].src.portrait})`
                        card.style.backgroundSize = 'cover'
                        card.style.backgroundRepeat = 'no-repeat'
                    }
                })
                document.querySelector('h2').innerText = 'Match The Cards!'
             })
        
        })
        .catch(err => console.log(err))
}

function checkCard(click) {
    //Cory Rahman(mentor) helped with figuring out the game logic. Namely, using the matched class to set the game
    const gamePiece = click.target.nextElementSibling
    if (gamePiece.style.background === 'linear-gradient(var(--jet),var(--white))' ) {
        return
    }
    // || click.target.parentNode.classList.contains('matched')

    click.target.parentNode.classList.toggle('isflipped')
    if (targets.length < 1) {
        targets.push(gamePiece.style.background)
        console.log(targets)
    } else {
        if (gamePiece.style.background === targets[0]) {
            //place a new class that takes away the transition
            cards.forEach(card => {
                //could have .matched just be nothing and align the logic with conditionals
                // card.classList.add('matched')
                if(card.classList.contains('isflipped')){
                    card.classList.add('matched')
                    
                    const face = card.querySelector('.card__face--back')
                    console.log(face)
                }
            })
        } else {
            setTimeout(() => {cards.forEach(card => {
                if (card.classList.contains('isflipped') && !card.classList.contains('matched')){
                    card.classList.toggle('isflipped')
                }
            })},1000)
        }
        targets.pop()
        console.log(targets)
    }  
}