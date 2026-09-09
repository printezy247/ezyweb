<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🚀 9 Products — Trading Intelligence Platform</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900;family=Space+Grotesk:wght@300;400;600;700&family=Inter:wght@300;400;500;display=swap');
  :root{
    --void:#030510;
    --surface:rgba(255,255,255,0.025);
    --glass:rgba(255,255,255,0.06);
    --text:#f0f4ff;
    --text-dim:#8fa3c5;
    --text-muted:#55607a;
    --accent:#ffd166;
    --gold:#f0b429;
    --cyan:#00f5ff;
    --rose:#ff4d8d;
    --violet:#a855f7;
    --green:#00ffa3;
    --shadow-soft:rgba(0,0,0,0.6);
  }
  *{margin:0;padding:0;box-sizing:border-box;scroll-behavior:smooth}
  html{scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.08) transparent}
  body{
    font-family:'Space Grotesk','Inter',system-ui,sans-serif;
    background:var(--void);
    color:var(--text);
    min-height:100vh;
    overflow-x:hidden;
    line-height:1.65;
    -webkit-font-smoothing:antialiased;
  }
  /* Background canvas with 3D-like perspective */
  .bg-canvas{
    position:fixed;inset:0;z-index:-2;
    background:
      radial-gradient(circle at 20% 15%,rgba(240,180,41,0.08) 0%,transparent 40%),
      radial-gradient(circle at 80% 70%,rgba(0,245,255,0.06) 0%,transparent 45%),
      radial-gradient(circle at 50% 110%,rgba(255,77,141,0.07) 0%,transparent 40%),
      linear-gradient(180deg,#030510 0%,#060b14 60%,#030510 100%);
  }
  /* Animated grid overlay */
  .grid-overlay{
    position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:0.25;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),
      linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);
    background-size:60px 60px;
    animation:gridDrift 30s linear infinite;
    transform:perspective(1000px) rotateX(60deg) scale(2);
    transform-origin:center top;
  }
  @keyframes gridDrift{from{transform:perspective(1000px) rotateX(60deg) scale(2) translateY(0)}to{transform:perspective(1000px) rotateX(60deg) scale(2) translateY(-60px)}}

  /* Hero */
  header{
    position:relative;overflow:hidden;
    padding:160px 24px 100px;text-align:center;
    min-height:90vh;display:flex;align-items:center;justify-content:center;
  }
  header .hero-inner{position:relative;z-index:5;max-width:1200px}
  /* Animated glow orbs */
  .glow-orb{
    position:absolute;border-radius:50%;filter:blur(120px);opacity:0.35;pointer-events:none;animation:orbFloat 25s ease-in-out infinite alternate;
  }
  @keyframes orbFloat{from{transform:translate(0,0) scale(1)}to{transform:translate(-30px,20px) scale(1.2)}}
  .orb-gold{width:500px;height:500px;background:var(--gold);top:-10%;left:-5%;animation-delay:0s;animation-duration:22s}
  .orb-cyan{width:400px;height:400px;background:var(--cyan);top:40%;right:-10%;animation-delay:-8s;animation-duration:28s;opacity:0.25}
  .orb-rose{width:350px;height:350px;background:var(--rose);top:70%;left:5%;animation-delay:-15s;animation-duration:24s;opacity:0.2}

  /* Hero text animations */
  h1{
    font-family:'Orbitron','Space Grotesk',system-ui;
    font-weight:900;font-size:clamp(3.2rem,10vw,8.5rem);
    letter-spacing:-0.06em;line-height:0.92;
    text-shadow:
      0 0 60px rgba(240,180,41,0.3),
      0 0 120px rgba(0,245,255,0.15),
      0 4px 30px rgba(0,0,0,0.6);
    animation:titleSlide 1.2s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes titleSlide{from{opacity:0;transform:translateY(60px) rotateX(15deg);filter:blur(8px)}to{opacity:1;transform:translateY(0) rotateX(0);filter:blur(0)}}
  .hero-subtitle{
    font-size:1.3rem;color:var(--text-dim);margin-top:28px;font-weight:300;letter-spacing:0.02em;
    animation:subtitleFade 1.4s ease 0.3s both;
  }
  @keyframes subtitleFade{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

  /* Animated badge row with 3D hover */
  .badge-row{
    display:flex;gap:14px;justify-content:center;margin-top:40px;flex-wrap:wrap;
    animation:badgeIn 0.8s ease 0.6s both;
  }
  @keyframes badgeIn{from{opacity:0;transform:translateY(30px) scale(0.9)}to{opacity:1;transform:translateY(0) scale(1)}}
  .badge{
    position:relative;display:inline-flex;align-items:center;gap:8px;
    padding:10px 22px;border-radius:999px;
    background:linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03));
    border:1px solid rgba(255,255,255,0.1);
    color:var(--text-dim);font-size:0.85rem;font-weight:600;letter-spacing:0.05em;
    backdrop-filter:blur(20px) saturate(1.3);-webkit-backdrop-filter:blur(20px) saturate(1.3);
    box-shadow:0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.08);
    transition:all .35s cubic-bezier(0.34,1.56,0.64,1);
    overflow:hidden;
  }
  .badge::before{
    content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent);
    animation:badgeShimmer 3s ease infinite;
  }
  @keyframes badgeShimmer{0%{left:-100%}50%{left:100%}100%{left:100%}}
  .badge:hover{border-color:rgba(240,180,41,0.5);transform:translateY(-4px) scale(1.05);color:var(--text);box-shadow:0 16px 48px rgba(240,180,41,0.15),inset 0 1px 0 rgba(255,255,255,0.15)}

  /* Section divider */
  .divider{
    display:flex;align-items:center;gap:20px;justify-content:center;margin:80px 0;
    color:rgba(255,255,255,0.15);font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;font-weight:700;
  }
  .divider::before,.divider::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)}

  /* Grid with 3D perspective cards */
  .content{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:0 24px}
  .grid{
    display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:28px;
    perspective:1200px;
  }
  .card{
    position:relative;background:var(--surface);border:1px solid rgba(255,255,255,0.06);
    border-radius:28px;padding:36px 32px;overflow:hidden;
    backdrop-filter:blur(24px) saturate(1.2);-webkit-backdrop-filter:blur(24px) saturate(1.2);
    transition:all .45s cubic-bezier(0.23,1,0.32,1);
    box-shadow:0 12px 40px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,255,255,0.05);
    transform-style:preserve-3d;
    will-change:transform;
  }
  .card:hover{
    border-color:rgba(240,180,41,0.35);
    transform:translateY(-10px) rotateX(2deg) rotateY(-1deg) scale(1.015);
    box-shadow:
      0 30px 80px rgba(0,0,0,0.5),
      0 0 0 1px rgba(240,180,41,0.2),
      0 0 60px rgba(240,180,41,0.1);
  }
  /* Top gradient bar */
  .card::before{
    content:'';position:absolute;top:0;left:0;right:0;height:4px;
    background:linear-gradient(90deg,var(--gold),var(--cyan),var(--rose),var(--violet),var(--gold));
    background-size:300% 300%;animation:barMove 6s ease infinite;
    opacity:0.85;
  }
  @keyframes barMove{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
  /* Inner glow on hover */
  .card .card-glow{
    position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .4s;
    background:radial-gradient(circle at 50% -20%,rgba(240,180,41,0.12),transparent 60%);
  }
  .card:hover .card-glow{opacity:1}
  /* 3D tilt effect via hover (JS not needed — pure CSS approximate via hover state) */
  .card h2{
    font-family:'Orbitron',system-ui;font-size:1.35rem;margin-bottom:6px;color:var(--text);
    letter-spacing:-0.02em;position:relative;z-index:2;
  }
  .card .meta{
    font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:18px;font-weight:700;position:relative;z-index:2;
  }
  .card p{color:var(--text-dim);font-size:0.95rem;line-height:1.7;margin-bottom:14px;position:relative;z-index:2}
  .card .tag{
    display:inline-block;padding:5px 12px;border-radius:8px;background:rgba(255,255,255,0.04);color:var(--gold);
    font-size:0.72rem;font-weight:800;margin-right:6px;margin-bottom:6px;letter-spacing:0.06em;text-transform:uppercase;
    border:1px solid rgba(240,180,41,0.15);transition:all .2s;
  }
  .card .tag:hover{background:rgba(240,180,41,0.15);border-color:rgba(240,180,41,0.4);transform:scale(1.05)}
  /* Number badge */
  .num-badge{
    position:absolute;top:-12px;right:-12px;width:80px;height:80px;
    background:linear-gradient(135deg,rgba(240,180,41,0.15),rgba(0,245,255,0.1));
    border:1px solid rgba(255,255,255,0.08);border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-family:'Orbitron';font-weight:900;font-size:2rem;color:rgba(255,255,255,0.08);
    pointer-events:none;z-index:1;
  }

  /* Interactive elements */
  .interactive-row{
    display:flex;gap:16px;justify-content:center;margin-top:60px;flex-wrap:wrap;
  }
  .interactive-btn{
    position:relative;padding:14px 28px;border-radius:16px;
    background:linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02));
    border:1px solid rgba(255,255,255,0.1);color:var(--text);font-weight:700;font-size:0.95rem;
    cursor:pointer;transition:all .3s ease;overflow:hidden;backdrop-filter:blur(12px);
    box-shadow:0 8px 32px rgba(0,0,0,0.3);
  }
  .interactive-btn:hover{
    border-color:rgba(240,180,41,0.5);transform:translateY(-4px);
    box-shadow:0 16px 48px rgba(240,180,41,0.2),0 0 0 1px rgba(240,180,41,0.15);
  }
  .interactive-btn .btn-icon{font-size:1.2rem;margin-right:8px}

  /* Animated code snippet */
  .code-block{
    background:#060b14;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:20px 24px;
    font-family:'Space Mono',monospace;font-size:0.82rem;color:#a8b5d0;overflow-x:auto;
    box-shadow:inset 0 2px 20px rgba(0,0,0,0.4);
    margin-top:60px;position:relative;
  }
  .code-block::before{
    content:'● ● ●';position:absolute;top:12px;right:16px;color:rgba(255,255,255,0.2);font-size:0.7rem;letter-spacing:4px;
  }
  .code-keyword{color:var(--cyan);font-weight:700}
  .code-string{color:var(--gold)}
  .code-func{color:var(--rose)}

  /* Footer 3D */
  footer{
    margin-top:160px;padding:100px 24px 60px;text-align:center;
    position:relative;overflow:hidden;
    background:linear-gradient(180deg,transparent 0%,rgba(6,11,20,0.95) 60%,rgba(3,5,16,1));
  }
  footer::before{
    content:'';position:absolute;top:0;left:0;right:0;height:1px;
    background:linear-gradient(90deg,transparent,rgba(240,180,41,0.3),var(--cyan),var(--rose),transparent);
  }
  .logo-text{
    font-family:'Orbitron',system-ui;font-weight:900;font-size:clamp(2rem,6vw,4rem);
    letter-spacing:-0.05em;line-height:1;
    background:linear-gradient(135deg,var(--gold),var(--cyan),var(--rose),var(--violet),var(--gold));
    background-size:400% 400%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    animation:logoShine 10s ease infinite;
  }
  @keyframes logoShine{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}

  /* Responsive */
  @media(max-width:700px){.grid{grid-template-columns:1fr}.card{padding:28px 22px}header{padding:100px 20px 70px}}
