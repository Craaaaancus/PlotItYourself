class MyUnit {
  constructor(){
    this.myKey = '111111'
    this.marks = '.,?!'
    this.separators = ' .,?!'
  }

  Make(player, NTask){
    switch(NTask){
      case 1:
        this.Solve1(player)
        break
      case 2:
        this.Solve2(player)
        break
      case 3:
        this.Solve3(player)
        break
    }
  }

  Solve1(player){
    for (let i = 0; i < player.lenTxt() - 1; ){
      let char = player.getChar(i)
      let nextChar = player.getChar(i+1)
      if (char === ' '){
        if (this.marks.includes(nextChar) || nextChar === ' '){
          player.delChars(i, 1)
          continue
        }
      }
      i++
    }
  }

  Solve2(player){
    let strArr = ['the', 'The']
    let strInsertArr = ['a', 'A']

    for (let i = 0; i < strArr.length; i++){
      while(true){
        let strIndex = player.findStr(strArr[i])
        if (strIndex === -1) break
        
        let indexPrev = strIndex - 1
        let indexNext = strIndex + strArr[i].length
        
        if (indexPrev >= 0){
          let prevChar = player.getChar(indexPrev)
          if (prevChar !== ' ' && !this.marks.includes(prevChar)){
            player.setChar(strIndex+1, '*')
            continue
          }
        }
        if (indexNext < player.lenTxt()){
          let nextChar = player.getChar(indexNext)
          if (nextChar !== ' ' && !this.marks.includes(nextChar)){
            player.setChar(strIndex+1, '*')
            continue
          }
        }
        
        player.delChars(strIndex, strArr[i].length)
        player.insChar(strIndex, strInsertArr[i])
      }
    }

    while(true){
      let index = player.findStr('*')
      if (index !== -1) player.setChar(index, 'h')
      else break
    }
  }

  Solve3(player){
    let word = ''
    let bufferArr = []
    for (let i = 0; i < player.lenTxt(); i++){
      let char = player.getChar(i)
      if (this.separators.includes(char) && word.length){
        word = word.toLowerCase()
        if (!bufferArr.includes(word)){
          bufferArr.push(word)
        }
        else {
          player.delChars(i-word.length, word.length)
          i -= word.length + 1
        }
        word = ''
      }
      else if (!this.separators.includes(char)){
        word += char
      }
    }
  }
  
}

module.exports = MyUnit
