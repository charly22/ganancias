import { Component } from 'preact'

export default class Tooltip extends Component {
  constructor (props) {
    super(props)
    this.setState({
      active: false,
    })
  }

  componentDidMount = () => {
    const node = this.base
    const parent = node.parentNode
    if (parent) {
      parent.onmouseover = () => {
        const position = parent.getBoundingClientRect()
        node.style.top = `${position.top + position.height}px`
        node.style.left = `${position.left + parseInt((position.width / 2) - (node.offsetWidth / 2))}px`
        if (!this.state.active) {
          this.setState({
            active: true,
          })
        }
      }
      parent.onmouseout = () => {
        if (this.state.active) {
          this.setState({
            active: false,
          })
        }
      }
    }
  };

  render () {
    let className = 'tooltip'
    if (this.state.active) {
      className += ' active'
    }

    return (
      <span class={className}> {this.props.label} </span>
    )
  }
}
