(function () {
        var imp = document.getElementById("imp"),
          th = document.getElementById("threads"),
          cta = document.getElementById("cta");
        var NS = "http://www.w3.org/2000/svg";
        for (var i = -1; i < 14; i++) {
          var l = document.createElementNS(NS, "line");
          l.setAttribute("x1", 10);
          l.setAttribute("x2", 90);
          l.setAttribute("y1", 100 + i * 12 + 7);
          l.setAttribute("y2", 100 + i * 12);
          th.appendChild(l);
        }
        var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        function ss(a, b, x) {
          x = Math.min(1, Math.max(0, (x - a) / (b - a)));
          return x * x * (3 - 2 * x);
        }
        function update() {
          var W = innerWidth,
            H = innerHeight,
            max = document.documentElement.scrollHeight - H,
            y = scrollY;
          var p = max > 0 ? Math.min(1, y / max) : 0,
            mob = W < 760;
          var size = mob ? 66 : 104,
            h = size * 2.45;
          var w = ss(0.78, 0.99, p);
          var amp = mob ? 0 : Math.min(W * 0.3, 380);
          var cx = mob
            ? W / 2
            : W / 2 + Math.cos(p * Math.PI * 3) * amp;
          cx = cx + (W / 2 - cx) * w;
          var ty = Math.min(H * 0.22, 150);
          var r = cta.getBoundingClientRect();
          var endY = r.top - h - 14;
          var py = ty + (endY - ty) * w;
          var rotY = reduce ? 0 : Math.sin(y / 150) * 30 * (1 - w);
          var rotZ = reduce ? 0 : Math.sin(p * Math.PI * 4) * 7 * (1 - w);
          imp.style.width = size + "px";
          imp.style.transform =
            "translate3d(" +
            (cx - size / 2) +
            "px," +
            py +
            "px,0) perspective(700px) rotateY(" +
            rotY +
            "deg) rotateZ(" +
            rotZ +
            "deg)";
          th.setAttribute(
            "transform",
            "translate(0," + ((reduce ? 0 : y * 0.4) % 12) + ")",
          );
          var landed = p > 0.985;
          imp.classList.toggle("landed", landed);
          cta.classList.toggle("landed", landed);
        }
        var tick = false;
        function on() {
          if (!tick) {
            tick = true;
            requestAnimationFrame(function () {
              tick = false;
              update();
            });
          }
        }
        addEventListener("scroll", on, { passive: true });
        addEventListener("resize", on);
        update();
        var io = new IntersectionObserver(
          function (es) {
            es.forEach(function (e) {
              if (e.isIntersecting) {
                e.target.classList.add("in");
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.15 },
        );
        document.querySelectorAll(".rv").forEach(function (el) {
          io.observe(el);
        });
      })();