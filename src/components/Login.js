import styled from 'styled-components'
import {connect} from 'react-redux'
import {signInApi} from '../actions'
import {Navigate} from 'react-router'


function Login(props) {
  return (
    <Container>

      {props.user && 
        <Navigate to='/home' />
      }

      <Nav>
        <a href='/'>
          <img src='/images/login-logo.svg' alt=''/>
        </a>
        <div>
          <SignIn onClick={props.signIn}>SignIn</SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your Professional Community</h1>
          <Google onClick={props.signIn}>
            <img src='/images/google.svg' alt='' />
            Sign in with Google
          </Google>
        </Hero>
        <div className='image'>
        <img src='https://static-exp1.licdn.com/sc/h/dxf91zhqd2z6b0bwg85ktm5s4'/>
        </div>
      </Section>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  max-width: 1128px;
  margin: 0 auto;
  width: 100%;
  align-items: center;


  a {
    cursor: pointer;

    img{
      width: 84px;
      height: 21px;

      @media(min-width: 1160px){
        width: 135px;
        height: 34px;
      }
    }
  }

`

const SignIn = styled.a`
  padding: 8px 16px;
  font-weight: 600;
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  font-size: 18px;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 24px;
`

 const Section = styled.section`
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 70px);
  max-width: 1128px;
  width: 100%;

  .image {
    text-align: center;
    img {
      width: 374px;
      height: 214px;
      margin: 0 auto;

    @media(min-width: 772px){
      width: 700px;
      height: 560px;
    }
    }
  }

  @media(min-width: 772px){
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  @media(min-width: 1160px){
    height: calc(100vh - 80px);
  }

 `

 const Hero = styled.div`

  margin-bottom: 30px;
  
  h1 {
    font-size: 32px;
    font-weight: 300;
    color: rgba(143, 88, 73, 1);
    line-height: 1.2;
    padding-bottom: 24px;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

    @media(min-width: 772px){
      font-size: 56px;
      font-weight: 200;
    }
  }

  @media(min-width: 772px){
    padding-right: 72px;
    flex-shrink: 0;
    width: 55%;
    max-width: 450px;
  }

 `

const Google = styled.button`
  box-sizing: border-box;
  color: rgba(0,0,0,0.6);
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: inherit;
  border: ; 
  border-radius: 28px;
  width: 100%;
  height: 56px;
  cursor: pointer;
  border: 1px solid rgb(0 0 0 / 60%);

  img {
    margin-right: 24px;
    width: 24px;
    height: 24px;
  }

`

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  }
}

const mapDispatchToProps = (dispatch) => ({

  signIn: () => dispatch(signInApi())

})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
