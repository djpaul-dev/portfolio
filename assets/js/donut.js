(function () {
    var pretag = document.getElementById('donut');
    if (!pretag) return;

    var tmr1 = undefined;
    var A = 0, B = 0;

    var asciiframe = function () {
        var b = [];
        var z = [];
        A += 0.05;
        B += 0.02;
        var r1 = 1; // Major radius
        var r2 = 0.5; // Strip width

        var cA = Math.sin(A), sA = Math.cos(A),
            cB = Math.sin(B), sB = Math.cos(B);

        // Increased resolution
        var width = 80;
        var height = 40;
        for (var k = 0; k < width * height; k++) {
            b[k] = k % width == width - 1 ? "\n" : " ";
            z[k] = 0;
        }

        // u goes around the strip (0 to 2pi)
        // Increased density for larger surface
        for (var u = 0; u < 6.28; u += 0.04) {
            var cu = Math.cos(u), su = Math.sin(u);
            var cu2 = Math.cos(u / 2), su2 = Math.sin(u / 2);

            // v goes across the strip (-r2 to r2)
            // Increased density for larger surface
            for (var v = -r2; v < r2; v += 0.05) {
                // Parametric equations for Möebius Strip
                var x0 = (r1 + v * cu2) * cu;
                var y0 = (r1 + v * cu2) * su;
                var z0 = v * su2;

                // Rotation around X axis (A)
                var y1 = y0 * sA - z0 * cA;
                var z1 = y0 * cA + z0 * sA;

                // Rotation around Z axis (B)
                var x2 = x0 * sB - y1 * cB;
                var y2 = x0 * cB + y1 * sB;
                var z2 = 5 + z1; // Offset Z for projection

                var ooz = 1 / z2; // one over z

                // Projection - Adjusted for larger buffer
                var xp = 0 | (width / 2 + 100 * ooz * x2);
                var yp = 0 | (height / 2 + 50 * ooz * y2);

                // Normal vector calculation for lighting
                // n = dp/du x dp/dv
                // simplified normal for Möebius strip:
                var nx = cu * su2;
                var ny = su * su2;
                var nz = -cu2;

                // Apply same rotations to normal
                var ny1 = ny * sA - nz * cA;
                var nz1 = ny * cA + nz * sA;
                var nx2 = nx * sB - ny1 * cB;
                var ny2 = nx * cB + ny1 * sB;

                // Luminance (dot product with light [0, 1, -1])
                var L = ny2 - nz1;

                var o = xp + width * yp;
                if (yp < height && yp >= 0 && xp >= 0 && xp < width - 1 && ooz > z[o]) {
                    z[o] = ooz;
                    var N = 0 | (8 * L);
                    b[o] = ".,-~:;=!*#$@"[N > 0 ? (N < 12 ? N : 11) : 0];
                }
            }
        }
        pretag.innerHTML = b.join("");
    };

    tmr1 = setInterval(asciiframe, 50);
})();
