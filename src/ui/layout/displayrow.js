import { Component } from 'preact'
import Tooltip from '../tooltip'

export default class DisplayRow extends Component {
  constructor (props) {
    super(props)
    this.setState({
      value: props.value,
    })
    this.props.format = this.props.format || 'decimal'
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== parseFloat(this.value)) {
      this.setState({
        value: nextProps.value,
      })
    }
  }

  getRowClasses = () => {
    let className = 'row'
    if (this.props.heading) {
      className += ' h'
    }
    if (this.props.subHeading) {
      className += ' s'
    }
    if (this.props.title) {
      className += ' title'
    }
    return className
  }

  help = (props) => {
    if (props.tooltip) {
      return <span> <span class='help-icon'>?</span> <Tooltip label={props.tooltip} /> </span>
    } else {
      return <span />
    }
  };

  getLabel = () => {
    if (this.props.title) {
      return <span>{this.props.label}</span>
    }
    return <span>{this.props.label}</span>
  };

  render () {
    const Help = this.help
    const Label = this.getLabel
    const months = Array.from(new Array(12).keys())

    let formatter
    if (this.props.format !== 'raw') {
      formatter = new Intl.NumberFormat('en-US', {
        style: this.props.format,
        minimumFractionDigits: this.props.format === 'percent' ? 0 : 2,
      })
    }

    return (
      <div class={this.getRowClasses()}>
        <div class='cell h'> <Label title={this.props.title} /> <Help tooltip={this.props.helpText} /></div>
        {months.map(month =>
          <div class='cell'> <span> { formatter ? formatter.format(this.state.value[month]) : this.state.value[month]} </span> </div>
        )}
      </div>
    )
  }
}
