var CodeMirror = function () {
        function D(a, b) {
            if (a.indexOf) return a.indexOf(b);
            for (var c = 0, d = a.length; c < d; ++c) if (a[c] == b) return c;
            return -1
        }
        function C(a, b) {
            if (!b) return a ? a.length : 0;
            if (!a) return b.length;
            for (var c = a.length, d = b.length; c >= 0 && d >= 0; --c, --d) if (a.charAt(c) != b.charAt(d)) break;
            return d + 1
        }
        function B(a) {
            return a.replace(/[<>&]/g, function (a) {
                return a == "&" ? "&amp;" : a == "<" ? "&lt;" : "&gt;"
            })
        }
        function A(a) {
            return {
                line: a.line,
                ch: a.ch
            }
        }
        function z(a, b) {
            return a.line < b.line || a.line == b.line && a.ch < b.ch
        }
        function y(a, b) {
            return a.line == b.line && a.ch == b.ch
        }
        function x(a) {
            return a.textContent || a.innerText || a.nodeValue || ""
        }
        function w(a, b) {
            var c = a.ownerDocument.body,
                d = 0,
                e = 0,
                f = !1;
            for (var g = a; g; g = g.offsetParent) d += g.offsetLeft, e += g.offsetTop, g == c && (f = !0);
            var h = b && f ? null : c;
            for (var g = a.parentNode; g != h; g = g.parentNode) g.scrollLeft != null && (d -= g.scrollLeft, e -= g.scrollTop);
            return {
                left: d,
                top: e
            }
        }
        function v(a, b) {
            b == null && (b = a.search(/[^\s\u00a0]/), b == -1 && (b = a.length));
            for (var c = 0, d = 0; c < b; ++c) a.charAt(c) == "\t" ? d += r - d % r : ++d;
            return d
        }
        function n() {
            this.id = null
        }
        function m(a, b, c, d) {
            function e(a) {
                c(new l(a || window.event))
            }
            if (typeof a.addEventListener == "function") {
                a.addEventListener(b, e, !1);
                if (d) return function () {
                    a.removeEventListener(b, e, !1)
                }
            } else {
                a.attachEvent("on" + b, e);
                if (d) return function () {
                    a.detachEvent("on" + b, e)
                }
            }
        }
        function l(a) {
            this.e = a
        }
        function k(a) {
            a.stop || (a.stop = j);
            return a
        }
        function j() {
            this.preventDefault ? (this.preventDefault(), this.stopPropagation()) : (this.returnValue = !1, this.cancelBubble = !0)
        }
        function i() {
            this.time = 0, this.done = [], this.undone = []
        }
        function h(a, b, c, d) {
            for (var e = 0, f = 0, g = 0; f < b; e += 2) {
                var h = c[e],
                    i = f + h.length;
                g == 0 ? (i > a && d.push(h.slice(a - f, Math.min(h.length, b - f)), c[e + 1]), i >= a && (g = 1)) : g == 1 && (i > b ? d.push(h.slice(0, b - f), c[e + 1]) : d.push(h, c[e + 1])), f = i
            }
        }
        function g(a, b) {
            this.styles = b || [a, null], this.stateAfter = null, this.text = a, this.marked = this.gutterMarker = this.className = null
        }
        function f(a) {
            this.pos = this.start = 0, this.string = a
        }
        function e(a, b, c) {
            return a.startState ? a.startState(b, c) : !0
        }
        function d(a, b) {
            if (b === !0) return b;
            if (a.copyState) return a.copyState(b);
            var c = {};
            for (var d in b) {
                var e = b[d];
                e instanceof Array && (e = e.concat([])), c[d] = e
            }
            return c
        }
        function a(b, c) {
            function cI(a, b, c) {
                this.atOccurrence = !1, c == null && (c = typeof a == "string" && a == a.toLowerCase()), b && typeof b == "object" ? b = bZ(b) : b = {
                    line: 0,
                    ch: 0
                }, this.pos = {
                    from: b,
                    to: b
                };
                if (typeof a != "string") this.matches = function (b, c) {
                    if (b) {
                        var d = T[c.line].text.slice(0, c.ch),
                            e = d.match(a),
                            f = 0;
                        while (e) {
                            var g = d.indexOf(e[0]);
                            f += g, d = d.slice(g + 1);
                            var h = d.match(a);
                            if (h) e = h;
                            else break;
                            f++
                        }
                    } else var d = T[c.line].text.slice(c.ch),
                        e = d.match(a),
                        f = e && c.ch + d.indexOf(e[0]);
                    if (e) return {
                        from: {
                            line: c.line,
                            ch: f
                        },
                        to: {
                            line: c.line,
                            ch: f + e[0].length
                        },
                        match: e
                    }
                };
                else {
                    c && (a = a.toLowerCase());
                    var d = c ?
                    function (a) {
                        return a.toLowerCase()
                    } : function (a) {
                        return a
                    }, e = a.split("\n");
                    e.length == 1 ? this.matches = function (b, c) {
                        var e = d(T[c.line].text),
                            f = a.length,
                            g;
                        if (b ? c.ch >= f && (g = e.lastIndexOf(a, c.ch - f)) != -1 : (g = e.indexOf(a, c.ch)) != -1) return {
                            from: {
                                line: c.line,
                                ch: g
                            },
                            to: {
                                line: c.line,
                                ch: g + f
                            }
                        }
                    } : this.matches = function (a, b) {
                        var c = b.line,
                            f = a ? e.length - 1 : 0,
                            g = e[f],
                            h = d(T[c].text),
                            i = a ? h.indexOf(g) + g.length : h.lastIndexOf(g);
                        if (!(a ? i >= b.ch || i != g.length : i <= b.ch || i != h.length - g.length)) for (;;) {
                            if (a ? !c : c == T.length - 1) return;
                            h = d(T[c += a ? -1 : 1].text), g = e[a ? --f : ++f];
                            if (f > 0 && f < e.length - 1) {
                                if (h != g) return;
                                continue
                            }
                            var j = a ? h.lastIndexOf(g) : h.indexOf(g) + g.length;
                            if (a ? j != h.length - g.length : j != g.length) return;
                            var k = {
                                line: b.line,
                                ch: i
                            },
                                l = {
                                    line: c,
                                    ch: j
                                };
                            return {
                                from: a ? l : k,
                                to: a ? k : l
                            }
                        }
                    }
                }
            }
            function cH(a) {
                return function () {
                    cG++ || cE();
                    try {
                        var b = a.apply(this, arguments)
                    } finally {
                        --cG || cF()
                    }
                    return b
                }
            }
            function cF() {
                var a = !1;
                bc && (a = !bN()), ba.length ? bQ(ba) : bc && bU(), a && bN(), bc && cx(), !bd && (_ === !0 || _ !== !1 && bc) && bL(), bc && f.matchBrackets && setTimeout(cH(function () {
                    bj && (bj(), bj = null), cz(!1)
                }), 20);
                var b = bb;
                bc && f.onCursorActivity && f.onCursorActivity(bm), b && f.onChange && bm && f.onChange(bm, b)
            }
            function cE() {
                _ = null, ba = [], bb = bc = !1
            }
            function cD(a) {
                !U.length || Q.set(a, cH(cC))
            }
            function cC() {
                var a = +(new Date) + f.workTime,
                    b = !1;
                while (U.length) {
                    if (!T[be].stateAfter) var c = be;
                    else var c = U.pop();
                    if (c >= T.length) continue;
                    b = !0;
                    var g = cA(c),
                        h = g && T[g - 1].stateAfter;
                    h ? h = d(S, h) : h = e(S);
                    for (var i = g, j = T.length; i < j; ++i) {
                        var k = T[i],
                            l = k.stateAfter;
                        if (+(new Date) > a) {
                            U.push(i), cD(f.workDelay), ba.push({
                                from: c,
                                to: i
                            });
                            return
                        }
                        var m = k.highlight(S, h);
                        k.stateAfter = d(S, h);
                        if (l && !m && k.text) break
                    }
                    ba.push({
                        from: c,
                        to: i
                    })
                }
                b && f.onHighlightComplete && f.onHighlightComplete(bm)
            }
            function cB(a) {
                var b = cA(a),
                    c = b && T[b - 1].stateAfter;
                c ? c = d(S, c) : c = e(S);
                for (var f = b; f < a; ++f) {
                    var g = T[f];
                    g.highlight(S, c), g.stateAfter = d(S, c)
                }
                T[a].stateAfter || U.push(a);
                return c
            }
            function cA(a) {
                var b, c;
                for (var d = a, e = a - 40; d > e; --d) {
                    if (d == 0) return 0;
                    var f = T[d - 1];
                    if (f.stateAfter) return d;
                    var g = f.indentation();
                    if (c == null || b > g) c = d, b = g
                }
                return c
            }
            function cz(a) {
                function p(a, b, c) {
                    if ( !! a.text) {
                        var d = a.styles,
                            e = g ? 0 : a.text.length - 1,
                            f;
                        for (var i = g ? 0 : d.length - 2, j = g ? d.length : -2; i != j; i += 2 * h) {
                            var k = d[i];
                            if (d[i + 1] != null && d[i + 1] != m) {
                                e += h * k.length;
                                continue
                            }
                            for (var l = g ? 0 : k.length - 1, p = g ? k.length : -1; l != p; l += h, e += h) if (e >= b && e < c && o.test(f = k.charAt(l))) {
                                var q = cy[f];
                                if (q.charAt(1) == ">" == g) n.push(f);
                                else {
                                    if (n.pop() != q.charAt(0)) return {
                                        pos: e,
                                        match: !1
                                    };
                                    if (!n.length) return {
                                        pos: e,
                                        match: !0
                                    }
                                }
                            }
                        }
                    }
                }
                var b = X.inverted ? X.from : X.to,
                    c = T[b.line],
                    d = b.ch - 1,
                    e = d >= 0 && cy[c.text.charAt(d)] || cy[c.text.charAt(++d)];
                if ( !! e) {
                    var f = e.charAt(0),
                        g = e.charAt(1) == ">",
                        h = g ? 1 : -1,
                        i = c.styles;
                    for (var j = d + 1, k = 0, l = i.length; k < l; k += 2) if ((j -= i[k].length) <= 0) {
                        var m = i[k + 1];
                        break
                    }
                    var n = [c.text.charAt(d)],
                        o = /[(){}[\]]/;
                    for (var k = b.line, l = g ? Math.min(k + 50, T.length) : Math.max(-1, k - 50); k != l; k += h) {
                        var c = T[k],
                            q = k == b.line,
                            r = p(c, q && g ? d + 1 : 0, q && !g ? d : c.text.length);
                        if (r) {
                            var m = r.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket",
                                s = ci({
                                    line: b.line,
                                    ch: d
                                }, {
                                    line: b.line,
                                    ch: d + 1
                                }, m),
                                t = ci({
                                    line: k,
                                    ch: r.pos
                                }, {
                                    line: k,
                                    ch: r.pos + 1
                                }, m),
                                u = cH(function () {
                                    s(), t()
                                });
                            a ? setTimeout(u, 800) : bj = u;
                            break
                        }
                    }
                }
            }
            function cx() {
                clearInterval(R);
                var a = !0;
                N.style.visibility = "", R = setInterval(function () {
                    N.style.visibility = (a = !a) ? "" : "hidden"
                }, 650)
            }
            function cw(a) {
                function e() {
                    L.value != d && cH(bD)(L.value, "end"), L.style.cssText = c, bd = !1, bL(), bI()
                }
                var b = cv(a);
                if ( !! b && !window.opera) {
                    (y(X.from, X.to) || z(b, X.from) || !z(b, X.to)) && bX(b.line, b.ch);
                    var c = L.style.cssText;
                    L.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (a.pageY() - 1) + "px; left: " + (a.pageX() - 1) + "px; z-index: 1000; background: white; " + "border-width: 0; outline: none; overflow: hidden;";
                    var d = L.value = bG();
                    bM(), G(L, 0, L.value.length), bd = !0;
                    if (p) {
                        a.stop();
                        var f = m(window, "mouseup", function () {
                            f(), setTimeout(e, 20)
                        }, !0)
                    } else setTimeout(e, 50)
                }
            }
            function cv(a, b) {
                var c = w(u, !0),
                    d = a.e.clientX,
                    e = a.e.clientY;
                if (!b && (d - c.left > u.clientWidth || e - c.top > u.clientHeight)) return null;
                var f = w(M, !0),
                    g = be + Math.floor((e - f.top) / cs());
                return bZ({
                    line: g,
                    ch: cp(bY(g), d - f.left)
                })
            }
            function cu() {
                return M.offsetLeft
            }
            function ct() {
                return M.offsetTop
            }
            function cs() {
                var a = O.childNodes.length;
                if (a) return O.offsetHeight / a || 1;
                B.innerHTML = "<pre>x</pre>";
                return B.firstChild.offsetHeight || 1
            }
            function cr(a) {
                var b = cq(a, !0),
                    c = w(M);
                return {
                    x: c.left + b.x,
                    y: c.top + b.y,
                    yBot: c.top + b.yBot
                }
            }
            function cq(a, b) {
                var c = cs(),
                    d = a.line - (b ? be : 0);
                return {
                    x: co(a.line, a.ch),
                    y: d * c,
                    yBot: (d + 1) * c
                }
            }
            function cp(a, b) {
                function e(a) {
                    B.innerHTML = "<pre><span>" + c.getHTML(null, null, !1, a) + "</span></pre>";
                    return B.firstChild.firstChild.offsetWidth
                }
                if (b <= 0) return 0;
                var c = T[a],
                    d = c.text,
                    f = 0,
                    g = 0,
                    h = d.length,
                    i, j = Math.min(h, Math.ceil(b / cn("x")));
                for (;;) {
                    var k = e(j);
                    if (k <= b && j < h) j = Math.min(h, Math.ceil(j * 1.2));
                    else {
                        i = k, h = j;
                        break
                    }
                }
                if (b > i) return h;
                j = Math.floor(h * .8), k = e(j), k < b && (f = j, g = k);
                for (;;) {
                    if (h - f <= 1) return i - b > b - g ? f : h;
                    var l = Math.ceil((f + h) / 2),
                        m = e(l);
                    m > b ? (h = l, i = m) : (f = l, g = m)
                }
            }
            function co(a, b) {
                if (b == 0) return 0;
                B.innerHTML = "<pre><span>" + T[a].getHTML(null, null, !1, b) + "</span></pre>";
                return B.firstChild.firstChild.offsetWidth
            }
            function cn(a) {
                B.innerHTML = "<pre><span>x</span></pre>", B.firstChild.firstChild.firstChild.nodeValue = a;
                return B.firstChild.firstChild.offsetWidth || 10
            }
            function cm(a) {
                if (typeof a == "number") {
                    var b = a;
                    a = T[a];
                    if (!a) return null
                } else {
                    var b = D(T, a);
                    if (b == -1) return null
                }
                var c = a.gutterMarker;
                return {
                    line: b,
                    text: a.text,
                    markerText: c && c.text,
                    markerClass: c && c.style
                }
            }
            function cl(a, b) {
                if (typeof a == "number") {
                    var c = a;
                    a = T[bY(a)]
                } else {
                    var c = D(T, a);
                    if (c == -1) return null
                }
                a.className != b && (a.className = b, ba.push({
                    from: c,
                    to: c + 1
                }));
                return a
            }
            function ck(a) {
                typeof a == "number" && (a = T[bY(a)]), a.gutterMarker = null, bT()
            }
            function cj(a, b, c) {
                typeof a == "number" && (a = T[bY(a)]), a.gutterMarker = {
                    text: b,
                    style: c
                }, bT();
                return a
            }
            function ci(a, b, c) {
                function e(a, b, c, e) {
                    var a = T[a],
                        f = a.addMark(b, c, e);
                    f.line = a, d.push(f)
                }
                a = bZ(a), b = bZ(b);
                var d = [];
                if (a.line == b.line) e(a.line, a.ch, b.ch, c);
                else {
                    e(a.line, a.ch, null, c);
                    for (var f = a.line + 1, g = b.line; f < g; ++f) e(f, 0, null, c);
                    e(b.line, 0, b.ch, c)
                }
                ba.push({
                    from: a.line,
                    to: b.line + 1
                });
                return function () {
                    var a, b;
                    for (var c = 0; c < d.length; ++c) {
                        var e = d[c],
                            f = D(T, e.line);
                        e.line.removeMark(e), f > -1 && (a == null && (a = f), b = f)
                    }
                    a != null && ba.push({
                        from: a,
                        to: b + 1
                    })
                }
            }
            function ch() {
                var a = f.gutter || f.lineNumbers;
                I.style.display = a ? "" : "none", a ? bT() : O.parentNode.style.marginLeft = 0
            }
            function cg() {
                S = a.getMode(f, f.mode);
                for (var b = 0, c = T.length; b < c; ++b) T[b].stateAfter = null;
                U = [0], cD()
            }
            function cf(a, b) {
                if (b == "smart") if (!S.indent) b = "prev";
                else var c = cB(a);
                var d = T[a],
                    e = d.indentation(),
                    g = d.text.match(/^\s*/)[0],
                    h;
                b == "prev" ? a ? h = T[a - 1].indentation() : h = 0 : b == "smart" ? h = S.indent(c, d.text.slice(g.length)) : b == "add" ? h = e + f.indentUnit : b == "subtract" && (h = e - f.indentUnit), h = Math.max(0, h);
                var i = h - e;
                if (!i) {
                    if (X.from.line != a && X.to.line != a) return;
                    var j = g
                } else {
                    var j = "",
                        k = 0;
                    if (f.indentWithTabs) for (var l = Math.floor(h / r); l; --l) k += r, j += "\t";
                    while (k < h)++k, j += " "
                }
                bC(j, {
                    line: a,
                    ch: 0
                }, {
                    line: a,
                    ch: g.length
                })
            }
            function ce(a) {
                Y = null;
                switch (f.tabMode) {
                case "default":
                    return !1;
                case "indent":
                    for (var b = X.from.line, c = X.to.line; b <= c; ++b) cf(b, "smart");
                    break;
                case "classic":
                    if (y(X.from, X.to)) {
                        a ? cf(X.from.line, "smart") : bD("\t", "end");
                        break
                    };
                case "shift":
                    for (var b = X.from.line, c = X.to.line; b <= c; ++b) cf(b, a ? "subtract" : "add")
                }
                return !0
            }
            function cd() {
                bD("\n", "end"), f.enterMode != "flat" && cf(X.from.line, f.enterMode == "keep" ? "prev" : "smart")
            }
            function cc(a) {
                bV({
                    line: a,
                    ch: 0
                }, {
                    line: a,
                    ch: T[a].text.length
                })
            }
            function cb(a) {
                var b = T[a.line].text,
                    c = a.ch,
                    d = a.ch;
                while (c > 0 && /\w/.test(b.charAt(c - 1)))--c;
                while (d < b.length && /\w/.test(b.charAt(d)))++d;
                bV({
                    line: a.line,
                    ch: c
                }, {
                    line: a.line,
                    ch: d
                })
            }
            function ca() {
                var a = T.length - 1;
                bW({
                    line: 0,
                    ch: 0
                }, {
                    line: a,
                    ch: T[a].text.length
                })
            }
            function b_(a) {
                bX(a ? 0 : T.length - 1, !0)
            }
            function b$(a) {
                var b = Math.floor(u.clientHeight / cs()),
                    c = X.inverted ? X.from : X.to;
                bX(c.line + Math.max(b - 1, 1) * (a ? 1 : -1), c.ch, !0)
            }
            function bZ(a) {
                if (a.line < 0) return {
                    line: 0,
                    ch: 0
                };
                if (a.line >= T.length) return {
                    line: T.length - 1,
                    ch: T[T.length - 1].text.length
                };
                var b = a.ch,
                    c = T[a.line].text.length;
                return b == null || b > c ? {
                    line: a.line,
                    ch: c
                } : b < 0 ? {
                    line: a.line,
                    ch: 0
                } : a
            }
            function bY(a) {
                return Math.max(0, Math.min(a, T.length - 1))
            }
            function bX(a, b, c) {
                var d = bZ({
                    line: a,
                    ch: b || 0
                });
                (c ? bV : bW)(d, d)
            }
            function bW(a, b, c, d) {
                if (!y(X.from, a) || !y(X.to, b)) {
                    if (z(b, a)) {
                        var e = b;
                        b = a, a = e
                    }
                    var f = y(X.to, b),
                        g = y(X.from, a);
                    y(a, b) ? X.inverted = !1 : f && !g ? X.inverted = !0 : g && !f && (X.inverted = !1), c == null && (c = X.from.line, d = X.to.line), y(a, b) ? y(X.from, X.to) || ba.push({
                        from: c,
                        to: d + 1
                    }) : y(X.from, X.to) ? ba.push({
                        from: a.line,
                        to: b.line + 1
                    }) : (y(a, X.from) || (a.line < c ? ba.push({
                        from: a.line,
                        to: Math.min(b.line, c) + 1
                    }) : ba.push({
                        from: c,
                        to: Math.min(d, a.line) + 1
                    })), y(b, X.to) || (b.line < d ? ba.push({
                        from: Math.max(c, a.line),
                        to: d + 1
                    }) : ba.push({
                        from: Math.max(a.line, d),
                        to: b.line + 1
                    }))), X.from = a, X.to = b, bc = !0
                }
            }
            function bV(a, b) {
                var c = Y && bZ(Y);
                c && (z(c, a) ? a = c : z(b, c) && (b = c)), bW(a, b)
            }
            function bU() {
                var a = X.inverted ? X.from : X.to,
                    b = co(a.line, a.ch) + "px",
                    c = (a.line - be) * cs() + "px";
                K.style.top = c, y(X.from, X.to) ? (N.style.top = c, N.style.left = b, N.style.display = "") : N.style.display = "none"
            }
            function bT() {
                if ( !! f.gutter || !! f.lineNumbers) {
                    var a = H.offsetHeight,
                        b = u.clientHeight;
                    I.style.height = (a - b < 2 ? b : a) + "px";
                    var c = [];
                    for (var d = be; d < bf; ++d) {
                        var e = T[d].gutterMarker,
                            g = f.lineNumbers ? d + f.firstLineNumber : null;
                        e && e.text ? g = e.text.replace("%N%", g != null ? g : "") : g == null && (g = "\u00a0"), c.push(e && e.style ? '<pre class="' + e.style + '">' : "<pre>", g, "</pre>")
                    }
                    I.style.display = "none", J.innerHTML = c.join("");
                    var h = String(T.length).length,
                        i = J.firstChild,
                        j = x(i),
                        k = "";
                    while (j.length + k.length < h) k += "\u00a0";
                    k && i.insertBefore(l.createTextNode(k), i.firstChild), I.style.display = "", M.style.marginLeft = I.offsetWidth + "px"
                }
            }
            function bS(a) {
                var b = X.from.line,
                    c = X.to.line,
                    d = 0,
                    e = o && l.createElement("div");
                for (var f = 0, g = a.length; f < g; ++f) {
                    var h = a[f],
                        i = h.to - h.from - h.domSize,
                        j = O.childNodes[h.domStart + h.domSize + d] || null;
                    if (o) for (var k = Math.max(-i, h.domSize); k > 0; --k) O.removeChild(j ? j.previousSibling : O.lastChild);
                    else if (i) {
                        for (var k = Math.max(0, i); k > 0; --k) O.insertBefore(l.createElement("pre"), j);
                        for (var k = Math.max(0, -i); k > 0; --k) O.removeChild(j ? j.previousSibling : O.lastChild)
                    }
                    var m = O.childNodes[h.domStart + d],
                        n = b < h.from && c >= h.from;
                    for (var k = h.from; k < h.to; ++k) {
                        var p = null,
                            q = null;
                        n ? (p = 0, c == k && (n = !1, q = X.to.ch)) : b == k && (c == k ? (p = X.from.ch, q = X.to.ch) : (n = !0, p = X.from.ch)), o ? (e.innerHTML = T[k].getHTML(p, q, !0), O.insertBefore(e.firstChild, j)) : (m.innerHTML = T[k].getHTML(p, q, !1), m.className = T[k].className || "", m = m.nextSibling)
                    }
                    d += i
                }
            }
            function bR(a, b) {
                var c = [],
                    d = {
                        line: a,
                        ch: 0
                    },
                    e = z(X.from, d) && !z(X.to, d);
                for (var f = a; f < b; ++f) {
                    var g = null,
                        h = null;
                    e ? (g = 0, X.to.line == f && (e = !1, h = X.to.ch)) : X.from.line == f && (X.to.line == f ? (g = X.from.ch, h = X.to.ch) : (e = !0, g = X.from.ch)), c.push(T[f].getHTML(g, h, !0))
                }
                O.innerHTML = c.join("")
            }
            function bQ(a) {
                if (!u.clientWidth) be = bf = 0;
                else {
                    var b = a === !0 ? [] : [{
                        from: be,
                        to: bf,
                        domStart: 0
                    }];
                    for (var c = 0, d = a.length || 0; c < d; ++c) {
                        var e = a[c],
                            f = [],
                            g = e.diff || 0;
                        for (var h = 0, i = b.length; h < i; ++h) {
                            var j = b[h];
                            e.to <= j.from ? f.push({
                                from: j.from + g,
                                to: j.to + g,
                                domStart: j.domStart
                            }) : j.to <= e.from ? f.push(j) : (e.from > j.from && f.push({
                                from: j.from,
                                to: e.from,
                                domStart: j.domStart
                            }), e.to < j.to && f.push({
                                from: e.to + g,
                                to: j.to + g,
                                domStart: j.domStart + (e.to - j.from)
                            }))
                        }
                        b = f
                    }
                    var k = bP(),
                        l = Math.min(be, Math.max(k.from - 3, 0)),
                        m = Math.min(T.length, Math.max(bf, k.to + 3)),
                        n = [],
                        o = 0,
                        p = bf - be,
                        q = l,
                        r = 0;
                    for (var c = 0, d = b.length; c < d; ++c) {
                        var j = b[c];
                        if (j.to <= l) continue;
                        if (j.from >= m) break;
                        if (j.domStart > o || j.from > q) n.push({
                            from: q,
                            to: j.from,
                            domSize: j.domStart - o,
                            domStart: o
                        }), r += j.from - q;
                        q = j.to, o = j.domStart + (j.to - j.from)
                    }
                    if (o != p || q != m) r += Math.abs(m - q), n.push({
                        from: q,
                        to: m,
                        domSize: p - o,
                        domStart: o
                    });
                    if (!n.length) return;
                    O.style.display = "none", r > (k.to - k.from) * .3 ? bR(l = Math.max(k.from - 10, 0), m = Math.min(k.to + 7, T.length)) : bS(n), O.style.display = "";
                    var s = l != be || m != bf || bg != u.clientHeight;
                    be = l, bf = m, H.style.top = l * cs() + "px", s && (bg = u.clientHeight, v.style.height = T.length * cs() + 2 * ct() + "px", bT());
                    var t = cn(bk);
                    M.style.width = t > u.clientWidth ? t + "px" : "";
                    if (O.childNodes.length != bf - be) throw new Error("BAD PATCH! " + JSON.stringify(n) + " size=" + (bf - be) + " nodes=" + O.childNodes.length);
                    bU()
                }
            }
            function bP() {
                var a = cs(),
                    b = u.scrollTop - ct();
                return {
                    from: Math.min(T.length, Math.max(0, Math.floor(b / a))),
                    to: Math.min(T.length, Math.ceil((b + u.clientHeight) / a))
                }
            }
            function bO(a, b, c, d) {
                var e = cu(),
                    g = ct(),
                    h = cs();
                b += g, d += g, a += e, c += e;
                var i = u.clientHeight,
                    j = u.scrollTop,
                    k = !1,
                    l = !0;
                b < j ? (u.scrollTop = Math.max(0, b - 2 * h), k = !0) : d > j + i && (u.scrollTop = d + h - i, k = !0);
                var m = u.clientWidth,
                    n = u.scrollLeft;
                a < n ? (u.scrollLeft = Math.max(0, a - 10), k = !0) : c > m + n && (u.scrollLeft = c + 10 - m, k = !0, c > v.clientWidth && (l = !1)), k && f.onScroll && f.onScroll(bm);
                return l
            }
            function bN() {
                var a = cq(X.inverted ? X.from : X.to);
                return bO(a.x, a.y, a.x, a.yBot)
            }
            function bM() {
                f.readOnly != "nocursor" && L.focus()
            }
            function bL() {
                var a = [],
                    b = Math.max(0, X.from.line - 1),
                    c = Math.min(T.length, X.to.line + 2);
                for (var d = b; d < c; ++d) a.push(T[d].text);
                a = L.value = a.join(q);
                var e = X.from.ch,
                    f = X.to.ch;
                for (var d = b; d < X.from.line; ++d) e += q.length + T[d].text.length;
                for (var d = b; d < X.to.line; ++d) f += q.length + T[d].text.length;
                bi = {
                    text: a,
                    from: b,
                    to: c,
                    start: e,
                    end: f
                }, G(L, e, Z ? e : f)
            }
            function bK() {
                function g(a, c) {
                    var d = 0;
                    for (;;) {
                        var e = b.indexOf("\n", d);
                        if (e == -1 || (b.charAt(e - 1) == "\r" ? e - 1 : e) >= a) return {
                            line: c,
                            ch: a - d
                        };
                        ++c, d = e + 1
                    }
                }
                if (!bd) {
                    var a = !1,
                        b = L.value,
                        c = F(L);
                    if (!c) return !1;
                    var a = bi.text != b,
                        d = Z,
                        e = a || c.start != bi.start || c.end != (d ? bi.start : bi.end);
                    if (!e && !d) return !1;
                    if (a) {
                        Y = Z = null;
                        if (f.readOnly) {
                            _ = !0;
                            return "changed"
                        }
                    }
                    var h = g(c.start, bi.from),
                        i = g(c.end, bi.from);
                    if (d) {
                        h = c.start == d.anchor ? i : h, i = Y ? X.to : c.start == d.anchor ? h : i;
                        if (!z(h, i)) {
                            Z = null, X.inverted = !1;
                            var j = h;
                            h = i, i = j
                        }
                    }
                    h.line == i.line && h.line == X.from.line && h.line == X.to.line && !Y && (_ = !1);
                    if (a) {
                        var k = 0,
                            l = b.length,
                            m = Math.min(l, bi.text.length),
                            n, o = bi.from,
                            p = -1;
                        while (k < m && (n = b.charAt(k)) == bi.text.charAt(k))++k, n == "\n" && (o++, p = k);
                        var q = p > -1 ? k - p : k,
                            r = bi.to - 1,
                            s = bi.text.length;
                        for (;;) {
                            n = bi.text.charAt(s), n == "\n" && r--;
                            if (b.charAt(l) != n) {
                                ++l, ++s;
                                break
                            }
                            if (s <= k || l <= k) break;
                            --l, --s
                        }
                        var p = bi.text.lastIndexOf("\n", s - 1),
                            t = p == -1 ? s : s - p - 1;
                        bx({
                            line: o,
                            ch: q
                        }, {
                            line: r,
                            ch: t
                        }, E(b.slice(k, l)), h, i);
                        if (o != r || h.line != o) _ = !0
                    } else bW(h, i);
                    bi.text = b, bi.start = c.start, bi.end = c.end;
                    return a ? "changed" : e ? "moved" : !1
                }
            }
            function bJ(a) {
                function c() {
                    cE();
                    var d = bK();
                    d == "moved" && a && (t[a] = !0), !d && !b ? (b = !0, P.set(80, c)) : (bH = !1, bI()), cF()
                }
                var b = !1;
                bH = !0, P.set(20, c)
            }
            function bI() {
                bH || P.set(2e3, function () {
                    cE(), bK(), W && bI(), cF()
                })
            }
            function bG() {
                return bF(X.from, X.to)
            }
            function bF(a, b) {
                var c = a.line,
                    d = b.line;
                if (c == d) return T[c].text.slice(a.ch, b.ch);
                var e = [T[c].text.slice(a.ch)];
                for (var f = c + 1; f < d; ++f) e.push(T[f].text);
                e.push(T[d].text.slice(0, b.ch));
                return e.join("\n")
            }
            function bE(a, b, c, d) {
                var e = a.length == 1 ? a[0].length + b.ch : a[a.length - 1].length,
                    f = d({
                        line: b.line + a.length - 1,
                        ch: e
                    });
                bx(b, c, a, f.from, f.to)
            }
            function bD(a, b) {
                bE(E(a), X.from, X.to, function (a) {
                    return b == "end" ? {
                        from: a,
                        to: a
                    } : b == "start" ? {
                        from: X.from,
                        to: X.from
                    } : {
                        from: X.from,
                        to: a
                    }
                })
            }
            function bC(a, b, c) {
                function d(d) {
                    if (z(d, b)) return d;
                    if (!z(c, d)) return e;
                    var f = d.line + a.length - (c.line - b.line) - 1,
                        g = d.ch;
                    d.line == c.line && (g += a[a.length - 1].length - (c.ch - (c.line == b.line ? b.ch : 0)));
                    return {
                        line: f,
                        ch: g
                    }
                }
                b = bZ(b), c ? c = bZ(c) : c = b, a = E(a);
                var e;
                bE(a, b, c, function (a) {
                    e = a;
                    return {
                        from: d(X.from),
                        to: d(X.to)
                    }
                });
                return e
            }
            function bB(a, b, c, d, e) {
                function s(a) {
                    return a <= Math.min(b.line, b.line + q) ? a : a + q
                }
                var f = !1,
                    h = bk.length;
                for (var i = a.line; i < b.line; ++i) if (T[i].text.length == h) {
                    f = !0;
                    break
                }
                var j = b.line - a.line,
                    k = T[a.line],
                    l = T[b.line];
                if (k == l) if (c.length == 1) k.replace(a.ch, b.ch, c[0]);
                else {
                    l = k.split(b.ch, c[c.length - 1]);
                    var m = [a.line + 1, j];
                    k.replace(a.ch, k.text.length, c[0]);
                    for (var i = 1, n = c.length - 1; i < n; ++i) m.push(new g(c[i]));
                    m.push(l), T.splice.apply(T, m)
                } else if (c.length == 1) k.replace(a.ch, k.text.length, c[0] + l.text.slice(b.ch)), T.splice(a.line + 1, j);
                else {
                    var m = [a.line + 1, j - 1];
                    k.replace(a.ch, k.text.length, c[0]), l.replace(0, b.ch, c[c.length - 1]);
                    for (var i = 1, n = c.length - 1; i < n; ++i) m.push(new g(c[i]));
                    T.splice.apply(T, m)
                }
                for (var i = a.line, n = i + c.length; i < n; ++i) {
                    var o = T[i].text;
                    o.length > h && (bk = o, h = o.length, f = !1)
                }
                if (f) {
                    h = 0;
                    for (var i = 0, n = T.length; i < n; ++i) {
                        var o = T[i].text;
                        o.length > h && (h = o.length, bk = o)
                    }
                }
                var p = [],
                    q = c.length - j - 1;
                for (var i = 0, o = U.length; i < o; ++i) {
                    var r = U[i];
                    r < a.line ? p.push(r) : r > b.line && p.push(r + q)
                }
                c.length && p.push(a.line), U = p, cD(100), ba.push({
                    from: a.line,
                    to: b.line + 1,
                    diff: q
                }), bb = {
                    from: a,
                    to: b,
                    text: c
                }, bW(d, e, s(X.from.line), s(X.to.line)), v.style.height = T.length * cs() + 2 * ct() + "px"
            }
            function bA() {
                by(V.undone, V.done)
            }
            function bz() {
                by(V.done, V.undone)
            }
            function by(a, b) {
                var c = a.pop();
                if (c) {
                    var d = [],
                        e = c.start + c.added;
                    for (var f = c.start; f < e; ++f) d.push(T[f].text);
                    b.push({
                        start: c.start,
                        added: c.old.length,
                        old: d
                    });
                    var g = bZ({
                        line: c.start + c.old.length - 1,
                        ch: C(d[d.length - 1], c.old[c.old.length - 1])
                    });
                    bB({
                        line: c.start,
                        ch: 0
                    }, {
                        line: e - 1,
                        ch: T[e - 1].text.length
                    }, c.old, g, g)
                }
            }
            function bx(a, b, c, d, e) {
                if (V) {
                    var g = [];
                    for (var h = a.line, i = b.line + 1; h < i; ++h) g.push(T[h].text);
                    V.addChange(a.line, c.length, g);
                    while (V.done.length > f.undoDepth) V.done.shift()
                }
                bB(a, b, c, d, e)
            }
            function bw() {
                W && f.onBlur && f.onBlur(bm), clearInterval(R), Y = null, W = !1, u.className = u.className.replace(" CodeMirror-focused", "")
            }
            function bv() {
                f.readOnly != "nocursor" && (!W && f.onFocus && f.onFocus(bm), W = !0, bI(), u.className.search(/\bCodeMirror-focused\b/) == -1 && (u.className += " CodeMirror-focused"), cx())
            }
            function bu(a) {
                if (!f.onKeyEvent || !f.onKeyEvent(bm, k(a.e))) {
                    if (f.electricChars && S.electricChars) {
                        var b = String.fromCharCode(a.e.charCode == null ? a.e.keyCode : a.e.charCode);
                        S.electricChars.indexOf(b) > -1 && setTimeout(cH(function () {
                            cf(X.to.line, "smart")
                        }), 50)
                    }
                    var c = a.e.keyCode;
                    c == 13 ? (f.readOnly || cd(), a.stop()) : !a.e.ctrlKey && !a.e.altKey && !a.e.metaKey && c == 9 && f.tabMode != "default" ? a.stop() : bJ(bh)
                }
            }
            function bt(a) {
                if (!f.onKeyEvent || !f.onKeyEvent(bm, k(a.e))) Z && (Z = null, _ = !0), a.e.keyCode == 16 && (Y = null)
            }
            function bs(a) {
                W || bv();
                var b = a.e.keyCode,
                    c = (s ? a.e.metaKey : a.e.ctrlKey) && !a.e.altKey,
                    d = a.e.ctrlKey || a.e.altKey || a.e.metaKey;
                b == 16 || a.e.shiftKey ? Y = Y || (X.inverted ? X.to : X.from) : Y = null;
                if (!f.onKeyEvent || !f.onKeyEvent(bm, k(a.e))) {
                    if (b == 33 || b == 34) {
                        b$(b == 34);
                        return a.stop()
                    }
                    if (c && (b == 36 || b == 35 || s && (b == 38 || b == 40))) {
                        b_(b == 36 || b == 38);
                        return a.stop()
                    }
                    if (c && b == 65) {
                        ca();
                        return a.stop()
                    }
                    if (!f.readOnly) {
                        if (!d && b == 13) return;
                        if (!d && b == 9 && ce(a.e.shiftKey)) return a.stop();
                        if (c && b == 90) {
                            bz();
                            return a.stop()
                        }
                        if (c && (a.e.shiftKey && b == 90 || b == 89)) {
                            bA();
                            return a.stop()
                        }
                    }
                    bh = (c ? "c" : "") + b;
                    if (X.inverted && t.hasOwnProperty(bh)) {
                        var e = F(L);
                        e && (Z = {
                            anchor: e.start
                        }, G(L, e.start, e.start))
                    }
                    bJ(bh)
                }
            }
            function br(a) {
                var b = cv(a, !0),
                    c = a.e.dataTransfer.files;
                if ( !! b && !f.readOnly) if (c && c.length && window.FileReader && window.File) {
                    var d = c.length,
                        e = Array(d),
                        g = 0;
                    for (var h = 0; h < d; ++h) i(c[h], h);

                    function i(a, c) {
                        var f = new FileReader;
                        f.onload = function () {
                            e[c] = f.result, ++g == d && bC(e.join(""), bZ(b), bZ(b))
                        }, f.readAsText(a)
                    }
                } else try {
                    var e = a.e.dataTransfer.getData("Text");
                    e && bC(e, b, b)
                } catch (a) {}
            }
            function bq(a) {
                var b = cv(a);
                !b || (cb(b), a.stop(), $ = +(new Date))
            }
            function bp(a) {
                function i(a) {
                    var b = cv(a, !0);
                    if (b && !y(b, e)) {
                        W || bv(), e = b, bV(d, b), _ = !1;
                        var c = bP();
                        if (b.line >= c.to || b.line < c.from) g = setTimeout(cH(function () {
                            i(a)
                        }), 150)
                    }
                }
                function h() {
                    bM(), _ = !0, j(), k()
                }
                var b = $;
                $ = null;
                for (var c = a.target(); c != u; c = c.parentNode) if (c.parentNode == J) {
                    f.onGutterClick && f.onGutterClick(bm, D(J.childNodes, c) + be);
                    return a.stop()
                }
                p && a.button() == 3 && cw(a);
                if (a.button() == 1) {
                    var d = cv(a),
                        e = d,
                        g;
                    if (!d) {
                        a.target() == u && a.stop();
                        return
                    }
                    W || bv(), a.stop();
                    if (b && +(new Date) - b < 400) return cc(d.line);
                    bX(d.line, d.ch, !0);
                    var j = m(l, "mousemove", cH(function (a) {
                        clearTimeout(g), a.stop(), i(a)
                    }), !0),
                        k = m(l, "mouseup", cH(function (a) {
                            clearTimeout(g);
                            var b = cv(a);
                            b && bV(d, b), a.stop(), h()
                        }), !0)
                }
            }
            function bo(a) {
                var b = [];
                for (var c = 0, d = T.length; c < d; ++c) b.push(T[c].text);
                return b.join("\n")
            }
            function bn(a) {
                V = null;
                var b = {
                    line: 0,
                    ch: 0
                };
                bx(b, {
                    line: T.length - 1,
                    ch: T[T.length - 1].text.length
                }, E(a), b, b), V = new i
            }
            function bl(a) {
                return a >= 0 && a < T.length
            }
            var f = {},
                h = a.defaults;
            for (var j in h) h.hasOwnProperty(j) && (f[j] = (c && c.hasOwnProperty(j) ? c : h)[j]);
            var l = f.document,
                u = l.createElement("div");
            u.className = "CodeMirror", window.ActiveXObject && /MSIE [1-7]\b/.test(navigator.userAgent) && (u.style.position = "relative"), u.innerHTML = '<div style="position: relative"><div style="position: absolute; height: 0; width: 0; overflow: hidden;"></div><div style="position: relative"><div class="CodeMirror-gutter"><div class="CodeMirror-gutter-text"></div></div><div style="overflow: hidden; position: absolute; width: 1px; height: 0; left: 0"><textarea style="position: absolute; width: 100000px;" wrap="off"></textarea></div><div class="CodeMirror-lines"><div style="position: relative"><pre class="CodeMirror-cursor">&#160;</pre><div></div></div></div></div></div>', b.appendChild ? b.appendChild(u) : b(u);
            var v = u.firstChild,
                B = v.firstChild,
                H = B.nextSibling,
                I = H.firstChild,
                J = I.firstChild,
                K = I.nextSibling,
                L = K.firstChild,
                M = K.nextSibling.firstChild,
                N = M.firstChild,
                O = N.nextSibling;
            f.tabindex != null && (L.tabindex = f.tabindex), !f.gutter && !f.lineNumbers && (I.style.display = "none");
            var P = new n,
                Q = new n,
                R, S, T = [new g("")],
                U, V = new i,
                W;
            cg();
            var X = {
                from: {
                    line: 0,
                    ch: 0
                },
                to: {
                    line: 0,
                    ch: 0
                },
                inverted: !1
            },
                Y, Z, $, _, ba, bb, bc, bd, be = 0,
                bf = 0,
                bg = 0,
                bh = null,
                bi, bj, bk = "";
            cH(function () {
                bn(f.value || ""), _ = !1
            })(), setTimeout(bL, 20), m(u, "mousedown", cH(bp)), p || m(u, "contextmenu", cH(cw)), m(v, "dblclick", cH(bq)), m(u, "scroll", function () {
                bQ([]), f.onScroll && f.onScroll(bm)
            }), m(window, "resize", function () {
                bQ(!0)
            }), m(L, "keyup", cH(bt)), m(L, "keydown", cH(bs)), m(L, "keypress", cH(bu)), m(L, "focus", bv), m(L, "blur", bw), m(u, "dragenter", function (a) {
                a.stop()
            }), m(u, "dragover", function (a) {
                a.stop()
            }), m(u, "drop", cH(br)), m(u, "paste", function () {
                bM(), bJ()
            }), m(L, "paste", function () {
                bJ()
            }), m(L, "cut", function () {
                bJ()
            }), l.activeElement == L ? bv() : bw();
            var bm = {
                getValue: bo,
                setValue: cH(bn),
                getSelection: bG,
                replaceSelection: cH(bD),
                focus: function () {
                    bM(), bv(), bJ()
                },
                setOption: function (a, b) {
                    f[a] = b, a == "lineNumbers" || a == "gutter" ? ch() : a == "mode" || a == "indentUnit" ? cg() : a == "readOnly" && b == "nocursor" && L.blur()
                },
                getOption: function (a) {
                    return f[a]
                },
                undo: cH(bz),
                redo: cH(bA),
                indentLine: cH(function (a) {
                    bl(a) && cf(a, "smart")
                }),
                historySize: function () {
                    return {
                        undo: V.done.length,
                        redo: V.undone.length
                    }
                },
                matchBrackets: cH(function () {
                    cz(!0)
                }),
                getTokenAt: function (a) {
                    a = bZ(a);
                    return T[a.line].getTokenAt(S, cB(a.line), a.ch)
                },
                cursorCoords: function (a) {
                    a == null && (a = X.inverted);
                    return cr(a ? X.from : X.to)
                },
                charCoords: function (a) {
                    return cr(bZ(a))
                },
                coordsChar: function (a) {
                    var b = w(M),
                        c = bY(Math.min(T.length - 1, be + Math.floor((a.y - b.top) / cs())));
                    return bZ({
                        line: c,
                        ch: cp(bY(c), a.x - b.left)
                    })
                },
                getSearchCursor: function (a, b, c) {
                    return new cI(a, b, c)
                },
                markText: cH(function (a, b, c) {
                    return cH(ci(a, b, c))
                }),
                setMarker: cj,
                clearMarker: ck,
                setLineClass: cH(cl),
                lineInfo: cm,
                addWidget: function (a, b, c) {
                    var a = cq(bZ(a), !0);
                    b.style.top = be * cs() + a.yBot + ct() + "px", b.style.left = a.x + cu() + "px", v.appendChild(b), c && bO(a.x, a.yBot, a.x + b.offsetWidth, a.yBot + b.offsetHeight)
                },
                lineCount: function () {
                    return T.length
                },
                getCursor: function (a) {
                    a == null && (a = X.inverted);
                    return A(a ? X.from : X.to)
                },
                somethingSelected: function () {
                    return !y(X.from, X.to)
                },
                setCursor: cH(function (a, b) {
                    b == null && typeof a.line == "number" ? bX(a.line, a.ch) : bX(a, b)
                }),
                setSelection: cH(function (a, b) {
                    bW(bZ(a), bZ(b || a))
                }),
                getLine: function (a) {
                    if (bl(a)) return T[a].text
                },
                setLine: cH(function (a, b) {
                    bl(a) && bC(b, {
                        line: a,
                        ch: 0
                    }, {
                        line: a,
                        ch: T[a].text.length
                    })
                }),
                removeLine: cH(function (a) {
                    bl(a) && bC("", {
                        line: a,
                        ch: 0
                    }, bZ({
                        line: a + 1,
                        ch: 0
                    }))
                }),
                replaceRange: cH(bC),
                getRange: function (a, b) {
                    return bF(bZ(a), bZ(b))
                },
                operation: function (a) {
                    return cH(a)()
                },
                refresh: function () {
                    bQ(!0)
                },
                getInputField: function () {
                    return L
                },
                getWrapperElement: function () {
                    return u
                }
            },
                bH = !1,
                cy = {
                    "(": ")>",
                    ")": "(<",
                    "[": "]>",
                    "]": "[<",
                    "{": "}>",
                    "}": "{<"
                },
                cG = 0;
            cI.prototype = {
                findNext: function () {
                    return this.find(!1)
                },
                findPrevious: function () {
                    return this.find(!0)
                },
                find: function (a) {
                    function d(a) {
                        var c = {
                            line: a,
                            ch: 0
                        };
                        b.pos = {
                            from: c,
                            to: c
                        }, b.atOccurrence = !1;
                        return !1
                    }
                    var b = this,
                        c = bZ(a ? this.pos.from : this.pos.to);
                    for (;;) {
                        if (this.pos = this.matches(a, c)) {
                            this.atOccurrence = !0;
                            return this.pos.match || !0
                        }
                        if (a) {
                            if (!c.line) return d(0);
                            c = {
                                line: c.line - 1,
                                ch: T[c.line - 1].text.length
                            }
                        } else {
                            if (c.line == T.length - 1) return d(T.length);
                            c = {
                                line: c.line + 1,
                                ch: 0
                            }
                        }
                    }
                },
                from: function () {
                    if (this.atOccurrence) return A(this.pos.from)
                },
                to: function () {
                    if (this.atOccurrence) return A(this.pos.to)
                }
            };
            return bm
        }
        a.defaults = {
            value: "",
            mode: null,
            indentUnit: 2,
            indentWithTabs: !1,
            tabMode: "classic",
            enterMode: "indent",
            electricChars: !0,
            onKeyEvent: null,
            lineNumbers: !1,
            gutter: !1,
            firstLineNumber: 1,
            readOnly: !1,
            onChange: null,
            onCursorActivity: null,
            onGutterClick: null,
            onHighlightComplete: null,
            onFocus: null,
            onBlur: null,
            onScroll: null,
            matchBrackets: !1,
            workTime: 100,
            workDelay: 200,
            undoDepth: 40,
            tabindex: null,
            document: window.document
        };
        var b = {},
            c = {};
        a.defineMode = function (c, d) {
            !a.defaults.mode && c != "null" && (a.defaults.mode = c), b[c] = d
        }, a.defineMIME = function (a, b) {
            c[a] = b
        }, a.getMode = function (d, e) {
            typeof e == "string" && c.hasOwnProperty(e) && (e = c[e]);
            if (typeof e == "string") var f = e,
                g = {};
            else if (e != null) var f = e.name,
                g = e;
            var h = b[f];
            if (!h) {
                window.console && console.warn("No mode " + f + " found, falling back to plain text.");
                return a.getMode(d, "text/plain")
            }
            return h(d, g || {})
        }, a.listModes = function () {
            var a = [];
            for (var c in b) b.propertyIsEnumerable(c) && a.push(c);
            return a
        }, a.listMIMEs = function () {
            var a = [];
            for (var b in c) c.propertyIsEnumerable(b) && a.push(b);
            return a
        }, a.fromTextArea = function (b, c) {
            function d() {
                b.value = h.getValue()
            }
            c || (c = {}), c.value = b.value, !c.tabindex && b.tabindex && (c.tabindex = b.tabindex);
            if (b.form) {
                var e = m(b.form, "submit", d, !0);
                if (typeof b.form.submit == "function") {
                    var f = b.form.submit;

                    function g() {
                        d(), b.form.submit = f, b.form.submit(), b.form.submit = g
                    }
                    b.form.submit = g
                }
            }
            b.style.display = "none";
            var h = a(function (a) {
                b.parentNode.insertBefore(a, b.nextSibling)
            }, c);
            h.save = d, h.toTextArea = function () {
                d(), b.parentNode.removeChild(h.getWrapperElement()), b.style.display = "", b.form && (e(), typeof b.form.submit == "function" && (b.form.submit = f))
            };
            return h
        }, a.startState = e, a.copyState = d, f.prototype = {
            eol: function () {
                return this.pos >= this.string.length
            },
            sol: function () {
                return this.pos == 0
            },
            peek: function () {
                return this.string.charAt(this.pos)
            },
            next: function () {
                if (this.pos < this.string.length) return this.string.charAt(this.pos++)
            },
            eat: function (a) {
                var b = this.string.charAt(this.pos);
                if (typeof a == "string") var c = b == a;
                else var c = b && (a.test ? a.test(b) : a(b));
                if (c) {
                    ++this.pos;
                    return b
                }
            },
            eatWhile: function (a) {
                var b = this.start;
                while (this.eat(a));
                return this.pos > b
            },
            eatSpace: function () {
                var a = this.pos;
                while (/[\s\u00a0]/.test(this.string.charAt(this.pos)))++this.pos;
                return this.pos > a
            },
            skipToEnd: function () {
                this.pos = this.string.length
            },
            skipTo: function (a) {
                var b = this.string.indexOf(a, this.pos);
                if (b > -1) {
                    this.pos = b;
                    return !0
                }
            },
            backUp: function (a) {
                this.pos -= a
            },
            column: function () {
                return v(this.string, this.start)
            },
            indentation: function () {
                return v(this.string)
            },
            match: function (a, b, c) {
                if (typeof a != "string") {
                    var e = this.string.slice(this.pos).match(a);
                    e && b !== !1 && (this.pos += e[0].length);
                    return e
                }
                function d(a) {
                    return c ? a.toLowerCase() : a
                }
                if (d(this.string).indexOf(d(a), this.pos) == this.pos) {
                    b !== !1 && (this.pos += a.length);
                    return !0
                }
            },
            current: function () {
                return this.string.slice(this.start, this.pos)
            }
        }, g.prototype = {
            replace: function (a, b, c) {
                var d = [],
                    e = this.marked;
                h(0, a, this.styles, d), c && d.push(c, null), h(b, this.text.length, this.styles, d), this.styles = d, this.text = this.text.slice(0, a) + c + this.text.slice(b), this.stateAfter = null;
                if (e) {
                    var f = c.length - (b - a),
                        g = this.text.length;

                    function i(a) {
                        return a <= Math.min(b, b + f) ? a : a + f
                    }
                    for (var j = 0; j < e.length; ++j) {
                        var k = e[j],
                            l = !1;
                        k.from >= g ? l = !0 : (k.from = i(k.from), k.to != null && (k.to = i(k.to)));
                        if (l || k.from >= k.to) e.splice(j, 1), j--
                    }
                }
            },
            split: function (a, b) {
                var c = [b, null];
                h(a, this.text.length, this.styles, c);
                return new g(b + this.text.slice(a), c)
            },
            addMark: function (a, b, c) {
                var d = this.marked,
                    e = {
                        from: a,
                        to: b,
                        style: c
                    };
                this.marked == null && (this.marked = []), this.marked.push(e), this.marked.sort(function (a, b) {
                    return a.from - b.from
                });
                return e
            },
            removeMark: function (a) {
                var b = this.marked;
                if ( !! b) for (var c = 0; c < b.length; ++c) if (b[c] == a) {
                    b.splice(c, 1);
                    break
                }
            },
            highlight: function (a, b) {
                var c = new f(this.text),
                    d = this.styles,
                    e = 0,
                    g = !1,
                    h = d[0],
                    i;
                this.text == "" && a.blankLine && a.blankLine(b);
                while (!c.eol()) {
                    var j = a.token(c, b),
                        k = this.text.slice(c.start, c.pos);
                    c.start = c.pos, e && d[e - 1] == j ? d[e - 2] += k : k && (!g && (d[e + 1] != j || e && d[e - 2] != i) && (g = !0), d[e++] = k, d[e++] = j, i = h, h = d[e]);
                    if (c.pos > 5e3) {
                        d[e++] = this.text.slice(c.pos), d[e++] = null;
                        break
                    }
                }
                d.length != e && (d.length = e, g = !0), e && d[e - 2] != i && (g = !0);
                return g
            },
            getTokenAt: function (a, b, c) {
                var d = this.text,
                    e = new f(d);
                while (e.pos < c && !e.eol()) {
                    e.start = e.pos;
                    var g = a.token(e, b)
                }
                return {
                    start: e.start,
                    end: e.pos,
                    string: e.current(),
                    className: g || null,
                    state: b
                }
            },
            indentation: function () {
                return v(this.text)
            },
            getHTML: function (a, b, c, d) {
                function f(a, b) {
                    !a || (b ? e.push('<span class="', b, '">', B(a), "</span>") : e.push(B(a)))
                }
                var e = [];
                c && e.push(this.className ? '<pre class="' + this.className + '">' : "<pre>");
                var g = this.styles,
                    h = this.text,
                    i = this.marked;
                a == b && (a = null);
                var j = h.length;
                d != null && (j = Math.min(d, j));
                if (!h && d == null) f(" ", a != null && b == null ? "CodeMirror-selected" : null);
                else if (!i && a == null) for (var k = 0, l = 0; l < j; k += 2) {
                    var m = g[k],
                        n = m.length;
                    l + n > j && (m = m.slice(0, j - l)), l += n, f(m, g[k + 1])
                } else {
                    var o = 0,
                        k = 0,
                        p = "",
                        q, r = 0,
                        s = -1,
                        t = null;

                    function u() {
                        i && (s += 1, t = s < i.length ? i[s] : null)
                    }
                    u();
                    while (o < j) {
                        var v = j,
                            w = "";
                        if (a != null) if (a > o) v = a;
                        else if (b == null || b > o) w = " CodeMirror-selected", b != null && (v = Math.min(v, b));
                        while (t && t.to != null && t.to <= o) u();
                        t && (t.from > o ? v = Math.min(v, t.from) : (w += " " + t.style, t.to != null && (v = Math.min(v, t.to))));
                        for (;;) {
                            var x = o + p.length,
                                y = q;
                            w && (y = q ? q + w : w), f(x > v ? p.slice(0, v - o) : p, y);
                            if (x >= v) {
                                p = p.slice(v - o), o = v;
                                break
                            }
                            o = x, p = g[k++], q = g[k++]
                        }
                    }
                    a != null && b == null && f(" ", "CodeMirror-selected")
                }
                c && e.push("</pre>");
                return e.join("")
            }
        }, i.prototype = {
            addChange: function (a, b, c) {
                this.undone.length = 0;
                var d = +(new Date),
                    e = this.done[this.done.length - 1];
                if (d - this.time > 400 || !e || e.start > a + b || e.start + e.added < a - e.added + e.old.length) this.done.push({
                    start: a,
                    added: b,
                    old: c
                });
                else {
                    var f = 0;
                    if (a < e.start) {
                        for (var g = e.start - a - 1; g >= 0; --g) e.old.unshift(c[g]);
                        e.added += e.start - a, e.start = a
                    } else e.start < a && (f = a - e.start, b += f);
                    for (var g = e.added - f, h = c.length; g < h; ++g) e.old.push(c[g]);
                    e.added < b && (e.added = b)
                }
                this.time = d
            }
        }, l.prototype = {
            stop: function () {
                j.call(this.e)
            },
            target: function () {
                return this.e.target || this.e.srcElement
            },
            button: function () {
                if (this.e.which) return this.e.which;
                if (this.e.button & 1) return 1;
                if (this.e.button & 2) return 3;
                if (this.e.button & 4) return 2
            },
            pageX: function () {
                if (this.e.pageX != null) return this.e.pageX;
                var a = this.target().ownerDocument;
                return this.e.clientX + a.body.scrollLeft + a.documentElement.scrollLeft
            },
            pageY: function () {
                if (this.e.pageY != null) return this.e.pageY;
                var a = this.target().ownerDocument;
                return this.e.clientY + a.body.scrollTop + a.documentElement.scrollTop
            }
        }, n.prototype = {
            set: function (a, b) {
                clearTimeout(this.id), this.id = setTimeout(b, a)
            }
        };
        var o = function () {
                var a = document.createElement("pre");
                a.innerHTML = " ";
                return !a.innerHTML
            }(),
            p = /gecko\/\d{7}/i.test(navigator.userAgent),
            q = "\n";
        (function () {
            var a = document.createElement("textarea");
            a.value = "foo\nbar", a.value.indexOf("\r") > -1 && (q = "\r\n")
        })();
        var r = 8,
            s = /Mac/.test(navigator.platform),
            t = {};
        for (var u = 35; u <= 40; ++u) t[u] = t["c" + u] = !0;
        if ("\n\nb".split(/\n/).length != 3) var E = function (a) {
                var b = 0,
                    c, d = [];
                while ((c = a.indexOf("\n", b)) > -1) d.push(a.slice(b, a.charAt(c - 1) == "\r" ? c - 1 : c)), b = c + 1;
                d.push(a.slice(b));
                return d
            };
        else var E = function (a) {
                return a.split(/\r?\n/)
            };
        if (window.getSelection) var F = function (a) {
                try {
                    return {
                        start: a.selectionStart,
                        end: a.selectionEnd
                    }
                } catch (b) {
                    return null
                }
            },
            G = function (a, b, c) {
                try {
                    a.setSelectionRange(b, c)
                } catch (d) {}
            };
        else var F = function (a) {
                try {
                    var b = a.ownerDocument.selection.createRange()
                } catch (c) {
                    return null
                }
                if (!b || b.parentElement() != a) return null;
                var d = a.value,
                    e = d.length,
                    f = a.createTextRange();
                f.moveToBookmark(b.getBookmark());
                var g = a.createTextRange();
                g.collapse(!1);
                if (f.compareEndPoints("StartToEnd", g) > -1) return {
                    start: e,
                    end: e
                };
                var h = -f.moveStart("character", -e);
                for (var i = d.indexOf("\r"); i > -1 && i < h; i = d.indexOf("\r", i + 1), h++);
                if (f.compareEndPoints("EndToEnd", g) > -1) return {
                    start: h,
                    end: e
                };
                var j = -f.moveEnd("character", -e);
                for (var i = d.indexOf("\r"); i > -1 && i < j; i = d.indexOf("\r", i + 1), j++);
                return {
                    start: h,
                    end: j
                }
            },
            G = function (a, b, c) {
                var d = a.createTextRange();
                d.collapse(!0);
                var e = d.duplicate(),
                    f = 0,
                    g = a.value;
                for (var h = g.indexOf("\n"); h > -1 && h < b; h = g.indexOf("\n", h + 1))++f;
                d.move("character", b - f);
                for (; h > -1 && h < c; h = g.indexOf("\n", h + 1))++f;
                e.move("character", c - f), d.setEndPoint("EndToEnd", e), d.select()
            };
        a.defineMode("null", function () {
            return {
                token: function (a) {
                    a.skipToEnd()
                }
            }
        }), a.defineMIME("text/plain", "null");
        return a
    }();
