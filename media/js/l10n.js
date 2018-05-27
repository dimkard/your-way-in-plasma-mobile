/** Copyright (c) 2011-2012 Fabien Cazenave, Mozilla.
  * Copyright (c) 2018 Dimitris Kardarakos, KDE.W
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to
  * deal in the Software without restriction, including without limitation the
  * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
  * sell copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in
  * all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
  * IN THE SOFTWARE.
  */
/*jshint browser: true, devel: true, es5: true, globalstrict: true */
'use strict';

document.webL10n = (function(window, document, undefined) {
  var gLanguage = 'en';
  var gReadyState = 'loading';

  // read-only setting -- we recommend to load l10n resources synchronously
  var gAsyncResourceLoading = true;

  // clear all l10n data
  function clear() {
    gLanguage = '';
  }


  // cross-browser API (sorry, oldIE doesn't support getters & setters)
  return {
    // get|set the document language
    getLanguage: function() { return gLanguage; },
    setLanguage: function(lang) { clear(); gLanguage = lang; },

    // get the direction (ltr|rtl) of the current language
    getDirection: function() {
      // http://www.w3.org/International/questions/qa-scripts
      // Arabic, Hebrew, Farsi, Pashto, Urdu
      var rtlList = ['ar', 'he', 'fa', 'ps', 'ur'];
      return (rtlList.indexOf(gLanguage) >= 0) ? 'rtl' : 'ltr';
    },

    // this can be used to prevent race conditions
    getReadyState: function() { return gReadyState; }
  };

}) (window, document);


