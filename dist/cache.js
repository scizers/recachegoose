'use strict';

const Cacheman = require('recacheman');
const noop = () => {};
function Cache(options) {
  this.prefix = options && options.prefix || '';
  this._cache = new Cacheman('cachegoose-cache', options);
}
Cache.prototype.get = function (key, cb = noop) {
  const prefixedKey = this.prefix + key;
  return this._cache.get(prefixedKey, cb);
};
Cache.prototype.set = function (key, value, ttl, cb = noop) {
  if (ttl === 0) ttl = -1;
  const prefixedKey = this.prefix + key;
  return this._cache.set(prefixedKey, value, ttl, cb);
};
Cache.prototype.del = function (key, cb = noop) {
  const prefixedKey = this.prefix + key;
  return this._cache.del(prefixedKey, cb);
};
Cache.prototype.clear = function (cb = noop) {
  return this._cache.clear(cb);
};
module.exports = function (options) {
  return new Cache(options);
};