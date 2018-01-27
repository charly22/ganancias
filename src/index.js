import './css/style'
import { Component } from 'preact'
import Salary from './ui/sections/salary'
import Calculator from './services/calculator'

export default class App extends Component {
  constructor (props) {
    super(props)
    let initialValues
    this.calculator = new Calculator(initialValues)
  }

  componentDidMount () {
    document.title = 'Ganancias'
  }

  render () {
    return (
      <div class='body-wrapper'>
        <h1> Calculadora de Impuesto a las Ganancias de 4ta Categoría 2018</h1>
        <Salary calculator={this.calculator} />
      </div>
    )
  }
}
