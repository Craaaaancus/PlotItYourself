const MaxStepExceedError = require('./MaxStepExceedError.js')

class CPlayer {
  constructor(txt = '') {
    this.playerId = 0
    this.playerKey = ''
    this.playerName = ''
    this.playerTxt = txt
    this.playerStep = 0
    this.maxNumberOfSteps = 10000
    this.maxSteps = 0
    this.playerHistory = new Array(this.maxNumberOfSteps)
    for (let i = 0; i < this.maxNumberOfSteps; i++){
      let playerHistory = {}
      playerHistory.step = i
      playerHistory.typeMove = '*'
      playerHistory.moveResult = '*'
      playerHistory.position = -1
      playerHistory.txt = this.playerTxt
      this.playerHistory[i] = playerHistory
    }
    this.maxStepExceedMessage = 'MaxStep exceeded'
    this.invalidParameterMessage = 'Incorrect input parameters'
  }

  getChar(index){
    if (this.playerStep > this.maxSteps){
      throw new MaxStepExceedError(this.maxStepExceedMessage)
    }
    if (typeof index !== 'number') {
      throw new Error(this.invalidParameterMessage)
    }

    let char
    this.playerStep++
    this.playerHistory[this.playerStep].step = this.playerStep
    this.playerHistory[this.playerStep].typeMove = 'G'
    if (index < 0 || index > this.playerTxt.length){
      this.playerHistory[this.playerStep].moveResult = 'O'
      this.playerHistory[this.playerStep].position = -1
      char = ' '
    }
    else {
      this.playerHistory[this.playerStep].moveResult = 'N'
      this.playerHistory[this.playerStep].position = index
      char = this.playerTxt[index]
    }

    this.playerHistory[this.playerStep].txt = this.playerTxt
    return char
  }

  setChar(index, char){
    if (this.playerStep > this.maxSteps){
      throw new MaxStepExceedError(this.maxStepExceedMessage)
    }
    if (typeof index !== 'number') {
      throw new Error(this.invalidParameterMessage)
    }
    if (typeof char !== 'string' || char?.length !== 1){
      throw new Error(this.invalidParameterMessage)
    }

    this.playerStep++
    this.playerHistory[this.playerStep].step = this.playerStep
    this.playerHistory[this.playerStep].typeMove = 'S'

    if (index < 0 || index >= this.playerTxt.length){
      this.playerHistory[this.playerStep].moveResult = 'O'
      this.playerHistory[this.playerStep].position = -1
    }
    else {
      this.playerHistory[this.playerStep].moveResult = 'N'
      this.playerHistory[this.playerStep].position = index
      let substr1 = this.playerTxt.slice(0, index)
      let substr2 = this.playerTxt.slice(index+1)
      this.playerTxt = substr1 + char + substr2
    }

    this.playerHistory[this.playerStep].txt = this.playerTxt
  }

  delChars(index, count){
    if (this.playerStep > this.maxSteps){
      throw new MaxStepExceedError(this.maxStepExceedMessage)
    }
    if (typeof index !== 'number' || typeof count !== 'number') {
      throw new Error(this.invalidParameterMessage)
    }
    if (count < 0){
      throw new Error(this.invalidParameterMessage)
    }

    this.playerStep++
    this.playerHistory[this.playerStep].step = this.playerStep
    this.playerHistory[this.playerStep].typeMove = 'D'
    if (index < 0 || index >= this.playerTxt.length){
      this.playerHistory[this.playerStep].moveResult = 'O'
      this.playerHistory[this.playerStep].position = -1
    }
    else {
      this.playerHistory[this.playerStep].moveResult = 'N'
      this.playerHistory[this.playerStep].position = index
      let substr1 = this.playerTxt.slice(0, index)
      let substr2 = this.playerTxt.slice(index+count)
      this.playerTxt = substr1 + substr2
    }

    this.playerHistory[this.playerStep].txt = this.playerTxt
  }

  insChar(index, char){
    if (this.playerStep > this.maxSteps){
      throw new MaxStepExceedError(this.maxStepExceedMessage)
    }
    if (typeof index !== 'number') {
      throw new Error(this.invalidParameterMessage)
    }
    if (typeof char !== 'string' || char?.length !== 1){
      throw new Error(this.invalidParameterMessage)
    }

    this.playerStep++
    this.playerHistory[this.playerStep].step = this.playerStep
    this.playerHistory[this.playerStep].typeMove = 'I'
    if (index < 0 || index > this.playerTxt.length){
      this.playerHistory[this.playerStep].moveResult = 'O'
      this.playerHistory[this.playerStep].position = -1
    }
    else {
      this.playerHistory[this.playerStep].moveResult = 'N'
      this.playerHistory[this.playerStep].position = index
      let substr1 = this.playerTxt.slice(0, index)
      let substr2 = this.playerTxt.slice(index)
      this.playerTxt = substr1 + char + substr2
    }

    this.playerHistory[this.playerStep].txt = this.playerTxt
  }

  findStr(string){
    if (this.playerStep > this.maxSteps){
      throw new MaxStepExceedError(this.maxStepExceedMessage)
    }
    if (typeof string !== 'string'){
      throw new Error(this.invalidParameterMessage)
    }

    this.playerStep++
    this.playerHistory[this.playerStep].step = this.playerStep
    this.playerHistory[this.playerStep].typeMove = 'F'

    let findIndex = this.playerTxt.indexOf(string)
    if (findIndex === -1) {
      this.playerHistory[this.playerStep].moveResult = 'F'
      this.playerHistory[this.playerStep].position = -1
    }
    else {
      this.playerHistory[this.playerStep].moveResult = 'N'
      this.playerHistory[this.playerStep].position = findIndex
    }
    this.playerHistory[this.playerStep].txt = this.playerTxt
    return findIndex
  }

  lenTxt(){
    if (this.playerStep > this.maxSteps){
      throw new MaxStepExceedError(this.maxStepExceedMessage)
    }

    this.playerStep++
    this.playerHistory[this.playerStep].step = this.playerStep
    this.playerHistory[this.playerStep].typeMove = 'L'
    this.playerHistory[this.playerStep].moveResult = 'N'
    this.playerHistory[this.playerStep].position = -1
    this.playerHistory[this.playerStep].txt = this.playerTxt

    return this.playerTxt.length
  }

  setMaxSteps(steps){
    this.maxSteps = steps
  }

  getMaxSteps(){
    return this.maxSteps
  }

  getPlayerStep(){
    return this.playerStep
  }

  getPlayerTxt(){
    return this.playerTxt
  }

  setPlayerId(id){
    this.playerId = id
  }

  getPlayerId(){
    return this.playerId
  }

  setPlayerKey(key){
    this.playerKey = key
  }

  getPlayerKey(){
    return this.playerKey
  }

  setPlayerName(name){
    this.playerName = name
  }

  getPlayerName(){
    return this.playerName
  }

  setPlayerHistory(step, history){
    this.playerHistory[step] = history
  }
}

module.exports = CPlayer
