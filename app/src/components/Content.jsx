import SignInUp from './auth/SignInUp';

function Content() {
  return(
    <div className="content">
      { SignInUp() }
    </div>
  )
}

export default Content;