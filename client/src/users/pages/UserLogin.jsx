export default function UserLogin() {
  const formHandler = () => {

  }

  const inputHandler = () => {

  }

  return (
    <form onSubmit={formHandler}>
      <fieldset>
        <legend>Login</legend>

        <section>
          <div>
            <label htmlFor="username">Username : </label>
          </div>
          <div>
            <input type="text" name="username" id="username" onChange={inputHandler} />
          </div>
        </section>

        <section>
          <div>
            <label htmlFor="email">Email : </label>
          </div>
          <div>
            <input type="email" name="email" id="email" onChange={inputHandler} />
          </div>
        </section>

        <section>
          <div>
            <label htmlFor="pass">Password : </label>
          </div>
          <div>
            <input type="password" name="pass" id="pass" onChange={inputHandler} />
          </div>
        </section>

        <div className="register">
          <input type="submit" value="Login" />
        </div>
      </fieldset>
    </form>
  )
}