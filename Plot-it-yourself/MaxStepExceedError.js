class MaxStepExceedError extends Error {
  constructor(message){
    super(message)
    this.name = 'MaxStepExceedError'
  }
}

module.exports = MaxStepExceedError
