const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MJResearch — Stock Trends & Midjourney Prompts</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--bg:#0a0a0f;--surface:#13131a;--surface2:#1c1c28;--border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.13);--text:#f0eeff;--muted:#8a8899;--muted2:#4a4960;--mono:"DM Mono",monospace;--display:"Syne",sans-serif;--c1:#ff6b6b;--c2:#ffd93d;--c3:#6bcb77;--c4:#4d96ff;--c5:#ff6bce;--c6:#ff9f43;--c7:#48dbfb;--c8:#a29bfe;}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:var(--bg);color:var(--text);font-family:var(--display);min-height:100vh;display:flex;flex-direction:column;}
.rainbow-bar{height:4px;background:linear-gradient(90deg,var(--c1),var(--c2),var(--c3),var(--c4),var(--c5),var(--c6),var(--c7),var(--c8),var(--c1));background-size:200% 100%;animation:rainbow 4s linear infinite;}
@keyframes rainbow{to{background-position:200% 0;}}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
header{display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;border-bottom:1px solid var(--border);background:rgba(10,10,15,0.95);backdrop-filter:blur(10px);position:sticky;top:0;z-index:100;}
.logo{display:flex;align-items:center;gap:12px;}
.logo-icon{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--c4),var(--c5));display:flex;align-items:center;justify-content:center;}
.logo-icon svg{width:18px;height:18px;}
.logo-text{font-size:1.15rem;font-weight:800;letter-spacing:-0.03em;background:linear-gradient(90deg,var(--c4),var(--c5),var(--c1));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.header-badge{font-family:var(--mono);font-size:0.62rem;background:rgba(255,255,255,0.05);color:var(--muted);border:1px solid var(--border2);padding:3px 10px;border-radius:20px;}
.tab-nav{display:flex;padding:0 2rem;border-bottom:1px solid var(--border);background:var(--surface);}
.tab-btn{padding:0.85rem 1.5rem;font-family:var(--display);font-size:0.82rem;font-weight:600;border:none;background:transparent;color:var(--muted);cursor:pointer;border-bottom:2px solid transparent;transition:all 0.2s;}
.tab-btn:hover{color:var(--text);}
.tab-btn.active{color:var(--text);border-bottom-color:var(--c4);}
.page{display:none;flex:1;flex-direction:column;}
.page.active{display:flex;}
.research-layout{display:grid;grid-template-columns:300px 1fr;flex:1;min-height:0;}
.sidebar{padding:1.5rem;border-right:1px solid var(--border);background:var(--surface);display:flex;flex-direction:column;gap:1rem;overflow-y:auto;}
.sidebar-title{font-family:var(--mono);font-size:0.65rem;color:var(--muted);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:0.25rem;}
.category-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.cat-btn{padding:0.65rem 0.5rem;border-radius:10px;border:1.5px solid var(--border2);background:var(--surface2);color:var(--text);font-family:var(--display);font-size:0.75rem;font-weight:600;cursor:pointer;transition:all 0.2s;text-align:center;display:flex;flex-direction:column;align-items:center;gap:5px;}
.cat-btn:hover{border-color:rgba(255,255,255,0.25);transform:translateY(-1px);}
.cat-btn.active{border-color:transparent;color:#000;font-weight:700;}
.cat-icon{font-size:1.3rem;}
.action-btn{width:100%;padding:0.85rem;border-radius:10px;border:none;font-family:var(--display);font-size:0.88rem;font-weight:700;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;color:white;}
.action-btn:hover:not(:disabled){opacity:0.9;transform:translateY(-1px);}
.action-btn:disabled{opacity:0.4;cursor:not-allowed;transform:none;}
.spin{width:14px;height:14px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;flex-shrink:0;}
.results-area{padding:1.5rem 2rem;overflow-y:auto;flex:1;}
.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:1rem;color:var(--muted2);text-align:center;padding:3rem;}
.empty-icon{font-size:4rem;opacity:0.3;}
.empty-state p{font-family:var(--mono);font-size:0.75rem;line-height:1.8;}
.insights-box{background:var(--surface);border:1px solid var(--border2);border-radius:12px;padding:1rem 1.25rem;margin-bottom:1.25rem;font-size:0.83rem;line-height:1.65;animation:fadeIn 0.4s ease;}
.insights-label{font-family:var(--mono);font-size:0.62rem;color:var(--c4);letter-spacing:0.1em;margin-bottom:0.4rem;}
.avoid-box{background:rgba(255,107,107,0.06);border:1px solid rgba(255,107,107,0.2);border-radius:12px;padding:1rem 1.25rem;margin-bottom:1.25rem;animation:fadeIn 0.4s ease 0.1s both;}
.avoid-label{font-family:var(--mono);font-size:0.62rem;color:var(--c1);letter-spacing:0.1em;margin-bottom:0.5rem;}
.avoid-tags{display:flex;flex-wrap:wrap;gap:6px;}
.avoid-tag{font-family:var(--mono);font-size:0.68rem;background:rgba(255,107,107,0.1);color:var(--c1);border:1px solid rgba(255,107,107,0.2);border-radius:5px;padding:2px 8px;}
.trending-grid{display:flex;flex-direction:column;gap:10px;}
.trend-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1rem 1.25rem;transition:all 0.2s;animation:fadeIn 0.4s ease both;display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;}
.trend-card:hover{border-color:var(--border2);transform:translateY(-1px);}
.trend-card:hover .use-btn{opacity:1;}
.trend-left{flex:1;min-width:0;}
.trend-subject{font-size:0.88rem;font-weight:600;margin-bottom:0.3rem;}
.trend-why{font-size:0.75rem;color:var(--muted);line-height:1.5;margin-bottom:0.5rem;}
.trend-tags{display:flex;flex-wrap:wrap;gap:5px;}
.trend-tag{font-family:var(--mono);font-size:0.62rem;padding:2px 7px;border-radius:4px;}
.demand-badge{font-family:var(--mono);font-size:0.6rem;padding:3px 8px;border-radius:20px;white-space:nowrap;flex-shrink:0;margin-top:2px;}
.demand-high{background:rgba(107,203,119,0.15);color:var(--c3);border:1px solid rgba(107,203,119,0.3);}
.demand-medium{background:rgba(255,217,61,0.15);color:var(--c2);border:1px solid rgba(255,217,61,0.3);}
.demand-rising{background:rgba(77,150,255,0.15);color:var(--c4);border:1px solid rgba(77,150,255,0.3);}
.use-btn{opacity:0;transition:opacity 0.2s;font-family:var(--mono);font-size:0.68rem;padding:5px 12px;border-radius:7px;border:1px solid var(--c4);background:rgba(77,150,255,0.1);color:var(--c4);cursor:pointer;white-space:nowrap;flex-shrink:0;}
.use-btn:hover{background:rgba(77,150,255,0.2);}
.prompt-layout{display:grid;grid-template-columns:360px 1fr;flex:1;min-height:0;}
.prompt-sidebar{padding:1.5rem;border-right:1px solid var(--border);background:var(--surface);overflow-y:auto;display:flex;flex-direction:column;gap:1rem;}
.section-label{font-family:var(--mono);font-size:0.63rem;color:var(--muted);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:0.3rem;display:flex;align-items:center;gap:6px;}
.topic-input{width:100%;background:var(--surface2);border:1.5px solid var(--border2);border-radius:9px;color:var(--text);font-family:var(--display);font-size:0.85rem;padding:0.65rem 0.85rem;outline:none;transition:border-color 0.2s;resize:vertical;min-height:72px;}
.topic-input:focus{border-color:var(--c4);}
.param-group{display:flex;flex-direction:column;gap:0.6rem;}
.param-row{display:flex;align-items:center;gap:8px;}
.param-label{font-family:var(--mono);font-size:0.68rem;color:var(--muted);min-width:65px;display:flex;align-items:center;gap:5px;flex-shrink:0;}
.info-wrap{position:relative;display:inline-flex;}
.info-icon{width:14px;height:14px;border-radius:50%;background:var(--surface2);border:1px solid var(--border2);color:var(--muted);font-size:0.55rem;display:inline-flex;align-items:center;justify-content:center;cursor:help;font-family:var(--mono);}
.tooltip{display:none;position:absolute;left:18px;top:-4px;z-index:200;background:#1e1e2e;border:1px solid var(--border2);border-radius:8px;padding:8px 12px;width:220px;font-size:0.68rem;font-family:var(--mono);color:var(--text);line-height:1.5;pointer-events:none;box-shadow:0 8px 24px rgba(0,0,0,0.5);}
.info-wrap:hover .tooltip{display:block;}
.param-select{flex:1;background:var(--surface2);border:1px solid var(--border2);border-radius:7px;color:var(--text);font-family:var(--mono);font-size:0.73rem;padding:0.35rem 0.65rem;outline:none;appearance:none;cursor:pointer;transition:border-color 0.2s;}
.param-select:focus{border-color:var(--c4);}
.param-input{flex:1;background:var(--surface2);border:1px solid var(--border2);border-radius:7px;color:var(--text);font-family:var(--mono);font-size:0.73rem;padding:0.35rem 0.65rem;outline:none;transition:border-color 0.2s;}
.param-input:focus{border-color:var(--c4);}
.param-input::placeholder{color:var(--muted2);}
.color-strip{height:3px;border-radius:2px;margin:0.1rem 0;}
.prompt-output{padding:1.5rem 2rem;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:1.25rem;}
.prompt-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden;animation:fadeIn 0.4s ease;}
.prompt-card-header{padding:0.75rem 1.25rem;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);}
.prompt-card-label{font-family:var(--mono);font-size:0.63rem;letter-spacing:0.1em;color:var(--muted);}
.copy-btn{font-family:var(--mono);font-size:0.68rem;padding:4px 12px;border-radius:6px;border:1px solid var(--border2);background:transparent;color:var(--muted);cursor:pointer;transition:all 0.15s;display:flex;align-items:center;gap:5px;}
.copy-btn:hover{border-color:var(--c3);color:var(--c3);}
.copy-btn.copied{border-color:var(--c3);color:var(--c3);}
.prompt-text{padding:1rem 1.25rem;font-family:var(--mono);font-size:0.78rem;line-height:1.7;color:var(--text);word-break:break-word;}
.prompt-params{color:var(--c4);}
.variations-section{display:flex;flex-direction:column;gap:8px;}
.var-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:0.85rem 1.1rem;display:flex;align-items:flex-start;gap:10px;}
.var-num{font-family:var(--mono);font-size:0.6rem;color:var(--muted2);padding-top:2px;min-width:20px;}
.var-text{font-family:var(--mono);font-size:0.75rem;line-height:1.65;color:var(--text);flex:1;word-break:break-word;}
.var-copy{background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:5px;padding:3px 8px;font-family:var(--mono);font-size:0.63rem;cursor:pointer;transition:all 0.15s;white-space:nowrap;}
.var-copy:hover{border-color:var(--c4);color:var(--c4);}
.tips-card{background:rgba(77,150,255,0.06);border:1px solid rgba(77,150,255,0.2);border-radius:10px;padding:0.85rem 1.1rem;font-family:var(--mono);font-size:0.75rem;line-height:1.65;color:var(--text);display:flex;gap:10px;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:4px;}
@media(max-width:780px){.research-layout,.prompt-layout{grid-template-columns:1fr;}.sidebar,.prompt-sidebar{border-right:none;border-bottom:1px solid var(--border);}}
</style>
</head>
<body>
<div class="rainbow-bar"></div>
<header>
  <div class="logo">
    <div class="logo-icon"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
    <div class="logo-text">MJResearch</div>
  </div>
  <div class="header-badge">STOCK TRENDS + MJ PROMPTS</div>
