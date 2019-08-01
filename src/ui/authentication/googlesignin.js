import { Component } from 'preact'

export default class GoogleSignIn extends Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
    const meta = document.createElement('meta')
    meta.name = 'google-signin-client_id'
    meta.content = '309171788996-lvnka9bte9c5t62dnmd20chafjmsqvfv.apps.googleusercontent.com'
    document.head.appendChild(meta)

    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js'
    script.async = true
    script.defer = true

    const component = this
    script.onload = () => {
      const onSuccess = (googleUser) => {
        if (component.props.onSignIn) {
          component.props.onSignIn(gapi, googleUser)
        }

        component.setState({
          user: googleUser,
        })

        const initClient = () => {
          return gapi.client.init({
            apiKey: 'xxx',
            clientId: '309171788996-lvnka9bte9c5t62dnmd20chafjmsqvfv.apps.googleusercontent.com',
            discoveryDocs: [ 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest' ],
            scope: 'https://www.googleapis.com/auth/drive.appdata',
          }).catch((e) => {
            console.log(e)
          })
        }

        gapi.load('client:auth2', initClient)
      }

      const onFailure = (error) => {
        console.log(error)
      }

      gapi.signin2.render('my-signin2', {
        scope: 'https://www.googleapis.com/auth/drive.appdata',
        width: 240,
        height: 40,
        longtitle: true,
        theme: 'dark',
        onsuccess: onSuccess,
        onfailure: onFailure,
      })
    }
    document.body.appendChild(script)
  }

  render () {
    const SignIn = (props) => {
      if (!props.user) {
        return (<div class='g-signin2' id='my-signin2' />)
      } else {
        return (<div> {props.children} </div>)
      }
    }
    return (
      <SignIn user={this.state.user} children={this.props.children} />
    )
  }
}
