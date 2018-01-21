import { Component } from 'preact'

export default class NumberBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value,
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== parseFloat(this.state.value)) {
      this.state = {
        value: nextProps.value,
      }
    }
  }

  handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? Number(event.target.checked) : event.target.value
    this.setState({
      value: value,
    }, () => {
      this.props.onChange(this.props.month, this.state.value)
    })
  }

  render () {
    return (
      <input tabindex={this.props.month + 1} type='number' value={this.state.value} onChange={this.handleChange} />
    )
  }
}
