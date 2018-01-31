import { Component } from 'preact'

export default class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.storage = props.storage
    this.setState(
      this.storage.getInitial()
    )
  }

  _callOnSelect = () => {
    if (this.props.onSelect) {
      this.props.onSelect(this.state.value)
    }
  }

  handleOnSelectButtonClick = (event) => {
    this.setState(
      this.storage.get(event.target.value)
    )
    this._callOnSelect()
  }

  handleOnNameChange = (event) => {
    this.setState(
      this.storage.rename(this.state.currentKey, event.target.value)
    )
  }

  handleOnNewButtonClick = (event) => {
    this.setState(
      this.storage.set(null, null)
    )
    this._callOnSelect()
  }

  handleOnRemoveButtonClick = (event) => {
    this.setState(
      this.storage.delete(event.target.parentElement.value)
    )
    this._callOnSelect()
  }

  handleOnCopyButtonClick = (event) => {
    const currentValue = this.storage.get(event.target.parentElement.value)
    this.setState(
      this.storage.set(`Copy of ${event.target.value}`, currentValue)
    )
    this._callOnSelect()
  }

  // <h1> Calculadora de Impuesto a las Ganancias de 4ta Categoría 2018</h1>
  render () {
    return (
      <div class='body-wrapper'>
        <div>
          <input autoFocus class='name-box' placeholder='Untitled' value={this.state.currentKey} onChange={this.handleOnNameChange} />
          {this.props.children}
        </div>
        <div class='sidebar'>
          <button onClick={this.handleOnNewButtonClick} class='new'> <i class='fa fa-plus' aria-hidden /> New </button>
          <ul>
            {
              this.state.keys.map(item => <li>
                <button onClick={this.handleOnSelectButtonClick} value={item}> {item} </button>
                <button onClick={this.handleOnRemoveButtonClick} value={item} class='icon'> <i class='fa fa-trash-o' aria-hidden /></button>
                <button onClick={this.handleOnCopyButtonClick} value={item} class='icon'> <i class='fa fa-copy' aria-hidden /> </button>
              </li>)
            }
          </ul>
        </div>
      </div>
    )
  }
}
