// --- Language filter (Posts page) ---
(function () {
  var langBtns = document.querySelectorAll('.lang-btn');
  if (!langBtns.length) return;

  var activeLang = null;

  function applyFilter() {
    document.querySelectorAll('[data-lang-group]').forEach(function (group) {
      var lang = group.getAttribute('data-lang-group');
      group.style.display = (!activeLang || activeLang === lang) ? '' : 'none';
    });
  }

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang');
      if (activeLang === lang) {
        activeLang = null;
        langBtns.forEach(function (b) { b.classList.remove('active'); });
      } else {
        activeLang = lang;
        langBtns.forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        });
      }
      applyFilter();
    });
  });
})();

// --- Terminal labels for code blocks ---
(function () {
  var langNames = {
    ruby: 'ruby',
    javascript: 'node',
    js: 'node',
    typescript: 'tsc',
    ts: 'tsc',
    python: 'python3',
    c: 'gcc',
    cpp: 'g++',
    java: 'javac',
    bash: 'bash',
    sh: 'sh',
    zsh: 'zsh',
    html: 'html',
    css: 'css',
    scss: 'scss',
    sql: 'sqlite3',
    json: 'json',
    yaml: 'yaml',
    yml: 'yaml',
    xml: 'xml',
    diff: 'diff',
    md: 'markdown',
    markdown: 'markdown'
  };

  document.querySelectorAll('.post-content pre').forEach(function (pre) {
    var code = pre.querySelector('code');
    if (!code) return;

    var lang = '';
    code.className.split(/\s+/).forEach(function (cls) {
      if (cls.indexOf('language-') === 0) {
        lang = cls.replace('language-', '');
      }
    });

    if (lang && langNames[lang]) {
      pre.setAttribute('data-terminal-title', langNames[lang]);
    } else if (lang) {
      pre.setAttribute('data-terminal-title', lang);
    }
  });
})();
