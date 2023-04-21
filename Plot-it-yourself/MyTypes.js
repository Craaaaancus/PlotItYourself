const fs = require('fs')
const CPlayer = require('./CPlayer.js')

class MyTypes {
  constructor(){
    this.separator = '*#*#*#*#'   //A string to separate user's debug print from the output log
    this.NUsers = 2 //number of users
    this.maxNumberOfSteps = 10000
    this.maxPlayerSteps = 0
    //NoTexts = 15 //number of source texts
    this.NoSpaces = 10  //number of spaces to be inserted in the source text
    this.NoTasks = 3 //number of tasks 
    this.numberOfTask = 0
    this.maxWords= 500
    this.players = []
    for (let i = 0; i < this.NUsers; i++) {
      this.players[i] = new CPlayer()
    }

    this.separatorsStr = ' .,?!'
    this.sourceText = ''
    this.targetText = ''
  }

  initData(inputData){
    this.setPlayerData(inputData)
    this.insertRandomSpaces()
    this.setTarget(this.numberOfTask, this.sourceText)
    this.initPlayerHistory()
  }

  setPlayerData(inputData){
    let ids = inputData[0].match(/\d+/g)
    this.players[0].setPlayerId(parseInt(ids[0]))
    this.players[1].setPlayerId(parseInt(ids[1]))

    this.players[0].setPlayerKey(parseInt(inputData[1]))
    this.players[1].setPlayerKey(parseInt(inputData[2]))

    this.players[0].setPlayerName(inputData[3].trim())
    this.players[1].setPlayerName(inputData[4].trim())

    let playerSteps = parseInt(inputData[5])
    if (this.maxNumberOfSteps < playerSteps){
      this.maxPlayerSteps = this.maxNumberOfSteps
    }
    else this.maxPlayerSteps = playerSteps

    this.players[0].setMaxSteps(this.maxPlayerSteps)
    this.players[1].setMaxSteps(this.maxPlayerSteps)

    let numberOfTask = parseInt(inputData[6])
    if (numberOfTask > 0){
      this.numberOfTask = numberOfTask
    }
    else this.numberOfTask = 1

    this.sourceText = inputData[7].trim()
  }

  insertRandomSpaces(){
    let i = 0
    while(i < this.sourceText.length - 1){
      let letter = this.sourceText[i]
      if (this.separatorsStr.includes(letter)){
        let rand = Math.random() < 0.5
        if (rand) {
          let substr1 = this.sourceText.slice(0, i)
          let substr2 = this.sourceText.slice(i)
          this.sourceText = substr1 + ' ' + substr2
        }
        i++
      }
      else i++
    }
  }

  initPlayerHistory(){
    for (let i = 0; i < this.players.length; i++){
      this.players[i].playerTxt = this.sourceText
      let history = {}
      history.step = 0
      history.typeMove = 'N'
      history.moveResult = 'N'
      history.txt = this.sourceText
      this.players[i].setPlayerHistory(0, history)
      for (let j = 1; j < this.maxNumberOfSteps; j++){
        let history = {}
        history.step = j
        history.typeMove = '*'
        history.moveResult = '*'
        history.txt = ''
        this.players[i].setPlayerHistory(j, history)
      }
    }
  }

  outputLog(pathToOutput){
    fs.writeFileSync(pathToOutput, '')
    const writeStream = fs.createWriteStream(pathToOutput, {
      flags: 'a'
    })
    const writeLine = (line) => writeStream.write(`${line}\n`)

    writeLine(this.separator)
    writeLine(
      `${this.players[0].getPlayerId()} ${this.players[1].getPlayerId()}`
    )
    writeLine(
      `${this.players[0].getPlayerKey()} ${this.players[1].getPlayerKey()}`
    )
    writeLine(
      `${this.players[0].getPlayerName()}`
    )
    writeLine(
      `${this.players[1].getPlayerName()}`
    )
    writeLine(
      `${this.maxPlayerSteps}`
    )
    writeLine(
      `${this.sourceText.length} ${this.targetText.length}`
    )
    writeLine(
      `${this.sourceText}`
    )
    writeLine(
      `${this.targetText}`
    )

    let allPlayerSteps = this.players.reduce(
      (prev, player) => prev + player.getPlayerStep()
    , 0)
    writeLine(allPlayerSteps)

    for (let i = 0; i < this.maxNumberOfSteps; i++){
      for (let j = 0; j < this.NUsers; j++){
        if (i <= this.players[j].getPlayerStep()){
          let step = this.players[j].playerHistory[i].step
          let typeMove = this.players[j].playerHistory[i].typeMove
          let moveResult = this.players[j].playerHistory[i].moveResult
          writeLine(`${j+1} ${step} ${typeMove} ${moveResult}`)
          writeLine(this.players[j].playerHistory[i].txt)
        }
      }
    }

    writeStream.close()
  }

  setTarget(numberOfTask, sourceText){
    switch(numberOfTask){
      case 1:
        this.setTargetTask1(sourceText)
        break
      case 2:
        this.setTargetTask2(sourceText)
        break
      case 3:
        this.setTargetTask3(sourceText)
        break
      default:
        this.targetText = this.sourceText
    }
  }

  setTargetTask1(sourceText){
    this.targetText = sourceText.replaceAll(/\s+/g, ' ')
                                .replaceAll(/\s(?=[.,?!])/g, '')
  }

  setTargetTask2(sourceText){
    this.targetText = sourceText.replaceAll(/\bThe\b/g, 'A')
                                .replaceAll(/\bthe\b/g, 'a')
  }

  setTargetTask3(sourceText){
    let wordSet = new Set()
    const regexp = /\b[^ .,?!]+\b/ig
    sourceText.match(regexp)
              .forEach((word)=>{
                wordSet.add(word.toLowerCase())
              })
    
    let position = 0
    sourceText
      .match(regexp)
      .forEach((word) => {
        if (wordSet.has(word.toLowerCase())){
          wordSet.delete(word.toLowerCase())
          position = sourceText.indexOf(word, position)
        }
        else {
          let wordIndex = sourceText.indexOf(word, position)
          let substr1 = sourceText.slice(0, wordIndex)
          let substr2 = sourceText.slice(wordIndex + word.length)
          sourceText = substr1 + substr2
        }
      })

    this.targetText = sourceText
  }

}

module.exports = MyTypes
