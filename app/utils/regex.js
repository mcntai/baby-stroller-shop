const REGEX_PATTERN = {
  EMAIL: /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/,
  PHONE: /\+?\d{6,14}/,
}

module.exports = REGEX_PATTERN
