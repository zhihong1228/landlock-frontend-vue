(function (e, t) {
  typeof exports === 'object' && typeof module === 'object' ? module.exports = t() : typeof define === 'function' && define.amd ? define([], t) : typeof exports === 'object' ? exports.Money = t() : e.Money = t()
}(this, () => (function (e) {
  function t(r) {
    if (n[r]) return n[r].exports
    const i = n[r] = { i: r, l: !1, exports: {} }
    return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
  }

  var n = {}
  return t.m = e, t.c = n, t.i = function (e) {
    return e
  }, t.d = function (e, n, r) {
    t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r })
  }, t.n = function (e) {
    const n = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    }
    return t.d(n, 'a', n), n
  }, t.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, t.p = '.', t(t.s = 9)
}([function (e, t, n) {
  t.a = {
    prefix: '', suffix: '', thousands: ',', decimal: '.', precision: 2,
  }
}, function (e, t, n) {
  const r = n(2); const i = n(5); const
    u = n(0)
  t.a = function (e, t) {
    if (t.value) {
      const o = n.i(i.a)(u.a, t.value)
      if (e.tagName.toLocaleUpperCase() !== 'INPUT') {
        const a = e.getElementsByTagName('input')
        a.length !== 1 || (e = a[0])
      }
      e.oninput = function () {
        let t = e.value.length - e.selectionEnd
        e.value = n.i(r.a)(e.value, o), t = Math.max(t, o.suffix.length), t = e.value.length - t, t = Math.max(t, o.prefix.length + 1), n.i(r.b)(e, t), e.dispatchEvent(n.i(r.c)('change'))
      }, e.onfocus = function () {
        n.i(r.b)(e, e.value.length - o.suffix.length)
      }, e.oninput(), e.dispatchEvent(n.i(r.c)('input'))
    }
  }
}, function (e, t, n) {
  function r(e) {
    const t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : m.a
    typeof e === 'number' && (e = e.toFixed(o(t.precision)))
    const n = e.indexOf('-') >= 0 ? '-' : ''; const r = u(e); const i = c(r, t.precision); const a = d(i).split('.'); let p = a[0]; const
      l = a[1]
    return p = f(p, t.thousands), t.prefix + n + s(p, l, t.decimal) + t.suffix
  }

  function i(e, t) {
    const n = e.indexOf('-') >= 0 ? -1 : 1; const r = u(e); const
      i = c(r, t)
    return parseFloat(i) * n
  }

  function u(e) {
    return d(e).replace(/\D+/g, '') || '0'
  }

  function o(e) {
    return a(0, e, 20)
  }

  function a(e, t, n) {
    return Math.max(e, Math.min(t, n))
  }

  function c(e, t) {
    const n = Math.pow(10, t)
    return (parseFloat(e) / n).toFixed(o(t))
  }

  function f(e, t) {
    return e.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${t}`)
  }

  function s(e, t, n) {
    return t ? e + n + t : e
  }

  function d(e) {
    return e ? e.toString() : ''
  }

  function p(e, t) {
    const n = function () {
      e.setSelectionRange(t, t)
    }
    e === document.activeElement && (n(), setTimeout(n, 1))
  }

  function l(e) {
    const t = document.createEvent('Event')
    return t.initEvent(e, !0, !0), t
  }

  var m = n(0)
  n.d(t, 'a', () => r), n.d(t, 'd', () => i), n.d(t, 'b', () => p), n.d(t, 'c', () => l)
}, function (e, t, n) {
  function r(e, t) {
    t && Object.keys(t).map(e => {
      a.a[e] = t[e]
    }), e.directive('money', o.a), e.component('money', u.a)
  }

  Object.defineProperty(t, '__esModule', { value: !0 })
  const i = n(6); var u = n.n(i); var o = n(1); var
    a = n(0)
  n.d(t, 'Money', () => u.a), n.d(t, 'Money', () => o.a), n.d(t, 'options', () => a.a), n.d(t, 'VERSION', () => c)
  var c = '0.8.1'
  t.default = r, typeof window !== 'undefined' && window.Vue && window.Vue.use(r)
}, function (e, t, n) {
  Object.defineProperty(t, '__esModule', { value: !0 })
  const r = n(1); const i = n(0); const
    u = n(2)
  t.default = {
    name: 'Money',
    props: {
      value: { required: !0, type: [Number, String], default: 0 },
      masked: { type: Boolean, default: !1 },
      precision: {
        type: Number,
        default() {
          return i.a.precision
        },
      },
      decimal: {
        type: String,
        default() {
          return i.a.decimal
        },
      },
      thousands: {
        type: String,
        default() {
          return i.a.thousands
        },
      },
      prefix: {
        type: String,
        default() {
          return i.a.prefix
        },
      },
      suffix: {
        type: String,
        default() {
          return i.a.suffix
        },
      },
    },
    directives: { money: r.a },
    data() {
      return { formattedValue: '' }
    },
    watch: {
      value: {
        immediate: !0,
        handler(e, t) {
          const r = n.i(u.a)(e, this.$props)
          r !== this.formattedValue && (this.formattedValue = r)
        },
      },
    },
    methods: {
      change(e) {
        this.$emit('input', this.masked ? e.target.value : n.i(u.d)(e.target.value, this.precision))
      },
    },
  }
}, function (e, t, n) {
  t.a = function (e, t) {
    return e = e || {}, t = t || {}, Object.keys(e).concat(Object.keys(t)).reduce((n, r) => (n[r] = void 0 === t[r] ? e[r] : t[r], n), {})
  }
}, function (e, t, n) {
  const r = n(7)(n(4), n(8), null, null)
  e.exports = r.exports
}, function (e, t) {
  e.exports = function (e, t, n, r) {
    let i; let u = e = e || {}; const
      o = typeof e.default
    o !== 'object' && o !== 'function' || (i = e, u = e.default)
    const a = typeof u === 'function' ? u.options : u
    if (t && (a.render = t.render, a.staticRenderFns = t.staticRenderFns), n && (a._scopeId = n), r) {
      const c = a.computed || (a.computed = {})
      Object.keys(r).forEach(e => {
        const t = r[e]
        c[e] = function () {
          return t
        }
      })
    }
    return { esModule: i, exports: u, options: a }
  }
}, function (e, t) {
  e.exports = {
    render() {
      const e = this; const
        t = e.$createElement
      return (e._self._c || t)('input', {
        directives: [{
          name: 'money',
          rawName: 'v-money',
          value: {
            precision: e.precision,
            decimal: e.decimal,
            thousands: e.thousands,
            prefix: e.prefix,
            suffix: e.suffix,
          },
          expression: '{precision, decimal, thousands, prefix, suffix}',
        }],
        staticClass: 'v-money',
        attrs: { type: 'tel' },
        domProps: { value: e.formattedValue },
        on: { change: e.change },
      })
    },
    staticRenderFns: [],
  }
}, function (e, t, n) {
  e.exports = n(3)
}]))))
