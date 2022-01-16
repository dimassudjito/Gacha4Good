module.exports.validateRegisterInput = (username, password) => {
    const errors = {}
    if (username.trim() === '') {
      errors.name = 'Name must not be empty'
    }

    if (password === '') {
      errors.password = 'Password must not be empty'
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    }
  }
  
module.exports.validateLoginInput = (email, password) => {
    const errors = {}

    if (password.trim() == '') {
      errors.password = 'Password must not be empty'
    }
  
    return {
      errors,
      valid: Object.keys(errors).length < 1
    }
  }