CodeMirror.defineMode("javascript", function (a, b) {
    function R(a, b) {
        if (a == "variable") {
            v(b);
            return u()
        }
    }
    function Q(a, b) {
        if (a == "variable") {
            v(b);
            return u(Q)
        }
        if (a == "(") return u(z(")"), x, I(R, ")"), A, C, y)
    }
    function P(a) {
        a != ")" && u(D)
    }
    function O(a, b) {
        if (a == ";") return u(P);
        if (b == "in") return u(D);
        return u(D, B(";"), P)
    }
    function N(a, b) {
        if (b == "in") return u(D);
        return u(E, O)
    }
    function M(a) {
        if (a == "var") return u(K, O);
        if (a == ";") return t(O);
        if (a == "variable") return u(N);
        return t(O)
    }
    function L(a, b) {
        if (b == "=") return u(D, L);
        if (a == ",") return u(K)
    }
    function K(a, b) {
        if (a == "variable") {
            v(b);
            return u(L)
        }
        return u()
    }
    function J(a) {
        if (a == "}") return u();
        return t(C, J)
    }
    function I(a, b) {
        function c(d) {
            if (d == ",") return u(a, c);
            if (d == b) return u();
            return u(B(b))
        }
        return function (d) {
            return d == b ? u() : t(a, c)
        }
    }
    function H(a) {
        a == "variable" && (s.marked = "js-property");
        if (o.hasOwnProperty(a)) return u(B(":"), D)
    }
    function G(a) {
        if (a == "variable") {
            s.marked = "js-property";
            return u()
        }
    }
    function F(a) {
        if (a == ":") return u(A, C);
        return t(E, B(";"), A)
    }
    function E(a, b) {
        if (a == "operator" && /\+\+|--/.test(b)) return u(E);
        if (a == "operator") return u(D);
        if (a != ";") {
            if (a == "(") return u(z(")"), I(D, ")"), A, E);
            if (a == ".") return u(G, E);
            if (a == "[") return u(z("]"), D, B("]"), A, E)
        }
    }
    function D(a) {
        if (o.hasOwnProperty(a)) return u(E);
        if (a == "function") return u(Q);
        if (a == "keyword c") return u(D);
        if (a == "(") return u(z(")"), D, B(")"), A, E);
        if (a == "operator") return u(D);
        if (a == "[") return u(z("]"), I(D, "]"), A, E);
        if (a == "{") return u(z("}"), I(H, "}"), A, E);
        return u()
    }
    function C(a) {
        if (a == "var") return u(z("vardef"), K, B(";"), A);
        if (a == "keyword a") return u(z("form"), D, C, A);
        if (a == "keyword b") return u(z("form"), C, A);
        if (a == "{") return u(z("}"), J, A);
        if (a == ";") return u();
        if (a == "function") return u(Q);
        if (a == "for") return u(z("form"), B("("), z(")"), M, B(")"), A, C, A);
        if (a == "variable") return u(z("stat"), F);
        if (a == "switch") return u(z("form"), D, z("}", "switch"), B("{"), J, A, A);
        if (a == "case") return u(D, B(":"));
        if (a == "default") return u(B(":"));
        if (a == "catch") return u(z("form"), x, B("("), R, B(")"), C, A, y);
        return t(z("stat"), D, B(";"), A)
    }
    function B(a) {
        return function (b) {
            return b == a ? u() : a == ";" ? t() : u(arguments.callee)
        }
    }
    function A() {
        var a = s.state;
        a.lexical.prev && (a.lexical.type == ")" && (a.indented = a.lexical.indented), a.lexical = a.lexical.prev)
    }
    function z(a, b) {
        var c = function () {
                var c = s.state;
                c.lexical = new p(c.indented, s.stream.column(), a, null, c.lexical, b)
            };
        c.lex = !0;
        return c
    }
    function y() {
        s.state.localVars = s.state.context.vars, s.state.context = s.state.context.prev
    }
    function x() {
        s.state.context || (s.state.localVars = w), s.state.context = {
            prev: s.state.context,
            vars: s.state.localVars
        }
    }
    function v(a) {
        var b = s.state;
        if (b.context) {
            s.marked = "js-variabledef";
            for (var c = b.localVars; c; c = c.next) if (c.name == a) return;
            b.localVars = {
                name: a,
                next: b.localVars
            }
        }
    }
    function u() {
        t.apply(null, arguments);
        return !0
    }
    function t() {
        for (var a = arguments.length - 1; a >= 0; a--) s.cc.push(arguments[a])
    }
    function r(a, b, c, e, f) {
        var g = a.cc;
        s.state = a, s.stream = f, s.marked = null, s.cc = g, a.lexical.hasOwnProperty("align") || (a.lexical.align = !0);
        for (;;) {
            var h = g.length ? g.pop() : d ? D : C;
            if (h(c, e)) {
                while (g.length && g[g.length - 1].lex) g.pop()();
                if (s.marked) return s.marked;
                if (c == "variable" && q(a, e)) return "js-localvariable";
                return b
            }
        }
    }
    function q(a, b) {
        for (var c = a.localVars; c; c = c.next) if (c.name == b) return !0
    }
    function p(a, b, c, d, e, f) {
        this.indented = a, this.column = b, this.type = c, this.prev = e, this.info = f, d != null && (this.align = d)
    }
    function n(a, b) {
        var c = !1,
            d;
        while (d = a.next()) {
            if (d == "/" && c) {
                b.tokenize = l;
                break
            }
            c = d == "*"
        }
        return k("comment", "js-comment")
    }
    function m(a) {
        return function (b, c) {
            h(b, a) || (c.tokenize = l);
            return k("string", "js-string")
        }
    }
    function l(a, b) {
        var c = a.next();
        if (c == '"' || c == "'") return g(a, b, m(c));
        if (/[\[\]{}\(\),;\:\.]/.test(c)) return k(c);
        if (c == "0" && a.eat(/x/i)) {
            a.eatWhile(/[\da-f]/i);
            return k("number", "js-atom")
        }
        if (/\d/.test(c)) {
            a.match(/^\d*(?:\.\d*)?(?:e[+\-]?\d+)?/);
            return k("number", "js-atom")
        }
        if (c == "/") {
            if (a.eat("*")) return g(a, b, n);
            if (a.eat("/")) {
                a.skipToEnd();
                return k("comment", "js-comment")
            }
            if (b.reAllowed) {
                h(a, "/"), a.eatWhile(/[gimy]/);
                return k("regexp", "js-string")
            }
            a.eatWhile(f);
            return k("operator", null, a.current())
        }
        if (f.test(c)) {
            a.eatWhile(f);
            return k("operator", null, a.current())
        }
        a.eatWhile(/[\w\$_]/);
        var d = a.current(),
            i = e.propertyIsEnumerable(d) && e[d];
        return i ? k(i.type, i.style, d) : k("variable", "js-variable", d)
    }
    function k(a, b, c) {
        i = a, j = c;
        return b
    }
    function h(a, b) {
        var c = !1,
            d;
        while ((d = a.next()) != null) {
            if (d == b && !c) return !1;
            c = !c && d == "\\"
        }
        return c
    }
    function g(a, b, c) {
        b.tokenize = c;
        return c(a, b)
    }
    var c = a.indentUnit,
        d = b.json,
        e = function () {
            function a(a) {
                return {
                    type: a,
                    style: "js-keyword"
                }
            }
            var b = a("keyword a"),
                c = a("keyword b"),
                d = a("keyword c"),
                e = a("operator"),
                f = {
                    type: "atom",
                    style: "js-atom"
                };
            return {
                "if": b,
                "while": b,
                "with": b,
                "else": c,
                "do": c,
                "try": c,
                "finally": c,
                "return": d,
                "break": d,
                "continue": d,
                "new": d,
                "delete": d,
                "throw": d,
                "var": a("var"),
                "function": a("function"),
                "catch": a("catch"),
                "for": a("for"),
                "switch": a("switch"),
                "case": a("case"),
                "default": a("default"),
                "in": e,
                "typeof": e,
                "instanceof": e,
                "true": f,
                "false": f,
                "null": f,
                "undefined": f,
                NaN: f,
                Infinity: f
            }
        }(),
        f = /[+\-*&%=<>!?|]/,
        i, j, o = {
            atom: !0,
            number: !0,
            variable: !0,
            string: !0,
            regexp: !0
        },
        s = {
            state: null,
            column: null,
            marked: null,
            cc: null
        },
        w = {
            name: "this",
            next: {
                name: "arguments"
            }
        };
    A.lex = !0;
    return {
        startState: function (a) {
            return {
                tokenize: l,
                reAllowed: !0,
                cc: [],
                lexical: new p((a || 0) - c, 0, "block", !1),
                localVars: null,
                context: null,
                indented: 0
            }
        },
        token: function (a, b) {
            a.sol() && (b.lexical.hasOwnProperty("align") || (b.lexical.align = !1), b.indented = a.indentation());
            if (a.eatSpace()) return null;
            var c = b.tokenize(a, b);
            if (i == "comment") return c;
            b.reAllowed = i == "operator" || i == "keyword c" || i.match(/^[\[{}\(,;:]$/);
            return r(b, c, i, j, a)
        },
        indent: function (a, b) {
            if (a.tokenize != l) return 0;
            var d = b && b.charAt(0),
                e = a.lexical,
                f = e.type,
                g = d == f;
            return f == "vardef" ? e.indented + 4 : f == "form" && d == "{" ? e.indented : f == "stat" || f == "form" ? e.indented + c : e.info == "switch" && !g ? e.indented + (/^(?:case|default)\b/.test(b) ? c : 2 * c) : e.align ? e.column + (g ? 0 : 1) : e.indented + (g ? 0 : c)
        },
        electricChars: ":{}"
    }
}), CodeMirror.defineMIME("text/javascript", "javascript"), CodeMirror.defineMIME("application/json", {
    name: "javascript",
    json: !0
}), CodeMirror.defineMode("xml", function (a, b) {
    function v(a) {
        if (a == "xml-word" && d.allowUnquoted) {
            m = "xml-attribute";
            return o()
        }
        if (a == "xml-attribute") return o();
        return n()
    }
    function u(a) {
        if (a == "xml-word") {
            m = "xml-attname";
            return o(u)
        }
        if (a == "equals") return o(v, u);
        return n()
    }
    function t(a) {
        if (a == "endTag") return o();
        return n()
    }
    function s(a) {
        return function (b) {
            if (b == "selfcloseTag" || b == "endTag" && d.autoSelfClosers.hasOwnProperty(l.tagName.toLowerCase())) return o();
            if (b == "endTag") {
                p(l.tagName, a);
                return o()
            }
            return o()
        }
    }
    function r(a) {
        if (a == "openTag") {
            l.tagName = f;
            return o(u, s(l.startOfLine))
        }
        if (a == "closeTag") {
            q();
            return o(t)
        }
        if (a == "xml-cdata") {
            (!l.context || l.context.name != "!cdata") && p("!cdata"), l.tokenize == h && q();
            return o()
        }
        return o()
    }
    function q() {
        l.context && (l.context = l.context.prev)
    }
    function p(a, b) {
        var c = d.doNotIndent.hasOwnProperty(a) || l.context && l.context.noIndent;
        l.context = {
            prev: l.context,
            tagName: a,
            indent: l.indented,
            startOfLine: b,
            noIndent: c
        }
    }
    function o() {
        n.apply(null, arguments);
        return !0
    }
    function n() {
        for (var a = arguments.length - 1; a >= 0; a--) l.cc.push(arguments[a])
    }
    function k(a, b) {
        return function (c, d) {
            while (!c.eol()) {
                if (c.match(b)) {
                    d.tokenize = h;
                    break
                }
                c.next()
            }
            return a
        }
    }
    function j(a) {
        return function (b, c) {
            while (!b.eol()) if (b.next() == a) {
                c.tokenize = i;
                break
            }
            return "xml-attribute"
        }
    }
    function i(a, b) {
        var c = a.next();
        if (c == ">" || c == "/" && a.eat(">")) {
            b.tokenize = h, g = c == ">" ? "endTag" : "selfcloseTag";
            return "xml-tag"
        }
        if (c == "=") {
            g = "equals";
            return null
        }
        if (/[\'\"]/.test(c)) {
            b.tokenize = j(c);
            return b.tokenize(a, b)
        }
        a.eatWhile(/[^\s\u00a0=<>\"\'\/?]/);
        return "xml-word"
    }
    function h(a, b) {
        function c(c) {
            b.tokenize = c;
            return c(a, b)
        }
        var d = a.next();
        if (d == "<") {
            if (a.eat("!")) {
                if (a.eat("[")) return a.match("CDATA[") ? c(k("xml-cdata", "]]>")) : null;
                if (a.match("--")) return c(k("xml-comment", "-->"));
                if (a.match("DOCTYPE")) {
                    a.eatWhile(/[\w\._\-]/);
                    return c(k("xml-doctype", ">"))
                }
                return null
            }
            if (a.eat("?")) {
                a.eatWhile(/[\w\._\-]/), b.tokenize = k("xml-processing", "?>");
                return "xml-processing"
            }
            g = a.eat("/") ? "closeTag" : "openTag", a.eatSpace(), f = "";
            var e;
            while (e = a.eat(/[^\s\u00a0=<>\"\'\/?]/)) f += e;
            b.tokenize = i;
            return "xml-tag"
        }
        if (d == "&") {
            a.eatWhile(/[^;]/), a.eat(";");
            return "xml-entity"
        }
        a.eatWhile(/[^&<]/);
        return null
    }
    var c = a.indentUnit,
        d = b.htmlMode ? {
            autoSelfClosers: {
                br: !0,
                img: !0,
                hr: !0,
                link: !0,
                input: !0,
                meta: !0,
                col: !0,
                frame: !0,
                base: !0,
                area: !0
            },
            doNotIndent: {
                pre: !0,
                "!cdata": !0
            },
            allowUnquoted: !0
        } : {
            autoSelfClosers: {},
            doNotIndent: {
                "!cdata": !0
            },
            allowUnquoted: !1
        },
        e = b.alignCDATA,
        f, g, l, m;
    return {
        startState: function () {
            return {
                tokenize: h,
                cc: [],
                indented: 0,
                startOfLine: !0,
                tagName: null,
                context: null
            }
        },
        token: function (a, b) {
            a.sol() && (b.startOfLine = !0, b.indented = a.indentation());
            if (a.eatSpace()) return null;
            m = g = f = null;
            var c = b.tokenize(a, b);
            if ((c || g) && c != "xml-comment") {
                l = b;
                for (;;) {
                    var d = b.cc.pop() || r;
                    if (d(g || c)) break
                }
            }
            b.startOfLine = !1;
            return m || c
        },
        indent: function (a, b) {
            var d = a.context;
            if (d && d.noIndent) return 0;
            if (e && /<!\[CDATA\[/.test(b)) return 0;
            d && /^<\//.test(b) && (d = d.prev);
            while (d && !d.startOfLine) d = d.prev;
            return d ? d.indent + c : 0
        },
        electricChars: "/"
    }
}), CodeMirror.defineMIME("application/xml", "xml"), CodeMirror.defineMIME("text/html", {
    name: "xml",
    htmlMode: !0
}), CodeMirror.defineMode("css", function (a) {
    function h(a) {
        return function (b, c) {
            var f = !1,
                g;
            while ((g = b.next()) != null) {
                if (g == a && !f) break;
                f = !f && g == "\\"
            }
            f || (c.tokenize = e);
            return d("css-string", "string")
        }
    }
    function g(a, b) {
        var c = 0,
            f;
        while ((f = a.next()) != null) {
            if (c >= 2 && f == ">") {
                b.tokenize = e;
                break
            }
            c = f == "-" ? c + 1 : 0
        }
        return d("css-comment", "comment")
    }
    function f(a, b) {
        var c = !1,
            f;
        while ((f = a.next()) != null) {
            if (c && f == "/") {
                b.tokenize = e;
                break
            }
            c = f == "*"
        }
        return d("css-comment", "comment")
    }
    function e(a, b) {
        var c = a.next();
        if (c == "@") {
            a.eatWhile(/\w/);
            return d("css-at", a.current())
        }
        if (c == "/" && a.eat("*")) {
            b.tokenize = f;
            return f(a, b)
        }
        if (c == "<" && a.eat("!")) {
            b.tokenize = g;
            return g(a, b)
        }
        if (c == "=") d(null, "compare");
        else {
            if (c != "~" && c != "|" || !a.eat("=")) {
                if (c == '"' || c == "'") {
                    b.tokenize = h(c);
                    return b.tokenize(a, b)
                }
                if (c == "#") {
                    a.eatWhile(/\w/);
                    return d("css-selector", "hash")
                }
                if (c == "!") {
                    a.match(/^\s*\w*/);
                    return d("css-important", "important")
                }
                if (/\d/.test(c)) {
                    a.eatWhile(/[\w.%]/);
                    return d("css-unit", "unit")
                }
                if (/[,.+>*\/]/.test(c)) return d(null, "select-op");
                if (/[;{}:\[\]]/.test(c)) return d(null, c);
                a.eatWhile(/[\w\\\-_]/);
                return d("css-identifier", "identifier")
            }
            return d(null, "compare")
        }
    }
    function d(a, b) {
        c = b;
        return a
    }
    var b = a.indentUnit,
        c;
    return {
        startState: function (a) {
            return {
                tokenize: e,
                baseIndent: a || 0,
                stack: []
            }
        },
        token: function (a, b) {
            if (a.eatSpace()) return null;
            var d = b.tokenize(a, b),
                e = b.stack[b.stack.length - 1];
            if (c == "hash" && e == "rule") d = "css-colorcode";
            else if (d == "css-identifier") if (e == "rule") d = "css-value";
            else if (!e || e == "@media{") d = "css-selector";
            e == "rule" && /^[\{\};]$/.test(c) && b.stack.pop(), c == "{" ? e == "@media" ? b.stack[b.stack.length - 1] = "@media{" : b.stack.push("{") : c == "}" ? b.stack.pop() : c == "@media" ? b.stack.push("@media") : e != "rule" && e != "@media" && c != "comment" && b.stack.push("rule");
            return d
        },
        indent: function (a, c) {
            var d = a.stack.length;
            /^\}/.test(c) && (d -= a.stack[a.stack.length - 1] == "rule" ? 2 : 1);
            return a.baseIndent + d * b
        },
        electricChars: "}"
    }
}), CodeMirror.defineMIME("text/css", "css"), CodeMirror.defineMode("htmlmixed", function (a, b) {
    function i(a, b) {
        if (a.match(/^<\/\s*style\s*>/i, !1)) {
            b.token = f, b.localState = null;
            return f(a, b)
        }
        return g(a, /<\/\s*style\s*>/, e.token(a, b.localState))
    }
    function h(a, b) {
        if (a.match(/^<\/\s*script\s*>/i, !1)) {
            b.token = f, b.curState = null;
            return f(a, b)
        }
        return g(a, /<\/\s*script\s*>/, d.token(a, b.localState))
    }
    function g(a, b, c) {
        var d = a.current(),
            e = d.search(b);
        e > -1 && a.backUp(d.length - e);
        return c
    }
    function f(a, b) {
        var f = c.token(a, b.htmlState);
        f == "xml-tag" && a.current() == ">" && b.htmlState.context && (/^script$/i.test(b.htmlState.context.tagName) ? (b.token = h, b.localState = d.startState(c.indent(b.htmlState, ""))) : /^style$/i.test(b.htmlState.context.tagName) && (b.token = i, b.localState = e.startState(c.indent(b.htmlState, ""))));
        return f
    }
    var c = CodeMirror.getMode(a, {
        name: "xml",
        htmlMode: !0
    }),
        d = CodeMirror.getMode(a, "javascript"),
        e = CodeMirror.getMode(a, "css");
    return {
        startState: function () {
            var a = c.startState();
            return {
                token: f,
                localState: null,
                htmlState: a
            }
        },
        copyState: function (a) {
            if (a.localState) var b = CodeMirror.copyState(a.token == i ? e : d, a.localState);
            return {
                token: a.token,
                localState: b,
                htmlState: CodeMirror.copyState(c, a.htmlState)
            }
        },
        token: function (a, b) {
            return b.token(a, b)
        },
        indent: function (a, b) {
            return a.token == f || /^\s*<\//.test(b) ? c.indent(a.htmlState, b) : a.token == h ? d.indent(a.localState, b) : e.indent(a.localState, b)
        },
        electricChars: "/{}:"
    }
}), CodeMirror.defineMIME("text/html", "htmlmixed")