</header>
<div class="tab-nav">
  <button class="tab-btn active" onclick="switchTab('research')">🔍 Market Research</button>
  <button class="tab-btn" onclick="switchTab('prompt')">✨ Prompt Generator</button>
</div>
<div class="page active" id="page-research">
  <div class="research-layout">
    <div class="sidebar">
      <div>
        <div class="sidebar-title">Category</div>
        <div class="category-grid">
          <button class="cat-btn active" data-cat="People & Lifestyle" onclick="selectCat(this)"><span class="cat-icon">👥</span>People</button>
          <button class="cat-btn" data-cat="Nature & Landscapes" onclick="selectCat(this)"><span class="cat-icon">🌿</span>Nature</button>
          <button class="cat-btn" data-cat="Business & Technology" onclick="selectCat(this)"><span class="cat-icon">💼</span>Business</button>
          <button class="cat-btn" data-cat="Food & Drink" onclick="selectCat(this)"><span class="cat-icon">🍜</span>Food</button>
          <button class="cat-btn" data-cat="Architecture & Cities" onclick="selectCat(this)"><span class="cat-icon">🏙️</span>Cities</button>
          <button class="cat-btn" data-cat="Health & Wellness" onclick="selectCat(this)"><span class="cat-icon">🧘</span>Health</button>
          <button class="cat-btn" data-cat="Abstract & Backgrounds" onclick="selectCat(this)"><span class="cat-icon">🎨</span>Abstract</button>
          <button class="cat-btn" data-cat="Travel & Culture" onclick="selectCat(this)"><span class="cat-icon">✈️</span>Travel</button>
          <button class="cat-btn" data-cat="Animals & Wildlife" onclick="selectCat(this)"><span class="cat-icon">🐾</span>Animals</button>
          <button class="cat-btn" data-cat="Fashion & Beauty" onclick="selectCat(this)"><span class="cat-icon">👗</span>Fashion</button>
        </div>
      </div>
      <button class="action-btn" id="searchBtn" style="background:linear-gradient(135deg,var(--c4),var(--c5))" onclick="doResearch()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <span id="searchLabel">Search Trends</span>
      </button>
    </div>
    <div class="results-area" id="resultsArea">
      <div class="empty-state">
        <div class="empty-icon">📊</div>
        <p>Pick a category and click Search Trends.<br>Claude will analyze current market demand<br>and tell you what is selling right now.</p>
      </div>
    </div>
  </div>
