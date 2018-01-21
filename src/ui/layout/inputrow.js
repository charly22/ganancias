import NumberBox from '../controls/numberbox'
import ChildrenBox from '../controls/childrenbox'
import MyCheckbox from '../controls/checkbox'
import DisplayRow from './displayrow'

export default class InputRow extends DisplayRow {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value,
    }
  }

  components = {
    number: NumberBox,
    children: ChildrenBox,
    checkbox: MyCheckbox,
  }

  render () {
    const Type = this.components[this.props.type || 'number']
    const Help = this.help
    const months = Array.from(new Array(12).keys())

    return (
      <div class='row'>
        <div class='cell h'> <span>{this.props.label}</span> <Help tooltip={this.props.helpText} /></div>
        {months.map(month =>
          <div class='cell'> <Type month={month} value={this.state.value[month]} onChange={this.props.onChange} /> </div>
        )}
      </div>
    )
  }
}
