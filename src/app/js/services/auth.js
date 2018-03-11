const auth = (function () {
  let auth = window.localStorage.getItem('cea-uname')

  async function login (name, pass) {
    await new Promise(resolve => setTimeout(resolve, 3000))
    window.localStorage.setItem('cea-uname', name)
    auth = name
    return true
  }

  function logout () {
    window.localStorage.removeItem('cea-uname')
    auth = false
  }

  function isAuth () {
    return auth !== null
  }

  function getUser () {
    if (isAuth()) {
      return window.localStorage.getItem('cea-uname')
    }

    return undefined
  }

  return {
    login,
    logout,
    isAuth,
    getUser
  }
}())

export default auth