</div>
<div class="page" id="page-prompt">
  <div class="prompt-layout">
    <div class="prompt-sidebar">
      <div>
        <div class="section-label">Subject / Topic</div>
        <textarea class="topic-input" id="topicInput" placeholder="e.g. Young woman working remotely from a cozy cafe in Krakow, warm autumn morning"></textarea>
      </div>
      <div class="color-strip" style="background:linear-gradient(90deg,var(--c4),var(--c5))"></div>
      <div class="param-group">
        <div class="section-label">Model</div>
        <div class="param-row">
          <span class="param-label">Version <span class="info-wrap"><span class="info-icon">i</span><span class="tooltip">v7: Default best photorealism. v6.1: Previous default still excellent. niji 7: Anime specialist. draft: 10x faster half cost great for quick testing.</span></span></span>
          <select class="param-select" id="p-version"><option value="7">v7 (default)</option><option value="6.1">v6.1 (previous)</option><option value="6">v6 (legacy)</option><option value="niji 7">niji 7 (anime)</option><option value="draft">draft (fast)</option></select>
        </div>
      </div>
      <div class="color-strip" style="background:linear-gradient(90deg,var(--c1),var(--c2))"></div>
      <div class="param-group">
        <div class="section-label">Composition</div>
        <div class="param-row">
          <span class="param-label">Aspect <span class="info-wrap"><span class="info-icon">i</span><span class="tooltip">--ar sets width to height ratio. 16:9=widescreen web. 1:1=square social. 4:5=Instagram portrait. 9:16=Stories Reels. 3:2=classic photo print.</span></span></span>
          <select class="param-select" id="p-ar"><option value="16:9">16:9 Widescreen</option><option value="1:1">1:1 Square</option><option value="4:5">4:5 Instagram</option><option value="9:16">9:16 Stories</option><option value="3:2">3:2 Classic photo</option><option value="2:3">2:3 Portrait</option><option value="21:9">21:9 Cinematic</option></select>
        </div>
      </div>
      <div class="color-strip" style="background:linear-gradient(90deg,var(--c3),var(--c7))"></div>
      <div class="param-group">
        <div class="section-label">Style</div>
        <div class="param-row">
          <span class="param-label">Style <span class="info-wrap"><span class="info-icon">i</span><span class="tooltip">--style raw means minimal AI interpretation more photorealistic stays closer to your prompt. Default adds Midjourney aesthetic enhancement automatically.</span></span></span>
          <select class="param-select" id="p-style"><option value="">Default</option><option value="raw">raw (photorealistic)</option></select>
        </div>
        <div class="param-row">
          <span class="param-label">Stylize <span class="info-wrap"><span class="info-icon">i</span><span class="tooltip">--s controls how artistic MJ gets. 0-100=photorealistic. 100-300=balanced. 300-1000=very artistic may drift from prompt. Default is 100.</span></span></span>
          <select class="param-select" id="p-stylize"><option value="100">100 (default)</option><option value="0">0 (literal)</option><option value="50">50 (subtle)</option><option value="250">250 (balanced)</option><option value="500">500 (artistic)</option><option value="750">750 (very artistic)</option><option value="1000">1000 (maximum)</option></select>
        </div>
      </div>
      <div class="color-strip" style="background:linear-gradient(90deg,var(--c5),var(--c8))"></div>
      <div class="param-group">
        <div class="section-label">Variation</div>
        <div class="param-row">
          <span class="param-label">Chaos <span class="info-wrap"><span class="info-icon">i</span><span class="tooltip">--chaos controls how different the 4 images are from each other. 0=very similar. 30=moderate variety. 100=very different. Good for exploring ideas.</span></span></span>
          <select class="param-select" id="p-chaos"><option value="0">0 (consistent)</option><option value="10">10 (slight)</option><option value="30" selected>30 (moderate)</option><option value="50">50 (varied)</option><option value="75">75 (very varied)</option><option value="100">100 (maximum)</option></select>
        </div>
        <div class="param-row">
          <span class="param-label">Weird <span class="info-wrap"><span class="info-icon">i</span><span class="tooltip">--weird adds quirky unconventional elements. 0=normal. 250=slightly unusual. 1000=very strange. Keep low for stock photography.</span></span></span>
          <select class="param-select" id="p-weird"><option value="0">0 (off)</option><option value="100">100 (subtle)</option><option value="250">250 (quirky)</option><option value="500">500 (strange)</option><option value="1000">1000 (very weird)</option></select>
        </div>
      </div>
      <div class="color-strip" style="background:linear-gradient(90deg,var(--c2),var(--c6))"></div>
      <div class="param-group">
        <div class="section-label">Quality</div>
        <div class="param-row">
          <span class="param-label">Quality <span class="info-wrap"><span class="info-icon">i</span><span class="tooltip">--q controls rendering detail. 0.5=faster less detail good for testing. 1=default balance. 2=extra refinement uses more credits. Does NOT change resolution.</span></span></span>
          <select class="param-select" id="p-quality"><option value="0.5">0.5 (fast)</option><option value="1" selected>1 (default)</option><option value="2">2 (high detail)</option></select>
        </div>
        <div class="param-row">
          <span class="param-label">Stop <span class="info-wrap"><span class="info-icon">i</span><span class="tooltip">--stop interrupts generation early. 100=fully rendered. 80=slightly soft. 50=sketch-like. Useful for dreamy effects not stock photography.</span></span></span>
          <select class="param-select" id="p-stop"><option value="100">100 (complete)</option><option value="90">90 (slightly soft)</option><option value="80">80 (soft)</option><option value="50">50 (sketch)</option></select>
        </div>
      </div>
      <div class="color-strip" style="background:linear-gradient(90deg,var(--c7),var(--c3))"></div>
      <div class="param-group">
        <div class="section-label">Advanced</div>
        <div class="param-row">
          <span class="param-label">Seed <span class="info-wrap"><span class="info-icon">i</span><span class="tooltip">--seed makes results reproducible. Same seed plus same prompt equals very similar image. Great for consistency across a series. Leave blank for random.</span></span></span>
          <input class="param-input" id="p-seed" type="number" placeholder="blank = random" min="0" max="4294967295">
        </div>
        <div class="param-row">
          <span class="param-label">Exclude <span class="info-wrap"><span class="info-icon">i</span><span class="tooltip">--no tells MJ what to avoid. Examples: text,watermark or blurry,people. Separate with commas. Very useful for clean stock photography.</span></span></span>
          <input class="param-input" id="p-no" type="text" placeholder="e.g. text, watermark">
        </div>
        <div class="param-row">
          <span class="param-label">Tile <span class="info-wrap"><span class="info-icon">i</span><span class="tooltip">--tile creates seamless repeating patterns. Perfect for fabric wallpaper texture backgrounds. Edges connect perfectly when tiled.</span></span></span>
          <select class="param-select" id="p-tile"><option value="false">Off</option><option value="true">On (seamless)</option></select>
        </div>
      </div>
      <button class="action-btn" id="genBtn" style="background:linear-gradient(135deg,var(--c5),var(--c1))" onclick="generatePrompt()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <span id="genLabel">Generate Prompt</span>
      </button>
    </div>
    <div class="prompt-output" id="promptOutput">
      <div class="empty-state">
        <div class="empty-icon">✨</div>
        <p>Enter a subject and click Generate Prompt.<br>You will get a ready-to-copy Midjourney prompt<br>with all your chosen parameters built in.</p>
      </div>
    </div>
  </div>
