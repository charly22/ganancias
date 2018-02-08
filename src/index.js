import './css/style'
import { Component } from 'preact'
import Salary from './ui/sections/salary'
import Calculator from './services/calculator'
import Sidebar from './ui/sections/sidebar'
import KeyValueLocalStorage from './services/keyvaluelocalstorage'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.storage = new KeyValueLocalStorage('profiles')
    this.setState({
      calculator: new Calculator(this.storage.getCurrent().value),
    })
  }

  componentDidMount () {
    document.title = 'Ganancias'
  }

  handleProfileChange = (values) => {
    this.setState({
      calculator: new Calculator(values),
    })
  }

  handleOnValuesChange = (values) => {
    this.storage.setCurrent(values)
  }

  // disable sidebar temporarely
  // <Sidebar onSelect={this.handleProfileChange} storage={this.storage}>
  //   <Salary calculator={this.state.calculator} onChange={this.handleOnValuesChange} />
  // </Sidebar>

  render () {
    return (
      <Salary calculator={this.state.calculator} />
    )
  }
}
