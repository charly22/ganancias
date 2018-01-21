import NumberBox from './numberbox'

export default class ChildrenBox extends NumberBox {
  render () {
    return (
      <label>
        <select tabindex={this.props.month + 1} value={this.state.value} onChange={this.handleChange}>
          <option value='0'>0</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
        </select>
      </label>
    )
  }
}
