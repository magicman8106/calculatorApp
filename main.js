class Calculator{
    constructor(previousOperandElement, currentOperandElement){
        this.previousOperandElement=previousOperandElement
        this.currentOperandElement=currentOperandElement
        this.clear()
    }
    delete()
    {
        this.currentOperand=this.currentOperand.toString().slice(0, -1)
    }
    clear()
    {
        this.currentOperand=''
        this.previousOperand=''
        this.operation = undefined
    }
    compute()
    {
        let ret
        let prev = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)


        switch(this.operation)
        {
            case '+':
                ret=prev+current
                break
            case '-':
                ret=prev-current
                break
            case '*':
                ret=prev*current
                break
            case '/':
                ret=prev/current
                break
            default:
                return
        }
        this.currentOperand=ret
        this.operation=undefined
        this.previousOperand=''
    }
    appendNumber(number)
    {
        
        if (number === '.' && this.currentOperand.includes('.'))
            return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation)
    {
        if(this.previousOperand !=null && this.currentOperand != null)
        {
            this.previousOperandElement.innerText=this.compute();
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand=''
        
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 2 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

    updateDisplay()
    { 
        this.currentOperandElement.innerText= this.getDisplayNumber(this.currentOperand)
        if(this.operation!=null)
        {
            this.previousOperandElement.innerText=
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousOperandElement.innerText=''
        }
    }
}
const numButtons=document.querySelectorAll('[data-number]')
const opButtons=document.querySelectorAll('[data-operation]')
const equalsButton=document.querySelector('[data-equals]')
const clearAllButton=document.querySelector('[data-clear-all]')
const deleteButton=document.querySelector('[data-delete]')
const previousOperandElement=document.querySelector('[data-previous-operand]')
const currentOperandElement=document.querySelector('[data-current-operand]')

const calculator= new Calculator(previousOperandElement,currentOperandElement)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })

opButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () =>{
    calculator.compute()
    calculator.updateDisplay()
})

clearAllButton.addEventListener('click', () =>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})