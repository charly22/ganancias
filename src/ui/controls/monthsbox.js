import NumberBox from './numberbox'

export default class MonthsBox extends NumberBox {
  render () {
    const months = Array.from(new Array(12 - this.props.month).keys(), (i) => i + 1)

    return (
      <label>
        <select tabindex={this.props.month + 1} value={this.state.value} onChange={this.handleChange}>
          {months.map(m => <option value={m}> {m} </option>)}
        </select>
      </label>
    )
  }
}
