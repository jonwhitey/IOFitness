function getCookie(name, cookieStr) {
  const parts = cookieStr.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts
      .pop()
      .split(';')
      .shift();
  }
  return parts;
}

module.exports = getCookie;
