export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#222222]">
      <div className="form-container mb-[120px]">
        <p className="title">Register</p>
        <form className="form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" placeholder="" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
            />
            <div className="forgot">
              <a rel="noopener noreferrer" href="#">
                Forgot Password ?
              </a>
            </div>
          </div>
          <button className="sign">Sign in</button>
        </form>

        <p className="signup mt-[20px]">
          Don't have an account?
          <a rel="noopener noreferrer" href="#" className="">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
