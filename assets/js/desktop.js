// Clock
function updateClock() {
  var now = new Date();
  var h = now.getHours().toString().padStart(2, '0');
  var m = now.getMinutes().toString().padStart(2, '0');
  var el = document.getElementById('clock');
  if (el) el.textContent = h + ':' + m;
}
updateClock();
setInterval(updateClock, 30000);

// Start Menu
var startBtn = document.getElementById('start-btn');
var startMenu = document.getElementById('start-menu');

if (startBtn && startMenu) {
  startBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    startMenu.classList.toggle('is-open');
  });

  document.addEventListener('click', function (e) {
    if (!startMenu.contains(e.target) && e.target !== startBtn) {
      startMenu.classList.remove('is-open');
    }
  });
}

// Language filter
var langBtns = document.querySelectorAll('.lang-btn');
var activeLang = null;

langBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var lang = btn.getAttribute('data-lang');

    if (activeLang === lang) {
      // Deselect — show all
      activeLang = null;
      langBtns.forEach(function (b) { b.classList.remove('active'); });
    } else {
      activeLang = lang;
      langBtns.forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
      });
    }

    document.querySelectorAll('.file-list-row, .file-list-section').forEach(function (row) {
      if (!activeLang) {
        row.style.display = '';
      } else {
        row.style.display = row.getAttribute('data-lang') === activeLang ? '' : 'none';
      }
    });
  });
});

// Terminal labels — detect language from highlight class
var langNames = {
  ruby: 'ruby',
  javascript: 'node',
  js: 'node',
  python: 'python3',
  c: 'gcc',
  java: 'javac',
  bash: 'bash',
  sh: 'sh',
  html: 'html',
  css: 'css',
  sql: 'sqlite3',
  json: 'json',
  yaml: 'yaml',
  xml: 'xml'
};

document.querySelectorAll('.post-content pre').forEach(function (pre) {
  var code = pre.querySelector('code');
  if (!code) return;

  var lang = '';
  code.className.split(/\s+/).forEach(function (cls) {
    if (cls.startsWith('language-')) {
      lang = cls.replace('language-', '');
    }
  });

  if (lang && langNames[lang]) {
    pre.setAttribute('data-terminal-title', langNames[lang]);
  } else if (lang) {
    pre.setAttribute('data-terminal-title', lang);
  }
});
