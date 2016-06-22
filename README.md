# common-validators
Library with common validators

[![NPM version](https://img.shields.io/npm/v/common-validators.svg)](https://npmjs.org/package/common-validators)
[![Build status](https://img.shields.io/travis/tamtakoe/common-validators.svg)](https://travis-ci.org/tamtakoe/common-validators)

**Note:** This module works in browsers and Node.js >= 4.0

## Installation

```sh
npm install common-validators
```

## Usage

```js
const validators = require('common-validators');

validators.maxLength('abc', 2); //or validators.maxLength('abc', {comparedValue: 2})
/* returns:
{
    message: 'is too long (maximum is 2)',
    error: 'maxLength',
    comparedValue: 2
}
*/

validators.range(7, {from: 1, to: 5, lessMessage: 'is too less', manyMessage: 'is too many'});
/* returns (except options which end in `Message`):
{
    type: 'many',
    message: 'is too many',
    error: 'range',
    from: 1,
    to: 5
}
*/
```

## API

### Validators.add, Validators.load

Use this methods for adding custom validators in simple format (see common-validators-library.js in module folder).
See more in [validators-constructor documentation](https://www.npmjs.com/package/validators-constructor).
Also you can use `Object.assign(commonValidators, customValidators)` in other situations


### Validators.validatorName(value, [comparedValue], [options])

- **value** (`Any`) - Validated value

- **comparedValue** (`Any`) - value for comparison. User can set it as `options.comparedValue`

- **options** (`Object`) - options
  * `comparedValue` (`Any`) - Will be set if comparedValue is specified
  * `parse` (`Function`) - Can change input value before validation
  * (`Any`) - Any custom options

- **return** (`Any`) - `undefined` if valid or error message. You can use %{template} syntax in message strings (validated value enable as `value`)

### Validators:

- **custom** - uses custom validator from options (don't use `comparedValue`)
  * `validate` (`Function`) - Custom function which get `value` and `options` and return result of validation

- **required | presence | empty** - validates that the value isn't empty.


*Types*

- **object** - value is plain object

- **array** - value is array

- **number** - value is number

- **integer** - value is integer

- **string** - value is string

- **date** - value is date

- **boolean** - value is boolean

- **null** - value is null


*Equality (valid if value is empty)*

- **equal** - value is equal to specified value (deep equal for objects)
  * `comparedValue` (`Boolean`) - specified value
  * `strict` (`Boolean`) - Use strict comparison (===). `true` by default


*Numbers* (valid if value is not number or empty)

- **max** - value is less then maximum
  * `comparedValue` (`Number`) - maximum

- **min** - value is more then minimum
  * `comparedValue` (`Number`) - minimum

- **range** - value is in the range from minimum to maximum (including)
  * `from` (`Number`) - minimum. Error: `range.many`
  * `to` (`Number`) - maximum. Error: `range.less`

- **odd** - value is odd

- **even** - value is even

- **divisible** - value is divided by the divisor without a remainder
  * `comparedValue` (`Number`) - divisor


*Length* (valid if value is not string or not array or empty)

- **maxLength** - value's length is less then maximum
  * `comparedValue` (`Number`) - maximum

- **minLength** - value's length is more then minimum
  * `comparedValue` (`Number`) - minimum

- **rangeLength** - value's length is in the range from minimum to maximum (including)
  * `from` (`Number`) - minimum. Error: `rangeLength.many`
  * `to` (`Number`) - maximum. Error: `rangeLength.less`

- **equalLength** - value's length is equal to specified value
  * `comparedValue` (`Number`) - divisor


*RegExp* (valid if value is not string or empty)

- **pattern | format** - value matches the pattern
  * `comparedValue` (`String` or `RegExp`) - pattern


*White and black list* (valid if value is empty)

- **inclusion** - value is contained in white list. If value is an array or object - every item must to be in the list.
  * `comparedValue` (`Array` or `Object`) - white list

```js
inclusion('a', ['a', 'b', 'c']); //valid
inclusion('a', {a, 'smth'}); //valid
inclusion(['a', 'b'], ['a', 'b', 'c']); //valid
inclusion({a: 1, b: 2}, {a: 1, b: 2, c: 3}); //valid
```
- **exclusion** - value is not contained in black list. If value is an array or object - neither item must to be in the list.
  * `comparedValue` (`Array` or `Object`) - black list


*Date and time* (valid if value is not valid date)

- **maxDateTime** - value is less then maximum date
  * `comparedValue` (`Date` or `String` or `Number`) - maximum date

- **minDateTime** - value is more then minimum date
  * `comparedValue` (`Date` or `String` or `Number`) - minimum date

- **rangeDateTime** - value is in the range from minimum to maximum dates (including)
  * `from` (`Date` or `String` or `Number`) - minimum date. Error: `rangeDateTime.many`
  * `to` (`Date` or `String` or `Number`) - maximum date. Error: `rangeDateTime.less`

- **equalDateTime** - value is equal specified date
  * `comparedValue` (`Date` or `String` or `Number`) - specified date

- **maxDate** - value is less then maximum date (time is ignored)
  * `comparedValue` (`Date` or `String` or `Number`) - maximum date

- **minDate** - value is more then minimum date (time is ignored)
  * `comparedValue` (`Date` or `String` or `Number`) - minimum date

- **rangeDate** - value is in the range from minimum to maximum dates (including, time is ignored)
  * `from` (`Date` or `String` or `Number`) - minimum date. Error: `rangeDate.many`
  * `to` (`Date` or `String` or `Number`) - maximum date. Error: `rangeDate.less`

- **equalDate** - value is equal specified date (time is ignored)
  * `comparedValue` (`Date` or `String` or `Number`) - specified date


*Web* (valid if value is not string or empty)

- **email** - value is email address

- **url** - value is URL
  * `allowLocal` (`Boolean`) - allows local hostnames such as 10.0.1.1 or localhost


## Tests

```sh
npm install
npm test
```

## License

[MIT](LICENSE)