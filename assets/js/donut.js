(function () {
    var pretag = document.getElementById('donut');
    var canvas2d = document.getElementById('canvasdonut');

    var tmr1 = undefined, tmr2 = undefined;
    var A = 1, B = 1;

    // This is the ASCII donut animation logic adapted from the C code
    var asciiframe = function () {
        var b = [];
        var z = [];
        A += 0.07;
        B += 0.03;
        var cA = Math.sin(A), sA = Math.cos(A),
            cB = Math.sin(B), sB = Math.cos(B);
        for (var k = 0; k < 1760; k++) {
            b[k] = k % 80 == 79 ? "\n" : " ";
            z[k] = 0;
        }
        for (var j = 0; j < 6.28; j += 0.07) { // theta
            var ct = Math.cos(j), st = Math.sin(j);
            for (i = 0; i < 6.28; i += 0.02) { // phi
                var sp = Math.sin(i), cp = Math.cos(i),
                    h = ct + 2, // R1 + R2*cos(theta)
                    D = 1 / (sp * h * sA + st * cA + 5), // this is similar to 1/z
                    t = sp * h * cA - st * sA;

                var x = 0 | (40 + 30 * D * (cp * h * sB - t * cB)),
                    y = 0 | (12 + 15 * D * (cp * h * cB + t * sB)),
                    o = x + 80 * y,
                    N = 0 | (8 * ((st * sA - sp * ct * cA) * sB - sp * ct * sA - st * cA - cp * ct * cB));

                if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
                    z[o] = D;
                    b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
                }
            }
        }
        pretag.innerHTML = b.join("");
    };

    window.anim1 = function () {
        if (tmr1) {
            clearInterval(tmr1);
            tmr1 = undefined;
        } else {
            tmr1 = setInterval(asciiframe, 50);
        }
    };

    // Auto start
    tmr1 = setInterval(asciiframe, 50);
})();
