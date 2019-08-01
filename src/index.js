import './css/style'
import { Component } from 'preact'
import Salary from './ui/sections/salary'
import Calculator from './services/calculator'
import Sidebar from './ui/sections/sidebar'
import KeyValueLocalStorage from './services/keyvaluelocalstorage'
import GoogleSignIn from './ui/authentication/googlesignin'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.storage = new KeyValueLocalStorage('profiles')
    this.setState({
      calculator: new Calculator(this.storage.getCurrent().value),
    })
  }

  handleProfileChange = () => {
    this.setState({
      calculator: new Calculator(this.storage.getCurrent().value),
    })
  }

  handleOnValuesChange = () => {
    this.storage.setCurrent(this.state.calculator.getValuesToStore())
  }

  onSignIn = (gapi, user) => {
    this.setState({
      user: user,
      gapi: gapi,
    })
  }

  render () {
    return (
      <GoogleSignIn onSignIn={this.onSignIn}>
        <Sidebar onSelect={this.handleProfileChange} storage={this.storage}>
          <Salary calculator={this.state.calculator} onChange={this.handleOnValuesChange} />
        </Sidebar>
      </GoogleSignIn>
    )
  }
}
