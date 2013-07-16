function ColorFader(elem, prop) {
    this.jq = $(elem);
    this.cssProp = prop;
    this.delay = 500;
    this.ready = true;
    var context = this;
    this.fadeTo = function(incolor) {
        if (!this.ready) return;
        if (typeof(incolor) == "string") {
            var color = this.parse(incolor);
        } else {
            var color = incolor;
        }
        context.ready = false;
        function pon(x) {
            if (x > 0) {
                return 1;
            } else if (x < 0) {
                return -1;
            } else {
                return 0;
            }
        }
        var cc = this.parse(this.jq.css(this.cssProp));
        var r = Math.round(this.delay / Math.abs(color.r - cc.r));
        var g = Math.round(this.delay / Math.abs(color.g - cc.g));
        var b = Math.round(this.delay / Math.abs(color.b - cc.b));
        var rpn = pon(color.r - cc.r);
        var gpn = pon(color.g - cc.g);
        var bpn = pon(color.b - cc.b);
        var rr = false,
            gr = false,
            br = false;
        var rt = window.setInterval(function() {
            var cc = context.parse(context.jq.css(context.cssProp));
            if (cc.r == color.r) {
                window.clearInterval(rt);
                console.log("R stopped");
                console.log(Date());
                rr = true;
                return;
            }
            var str = "rgb(" + (cc.r + rpn) + ", " + cc.g + ", " + cc.b + ")";
            context.jq.css(context.cssProp, str);
        }, r);
        var gt = window.setInterval(function() {
            var cc = context.parse(context.jq.css(context.cssProp));
            if (cc.g == color.g) {
                window.clearInterval(gt);
                console.log("G stopped");
                console.log(Date());
                gr = true;
                return;
            }
            var str = "rgb(" + cc.r + ", " + (cc.g + gpn) + ", " + cc.b + ")";
            context.jq.css(context.cssProp, str);
        }, g);
        var bt = window.setInterval(function() {
            var cc = context.parse(context.jq.css(context.cssProp));
            if (cc.b == color.b) {
                window.clearInterval(bt);
                console.log("B stopped");
                console.log(Date());
                br = true;
                return;
            }
            var str = "rgb(" + cc.r + ", " + cc.g + ", " + (cc.b + bpn) + ")";
            context.jq.css(context.cssProp, str);
        }, b);
        var flagt = window.setInterval(function() {
            if (rr && gr && br) {
                context.ready = true;
                window.clearInterval(flagt);
            };
        }, 20);
/*         if (!context.ready &&(
            (rr && gr) || (gr && br) || (rr && br))) {
            context.jq.css(context.cssProp, ("rgb( " + dpms.to.r + ", " + dpms.to.g + ", " + dpms.to.b + ")"));
            context.ready = true;
        } */
    }
    this.parse = function(c) {
        var ret = {};
        if (c[0] == "#") {
            if (c.length == 4) {
                ret.r = window.parseInt((c[1]).concat(c[1]), 16);
                ret.g = window.parseInt((c[2]).concat(c[2]), 16);
                ret.b = window.parseInt((c[3]).concat(c[3]), 16);
            } else if (c.length == 7) {
                ret.r = window.parseInt(c.slice(1, 3), 16);
                ret.g = window.parseInt(c.slice(3, 5), 16);
                ret.b = window.parseInt(c.slice(5), 16);
            }
        } else if (/^rgb\(/.test(c)) {
            var arr = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})/.exec(c);
            if (arr.length < 4) return;
            //console.log(c);
            ret.r = window.parseInt(arr[1]);
            ret.g = window.parseInt(arr[2]);
            ret.b = window.parseInt(arr[3]);
        } else if (/^rgba\(/.test(c)) {
            // !!!!!
        }
        return ret;
    }
/*     window.setInterval(function() {
        if (context.ready == false) return;
        
        var dpms = context.dpms();
        console.log("iter" + Date());

    }, this.delay); */
}