const moment = require('moment');

const isDate = (value, {req, location, path}) => {
  if (!value) {
    return false;
  }
  const auxDate = moment(value);
  if (!auxDate.isValid()) {
    return false;
  }
  return true;
}

module.exports = {
  isDate
};
