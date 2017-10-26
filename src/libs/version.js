/* eslint-disable */
// 版本判断
const rules = {
  range: /^\s*([\d.]+)~([\d.]+)\s*$/,
  min: /^\s*([\d.]+)~\s*$/,
  max: /^\s*~([\d.]+)\s*$/
};

/**
 * [版本判断]
 * @param  {string} tarVer  [需要判断的版本号]
 * @param  {string} verRule [判定规则]
 * @example
 *    a) "9.5~" 版本号大于等于9.5
 *    b) "9.5~9.7" 版本号大于等于9.5小于9.7
 *    b) "~9.5" 版本号小于9.5
 * @return {boolen}         [ture or false]
 */
const match = (tarVer, verRule) => {
  // 缺省版本位权值
  let bitValue = 100;
  let ruleMatches;
  let minVer;
  let maxVer;
  let tar;
  let min;
  let max;
  let ret;
  if (verRule.match(rules.range)) {
    ruleMatches = verRule.match(rules.range);
    minVer = ruleMatches[1];
    maxVer = ruleMatches[2];
    bitValue = getMaxBitLength([tarVer, minVer, maxVer]);
    tar = calcVersionValue(tarVer, bitValue);
    min = calcVersionValue(minVer, bitValue);
    max = calcVersionValue(maxVer, bitValue);
    ret = tar >= min && tar < max;
  } else if (verRule.match(rules.min)) {
    ruleMatches = verRule.match(rules.min);
    minVer = ruleMatches[1];
    bitValue = getMaxBitLength([tarVer, minVer]);
    tar = calcVersionValue(tarVer, bitValue);
    min = calcVersionValue(minVer, bitValue);
    ret = tar >= min;
  } else if (verRule.match(rules.max)) {
    ruleMatches = verRule.match(rules.max);
    maxVer = ruleMatches[1];
    bitValue = getMaxBitLength([tarVer, maxVer]);
    tar = calcVersionValue(tarVer, bitValue);
    max = calcVersionValue(maxVer, bitValue);
    ret = tar < max;
  } else {
    // 规则匹配失败
    ret = '';
  }
  return ret;
};

/**
 * [将版本号转化为可比较运算的number]
 * @param  {string} verStr [版本号]
 * @param  {string} bitVal [缺省版本位权值]
 * @return {number}        [版本数]
 */
function calcVersionValue(verStr, bitVal) {
  if (!/\./.test(verStr)) {
    return 0;
  }
  const bits = verStr.split('.');
  const baseBitValue = bitVal ** 3;
  let value = 0;
  bits.forEach((bit, index) => {
    value += bit * baseBitValue * (bitVal ** (0 - index));
  });
  return value;
}

/**
 * 获取版本号中最长位
 * @param  {String} versions [description]
 * @return {Number}          [description]
 */
function getMaxBitLength(_versions) {
  let maxLen = 1;
  let versions = _versions;
  if (typeof versions === 'string') {
    versions = [versions];
  }

  versions.forEach(ver => {
    if (/\./.test(ver)) {
      ver.split('.').forEach(verBit => {
        if (verBit.length > maxLen) {
          maxLen = verBit.length;
        }
      });
    }
  });
  return (10 ** maxLen);
}

/**
 * [判断-javascript对象类型]
 * @param  {String}  type [Array|Boolean|Date|Math|Number|String|RegExp .....]
 * @param  {Object}  obj  [对象类型名称]
 * @return {Boolean}      [true or false]
 */
// function isObjectType(type, obj) {
//   return Object.prototype.toString.call(obj).indexOf('[object ' + type) === 0;
// }

export default {
  match
};

/** **  testing  ****/
// console.log('9.6', '9.6~', match('9.6', '9.6~'));
// console.log('9.6', '9.6~9.7.12', match('9.6', '9.6~9.7.12'));
// console.log('9.6', '~9.4.999', match('9.6', '~9.4.999'));