</div>
<script>
let selectedCategory="People & Lifestyle";
const catColors={"People & Lifestyle":["#4d96ff","#a29bfe"],"Nature & Landscapes":["#6bcb77","#48dbfb"],"Business & Technology":["#ffd93d","#ff6b6b"],"Food & Drink":["#ff9f43","#ff6bce"],"Architecture & Cities":["#a29bfe","#48dbfb"],"Health & Wellness":["#6bcb77","#ffd93d"],"Abstract & Backgrounds":["#ff6bce","#a29bfe"],"Travel & Culture":["#48dbfb","#4d96ff"],"Animals & Wildlife":["#6bcb77","#ff9f43"],"Fashion & Beauty":["#ff6bce","#ff6b6b"]};
const tagColors=["#ff6b6b","#ffd93d","#6bcb77","#4d96ff","#ff6bce","#ff9f43","#48dbfb","#a29bfe"];
function switchTab(tab){document.querySelectorAll(".tab-btn").forEach((b,i)=>b.classList.toggle("active",(i===0&&tab==="research")||(i===1&&tab==="prompt")));document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));document.getElementById("page-"+tab).classList.add("active");}
function selectCat(btn){document.querySelectorAll(".cat-btn").forEach(b=>{b.classList.remove("active");b.style.background="";b.style.color="";});btn.classList.add("active");const cat=btn.dataset.cat;const cols=catColors[cat]||["#4d96ff","#a29bfe"];btn.style.background="linear-gradient(135deg,"+cols[0]+","+cols[1]+")";btn.style.color="#000";selectedCategory=cat;}
document.querySelector(".cat-btn.active").style.background="linear-gradient(135deg,#4d96ff,#a29bfe)";
document.querySelector(".cat-btn.active").style.color="#000";
async function doResearch(){const btn=document.getElementById("searchBtn");btn.disabled=true;btn.innerHTML='<div class="spin"></div><span>Searching...</span>';const area=document.getElementById("resultsArea");area.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:200px;gap:12px;color:var(--muted);font-family:var(--mono);font-size:0.78rem"><div class="spin" style="border-top-color:var(--c4)"></div>Analyzing market trends...</div>';try{const res=await fetch("/api/research",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({category:selectedCategory})});const text=await res.text();let data;try{data=JSON.parse(text);}catch{throw new Error("Server error");}if(data.error)throw new Error(data.error);renderResearch(data);}catch(e){area.innerHTML='<div style="padding:2rem;color:#f87171;font-family:var(--mono);font-size:0.78rem">Error: '+e.message+'</div>';}btn.disabled=false;btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><span>Search Trends</span>';}
function renderResearch(data){const area=document.getElementById("resultsArea");let html="";if(data.insights)html+='<div class="insights-box"><div class="insights-label">MARKET INSIGHT</div>'+data.insights+'</div>';if(data.avoid&&data.avoid.length)html+='<div class="avoid-box"><div class="avoid-label">OVERSATURATED - AVOID</div><div class="avoid-tags">'+data.avoid.map(a=>'<span class="avoid-tag">'+a+'</span>').join("")+'</div></div>';if(data.trending&&data.trending.length){html+='<div class="trending-grid">';data.trending.forEach((t,i)=>{const delay=i*0.05;const dem=(t.demand||"medium").toLowerCase();const tagsHtml=(t.tags||[]).map((tag,j)=>'<span class="trend-tag" style="background:'+tagColors[j%tagColors.length]+'22;color:'+tagColors[j%tagColors.length]+';border:1px solid '+tagColors[j%tagColors.length]+'44">'+tag+'</span>').join("");html+='<div class="trend-card" style="animation-delay:'+delay+'s"><div class="trend-left"><div class="trend-subject">'+t.subject+'</div><div class="trend-why">'+t.why+'</div><div class="trend-tags">'+tagsHtml+'</div></div><div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex-shrink:0"><span class="demand-badge demand-'+dem+'">'+t.demand+'</span><button class="use-btn" onclick="useInPrompt(\''+t.subject.replace(/'/g,"\\'").replace(/"/g,'&quot;')+'\')">Use in prompt</button></div></div>';});html+='</div>';}area.innerHTML=html;}
function useInPrompt(subject){document.getElementById("topicInput").value=subject;switchTab("prompt");}
async function generatePrompt(){const topic=document.getElementById("topicInput").value.trim();if(!topic){document.getElementById("topicInput").focus();return;}const btn=document.getElementById("genBtn");btn.disabled=true;btn.innerHTML='<div class="spin"></div><span>Generating...</span>';const parameters={version:document.getElementById("p-version").value,ar:document.getElementById("p-ar").value,style:document.getElementById("p-style").value,stylize:document.getElementById("p-stylize").value,chaos:document.getElementById("p-chaos").value,weird:document.getElementById("p-weird").value,quality:document.getElementById("p-quality").value,stop:document.getElementById("p-stop").value,seed:document.getElementById("p-seed").value,no:document.getElementById("p-no").value,tile:document.getElementById("p-tile").value};try{const res=await fetch("/api/prompt",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({topic,parameters})});const text=await res.text();let data;try{data=JSON.parse(text);}catch{throw new Error("Server error");}if(data.error)throw new Error(data.error);renderPrompt(data);}catch(e){document.getElementById("promptOutput").innerHTML='<div style="padding:2rem;color:#f87171;font-family:var(--mono);font-size:0.78rem">Error: '+e.message+'</div>';}btn.disabled=false;btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>Generate Prompt</span>';}
function renderPrompt(data){const out=document.getElementById("promptOutput");const hp=t=>t.replace(/(--[\w:]+(?:\s[\d:.]+)?)/g,'<span class="prompt-params">$1</span>');let html='<div class="prompt-card"><div class="prompt-card-header"><span class="prompt-card-label">MAIN PROMPT - COPY AND PASTE INTO DISCORD</span><button class="copy-btn" onclick="copyText(this,'+JSON.stringify(data.prompt)+')">Copy</button></div><div class="prompt-text">'+hp(data.prompt)+'</div></div>';if(data.variations&&data.variations.length){html+='<div><div class="section-label" style="margin-bottom:8px">VARIATIONS</div><div class="variations-section">';data.variations.forEach((v,i)=>{html+='<div class="var-card"><span class="var-num">V'+(i+1)+'</span><span class="var-text">'+hp(v)+'</span><button class="var-copy" onclick="copyText(this,'+JSON.stringify(v)+')">Copy</button></div>';});html+='</div></div>';}if(data.tips)html+='<div class="tips-card"><span style="color:var(--c4);flex-shrink:0;font-weight:600">TIP</span><span>'+data.tips+'</span></div>';out.innerHTML=html;}
function copyText(btn,text){navigator.clipboard.writeText(text).then(()=>{const prev=btn.innerHTML;btn.classList.add("copied");btn.innerHTML="Copied!";setTimeout(()=>{btn.classList.remove("copied");btn.innerHTML=prev;},1800);});}
</script>
</body>
</html>`;

async function handleResearch(request, env) {
  const corsHeaders = {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Methods":"POST, OPTIONS"};
  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) return new Response(JSON.stringify({error:"ANTHROPIC_API_KEY not configured."}),{status:500,headers:{...corsHeaders,"Content-Type":"application/json"}});
  let payload;
  try { payload = await request.json(); } catch { return new Response(JSON.stringify({error:"Invalid request."}),{status:400,headers:corsHeaders}); }
  const { category } = payload;
  const prompt = `You are a stock photography market research expert. Analyze current demand for the "${category}" category on Adobe Stock, Shutterstock, and Getty Images in 2026.\n\nReturn ONLY a valid JSON object, no markdown:\n{\n  "trending": [\n    {"subject":"specific photo subject","demand":"high|medium|rising","why":"one sentence why this sells now","tags":["tag1","tag2","tag3"]}\n  ],\n  "insights": "2-3 sentence market insight about this category",\n  "avoid": ["oversaturated concept 1","oversaturated concept 2","oversaturated concept 3"]\n}\n\nReturn exactly 8 trending subjects. Be very specific. Focus on what is in demand in 2026.`;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:2048,messages:[{role:"user",content:prompt}]})});
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    const raw = data.content?.[0]?.text || "";
    const clean = raw.replace(/```json|```/g,"").trim();
    const jsonMatch = clean.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Unexpected AI response.");
    return new Response(jsonMatch[0],{status:200,headers:{...corsHeaders,"Content-Type":"application/json"}});
  } catch(err) {
    return new Response(JSON.stringify({error:err.message||"Unknown error"}),{status:500,headers:{...corsHeaders,"Content-Type":"application/json"}});
  }
}

async function handlePrompt(request, env) {
  const corsHeaders = {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Methods":"POST, OPTIONS"};
  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) return new Response(JSON.stringify({error:"ANTHROPIC_API_KEY not configured."}),{status:500,headers:{...corsHeaders,"Content-Type":"application/json"}});
  let payload;
  try { payload = await request.json(); } catch { return new Response(JSON.stringify({error:"Invalid request."}),{status:400,headers:corsHeaders}); }
  const { topic, parameters } = payload;
  const { version, ar, stylize, chaos, quality, style, weird, no, stop, seed, tile } = parameters;
  let params = [];
  if (ar) params.push(`--ar ${ar}`);
  if (version === "draft") { params.push("--draft"); } else if (version) params.push(`--v ${version}`);
  if (style) params.push(`--style ${style}`);
  if (stylize && stylize !== "100") params.push(`--stylize ${stylize}`);
  if (chaos && chaos !== "0") params.push(`--chaos ${chaos}`);
  if (quality && quality !== "1") params.push(`--q ${quality}`);
  if (weird && weird !== "0") params.push(`--weird ${weird}`);
  if (stop && stop !== "100") params.push(`--stop ${stop}`);
  if (seed) params.push(`--seed ${seed}`);
  if (no) params.push(`--no ${no}`);
  if (tile === "true") params.push(`--tile`);
  const paramString = params.join(" ");
  const prompt = `You are an expert Midjourney prompt engineer for stock photography. Create a highly detailed professional Midjourney prompt for: "${topic}"\n\nThe prompt should use natural descriptive language (V7 style), specify subject, setting, lighting, mood, camera style, and composition. Optimise for commercial stock photography use.\n\nReturn ONLY valid JSON, no markdown:\n{"prompt":"your detailed prompt here ${paramString}","variations":["variation 1 ${paramString}","variation 2 ${paramString}"],"tips":"one quick tip for best results with these settings"}`;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":apiKey,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-haiku-4-5-20251001",max_tokens:2048,messages:[{role:"user",content:prompt}]})});
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    const raw = data.content?.[0]?.text || "";
    const clean = raw.replace(/```json|```/g,"").trim();
    const jsonMatch = clean.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Unexpected AI response.");
    return new Response(jsonMatch[0],{status:200,headers:{...corsHeaders,"Content-Type":"application/json"}});
  } catch(err) {
    return new Response(JSON.stringify({error:err.message||"Unknown error"}),{status:500,headers:{...corsHeaders,"Content-Type":"application/json"}});
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null,{status:204,headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Methods":"POST, OPTIONS"}});
    if (url.pathname === "/api/research") return handleResearch(request, env);
    if (url.pathname === "/api/prompt") return handlePrompt(request, env);
    return new Response(HTML, {headers:{"Content-Type":"text/html;charset=UTF-8"}});
  }
};