</style>
</head>
<body>
<div class="bg-canvas"></div><div class="grid-overlay"></div>

<header>
  <div class="glow-orb orb-gold"></div>
  <div class="glow-orb orb-cyan"></div>
  <div class="glow-orb orb-rose"></div>
  <div style="position:relative;z-index:5">
    <h1>🚀 9 Buildable Products</h1>
    <p class="hero-subtitle">Trading Intelligence · Gold · Prop Firms · Crypto Security · Fintech Bots</p>

    <div class="badge-row">
      <span class="badge">⚡ Telegram Bot</span>
      <span class="badge">🌐 Flask Web</span>
      <span class="badge">📊 Data Analytics</span>
      <span class="badge">💰 Monetization</span>
      <span class="badge">🔒 Security</span>
      <span class="badge">🧠 NLP Scanning</span>
      <span class="badge">📈 Expected Value</span>
    </div>

    <div style="margin-top:48px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="#products" class="interactive-btn"><span class="btn-icon">📖</span> Explore Products</a>
      <a href="#code" class="interactive-btn"><span class="btn-icon">⚡</span> View Source</a>
      <a href="#deploy" class="interactive-btn"><span class="btn-icon">🚀</span> Deploy Now</a>
    </div>
  </div>
</header>

<main class="content">
  <div class="divider">📊 PRODUCT ECOSYSTEM</div>

  <section id="products" class="grid">

    <article class="card">
      <div class="card-glow"></div>
      <div class="num-badge">01</div>
      <div class="meta">#1 · Gold · Free Tier Extension</div>
      <h2>Gold Watch Alert Bot ⚡</h2>
      <span class="tag">Bot</span><span class="tag">Free Tier</span><span class="tag">XAUUSD</span>
      <p><b>Problem:</b> Traders miss gold entries due to spread/slippage. Most Telegram gold channels are scams.</p>
      <p><b>Solution:</b> <code>/watch XAUUSD style mode</code> made <b>free</b> in EzyAi (previously PRO-only). Uses Binance PAXGUSDT + Yahoo GC=F fallback with existing spread-aware stop logic.</p>
      <p><b>Monetize:</b> Free <code>/watch</code> for gold only → upsell <code>/autopilot</code> + fundamentals (DCF / COT positioning) as PRO.</p>
    </article>

    <article class="card">
      <div class="card-glow"></div>
      <div class="num-badge">02</div>
      <div class="meta">#2 · Gold · Verification</div>
      <h2>XAUUSD Signal Verifier 🔍</h2>
      <span class="tag">Bot</span><span class="tag">Anti-Scam</span>
      <p><b>Problem:</b> Gold Telegram providers post fake MT4 screenshots with cherry-picked entries.</p>
      <p><b>Solution:</b> <code>/verify GOLD PRICE</code> pulls Binance PAXGUSDT tick history and compares claimed entry. Returns <b>VERDICT: REAL / IMPOSSIBLE</b> with gap % and explanation.</p>
      <p><b>Monetize:</b> Free single verify → PRO batch CSV upload + weekly audit reports for VIP groups.</p>
    </article>

    <article class="card">
      <div class="card-glow"></div>
      <div class="num-badge">03</div>
      <div class="meta">#3 · Prop Firms · ROI Calculator</div>
      <h2>Prop Firm Challenge Calculator 📊</h2>
      <span class="tag">Web</span><span class="tag">Bot</span><span class="tag">EV</span>
      <p><b>Problem:</b> Traders pay $500–$5,000 challenge fees without knowing expected value (~90% fail rate). Hidden rules (overnight, news bans) buried in T&Cs.</p>
      <p><b>Solution:</b> Flask calculator + bot command <code>/propcalc FEE SIZE PASS%</code>. Calculates EV, scans pasted T&Cs for hidden rules with red/yellow scoring.</p>
      <p><b>Monetize:</b> Free calculator → premium PDF audit + automated monthly forecast.</p>
    </article>

    <article class="card">
      <div class="card-glow"></div>
      <div class="num-badge">04</div>
      <div class="meta">#4 · Crypto · Security</div>
      <h2>Bot Scam Detector 🛡️</h2>
      <span class="tag">Bot</span><span class="tag">Anti-Malware</span>
      <p><b>Problem:</b> Fake verification bots, malware links, and fake airdrops surged <b>2,000%</b> (OKX Learn 2025). Deepfake video calls and influencer impersonation drive losses.</p>
      <p><b>Solution:</b> <code>/audit @bot_username</code> checks private-key requests, unregulated broker pushes, missing audit links. Returns <b>SCAM SCORE</b> + checklist.</p>
      <p><b>Monetize:</b> Free scan → PRO daily auto-scan of subscribed channels + malware link database.</p>
    </article>

    <article class="card">
      <div class="card-glow"></div>
      <div class="num-badge">05</div>
      <div class="meta">#5 · Gold · Seasonality</div>
      <h2>Gold Seasonality Calendar 📅</h2>
      <span class="tag">Web</span><span class="tag">Bot Alert</span>
      <p><b>Problem:</b> Traders ignore gold seasonality (Fed windows, CME holidays, jewelry cycles) and spread-widening events.</p>
      <p><b>Solution:</b> Web calendar (<code>/gold-calendar</code>) shows monthly XAUUSD volatility patterns + Fed release windows. Downloadable PDF. Bot pushes <code>/calendar_alert</code> 30 min before events.</p>
      <p><b>Monetize:</b> Free calendar → PRO real-time alert bot.</p>
    </article>

    <article class="card">
      <div class="card-glow"></div>
      <div class="num-badge">06</div>
      <div class="meta">#6 · Copy-Trade · Audit</div>
      <h2>Copy-Trade Safety Audit 💼</h2>
      <span class="tag">Bot</span><span class="tag">Fintech</span>
      <p><b>Problem:</b> Influencers push unregulated broker copy-trading; users lose capital through hidden spreads, slippage, and account blowouts.</p>
      <p><b>Solution:</b> <code>/copyaudit BROKER</code> checks regulation (SEC/FCA/ASIC links), negative balance protection, calculates hidden spread cost. Returns <b>SAFE / HIGH RISK</b> + checklist.</p>
      <p><b>Monetize:</b> Free 5 audits → PRO unlimited + weekly portfolio risk report.</p>
    </article>

    <article class="card">
      <div class="card-glow"></div>
      <div class="num-badge">07</div>
      <div class="meta">#7 · Forex · NLP Scanner</div>
      <h2>Forex Signal Red-Flag Scanner 🔍</h2>
      <span class="tag">Web</span><span class="tag">NLP</span>
      <p><b>Problem:</b> Signal providers claim "100% accuracy", delete losing trades, flood fake reviews, and trap subscribers ($30–$300/mo).</p>
      <p><b>Solution:</b> Web scanner + bot <code>/scan TEXT</code>. NLP flags: "guaranteed", "no risk", "VIP spots left". Checks verified audit links (MyFXBook / FX Blue).</p>
      <p><b>Monetize:</b> Free text scan → PRO full Telegram group auto-scan + weekly provider scorecard.</p>
    </article>

    <article class="card">
      <div class="card-glow"></div>
      <div class="num-badge">08</div>
      <div class="meta">#8 · IBKR · Affiliate</div>
      <h2>IB Affiliate Revenue Calculator 💼</h2>
      <span class="tag">Web</span><span class="tag">B2B</span>
      <p><b>Problem:</b> IB affiliates face opaque payout rules, compliance overhead, and referred clients complain of buggy platforms / slow withdrawals (BBB ~1.2/5).</p>
      <p><b>Solution:</b> Web calculator (<code>/ib-calc</code>) estimates net revenue after compliance cost + payout timeline. Includes compliance checklist download.</p>
      <p><b>Monetize:</b> Free calculator → PRO automated monthly forecast + affiliate audit template.</p>
    </article>

    <article class="card">
      <div class="card-glow"></div>
      <div class="num-badge">09</div>
      <div class="meta">#9 · Influencer · Audit</div>
      <h2>Influencer Scam Audit 🛡️</h2>
      <span class="tag">Bot</span><span class="tag">Viral</span>
      <p><b>Problem:</b> FTC reports <b>$2.1B</b> lost to social-media scams in 2025; ~80% of TikTok financial advice is misleading (Forbes May 2025).</p>
      <p><b>Solution:</b> <code>/audit @influencer_handle</code> audits profile: demands audited trading history (not screenshots), flags luxury props, checks unregulated broker promotions. Free <b>LOSS REPORT TEMPLATE</b> for FTC/CFTC/IC3.</p>
      <p><b>Monetize:</b> Free audit + template → PRO batch audit + automated scam-alert channel.</p>
    </article>

  </section>

  <div class="divider">💻 SOURCE & DEPLOY</div>

  <section id="code" style="margin-top:40px">
    <div class="code-block">
      <pre>
