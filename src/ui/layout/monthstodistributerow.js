import MonthsBox from '../controls/monthsbox'
import DisplayRow from './displayrow'

export default class MonthsToDistributeRow extends DisplayRow {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value,
      showIf: props.showIf,
    }
  }

  render () {
    const Help = this.help
    const months = Array.from(new Array(12).keys())

    return (
      <div class='row'>
        <div class='cell h'> <span>{this.props.label}</span> <Help tooltip={this.props.helpText} /></div>
        {months.map(month =>
          <div class='cell'>
            { this.state.showIf[month] ? <MonthsBox month={month} value={this.state.value[month]} onChange={this.props.onChange} /> : null }
          </div>
        )}
      </div>
    )
  }
}
