/* シェア用：テキスト生成・画像カード(Canvas)生成・共有/保存。公式素材は使わず独自エンブレムで描画 */
(function (g) {
  var D = (g.DBT = g.DBT || {});
  var FONT = '"Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif';
  var W = 1080, H = 1350;

  function starStr(n) { return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }

  function shareUrl(res) {
    var base = location.href.split("#")[0];
    return base + "#r=" + res.main.id + "." + res.sub.id + (res.variant ? "." + res.variant : "");
  }

  function shareText(res) {
    var c = D.config;
    return "【" + c.title + "】\n" +
      "表：" + res.main.name + " × 裏：" + res.sub.name + "\n" +
      "「" + res.typeName + "」 " + starStr(res.stars) + "\n" +
      "必殺技「" + res.move + "」\n" +
      c.shareCopy + "\n" +
      c.hashtags.map(function (h) { return "#" + h; }).join(" ");
  }

  function wrap(ctx, text, maxW) {
    var lines = [], line = "";
    text.split("").forEach(function (ch) {
      if (ctx.measureText(line + ch).width > maxW && line) { lines.push(line); line = ch; } else line += ch;
    });
    if (line) lines.push(line);
    return lines;
  }

  function fitFont(ctx, text, weight, size, maxW) {
    do { ctx.font = weight + " " + size + "px " + FONT; size -= 2; } while (ctx.measureText(text).width > maxW && size > 30);
  }

  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  function emblem(ctx, ch, cx, cy, r, dim) {
    var glow = ctx.createRadialGradient(cx, cy, r * .6, cx, cy, r * 1.7);
    glow.addColorStop(0, ch.color + "99"); glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow; ctx.fillRect(cx - r * 2, cy - r * 2, r * 4, r * 4);
    var gr = ctx.createRadialGradient(cx - r * .3, cy - r * .35, r * .1, cx, cy, r);
    gr.addColorStop(0, "#ffffff"); gr.addColorStop(.25, ch.color); gr.addColorStop(1, "#05061a");
    ctx.save(); if (dim) ctx.globalAlpha = .85;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill();
    ctx.lineWidth = 6; ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.stroke();
    ctx.setLineDash([14, 12]); ctx.lineWidth = 3; ctx.strokeStyle = ch.color;
    ctx.beginPath(); ctx.arc(cx, cy, r + 16, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,.6)"; ctx.shadowBlur = 14;
    ctx.font = "900 " + (ch.glyph.length > 1 ? r * .75 : r * 1.0) + "px " + FONT;
    ctx.fillText(ch.glyph, cx, cy + r * .05);
    ctx.restore();
  }

  function draw(res) {
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var ctx = cv.getContext("2d");
    var bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#070b22"); bg.addColorStop(.55, "#150f45"); bg.addColorStop(1, "#2a1050");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    [[200, 260, res.main.color], [900, 300, res.sub.color], [540, 1250, "#ff8a1f"]].forEach(function (p) {
      var rg = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 520);
      rg.addColorStop(0, p[2] + "66"); rg.addColorStop(1, "transparent");
      ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
    });
    var seed = 7; function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (var i = 0; i < 110; i++) {
      ctx.fillStyle = "rgba(255,255,255," + (.25 + rnd() * .6) + ")";
      ctx.beginPath(); ctx.arc(rnd() * W, rnd() * H, .8 + rnd() * 2, 0, 7); ctx.fill();
    }
    var gold = ctx.createLinearGradient(0, 0, W, H);
    gold.addColorStop(0, "#fff0a8"); gold.addColorStop(.5, "#ffb62e"); gold.addColorStop(1, "#ffe58a");
    ctx.strokeStyle = gold; ctx.lineWidth = 10; rr(ctx, 22, 22, W - 44, H - 44, 34); ctx.stroke();
    ctx.lineWidth = 2; ctx.strokeStyle = "rgba(255,207,74,.5)"; rr(ctx, 42, 42, W - 84, H - 84, 24); ctx.stroke();

    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#ffcf4a"; ctx.font = "700 32px " + FONT; ctx.fillText("D R A G O N   B A L L   B U S I N E S S   T Y P E", W / 2, 100);
    ctx.fillStyle = "#fff"; ctx.font = "900 44px " + FONT; ctx.fillText("あなたの表と裏", W / 2, 158);

    emblem(ctx, res.main, 300, 440, 168, false);
    emblem(ctx, res.sub, 800, 420, 116, true);

    ctx.fillStyle = "#2a1200"; var tg = ctx.createLinearGradient(160, 0, 440, 0); tg.addColorStop(0, "#ffe58a"); tg.addColorStop(1, "#ff9b1a");
    ctx.fillStyle = tg; rr(ctx, 235, 640, 130, 40, 6); ctx.fill();
    ctx.fillStyle = "#2a1200"; ctx.font = "900 26px " + FONT; ctx.fillText("表の顔", 300, 669);
    ctx.fillStyle = "#fff"; fitFont(ctx, res.main.name, 900, 58, 440); ctx.fillText(res.main.name, 300, 748);
    ctx.fillStyle = "#c9cdf0"; ctx.font = "500 28px " + FONT; ctx.fillText(res.main.type, 300, 792);

    ctx.fillStyle = "#cdb3ff"; ctx.font = "700 27px " + FONT; ctx.fillText("でも、あなたの裏には…", 800, 600);
    ctx.fillStyle = "#f0e4ff"; fitFont(ctx, res.sub.name, 900, 52, 400); ctx.fillText(res.sub.name, 800, 668);
    ctx.fillStyle = "#cdb3ff"; ctx.font = "500 24px " + FONT;
    wrap(ctx, res.sub.hidden, 420).slice(0, 2).forEach(function (l, i) { ctx.fillText(l, 800, 712 + i * 32); });

    var tn = ctx.createLinearGradient(0, 850, 0, 950);
    tn.addColorStop(0, "#fff3b0"); tn.addColorStop(.5, "#ffcf4a"); tn.addColorStop(1, "#ff9b1a");
    ctx.shadowColor = "rgba(0,0,0,.7)"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 6;
    ctx.fillStyle = tn; fitFont(ctx, res.typeName, 900, 100, 940); ctx.fillText(res.typeName, W / 2, 905);
    ctx.shadowOffsetY = 0;

    ctx.font = "900 72px " + FONT;
    var sw = ctx.measureText("★★★★★").width, sx = W / 2 - sw / 2; ctx.textAlign = "left";
    for (var s = 0; s < 5; s++) {
      ctx.fillStyle = s < res.stars ? "#ffcf4a" : "rgba(255,255,255,.2)";
      ctx.fillText("★", sx + s * (sw / 5), 1000);
    }
    ctx.textAlign = "center";

    var by = 1042;
    var bf = ctx.createLinearGradient(70, 0, W - 70, 0); bf.addColorStop(0, "rgba(20,60,160,.7)"); bf.addColorStop(1, "rgba(10,20,70,.85)");
    ctx.fillStyle = bf; rr(ctx, 70, by, W - 140, 178, 18); ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = "#3fa9ff"; ctx.stroke();
    ctx.textAlign = "left"; ctx.fillStyle = "#9fd4ff"; ctx.font = "700 26px " + FONT; ctx.fillText("交流会での必殺技", 106, by + 42);
    ctx.fillStyle = "#fff";
    var txt = "「" + res.move + "」", size = 42, lines;
    for (; size >= 32; size -= 2) { ctx.font = "900 " + size + "px " + FONT; lines = wrap(ctx, txt, W - 200); if (lines.length <= 1) break; }
    if (lines.length > 1) { size = 38; ctx.font = "900 " + size + "px " + FONT; lines = wrap(ctx, txt, W - 200); }
    lines.slice(0, 2).forEach(function (l, i) { ctx.fillText(l, 106, by + 112 + i * size * 1.25); });

    ctx.textAlign = "center"; ctx.fillStyle = "#ffcf4a"; ctx.font = "900 46px " + FONT; ctx.fillText(D.config.shareCopy, W / 2, 1272);
    ctx.fillStyle = "#a9b0d6"; ctx.font = "500 22px " + FONT; ctx.fillText("非公式ファン診断 ｜ " + (location.host || "DRAGON BALL BUSINESS TYPE"), W / 2, 1312);
    return cv;
  }

  function toBlob(res) {
    var ready = (document.fonts && document.fonts.load)
      ? Promise.all([document.fonts.load('900 40px "Noto Sans JP"'), document.fonts.load('500 24px "Noto Sans JP"')]).catch(function () {})
      : Promise.resolve();
    return ready.then(function () {
      if (res.image) {
        return fetch(res.image).then(function (r) { return r.ok ? r.blob() : Promise.reject(); }).catch(function () { return canvasBlob(res); });
      }
      return canvasBlob(res);
    });
  }
  function canvasBlob(res) {
    return Promise.resolve().then(function () {
      var cv = draw(res);
      return new Promise(function (ok, ng) { cv.toBlob(function (b) { b ? ok(b) : ng(new Error("blob")); }, "image/png"); });
    });
  }

  D.share = { text: shareText, url: shareUrl, toBlob: toBlob, starStr: starStr };
})(typeof window !== "undefined" ? window : globalThis);
