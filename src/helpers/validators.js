function isEmpty(value) {
  return (value === undefined || value === null || value === '');
}

export function required( value ) {
  if ( isEmpty(value) ) {
    return 'Required field';
  }
  return undefined;
}

export function email(value) {
  // http://emailregex.com/
  const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (isEmpty(value) || !emailRE.test(value)) {
    return 'Invalid email';
  }
  return undefined;
}

export function containsLowerCase(value) {
  const test = /[a-z]/.test(value);
  if ( !test ) {
    return 'Must contain one lowercase letter';
  }
  return undefined;
}

export function containsUpperCase(value) {
  const test = /[A-Z]/.test(value);
  if ( !test ) {
    return 'Must contain one uppercase letter';
  }
  return undefined;
}

export function containsInteger(value) {
  const test = /[0-9]/.test(value);
  if ( !test ) {
    return 'Must contain one number';
  }
  return undefined;
}

export function truthy( value ) {
  if ( !value ) {
    return 'Must not be blank';
  }
  return undefined;
}

export function minLength(min, filterRegex) {
  return (value) => {
    if ( isEmpty(value) ) return value;
    let result = value;
    if ( filterRegex ) {
      result = result.replace(filterRegex, '');
    }
    if (result.length < min) {
      return `Must contain ${min} or more characters`;
    }
    return undefined;
  };
}

export function maxLength(max) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return `Must contain ${max} or fewer characters`;
    }
    return undefined;
  };
}

export function exactLength(len, filterRegex) {
  return (value) => {
    if ( isEmpty(value) ) return value;
    let result = value;
    if ( filterRegex ) {
      result = result.replace(filterRegex, '');
    }
    if (result.length !== len) {
      return `Must contain exactly ${len} characters`;
    }
    return undefined;
  };
}

// check if valid integer or double
export function isNumber( value ) {
  if ( isNaN( value ) ) {
    return 'Must be a valid number';
  }
  // check for a case such as `22.`, or `.`
  if ( /^([0-9]*\.)$/.test( value ) ) {
    return 'Must be a valid number';
  }
  return undefined;
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be a whole number';
  }
  return undefined;
}

export function zipcode(value) {
  const valueString = ( value && String(value) );
  if ( !/^[0-9]{5}$/.test(valueString) ) {
    return 'Must be a valid zipcode';
  }
  return undefined;
}

// Run one validator after another, return the first error found
export const composeValidators = (...validators) => (value) => {
  for ( let i = 0; i < validators.length; i++ ) {
    const error = validators[i](value);
    if ( error ) {
      return error;
    }
  }
  return undefined;
};