<span class="code-keyword">from</span> <span class="code-string">EzyAi.app.prop_firm</span> <span class="code-keyword">import</span> calculate_ev, scan_hidden_rules, format_report

<span class="code-keyword">def</span> <span class="code-func">main</span>():
    ev, data = calculate_ev(<span class="code-string">fee=500</span>, <span class="code-string">account_size=50000</span>, <span class="code-string">pass_rate=10</span>)
    rules = scan_hidden_rules(<span class="code-string">"Overnight holds are prohibited. News trading is banned..."</span>)
    print(format_report(data, rules))

<span class="code-keyword">if</span> __name__ == <span class="code-string">"__main__"</span>:
    main()
      </pre>
    </div>
  </section>

  <section id="deploy" style="margin-top:80px;text-align:center">
    <h2 style="font-family:'Orbitron';font-size:2rem;background:linear-gradient(var(--gold),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent">🚀 Deploy in 60 Seconds</h2>
    <p style="color:var(--text-dim);margin:16px 0 28px">One command. Zero config. Live on Fly.io.</p>
    <div class="interactive-row">
      <a href="#" class="interactive-btn" onclick="alert('Run: fly deploy --remote-only --yes')"><span class="btn-icon">⚡</span> Fly Deploy</a>
      <a href="#" class="interactive-btn" onclick="alert('Run: python -m flask --app prop_web run')"><span class="btn-icon">🌐</span> Local Web</a>
      <a href="#" class="interactive-btn" onclick="alert('Run: bash scripts/auto-commit.sh')"><span class="btn-icon">🔄</span> Auto Commit</a>
    </div>
  </section>

