document.addEventListener('DOMContentLoaded', () => {


  const buttonStart = document.querySelector('.buttonStart')
  const gameContent = document.querySelector('.gameContent')
  const startWindow = document.querySelector('.startWindow')
  const closeGame = document.querySelector('.closeGame')
  const restartGameWindow = document.querySelector('.restartGameWindow')
  const randomNumberText = document.querySelector('.randomNumberText')
  const aboutRandomNumber = document.querySelector('.aboutRandomNumber')
  const scoreAfterGame = document.querySelector('.scoreAfterGame')
  const btnsWindow = document.querySelector('.btnsWindow')
  const input = document.querySelector('.input')
  let gameCounter = 3
  let gameScore = 0
  let totalScoreWin = 0
  let totalScoreLose = 0
  let buttonsArray = []
 
////////////////////////INPUT LENGTH CONTROL/////////////////////////////////////

// if (input.value <= 1) {
//   buttonStart.disabled = true
//   deleteButtonsFromMassive()
//   document.querySelector('.buttons').remove()
// } else if (input.value > 20) {
//   buttonStart.disabled = true
//   deleteButtonsFromMassive()
//   document.querySelector('.buttons').remove()
// } else {
//   buttonStart.disabled = false
// }


///////////////////////////GAME START////////////////////////////////////////

  buttonStart.addEventListener('click', () => {
    deleteButtonsFromMassive()
    let inputNumber = input.value
    let randomNumber = Math.floor(Math.random() * inputNumber) + 1
    const buttons = document.createElement('div')
    buttons.className = 'buttons'
    btnsWindow.appendChild(buttons)

    for (let i = 0; i < inputNumber; i++) {
      let numberBtns = document.createElement('div')
          numberBtns.className = 'numberBtn'
          numberBtns.textContent = i + 1
          numberBtns.append[i]
          buttonsArray.push(numberBtns)
      }

    buttonsArray.forEach((key, index) => {
    buttons.appendChild(key)  
    buttonStart.style.background = 'brown'
    startWindow.style.transition = '3s linear'
    startWindow.style.opacity = '.1'
    setTimeout(() => {
      startWindow.style.display = 'none'
      scoreAfterGame.style.display = 'none'
      startGame()
    }, 2000)

//////////////////////////////FROM 2 TILL RANDOMNUMBER IN OBJECTS, SEARCH BUTTON WHO WAS PRESSED///////////////////

    key.addEventListener('click', (event) => {
      let buttonNumber = event.target.textContent
      randomNumberText.innerHTML = `<span>Numerosi on: </span>${buttonNumber}`

/////////////////////////////GAME ROUNDS CONTROL//////////////////////////////////////////////////////////////////
       
      if (gameCounter >= 0) {

///////////////////////////////GAME LOGIC, IF IN GAME FOUNDS ANOTHER NUMBER OR SAME//////////////////////////

        switch (buttonNumber == randomNumber) {
          case (buttonNumber < randomNumber):
            aboutRandomNumber.innerHTML = 'Numeroni on pienempi'
            const closeArrBtnsAfter = buttonsArray.slice(index)
            closeArrBtnsAfter.forEach(ClosetElems => {
              ClosetElems.classList.add('numberBtnNotActive')
            })
      
            break
          case (buttonNumber > randomNumber):
            aboutRandomNumber.innerHTML = 'Numeroni on suurempi'
            const closeArrBtnsBefore = buttonsArray.slice(0, index + 1)
            closeArrBtnsBefore.forEach(closetElems => {
              closetElems.classList.add('numberBtnNotActive')
            })
            
            break
          case (buttonNumber == randomNumber):
            aboutRandomNumber.style.color = 'red'
            aboutRandomNumber.innerHTML = 'Voitit 🎉'
            key.style.border = '2px solid red'
                gameScoreIncrement()
                totalWinScore()
                notActiveNumberButtons()
                setTimeout(() => {
                  restartGame()
                }, 1500)
                break
            }
        }
        gameCounter--

////////////////////////////////IF GAME FINISH AND NUMBER NOT FOUND///////////////////////////////////////
      
      if (gameCounter == 0 && buttonNumber != randomNumber) {
        aboutRandomNumber.innerHTML = `Hävisit, numeroni oli: <strong>${randomNumber}</strong>`
        let a = Array.from(buttonsArray.keys())
        a.findIndex(elem => {        
          if (elem === randomNumber) {
            buttonsArray[elem - 1].style.border = '2px solid red'
          } 
          if (randomNumber === elem + 1) {
            buttonsArray[elem].style.border = '2px solid red'
          }
        });
        gameScoreDecrement()
        totalLoseScore()
        setTimeout(() => {
          restartGame()
        }, 1500)
        notActiveNumberButtons()
      }
    })
  })

///////////////////////////////GAME START FUNCTION///////////////////////////////////////////////
  
  startGame = () => {
    gameContent.style.display = 'block'
    activeNumberButtons()
  }

/////////////////////////////GAME RESTART IF GAME OVER OR WIN/////////////////////////////////////////////////

  restartGame = () => {
    restartGameWindow.style.display = 'block'
    const restartBtn = document.querySelector('.restartBtn')
    restartBtn.addEventListener('click', () => {

      if (restartBtn) {
        activeNumberButtons()
        aboutRandomNumber.style.color = 'black'
        aboutRandomNumber.innerHTML = ''
        randomNumberText.innerHTML = ''
        restartGameWindow.style.display = 'none'
        buttonsArray.forEach(key => {
          key.style.border = '1px solid grey'
        })
        gameCounter = 3
        randomNumber = Math.floor(Math.random() * inputNumber) + 1
      }
    })
  }

  fullGameRestar = () => {
    activeNumberButtons()
    aboutRandomNumber.style.color = 'black'
    aboutRandomNumber.innerHTML = ''
    randomNumberText.innerHTML = ''
    input.value = ''
    restartGameWindow.style.display = 'none'
    buttonsArray.forEach(key => {
      key.style.border = '1px solid grey'
    })
    gameCounter = 3
  }
})

////////////////////////GAME SCORE IF LOSE THEN + //////////////////////////////////////////////////

  gameScoreIncrement = () => {
    gameScore++
    if (gameScore == -1) {
      gameScore--
    }
    let scoreText = document.querySelector('.scoreText')
    scoreText.innerHTML = `Voitetut pelisi: ${gameScore}`
  }

////////////////////////GAME SCORE IF LOSE THEN - //////////////////////////////////////////////////

  gameScoreDecrement = () => {
    gameScore--
    if (gameScore == -1) {
      gameScore++
    }
    let scoreText = document.querySelector('.scoreText')
    scoreText.innerHTML = `Voitetut pelisi: ${gameScore}`
  }

//////////////////////////////NUMBER BUTTONS ACTIVE AND COLOR////////////////////////////////////////

  notActiveNumberButtons = () => {
    buttonsArray.forEach((key) => {
      key.classList.remove('numberBtn')
      key.classList.add('numberBtnNotActive')
    })
  }

  activeNumberButtons = () => {
    buttonsArray.forEach((key) => {
      key.classList.remove('numberBtnNotActive')
      key.classList.add('numberBtn')
    })
  }

////////////////////////TOTAL GAME SCORE////////////////////////////////////////////

  totalWinScore = () => {
    totalScoreWin++
  }

  totalLoseScore = () => {
    totalScoreLose++
  }

////////////////////////////CLOSE GAME BUTTON////////////////////////////////////////////

  closeGame.addEventListener('click', () => {
    fullGameRestar()
    deleteButtonsFromMassive()
    document.querySelector('.buttons').remove()
    startWindow.style.display = 'flex'
    startWindow.style.transition = '3s linear'
    startWindow.style.opacity = '1'
    buttonStart.classList.add('buttonStartAfterClose')
    gameContent.style.display = 'none'
    scoreAfterGame.style.display = 'block'
    scoreAfterGame.innerHTML = ` Pelatut pelit: ${totalScoreWin + totalScoreLose} <br>
                                Voitetut pelit: ${totalScoreWin} <br>
                               Hävityt pelit: ${totalScoreLose}`
  })


  deleteButtonsFromMassive = () => {
    for (let i = 0; i < buttonsArray.length; i++) {
      delete buttonsArray[i]
      buttonsArray =  []
    }
  }

})
