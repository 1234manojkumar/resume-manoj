document.addEventListener("DOMContentLoaded", () => {

  // ==================== CONFIGURATION ====================
  const CFG = {
    charFolder: "images in antime - Copy",
    bgFolder1: "image.background - Copy",
    bgFolder2: "image.background - Copy",
    totalCharImages: 111,
    totalBg1Images: 82,
    totalBg2Images: 82,
    episodesCount: 12,
    leaderboardCount: 8,
    galleryDisplay: 24,
    heroSlides: 5,
  };

  // ==================== HELPERS ====================
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function getCharImage(index) {
    const i = (index % CFG.totalCharImages) + 1;
    const ext = [3, 35, 38, 39, 40, 43, 45].includes(i) || (i >= 38 && i <= 45 && [38,39,40,43,45].includes(i)) ? "png" : "jpg";
    const checkPng = [3,35,38,39,40,43,45];
    const finalExt = checkPng.includes(i) ? "png" : "jpg";
    return `${CFG.charFolder}/${i}.${finalExt}`;
  }

  function getBg1Image(index) {
    const i = (index % CFG.totalBg1Images) + 1;
    const ext = i === 72 ? "png" : "jpg";
    return `${CFG.bgFolder1}/${i}.${ext}`;
  }

  function getBg2Image(index) {
    const i = (index % CFG.totalBg2Images) + 1;
    const ext = i === 72 ? "png" : "jpg";
    return `${CFG.bgFolder2}/${i}.${ext}`;
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ==================== PRELOADER ====================
  setTimeout(() => { $("#preloader").classList.add("hidden"); }, 1200);

  // ==================== SIDEBAR ====================
  const sidebar = $(".sidebar");
  $("#menuToggle").addEventListener("click", () => sidebar.classList.toggle("active"));
  $("#closeSidebar").addEventListener("click", () => sidebar.classList.remove("active"));
  $$(".nav-link").forEach(l => l.addEventListener("click", () => sidebar.classList.remove("active")));

  // ==================== THEME TOGGLE ====================
  let isDark = localStorage.getItem("animeTheme") !== "light";
  const themeIcon = $("#themeToggle i");
  function applyTheme() {
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      themeIcon.className = "fas fa-moon";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      themeIcon.className = "fas fa-sun";
    }
    localStorage.setItem("animeTheme", isDark ? "dark" : "light");
  }
  applyTheme();
  $("#themeToggle").addEventListener("click", () => { isDark = !isDark; applyTheme(); });

  // ==================== BACKGROUND MUSIC ====================
  let musicOn = localStorage.getItem("animeMusic") === "on";
  const musicIcon = $("#musicToggle i");
  const bgMusic = $("#bgMusic");
  function applyMusic() {
    if (musicOn) {
      bgMusic.play().catch(() => {});
      musicIcon.className = "fas fa-music";
    } else {
      bgMusic.pause();
      musicIcon.className = "fas fa-volume-mute";
    }
  }
  applyMusic();
  $("#musicToggle").addEventListener("click", () => {
    musicOn = !musicOn;
    localStorage.setItem("animeMusic", musicOn ? "on" : "off");
    applyMusic();
  });

  // ==================== HERO SLIDER ====================
  const heroSlider = $("#heroSlider");
  const heroImages = [];
  const offsets = [1, 15, 30, 45, 60];
  for (let i = 0; i < CFG.heroSlides; i++) {
    heroImages.push(getBg1Image(offsets[i] || i * 13 + 1));
  }
  let heroIdx = 0;
  function changeHeroBg() {
    heroSlider.style.backgroundImage = `url("${heroImages[heroIdx]}")`;
    heroIdx = (heroIdx + 1) % heroImages.length;
  }
  changeHeroBg();
  setInterval(changeHeroBg, 5000);

  // ==================== CHARACTER DATA ====================
  const characterNames = [
    "Naruto Uzumaki", "Monkey D. Luffy", "Goku", "Saitama", "Eren Yeager",
    "Light Yagami", "Tanjiro Kamado", "Levi Ackerman", "Ichigo Kurosaki", "Gon Freecss",
    "Edward Elric", "Lelouch vi Britannia", "Killua Zoldyck", "Itachi Uchiha", "Zoro Roronoa",
    "Vegeta", "Gojo Satoru", "Mikasa Ackerman", "Shinobu Kocho", "Gaara",
    "Kakashi Hatake", "Sanji", "Law", "Asta", "Yuji Itadori",
    "Deku", "Todoroki", "Bakugo", "Sasuke Uchiha", "Hinata Hyuga",
    "Rock Lee", "Sakura Haruno", "Tsunade", "Jiraiya", "Orochimaru",
    "Madara Uchiha", "Hashirama Senju", "Minato Namikaze", "Kushina Uzumaki", "Nagato",
    "Yahiko", "Konan", "Shikamaru Nara", "Neji Hyuga", "Tenten",
    "Kiba Inuzuka", "Shino Aburame", "Chouji Akimichi", "Ino Yamanaka", "Shisui Uchiha",
    "Rin Nohara", "Obito Uchiha", "Deidara", "Hidan", "Kakuzu",
    "Sasori", "Kisame Hoshigaki", "Zetsu", "Tobi", "Pain",
    "Might Guy", "Kabuto Yakushi", "Danzou Shimura", "Hanzo", "Mifune",
    "Suigetsu", "Jugo", "Karin", "Cee", "Darui",
    "Kurotsuchi", "Chojuro", "Mei Terumi", "Onoki", "A (Raikage)",
    "Gaara (Kazekage)", "Temari", "Kankuro", "Rasa", "Yagura",
    "Mu", "Gengetsu", "Haku", "Zabuza", "Anko Mitarashi",
    "Ibiki Morino", "Asuma Sarutobi", "Kurenai Yuhi", "Iruka Umino", "Mizuki",
    "Kimimaro", "Tayuya", "Sakon", "Ukon", "Kidomaru",
    "Jirobo", "Sai", "Yamato", "Koichi", "Toneri Otsutsuki",
    "Indra Otsutsuki", "Ashura Otsutsuki", "Hagoromo", "Hamura", "Kaguya",
    "Momo", "Kin", "Kinshiki", "Boru", "Mitsuki",
    "Sarada", "Himawari", "Nawaki", "Dan", "Shizune",
  ];

  const characterTags = [
    "hero", "hero", "hero", "hero", "hero",
    "villain", "hero", "hero", "hero", "hero",
    "hero", "villain", "hero", "villain", "hero",
    "hero", "hero", "hero", "hero", "hero",
    "hero", "hero", "hero", "hero", "hero",
    "hero", "hero", "hero", "hero", "hero",
    "hero", "hero", "hero", "hero", "villain",
    "villain", "hero", "hero", "hero", "villain",
    "hero", "hero", "hero", "hero", "hero",
    "hero", "hero", "hero", "hero", "hero",
    "hero", "villain", "villain", "villain", "villain",
    "villain", "villain", "villain", "villain", "villain",
    "hero", "villain", "villain", "villain", "hero",
    "villain", "villain", "villain", "hero", "hero",
    "hero", "hero", "hero", "hero", "hero",
    "hero", "hero", "hero", "hero", "villain",
    "villain", "villain", "villain", "villain", "villain",
    "hero", "hero", "hero", "hero", "villain",
    "villain", "villain", "villain", "villain", "villain",
    "villain", "hero", "hero", "hero", "villain",
    "villain", "villain", "hero", "hero", "villain",
    "villain", "villain", "villain", "villain", "hero",
    "hero", "hero", "hero", "hero", "hero",
  ];

  const characters = [];
  for (let i = 0; i < 110; i++) {
    const tag = characterTags[i] || "hero";
    characters.push({
      id: i,
      name: characterNames[i] || `Character ${i + 1}`,
      img: getCharImage(i),
      tag: tag,
      category: tag === "hero" ? "Hero" : "Villain",
      popular: i < 30,
    });
  }

  // ==================== FAVORITES ====================
  let favorites = JSON.parse(localStorage.getItem("animeFavorites") || "[]");
  function saveFavs() { localStorage.setItem("animeFavorites", JSON.stringify(favorites)); }
  function toggleFav(id) {
    const idx = favorites.indexOf(id);
    if (idx === -1) favorites.push(id);
    else favorites.splice(idx, 1);
    saveFavs();
    updateFavBadge();
    renderFavorites();
    renderCharacters($(".filter-btn.active")?.dataset?.filter || "all");
  }
  function isFav(id) { return favorites.includes(id); }
  function updateFavBadge() { $("#favCount").textContent = favorites.length; }
  updateFavBadge();

  // ==================== RENDER CHARACTERS ====================
  let currentFilter = "all";
  function renderCharacters(filter = "all") {
    currentFilter = filter;
    const grid = $("#charactersGrid");
    let filtered = characters;
    if (filter === "popular") filtered = characters.filter(c => c.popular);
    else if (filter === "hero") filtered = characters.filter(c => c.tag === "hero");
    else if (filter === "villain") filtered = characters.filter(c => c.tag === "villain");

    grid.innerHTML = filtered.map(c => `
      <div class="character-card" style="animation-delay: ${(c.id % 20) * 0.03}s">
        <img class="card-img" src="${c.img}" alt="${c.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400/1a2332/f43f5e?text=Anime'" />
        <div class="card-body">
          <h3>${c.name}</h3>
          <p>${c.category}</p>
        </div>
        <button class="fav-btn ${isFav(c.id) ? 'active' : ''}" data-id="${c.id}">
          <i class="fas fa-heart"></i>
        </button>
      </div>
    `).join("");

    grid.querySelectorAll(".fav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFav(parseInt(btn.dataset.id));
      });
    });
  }
  renderCharacters("all");

  // ==================== FILTER BUTTONS ====================
  $$(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCharacters(btn.dataset.filter);
    });
  });

  // ==================== GALLERY ====================
  function renderGallery() {
    const grid = $("#galleryGrid");
    const images = [];
    for (let i = 0; i < CFG.galleryDisplay; i++) {
      images.push(getBg2Image(i * 2 + 1));
    }
    shuffleArray(images);
    grid.innerHTML = images.map((img, idx) => `
      <div class="gallery-item" style="animation-delay: ${idx * 0.05}s">
        <img src="${img}" alt="Gallery ${idx + 1}" loading="lazy" onerror="this.style.display='none'" />
        <div class="gallery-overlay"><span>Wallpaper ${idx + 1}</span></div>
      </div>
    `).join("");

    grid.querySelectorAll(".gallery-item").forEach((item, idx) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");
        if (img && img.src) openLightbox(img.src);
      });
    });
  }
  renderGallery();

  // ==================== LIGHTBOX ====================
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  function openLightbox(src) {
    lightbox.classList.add("active");
    lightboxImg.src = src;
  }
  $(".lightbox-close").addEventListener("click", () => lightbox.classList.remove("active"));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.remove("active"); });

  // ==================== EPISODES ====================
  const episodeNames = [
    "The Journey Begins", "Clash of Titans", "Darkness Rising", "The Hidden Leaf",
    "Grand Line Adventure", "Saiyan Awakening", "Titan's Roar", "Demon Slayer's Oath",
    "One Punch Victory", "Soul Reaper's Duty", "Hunter's Determination", "Alchemist's Truth",
    "Code of the Ninja", "Straw Hat's Resolve", "Limit Breaker", "Survey Corps Charge",
    "Sunshine Breathing", "Bankai Unleashed", "Greed Island Challenge", "Philosopher's Stone",
    "Akatsuki's Shadow", "Marineford War", "Cell Games Begin", "Return to Shiganshina",
    "Entertainment District", "Thousand Year Blood War", "Dark Continent", "Promised Day",
  ];
  const animeSeries = ["Naruto", "One Piece", "Dragon Ball", "Attack on Titan", "Demon Slayer", "Bleach", "Hunter x Hunter", "Fullmetal Alchemist"];

  function renderEpisodes() {
    const grid = $("#episodesGrid");
    const eps = [];
    for (let i = 0; i < CFG.episodesCount; i++) {
      eps.push({
        name: episodeNames[i % episodeNames.length],
        series: animeSeries[i % animeSeries.length],
        img: getCharImage(i * 8 + 3),
        num: Math.floor(Math.random() * 300) + 1,
        rating: (4 + Math.random() * 1).toFixed(1),
        desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.",
      });
    }
    grid.innerHTML = eps.map(ep => `
      <div class="episode-card">
        <img class="ep-img" src="${ep.img}" alt="${ep.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x225/1a2332/f43f5e?text=Episode'" />
        <div class="ep-body">
          <div class="ep-meta">
            <span class="ep-number">${ep.series} · Ep ${ep.num}</span>
            <span class="ep-rating"><i class="fas fa-star"></i> ${ep.rating}</span>
          </div>
          <h3>${ep.name}</h3>
          <p>${ep.desc}</p>
          <button class="watch-btn"><i class="fas fa-play"></i> Watch Now</button>
        </div>
      </div>
    `).join("");
  }
  renderEpisodes();

  // ==================== LEADERBOARD ====================
  const leaderNames = ["ShadowNinja", "OtakuKing", "MangaQueen", "AnimePro", "WeebMaster", "SoulEater", "Z Fighter", "PirateKing"];
  function renderLeaderboard() {
    const container = $("#leaderboardContainer");
    const entries = [];
    for (let i = 0; i < CFG.leaderboardCount; i++) {
      entries.push({
        name: leaderNames[i % leaderNames.length],
        score: Math.floor(Math.random() * 9000) + 1000,
        anime: Math.floor(Math.random() * 200) + 20,
        avatar: ["ninja","dragon","crown","skull","gem","bolt","fire","star"][i],
      });
    }
    entries.sort((a, b) => b.score - a.score);
    container.innerHTML = entries.map((e, i) => `
      <div class="leaderboard-item">
        <div class="rank ${i < 3 ? '' : 'other'}">${i + 1}</div>
        <div class="avatar"><i class="fas fa-user-${e.avatar}"></i></div>
        <div class="info">
          <h4>${e.name}</h4>
          <p>${e.anime} anime watched</p>
        </div>
        <div class="score">${e.score.toLocaleString()}</div>
      </div>
    `).join("");
  }
  renderLeaderboard();

  // ==================== FAVORITES SECTION ====================
  function renderFavorites() {
    const grid = $("#favoritesGrid");
    if (favorites.length === 0) {
      grid.innerHTML = `<p class="empty-fav">No favorites yet. Click the heart icon on any character to save them!</p>`;
      return;
    }
    grid.innerHTML = favorites.map(id => {
      const c = characters.find(ch => ch.id === id);
      if (!c) return "";
      return `
        <div class="character-card">
          <img class="card-img" src="${c.img}" alt="${c.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400/1a2332/f43f5e?text=Anime'" />
          <div class="card-body">
            <h3>${c.name}</h3>
            <p>${c.category}</p>
          </div>
          <button class="fav-btn active" data-id="${c.id}"><i class="fas fa-heart"></i></button>
        </div>
      `;
    }).join("");

    grid.querySelectorAll(".fav-btn").forEach(btn => {
      btn.addEventListener("click", () => toggleFav(parseInt(btn.dataset.id)));
    });
  }
  renderFavorites();

  // ==================== SEARCH ====================
  const searchInput = $("#searchInput");
  let searchTimeout;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const q = searchInput.value.toLowerCase().trim();
      if (!q) { renderCharacters(currentFilter); return; }
      const filtered = characters.filter(c => c.name.toLowerCase().includes(q));
      const grid = $("#charactersGrid");
      if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-muted)">No characters found for "${q}"</p>`;
        return;
      }
      grid.innerHTML = filtered.map(c => `
        <div class="character-card">
          <img class="card-img" src="${c.img}" alt="${c.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400/1a2332/f43f5e?text=Anime'" />
          <div class="card-body">
            <h3>${c.name}</h3>
            <p>${c.category}</p>
          </div>
          <button class="fav-btn ${isFav(c.id) ? 'active' : ''}" data-id="${c.id}"><i class="fas fa-heart"></i></button>
        </div>
      `).join("");
      grid.querySelectorAll(".fav-btn").forEach(btn => {
        btn.addEventListener("click", () => toggleFav(parseInt(btn.dataset.id)));
      });
    }, 300);
  });

  // ==================== GAMES ====================
  window.startQuiz = function() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    const questions = [
      { q: "Who is the main character of Naruto?", opts: ["Naruto", "Sasuke", "Sakura", "Kakashi"], ans: 0 },
      { q: "What is Luffy's Devil Fruit?", opts: ["Gomu Gomu no Mi", "Mera Mera no Mi", "Yami Yami no Mi", "Bara Bara no Mi"], ans: 0 },
      { q: "Which anime features the Survey Corps?", opts: ["Naruto", "Attack on Titan", "Bleach", "One Piece"], ans: 1 },
      { q: "Who is the strongest hero in One Punch Man?", opts: ["Genos", "Tatsumaki", "Saitama", "King"], ans: 2 },
      { q: "What is Goku's signature attack?", opts: ["Rasengan", "Spirit Gun", "Kamehameha", "Gomu Gomu Pistol"], ans: 2 },
    ];
    let qi = 0, score = 0;
    function showQuestion() {
      if (qi >= questions.length) {
        overlay.innerHTML = `
          <div class="modal-box">
            <h2>🎉 Quiz Complete!</h2>
            <div class="score-display">Your Score: ${score}/${questions.length}</div>
            <p>${score === questions.length ? "Perfect! You're a true anime fan!" : "Try again to improve your score!"}</p>
            <button class="modal-close">Close</button>
          </div>
        `;
        overlay.querySelector(".modal-close").addEventListener("click", () => overlay.remove());
        return;
      }
      const q = questions[qi];
      overlay.innerHTML = `
        <div class="modal-box">
          <h2>Anime Quiz</h2>
          <p style="color:var(--text-muted)">Question ${qi + 1}/${questions.length}</p>
          <h3 style="margin-bottom:16px">${q.q}</h3>
          ${q.opts.map((o, i) => `<button class="game-option" data-idx="${i}">${o}</button>`).join("")}
        </div>
      `;
      overlay.querySelectorAll(".game-option").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.dataset.idx);
          const correct = idx === q.ans;
          if (correct) { btn.classList.add("correct"); score++; }
          else {
            btn.classList.add("wrong");
            overlay.querySelector(`[data-idx="${q.ans}"]`).classList.add("correct");
          }
          setTimeout(() => { qi++; showQuestion(); }, 1000);
        });
      });
    }
    showQuestion();
    document.body.appendChild(overlay);
  };

  window.startMemoryGame = function() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    const emojis = ["🐱", "🐶", "🐰", "🦊", "🐸", "🐲", "🐼", "🐯"];
    let cards = [...emojis, ...emojis];
    shuffleArray(cards);
    let flipped = [], matched = 0, locked = false;
    overlay.innerHTML = `
      <div class="modal-box">
        <h2>Memory Match</h2>
        <p>Match the anime emojis!</p>
        <div class="memory-grid" id="memoryGrid"></div>
        <p id="memoryStatus">Moves: 0 | Matched: 0/${emojis.length}</p>
        <button class="modal-close">Close</button>
      </div>
    `;
    const grid = overlay.querySelector("#memoryGrid");
    let moves = 0;
    function updateStatus() {
      overlay.querySelector("#memoryStatus").textContent = `Moves: ${moves} | Matched: ${matched}/${emojis.length}`;
    }
    cards.forEach((emoji, idx) => {
      const div = document.createElement("div");
      div.className = "memory-card";
      div.dataset.idx = idx;
      div.dataset.emoji = emoji;
      div.addEventListener("click", () => {
        if (locked || div.classList.contains("flipped") || div.classList.contains("matched")) return;
        div.textContent = emoji;
        div.classList.add("flipped");
        flipped.push(div);
        if (flipped.length === 2) {
          locked = true;
          moves++;
          if (flipped[0].dataset.emoji === flipped[1].dataset.emoji) {
            flipped.forEach(f => { f.classList.add("matched"); });
            matched++;
            flipped = [];
            locked = false;
            updateStatus();
            if (matched === emojis.length) {
              overlay.querySelector("#memoryStatus").textContent = `🎉 You win! Moves: ${moves}`;
            }
          } else {
            setTimeout(() => {
              flipped.forEach(f => { f.textContent = ""; f.classList.remove("flipped"); });
              flipped = [];
              locked = false;
              updateStatus();
            }, 800);
          }
        }
      });
      grid.appendChild(div);
    });
    overlay.querySelector(".modal-close").addEventListener("click", () => overlay.remove());
    document.body.appendChild(overlay);
  };

  window.startTrivia = function() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    const facts = [
      { q: "Which anime has the most episodes?", a: "One Piece", opts: ["One Piece", "Naruto", "Dragon Ball", "Detective Conan"], ans: 0 },
      { q: "Who created Dragon Ball?", a: "Akira Toriyama", opts: ["Masashi Kishimoto", "Eiichiro Oda", "Akira Toriyama", "Tite Kubo"], ans: 2 },
      { q: "What year was Studio Ghibli founded?", a: "1985", opts: ["1980", "1985", "1990", "1988"], ans: 1 },
      { q: "Which anime features the concept of Nen?", a: "Hunter x Hunter", opts: ["Naruto", "Yu Yu Hakusho", "Hunter x Hunter", "Bleach"], ans: 2 },
    ];
    let qi = 0, score = 0;
    function showQ() {
      if (qi >= facts.length) {
        overlay.innerHTML = `
          <div class="modal-box">
            <h2>🏆 Trivia Battle</h2>
            <div class="score-display">Score: ${score}/${facts.length}</div>
            <p>${score === facts.length ? "Legendary knowledge!" : "Keep watching more anime!"}</p>
            <button class="modal-close">Close</button>
          </div>
        `;
        overlay.querySelector(".modal-close").addEventListener("click", () => overlay.remove());
        return;
      }
      const q = facts[qi];
      overlay.innerHTML = `
        <div class="modal-box">
          <h2>Trivia Battle</h2>
          <p style="color:var(--text-muted)">Question ${qi + 1}/${facts.length}</p>
          <h3 style="margin-bottom:16px">${q.q}</h3>
          ${q.opts.map((o, i) => `<button class="game-option" data-idx="${i}">${o}</button>`).join("")}
        </div>
      `;
      overlay.querySelectorAll(".game-option").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.dataset.idx);
          if (idx === q.ans) { btn.classList.add("correct"); score++; }
          else { btn.classList.add("wrong"); overlay.querySelector(`[data-idx="${q.ans}"]`).classList.add("correct"); }
          setTimeout(() => { qi++; showQ(); }, 1000);
        });
      });
    }
    showQ();
    document.body.appendChild(overlay);
  };

  // ==================== EDIT PROFILE ====================
  $("#editProfileBtn").addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay active";
    const currentName = $("#profileName").textContent;
    overlay.innerHTML = `
      <div class="modal-box">
        <h2>Edit Profile</h2>
        <p>Customize your anime profile</p>
        <label style="display:block;text-align:left;margin-bottom:8px;color:var(--text-secondary)">Your Name</label>
        <input type="text" id="profileNameInput" value="${currentName}" style="width:100%;padding:12px 16px;border-radius:10px;background:var(--bg-primary);border:1px solid var(--border-color);color:var(--text-primary);margin-bottom:16px;font-size:1rem;" />
        <button id="saveProfile" class="play-btn" style="margin-right:8px">Save</button>
        <button class="modal-close" style="color:var(--text-secondary)">Cancel</button>
      </div>
    `;
    overlay.querySelector("#saveProfile").addEventListener("click", () => {
      const name = overlay.querySelector("#profileNameInput").value.trim() || "Anime Fan";
      $("#profileName").textContent = name;
      overlay.remove();
    });
    overlay.querySelector(".modal-close").addEventListener("click", () => overlay.remove());
    document.body.appendChild(overlay);
  });

  // ==================== NAVBAR SCROLL EFFECT ====================
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const nav = $("#navbar");
    const current = window.scrollY;
    if (current > 80 && current > lastScroll) {
      nav.style.transform = "translateY(-100%)";
    } else {
      nav.style.transform = "translateY(0)";
    }
    lastScroll = current;
  });

  // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".section").forEach(s => {
    s.style.opacity = "0";
    s.style.transform = "translateY(30px)";
    s.style.transition = "all 0.6s ease";
    observer.observe(s);
  });

  // ==================== KEYBOARD SHORTCUTS ====================
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.classList.remove("active");
      document.querySelectorAll(".modal-overlay.active").forEach(m => m.remove());
      sidebar.classList.remove("active");
    }
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.ctrlKey && e.key === "m") {
      e.preventDefault();
      musicOn = !musicOn;
      localStorage.setItem("animeMusic", musicOn ? "on" : "off");
      applyMusic();
    }
  });

  console.log("AnimeVerse loaded! 🎉");
  console.log(`📁 ${CFG.totalCharImages} character images loaded from "${CFG.charFolder}"`);
  console.log(`📁 ${CFG.totalBg1Images} background images loaded from "${CFG.bgFolder1}"`);
  console.log(`❤️ ${favorites.length} favorites saved`);
});
