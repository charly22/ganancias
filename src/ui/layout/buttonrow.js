import MonthsBox from '../controls/monthsbox'
import DisplayRow from './displayrow'

export default class ButtonRow extends DisplayRow {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value,
    }
    // console.log(props)
    // this.props.onClick = props.onClick
  }

  handleChange = (event) => {
    const month = event.target.parentElement.value
    this.props.onChange(month)
  }

  render () {
    const Help = this.help
    const months = Array.from(new Array(12).keys())

    return (
      <div class='row'>
        <div class='cell h'> <span>{this.props.label}</span> <Help tooltip={this.props.helpText} /></div>
        {months.map(month =>
          <div class='cell'>
            <button onClick={this.handleChange} value={month} class='icon'> <i class='fa fa-copy' aria-hidden /> </button>
          </div>
        )}
      </div>
    )
  }
}
