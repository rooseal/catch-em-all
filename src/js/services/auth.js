export default (function () {
  let auth = false

  async function login (name, pass) {
    await setTimeout(() => {
      window.localStorage.setItem('cea-uname', name)
    }, 200)
    return true
  }

  function logout () {
    window.localStorage.removeItem('cea-uname')
    auth = false
  }

  function isAuth () {
    return window.localStorage.getItem('uname') !== undefined
  }

  return {
    login,
    logout,
    isAuth
  }
}())
