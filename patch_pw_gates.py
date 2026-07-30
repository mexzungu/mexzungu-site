#!/usr/bin/env python3
"""
Patch all password-gated pages:
1. Add show/hide password toggle
2. Add master password (Outlaw-Master-2026) alongside client password
Skip pages already fully patched.

Handles three password patterns found across the site:
  - const CORRECT_PW = '...'   (byr-mobility pages)
  - var CORRECT = '...'        (most proposals)
  - var PASS = '...'           (sign/delta40)
  - const PW + const CLIENT_PW (havenpay hub pages, already have master, just add toggle)
"""
import re, glob

MASTER_PW = 'Outlaw-Master-2026'

EYE_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'
EYE_CLOSED = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'

TOGGLE_CSS = """
        .pw-field { position: relative; margin-bottom: 1rem; }
        .pw-field .pw-input { margin-bottom: 0; }
        .pw-toggle {
            position: absolute; right: 0.85rem; top: 50%; transform: translateY(-50%);
            background: none; border: none; cursor: pointer; color: #6b5e57;
            padding: 0.25rem; line-height: 0; transition: color 0.15s;
        }
        .pw-toggle:hover { color: #9a8f88; }"""

TOGGLE_JS = f"""
    function togglePwVisibility() {{
        const inp = document.getElementById('pw-input');
        const btn = document.querySelector('.pw-toggle');
        const showing = inp.type === 'text';
        inp.type = showing ? 'password' : 'text';
        btn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
        btn.innerHTML = showing ? `{EYE_OPEN}` : `{EYE_CLOSED}`;
    }}"""

TOGGLE_BUTTON = f'<button type="button" class="pw-toggle" onclick="togglePwVisibility()" aria-label="Show password">{EYE_OPEN}</button>'

files = glob.glob('/home/mexzungu/mexzungu-site/**/*.html', recursive=True)

# Only pages that have an actual pw-input (i.e. a real password gate UI)
targets = [f for f in files if 'id="pw-input"' in open(f).read() or "id='pw-input'" in open(f).read()]

patched, skipped = [], []

for fpath in sorted(targets):
    content = open(fpath).read()
    original = content
    changed = []

    already_has_master = MASTER_PW in content
    already_has_toggle = 'togglePwVisibility' in content

    if already_has_master and already_has_toggle:
        skipped.append(fpath)
        continue

    # --- MASTER PASSWORD ---
    if not already_has_master:
        # Pattern 1: const CORRECT_PW = '...'
        if re.search(r"const CORRECT_PW\s*=\s*'[^']*'", content):
            content = re.sub(
                r"(const CORRECT_PW\s*=\s*'[^']*';)",
                rf"\1\n    const MASTER_PW = '{MASTER_PW}';",
                content
            )
            content = re.sub(
                r'if\s*\(\s*val\s*===\s*CORRECT_PW\s*\)',
                'if (val === CORRECT_PW || val === MASTER_PW)',
                content
            )
            changed.append('master-pw (CORRECT_PW pattern)')

        # Pattern 2: var CORRECT = '...' / if (val === CORRECT)
        elif re.search(r"var CORRECT\s*=\s*'[^']*'", content):
            content = re.sub(
                r"(var CORRECT\s*=\s*'[^']*';)",
                rf"\1\n    var MASTER_PW = '{MASTER_PW}';",
                content
            )
            content = re.sub(
                r'if\s*\(\s*val\s*===\s*CORRECT\s*\)',
                'if (val === CORRECT || val === MASTER_PW)',
                content
            )
            changed.append('master-pw (CORRECT pattern)')

        # Pattern 3: var PASS = '...' / if (val === PASS)
        elif re.search(r"var PASS\s*=\s*'[^']*'", content):
            content = re.sub(
                r"(var PASS\s*=\s*'[^']*';)",
                rf"\1\n  var MASTER_PW = '{MASTER_PW}';",
                content
            )
            content = re.sub(
                r'if\s*\(\s*val\s*===\s*PASS\s*\)',
                'if (val === PASS || val === MASTER_PW)',
                content
            )
            changed.append('master-pw (PASS pattern)')

    # --- TOGGLE CSS ---
    if not already_has_toggle:
        if '.pw-toggle' not in content:
            content = content.replace('</style>', TOGGLE_CSS + '\n    </style>', 1)
            changed.append('toggle-css')

        # Wrap pw-input with .pw-field div and inject toggle button
        if 'pw-field' not in content:
            content = re.sub(
                r'(<input[^>]+id="pw-input"[^>]*>)',
                '<div class="pw-field">\\n            \\1\\n            ' + TOGGLE_BUTTON + '\\n        </div>',
                content
            )
            changed.append('toggle-html')

        # Add JS function before </script>
        content = content.replace('</script>', TOGGLE_JS + '\n</script>', 1)
        changed.append('toggle-js')

    if content != original:
        open(fpath, 'w').write(content)
        patched.append(fpath)
        short = fpath.replace('/home/mexzungu/mexzungu-site/', '')
        print(f'PATCHED  {short}  [{", ".join(changed)}]')
    else:
        skipped.append(fpath)
        short = fpath.replace('/home/mexzungu/mexzungu-site/', '')
        print(f'SKIP     {short}')

print(f'\nDone. {len(patched)} patched, {len(skipped)} already done.')
