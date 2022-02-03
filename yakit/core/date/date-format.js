import { locales } from './base-locales.js';
// pattern for format parts
export const reFormatTokens = /dd?|DD?|mm?|MM?|yy?(?:yy)?/;
// pattern for non date parts
export const reNonDateParts = /[\s!-/:-@[-`{-~年月日]+/;

export function stripTime(timeValue) {
  return new Date(timeValue).setHours(0, 0, 0, 0);
}

export function today() {
  return new Date().setHours(0, 0, 0, 0);
}

export function lastItemOf(arr) {
  return arr[arr.length - 1]
}

// cache for persed formats
let knownFormats = {};
// parse funtions for date parts
const parseFns = {
  y(date, year) {
    return new Date(date).setFullYear(parseInt(year, 10));
  },
  M: undefined,  // placeholder to maintain the key order
  m(date, month, locale) {
    const newDate = new Date(date);
    let monthIndex = parseInt(month, 10) - 1;

    if (isNaN(monthIndex)) {
      if (!month) {
        return NaN;
      }

      const monthName = month.toLowerCase();
      const compareNames = name => name.toLowerCase().startsWith(monthName);
      // compare with both short and full names because some locales have periods
      // in the short names (not equal to the first X letters of the full names)
      monthIndex = locale.monthsShort.findIndex(compareNames);
      if (monthIndex < 0) {
        monthIndex = locale.months.findIndex(compareNames);
      }
      return monthIndex < 0 ? NaN : newDate.setMonth(monthIndex);
    }

    newDate.setMonth(monthIndex);
    return newDate.getMonth() !== normalizeMonth(monthIndex)
      ? newDate.setDate(0)
      : newDate.getTime();
  },
  d(date, day) {
    return new Date(date).setDate(parseInt(day, 10));
  },
};
parseFns.M = parseFns.m;  // make "M" an alias of "m"
// format functions for date parts
const formatFns = {
  d(date) {
    return date.getDate();
  },
  dd(date) {
    return padZero(date.getDate(), 2);
  },
  D(date, locale) {
    return locale.daysShort[date.getDay()];
  },
  DD(date, locale) {
    return locale.days[date.getDay()];
  },
  m(date) {
    return date.getMonth() + 1;
  },
  mm(date) {
    return padZero(date.getMonth() + 1, 2);
  },
  M(date, locale) {
    return locale.monthsShort[date.getMonth()];
  },
  MM(date, locale) {
    return locale.months[date.getMonth()];
  },
  y(date) {
    return date.getFullYear();
  },
  yy(date) {
    return padZero(date.getFullYear(), 2).slice(-2);
  },
  yyyy(date) {
    return padZero(date.getFullYear(), 4);
  },
};

// get month index in normal range (0 - 11) from any number
function normalizeMonth(monthIndex) {
  return monthIndex > -1 ? monthIndex % 12 : normalizeMonth(monthIndex + 12);
}

function padZero(num, length) {
  return num.toString().padStart(length, '0');
}

function parseFormatString(format) {
  if (typeof format !== 'string') {
    throw new Error("Invalid date format.");
  }
  if (format in knownFormats) {
    return knownFormats[format];
  }

  // sprit the format string into parts and seprators
  const separators = format.split(reFormatTokens);

  const parts = format.match(new RegExp(reFormatTokens, 'g'));
  if (separators.length === 0 || !parts) {
    throw new Error("Invalid date format.");
  }

  // collect format functions used in the format
  const partFormatters = parts.map(token => formatFns[token]);

  // collect parse functions used in the format
  // iterate over parseFns' keys in order to keep the order of the keys.
  const partParsers = Object.keys(parseFns).reduce((parsers, key) => {
    const token = parts.find(part => part[0] === key);
    if (!token) {
      return parsers;
    }
    parsers[key] = parseFns[key];
    return parsers;
  }, {});
  const partParserKeys = Object.keys(partParsers);

  return knownFormats[format] = {
    parser(dateStr, locale) {
      const dateParts = dateStr.split(reNonDateParts).reduce((dtParts, part, index) => {
        if (part.length > 0 && parts[index]) {
          const token = parts[index][0];
          if (parseFns[token] !== undefined) {
            dtParts[token] = part;
          }
        }
        return dtParts;
      }, {});

      // iterate over partParsers' keys so that the parsing is made in the oder
      // of year, month and day to prevent the day parser from correcting last
      // day of month wrongly
      return partParserKeys.reduce((origDate, key) => {
        const newDate = partParsers[key](origDate, dateParts[key], locale);
        // ingnore the part failed to parse
        return isNaN(newDate) ? origDate : newDate;
      }, today());
    },
    formatter(date, locale) {
      let dateStr = partFormatters.reduce((str, fn, index) => {
        return str += `${separators[index]}${fn(date, locale)}`;
      }, '');
      // separators' length is always parts' length + 1,
      let lastSep = separators[separators.length - 1]
      dateStr = dateStr + lastSep
      return dateStr
    },
  };
}

export function parseDate(dateStr, format, locale) {
  if (dateStr instanceof Date || typeof dateStr === 'number') {
    const date = stripTime(dateStr);
    return isNaN(date) ? undefined : date;
  }
  if (!dateStr) {
    return undefined;
  }
  if (dateStr === 'today') {
    return today();
  }

  if (format && format.toValue) {
    const date = format.toValue(dateStr, format, locale);
    return isNaN(date) ? undefined : stripTime(date);
  }

  return parseFormatString(format).parser(dateStr, locale);
}

/**
 * Format Date object or time value in given format and language
 * @param  {Date|Number} date - date or time value to format
 * @param  {String|Object} format - format string or object that contains
 * toDisplay() custom formatter, whose signature is
 * - args:
 *   - date: {Date} - Date instance of the date passed to the method
 *   - format: {Object} - the format object passed to the method
 *   - locale: {Object} - locale for the language specified by `lang`
 * - return:
 *     {String} formatted date
 * @param  {String} [lang=en] - language code for the locale to use
 * @return {String} formatted date
 */
export function formatDate(date, format, locale) {
  //default to en
  if(!locale) locale = locales[locale] || locales.en

  if (isNaN(date) || (!date && date !== 0)) {
    return '';
  }

  const dateObj = typeof date === 'number' ? new Date(date) : date;

  if (format.toDisplay) {
    return format.toDisplay(dateObj, format, locale);
  }
  let formatDate = parseFormatString(format).formatter(dateObj, locale)
  // console.log("formatDate", formatDate)
  return formatDate
}