</main>

<footer>
  <div style="position:relative;z-index:2;padding-top:40px">
    <div class="logo-text">printezy · sambangold-products</div>
    <p style="color:var(--text-muted);margin-top:12px;font-size:0.9rem">Built with Python · Flask · Telegram Bot API · Binance · Yahoo Finance · Stripe · Fly.io · Modern SVG · Interactive CSS</p>
    <p style="margin-top:8px;color:rgba(255,255,255,0.25);font-size:0.75rem">Educational research only. Not financial advice. Verify every price with your broker before acting.</p>
    <div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="#" style="color:var(--text-dim);text-decoration:none;font-size:0.85rem;padding:8px 18px;border-radius:999px;border:1px solid rgba(255,255,255,0.08);transition:all .2s;display:inline-block;background:rgba(255,255,255,0.03);" onmouseover="this.style.borderColor='rgba(240,180,41,0.4)';this.style.transform='translateY(-2px)';this.style.color='#f0b429'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)';this.style.transform='translateY(0)';this.style.color='var(--text-dim)'">📚 Docs</a>
      <a href="#" style="color:var(--text-dim);text-decoration:none;font-size:0.85rem;padding:8px 18px;border-radius:999px;border:1px solid rgba(255,255,255,0.08);transition:all .2s;display:inline-block;background:rgba(255,255,255,0.03);" onmouseover="this.style.borderColor='rgba(0,245,255,0.4)';this.style.transform='translateY(-2px)';this.style.color='#00f5ff'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)';this.style.transform='translateY(0)';this.style.color='var(--text-dim)'">⚡ Deploy</a>
      <a href="#" style="color:var(--text-dim);text-decoration:none;font-size:0.85rem;padding:8px 18px;border-radius:999px;border:1px solid rgba(255,255,255,0.08);transition:all .2s;display:inline-block;background:rgba(255,255,255,0.03);" onmouseover="this.style.borderColor='rgba(255,77,141,0.4)';this.style.transform='translateY(-2px)';this.style.color='#ff4d8d'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)';this.style.transform='translateY(0)';this.style.color='var(--text-dim)'">🔒 Security</a>
    </div>
  </div>
