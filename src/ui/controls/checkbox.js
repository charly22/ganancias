import NumberBox from './numberbox'

export default class MyCheckbox extends NumberBox {
  render () {
    return (
      <input tabindex={this.props.month + 1} type='checkbox' checked={this.state.value} onChange={this.handleChange} />
    )
  }
}
