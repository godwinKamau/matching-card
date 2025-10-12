const cards = document.querySelectorAll('.card')
document.querySelector('#gameStart').addEventListener('click',makeArray)

Array.from(cards).forEach(element => element.addEventListener('click', checkCard))
const cardsArray = Array.from(cards)
let targets = []


function makeArray() {
    fetch('/randomize')
        .then(res => res.json())
        .then(data => {
            
            data.forEach((elem,index) => {
                console.log(index,elem)
                cards.forEach((card,index2) =>{
                    if (elem.includes(index2)) {
                        card.innerHTML = index
                    }
                })
            })
        
        })
        .catch(err => console.log(err))
}

function checkCard(click) {
    if (click.target.innerHTML === '') {
        return
    }
    if (targets.length < 1) {
        click.target.classList.remove('hidden')
        click.target.classList.add('selected')
        targets.push(click.target.innerHTML)
        
    } else if (targets.length === 1){
        if (click.target.innerHTML === targets[0]){
            targets = []
            cardsArray.forEach(card => {
                if(card.classList.contains('selected')) {
                    card.classList.remove('selected')
                    card.classList.add('matched')
                }
            })
            click.target.classList.remove('hidden')
            click.target.classList.add('matched')
        } else {
            cardsArray.forEach(card => {
                if(!card.classList.contains('matched')){
                    card.classList.add('hidden')
                    card.classList.remove('selected')
                }
            })
            click.target.classList.add('hidden')
            targets = []
        }
    }
    console.log('clicked')
    
}