</footer>
</body>
</html>

---

## ✅ 9-Product Build Checklist

> Master tracker — update on every build/launch. Full research: `../RESEARCH_TRADING_9_PRODUCTS.md`
> Rules: Telegram bots or websites · free live data only · **no paid subscriptions** (monetize via affiliate CPA, Telegram Stars tips, ads).

### 🥇 Priority build (Top 3 — gold/XAUUSD focus)

- [ ] **#1 — GoldPulse** 🟡 `apps/goldpulse/` — XAUUSD live price, `/alert` price alerts, `/chart` sparkline, `/session` spread-risk, Stars tips — **🚧 IN PROGRESS**
- [ ] **#2 — GoldSignalCheck** 🔍 `apps/goldsignalcheck/` — `/verify ENTRY SL TP` vs real PAXG ticks → verdict card `REAL / IMPOSSIBLE`
- [ ] **#3 — GoldEventRadar** 📅 `apps/goldeventradar/` — FOMC/CPI/NFP live countdowns + GC=F seasonality chart + spread-widening warnings (web + bot alerts)

### 📦 Backlog (build after Top 3)

- [ ] **#4 — PropCalc** 📊 — prop-firm challenge EV calculator + hidden-rule T&C scanner (web)
- [ ] **#5 — ScamBotCheck** 🛡️ — `/audit @bot` Telegram scam-pattern auditor (bot)
- [ ] **#6 — CopyAudit** 💼 — broker regulation & copy-trade safety checker (bot + web directory)
- [ ] **#7 — RedFlagScanner** 🔎 — NLP red-flag scanner for signal ads (web, SEO play)
- [ ] **#8 — IBCalc** 💰 — affiliate/IB net-revenue calculator (web, B2B)
- [ ] **#9 — InfluencerAudit** 🕵️ — finfluencer credibility audit + FTC/CFTC/IC3 loss-report template (bot)

### 🚀 Launch gate (per product — check before marking done)

- [ ] Runs on free tier (no paid API keys)
- [ ] Affiliate link wired via env (`*_AFFILIATE_URL`)
- [ ] Stars tip jar wired (Telegram bots)
- [ ] Cross-links to the other live products
- [ ] Not-financial-advice disclaimer
- [ ] Deployed + smoke-tested live
