import './css/style'
import { Component } from 'preact'
import Salary from './ui/sections/salary'
import Calculator from './services/calculator'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.setState({
      calculator: new Calculator(),
    })
  }

  render () {
    return (
      <Salary calculator={this.state.calculator} />
    )
  }
}
