// from npm stringbuffer. July 7, 2016
// Slightly modified to remove dependence on 'process'
StringBuffer = (function() {
/*
  StringBuffer.NEWLINE = (function() {
    switch (false) {
      case process.platform !== "win32":
        return "\r\n";
      default:
        return "\n";
    }
  })();
*/
  function StringBuffer(separator) {
    this.separator = separator != null ? separator : "";
    this.buffer = [];
    this.index = 0;
  }

  StringBuffer.prototype.append = function(string) {
    var s, _i, _len, _ref;
    if ("StringBuffer" === typeof string) {
      _ref = string.buffer;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        this.append(s);
      }
    } else {
      this.buffer[this.index] = string;
      this.index++;
    }
    return this;
  };

  StringBuffer.prototype.toString = function(separator) {
    if (separator == null) {
      separator = this.separator;
    }
    return this.buffer.join(separator);
  };

  return StringBuffer;

})();
