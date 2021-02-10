const _ = require('underscore');

const TYPE_FRECUENCY = 1;
const TYPE_PERIOD = 2;

const max16b = 65535;

let TC = 72000000; // timer clock 72 mhz

let convert = (val) => {
    if(!_.isString(val))
        return val;

    let number = parseFloat(val);

    if (val.indexOf('ms') > 0) {
        return 1 / (number / 1000);
    } else if (val.indexOf('us') > 0) {
        return 1 / (number / 1000 / 1000);
    } else if (val.indexOf('ns') > 0) {
        return 1 / (number / 1000 / 1000 / 1000);
    } else {
        return number;
    }

}

let calc = (value) => {

    let needFrequecy = convert(value);

    console.log('needFrequecy', needFrequecy);

    let prescaler = 0;
    let autoreload = 0;

    do {

        autoreload = TC / ( (prescaler + 1) * needFrequecy) - 1;
        prescaler++;

    } while (autoreload > max16b);

    // F = TC / (prescaler + 1) / (autoreload + 1)


    return {
        prescaler: prescaler - 1,
        autoreload: autoreload
    }

}


//console.log( TC / ( (0 + 1) * 142000) - 1 );

console.log( calc('31.77755us') );
