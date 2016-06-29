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

validators.maxLength('abc', 2); //or validators.maxLength('abc', {arg: 2})
/* returns:
{
    message: 'is too long (maximum is 2)',
    error: 'maxLength', //validator name by default
    arg: 2
}
*/

validators.range(7, {from: 1, to: 5, lessMessage: 'is too less', manyMessage: 'is too many'});
/* returns (except options which end in `Message`):
{
    message: 'is too many',
    error: 'range.many',
    from: 1,
    to: 5
}
*/
```

## API

### Validators.add, Validators.load

Use this methods for adding custom validators in simple format (see 'lib/common-validators-library.js').
See more in [validators-constructor documentation](https://www.npmjs.com/package/validators-constructor).
Also you can use `Object.assign(commonValidators, customValidators)` in other situations


### Validators.validatorName(value, [arg], [options])

- **value** (`Any`) - Validated value

- **arg** (`Any`) - Value for comparison. Have to exist and can not be an object or true.
                    User can set it as `options.arg`.
                    If you use 'arg' in your validator you must be sure that user will specify this value

- **options** (`Object`) - Options
  * arg (`Any`) - Will be set if arg is specified
  * message (`Any`) - Override error message
  * parse (`Function`) - Can change input value before validation
  * (`Any`) - Any custom options

- (`Any`) - Any custom arguments

- **return** (`Any`) - `undefined` if valid or error message. You can use %{template} syntax in message strings (validated value is enabled as `value`, compared value - as `arg`)

### Validators:

- **custom** - uses custom validator from options
  * arg (`Function`) - Custom function which get `value` and `options` and return result of validation (message or undefined)

- **required | presence | empty** - validates that the value isn't empty.


#### *Types*

- **object** - value is plain object

- **array** - value is array

- **number** - value is number

- **integer** - value is integer

- **string** - value is string

- **date** - value is date

- **boolean** - value is boolean

- **null** - value is null


#### *Equality (valid if value is empty)*

- **equal** - value is equal to specified value (deep equal for objects)
  * arg (`Any`) - specified value. Notice! If you use 'arg' as argument it need to exist and not to be object or true
  * strict (`Boolean`) - Use strict comparison (===). `true` by default

- **confirm** - option in object is equal to other option in the same object. Value need to be an object
  * key (`String`) - first key in value
  * comparedKey (`String`) - second key in value
  * strict (`Boolean`) - Use strict comparison (===). `true` by default

#### *Numbers* (valid if value is not number or empty)

- **max** - value is less then maximum
  * arg (`Number`) - maximum
  * inclusive (`Boolean`) - inclusive arg. `true` by default

- **min** - value is more then minimum
  * arg (`Number`) - minimum
  * inclusive (`Boolean`) - inclusive arg. `true` by default

- **range** - value is in the range from minimum to maximum
  * from (`Number`) - minimum. Error: `range.many`
  * to (`Number`) - maximum. Error: `range.less`
  * inclusive (`Boolean`) - inclusive from and to. `true` by default
  * inclusiveFrom (`Boolean`) - inclusive from. `true` by default
  * inclusiveTo (`Boolean`) - inclusive to. `true` by default

- **odd** - value is odd

- **even** - value is even

- **divisible** - value is divided by the divisor without a remainder
  * arg (`Number`) - divisor


#### *Length* (valid if value is not string or not array or empty)

- **maxLength** - value's length is less then maximum
  * arg (`Number`) - maximum

- **minLength** - value's length is more then minimum
  * arg (`Number`) - minimum

- **rangeLength** - value's length is in the range from minimum to maximum (including)
  * from (`Number`) - minimum. Error: `rangeLength.many`
  * to (`Number`) - maximum. Error: `rangeLength.less`

- **equalLength** - value's length is equal to specified value
  * arg (`Number`) - divisor


#### *RegExp* (valid if value is not string or empty)

- **pattern | format** - value matches the pattern
  * arg (`String` or `RegExp`) - pattern


#### *White and black list* (valid if value is empty)

- **inclusion** - value is contained in white list. If value is an array or object - every item must to be in the list.
  * arg (`Array` or `Object`) - white list

```js
inclusion('a', ['a', 'b', 'c']); //valid
inclusion('a', {a, 'smth'}); //valid
inclusion(['a', 'b'], ['a', 'b', 'c']); //valid
inclusion({a: 1, b: 2}, {a: 1, b: 2, c: 3}); //valid
```
- **exclusion** - value is not contained in black list. If value is an array or object - neither item must to be in the list.
  * arg (`Array` or `Object`) - black list


#### *Date and time* (valid if value is not valid date)

- **maxDateTime** - value is less then maximum date
  * arg (`Date` or `String` or `Number`) - maximum date

- **minDateTime** - value is more then minimum date
  * arg (`Date` or `String` or `Number`) - minimum date

- **rangeDateTime** - value is in the range from minimum to maximum dates (including)
  * from (`Date` or `String` or `Number`) - minimum date. Error: `rangeDateTime.many`
  * to (`Date` or `String` or `Number`) - maximum date. Error: `rangeDateTime.less`

- **equalDateTime** - value is equal specified date
  * arg (`Date` or `String` or `Number`) - specified date

- **maxDate** - value is less then maximum date (time is ignored)
  * arg (`Date` or `String` or `Number`) - maximum date

- **minDate** - value is more then minimum date (time is ignored)
  * arg (`Date` or `String` or `Number`) - minimum date

- **rangeDate** - value is in the range from minimum to maximum dates (including, time is ignored)
  * from (`Date` or `String` or `Number`) - minimum date. Error: `rangeDate.many`
  * to (`Date` or `String` or `Number`) - maximum date. Error: `rangeDate.less`

- **equalDate** - value is equal specified date (time is ignored)
  * arg (`Date` or `String` or `Number`) - specified date


#### *Web* (valid if value is not string or empty)

- **email** - value is email address

- **url** - value is URL
  * allowLocal (`Boolean`) - allows local hostnames such as 10.0.1.1 or localhost

- **ipAddress** - value is IP address or hostname
  * ipv4 (`Boolean`) - value is IPv4 address. `true` by default
  * ipv6 (`Boolean`) - value is IPv6 address. `true` by default
  * hostname (`Boolean`) - value is hostname (RFC 1123). `true` by default


## Tests

```sh
npm install
npm test
```

## License

[MIT](LICENSE)