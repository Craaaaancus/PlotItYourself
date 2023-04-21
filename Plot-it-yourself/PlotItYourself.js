const path = require('path')
const fs = require('fs')
const readline = require('readline')
const MyTypes = require('./MyTypes.js')
const MyUnit1 = require('./MyUnit1.js')
const MyUnit2 = require('./MyUnit2.js')
const MaxStepExceedError = require('./MaxStepExceedError.js')

const pathToInit = path.join(__dirname, 'input.txt')
const pathToOutput = path.join(__dirname, 'output.txt')
const winner = Array(3)

const myTypes = new MyTypes()
const unit1 = new MyUnit1()
const unit2 = new MyUnit2()

function printInit(){
  console.log('************** Initial Settings:')
  console.log(
    'User & Opponent   ID: ',
    myTypes.players[0].getPlayerId(), '  ', myTypes.players[1].getPlayerId()
  )
  console.log(
    'User & Opponent Keys     from WeaZet   : ' ,
    myTypes.players[0].getPlayerKey() ,'  ', myTypes.players[1].getPlayerKey()
  )
  console.log(
    'User & Opponent Keys declared in Units : ',
    unit1.myKey,'  ', unit2.myKey
  )
  console.log(
    'User & Opponent names: ',
    myTypes.players[0].getPlayerName(), '  ', myTypes.players[1].getPlayerName()
  )
  console.log('Max number of steps = ', myTypes.maxPlayerSteps)
  console.log('Source text of ', myTypes.sourceText.length, ' characters:')
  console.log(myTypes.sourceText)
  console.log('Target text of ', myTypes.targetText.length,' characters:')
  console.log(myTypes.targetText)
}

function printResults(){
  console.log('************ Results: ')
  for (let i = 0; i < myTypes.NUsers; i++){
    console.log('For Player ', myTypes.players[i].getPlayerId())
    console.log('Steps done: ', myTypes.players[i].getPlayerStep())
    console.log('Result: ')
    console.log(myTypes.players[i].playerTxt, '\n')
  }

  switch(winner[2]) {
    case 0:
      console.log(`Player ${winner[0]} won, player ${winner[1]} lost`)
      break
    case 1:
      console.log(`Draw`)
      break
    case 2:
      console.log(`Both players lost`)
      break
  }
}

function setWinner(){
  let playerTxt1 = myTypes.players[0].getPlayerTxt()
  let playerTxt2 = myTypes.players[1].getPlayerTxt()
  let playerId1 = myTypes.players[0].getPlayerId()
  let playerId2 = myTypes.players[1].getPlayerId()
  let targetTxt = myTypes.targetText

  if (playerTxt1 === targetTxt && playerTxt2 !== targetTxt){
    winner[0] = playerId1
    winner[1] = playerId2
    winner[2] = 0
  }
  else if (playerTxt1 !== targetTxt && playerTxt2 === targetTxt){
    winner[0] = playerId2
    winner[1] = playerId1
    winner[2] = 0
  }
  else if (playerTxt1 !== targetTxt && playerTxt2 !== targetTxt){
    winner[0] = playerId1
    winner[1] = playerId2
    winner[2] = 2
  }
  else {
    let playerSteps1 = myTypes.players[0].getPlayerStep()
    let playerSteps2 = myTypes.players[1].getPlayerStep()
    
    if (playerSteps1 < playerSteps2) {
      winner[0] = playerId1
      winner[1] = playerId2
      winner[2] = 0
    }
    if (playerSteps1 > playerSteps2) {
      winner[0] = playerId2
      winner[1] = playerId1
      winner[2] = 0
    }
    if (playerSteps1 === playerSteps2) {
      winner[0] = playerId1
      winner[1] = playerId2
      winner[2] = 1
    }
  }
}

function start(){
  const inputData = []
  const lineReader = readline.createInterface({
    input: fs.createReadStream(pathToInit),
  })
  
  lineReader.on('line', (line) => {
    inputData.push(line)
  })
  lineReader.on('close', () => {
    myTypes.initData(inputData)
    console.log('\n************** Starting\n')
    printInit()

    try {
      unit1.Make(myTypes.players[0], myTypes.numberOfTask)
    }
    catch(e){
      if (e instanceof MaxStepExceedError){
        console.log('Player 1 exceeds the max number of steps')
      }
      else {
       console.log('Player 1 get an error')
      }
    }

    try {
      unit2.Make(myTypes.players[1], myTypes.numberOfTask)
    }
    catch(e){
      if (e instanceof MaxStepExceedError){
        console.log('Player 2 exceeds the max number of steps')
      }
      else {
       console.log('Player 2 get an error')
      }
    }
    
    setWinner()
    printResults()
    myTypes.outputLog(pathToOutput)
    console.log('\n************** The End\n')
  })
}

start()
