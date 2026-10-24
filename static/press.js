/* Press shelf: the homepage's press links as a stack of small books.
   Each spine is a plain link to its article. This script adds the 3D shelf
   and a reader that opens each book from its <template> in press-shelf.html. */
(function () {
  const shelf = document.querySelector('[data-shelf]');
  if (!shelf) return;

  const spines = Array.from(shelf.querySelectorAll('[data-book]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const TURN_MS = 900;
  const PAGE_RATIO = 1.42;

  /* ── Shelf ── */

  // Keep the vanishing point at the middle of the screen, like a camera at eye
  // level: books above it show their undersides, books below show their covers.
  // It stops a little past the shelf's ends, so the end books' covers stay
  // clear of the text around the shelf.
  const REACH = 110;
  let aimFrame = 0;
  let shelfInView = false;

  function aim() {
    aimFrame = 0;
    const rect = shelf.getBoundingClientRect();
    const y = Math.min(Math.max(window.innerHeight / 2 - rect.top, -REACH), rect.height + REACH);
    shelf.style.perspectiveOrigin = `50% ${Math.round(y)}px`;
  }

  function scheduleAim() {
    if (shelfInView && !aimFrame && !reduceMotion.matches) aimFrame = requestAnimationFrame(aim);
  }

  new IntersectionObserver((entries) => {
    shelfInView = entries[0].isIntersecting;
    scheduleAim();
  }, { rootMargin: '25% 0px' }).observe(shelf);
  window.addEventListener('scroll', scheduleAim, { passive: true });
  window.addEventListener('resize', scheduleAim);

  // Dress each book with its own covers: the front cover on top and the back
  // cover underneath, so the stack shows a small preview of every cover.
  const templateFor = (spine) => document.getElementById(`press-book-${spine.dataset.book}`);

  spines.forEach((spine) => {
    const template = templateFor(spine);
    if (!template) return;
    dress(spine.querySelector('.shelf-book__top'), template.content.querySelector('.rb-page--cover'));
    dress(spine.querySelector('.shelf-book__bottom'), template.content.querySelector('.rb-back'));
  });

  function dress(side, cover) {
    if (!side || !cover) return;
    const face = document.createElement('span');
    face.className = 'shelf-book__face';
    face.append(cover.cloneNode(true));
    side.append(face);
  }

  /* ── Reader ── */

  const dialog = document.createElement('dialog');
  if (typeof dialog.showModal !== 'function') return; // Without <dialog>, the spines stay plain links.

  const icon = (path) => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg>`;

  dialog.className = 'reader';
  dialog.setAttribute('aria-labelledby', 'reader-title');
  dialog.innerHTML = `
    <div class="reader__inner">
      <nav class="reader__rail" aria-label="Books">
        <button type="button" class="reader__close" data-close aria-label="Close">${icon('M19 12H5m6-6-6 6 6 6')}</button>
        <ol class="reader__ticks"></ol>
      </nav>
      <div class="reader__stage">
        <div class="reader__holder" data-holder></div>
        <div class="reader__controls">
          <button type="button" class="reader__turn" data-prev aria-label="Previous page">${icon('m15 6-6 6 6 6')}</button>
          <p class="reader__folio" data-folio aria-live="polite"></p>
          <button type="button" class="reader__turn reader__turn--next" data-next><span class="reader__turn-label">Open</span>${icon('m9 6 6 6-6 6')}</button>
        </div>
      </div>
      <div class="reader__info" data-info></div>
    </div>`;
  document.body.append(dialog);

  const holder = dialog.querySelector('[data-holder]');
  const info = dialog.querySelector('[data-info]');
  const folio = dialog.querySelector('[data-folio]');
  const prevButton = dialog.querySelector('[data-prev]');
  const nextButton = dialog.querySelector('[data-next]');

  const ticks = spines.map((spine, i) => {
    const title = spine.querySelector('.spine__title').textContent;
    const tick = document.createElement('button');
    tick.type = 'button';
    tick.className = 'reader__tick';
    tick.setAttribute('aria-label', `${title}, ${spine.querySelector('.spine__pub').textContent}`);
    tick.addEventListener('click', () => show(i));

    // On hover, a tiny copy of the book's cover and its title appear by the tick.
    const template = templateFor(spine);
    if (template) {
      const peek = document.createElement('span');
      peek.className = 'reader__peek';
      peek.setAttribute('aria-hidden', 'true');
      const cover = document.createElement('span');
      cover.className = 'reader__peek-cover';
      for (const name of ['--cloth', '--ink', '--accent']) cover.style.setProperty(name, spine.style.getPropertyValue(name).trim());
      cover.append(template.content.querySelector('.rb-page--cover').cloneNode(true));
      const label = document.createElement('span');
      label.className = 'reader__peek-label';
      label.textContent = title;
      peek.append(cover, label);
      tick.append(peek);
    }

    const item = document.createElement('li');
    item.append(tick);
    dialog.querySelector('.reader__ticks').append(item);
    return tick;
  });

  let current = -1; // index of the book on the stage
  let book = null; // { el, leaves, mode, turned, template, spine }
  let swapTimer = 0;
  let turnCount = 0;

  spines.forEach((spine, i) => {
    spine.setAttribute('aria-haspopup', 'dialog');
    spine.addEventListener('click', (event) => {
      // Modified clicks still open the article itself.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      open(i);
    });
  });

  function open(i) {
    document.documentElement.classList.add('reader-open');
    dialog.classList.remove('is-closing');
    if (!dialog.open) dialog.showModal();
    show(i, true);
    nextButton.focus();
  }

  function close() {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    dialog.classList.add('is-closing');
    setTimeout(() => dialog.close(), reduceMotion.matches ? 0 : 240);
  }

  dialog.querySelector('[data-close]').addEventListener('click', close);

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });

  dialog.addEventListener('close', () => {
    const spine = spines[current];
    clearTimeout(swapTimer);
    if (book) stopSpin(book);
    dialog.classList.remove('is-closing', 'is-swapping');
    document.documentElement.classList.remove('reader-open');
    holder.replaceChildren();
    info.replaceChildren();
    book = null;
    current = -1;
    if (location.hash.startsWith('#press-')) history.replaceState(null, '', location.pathname + location.search);
    if (spine) spine.focus({ preventScroll: true });
  });

  // Put book i on the stage. Switching books fades the old one out first.
  function show(i, immediately) {
    if (i < 0 || i >= spines.length || i === current) return;
    const spine = spines[i];
    const template = templateFor(spine);
    if (!template) return;

    clearTimeout(swapTimer);
    const swap = () => {
      if (book) stopSpin(book);
      current = i;
      for (const name of ['--cloth', '--ink', '--accent']) {
        dialog.style.setProperty(name, spine.style.getPropertyValue(name).trim());
      }
      ticks.forEach((tick, k) => tick.setAttribute('aria-current', String(k === i)));

      const details = template.content.querySelector('.rb-info').cloneNode(true);
      details.querySelector('.rb-info__title').id = 'reader-title';
      info.replaceChildren(details);
      info.scrollTop = 0;

      book = build(template, spine, 0);
      dialog.classList.remove('is-swapping');
      history.replaceState(null, '', `#press-${spine.dataset.book}`);
    };

    if (immediately || current < 0 || reduceMotion.matches) {
      swap();
    } else {
      dialog.classList.add('is-swapping');
      swapTimer = setTimeout(swap, 200);
    }
  }

  // Wide screens show two-page spreads; narrow ones show one page at a time.
  function layoutMode() {
    return window.innerWidth >= 900 && holder.clientWidth >= 600 ? 'spread' : 'single';
  }

  // A place in a book is the index of a page in its template, endpapers
  // included, so the reader keeps its place when the layout changes.
  const isEndpaper = (page) => page.classList.contains('rb-page--endpaper');

  function placeOf(b) {
    const pages = Array.from(b.template.content.querySelectorAll('.rb-pages > .rb-page'));
    if (b.mode === 'spread') {
      const left = 2 * b.turned - 1;
      return b.turned > 0 && !isEndpaper(pages[left]) ? left : 2 * b.turned;
    }
    let seen = -1;
    return pages.findIndex((page) => !isEndpaper(page) && ++seen === b.turned);
  }

  // Build the book from its template, open at `place`.
  function build(template, spine, place) {
    const pages = Array.from(template.content.querySelectorAll('.rb-pages > .rb-page'), (p) => p.cloneNode(true));
    const mode = layoutMode();
    const el = document.createElement('div');
    el.className = 'rb';
    el.dataset.mode = mode;
    el.style.setProperty('--t', `${Math.round(Number(spine.style.getPropertyValue('--t')) * 0.5)}px`);
    el.innerHTML = '<div class="rb__back" aria-hidden="true"></div><div class="rb__spine" aria-hidden="true"></div>'
      + '<div class="rb__edge"></div><div class="rb__head"></div><div class="rb__foot"></div><div class="rb__leaves"></div>';

    // The closed book is a whole object: back cover and spine as on the shelf.
    el.querySelector('.rb__back').append(template.content.querySelector('.rb-back').cloneNode(true));
    el.querySelector('.rb__spine').append(spine.querySelector('.spine').cloneNode(true));

    // In a spread each leaf carries two pages, front and back. One page at a
    // time, every leaf has a blank back and the endpapers are left out.
    const sides = mode === 'spread' ? pages : pages.filter((p) => !isEndpaper(p));
    const step = mode === 'spread' ? 2 : 1;
    const leaves = [];
    for (let k = 0; k < sides.length; k += step) {
      const leaf = document.createElement('div');
      leaf.className = 'rb__leaf';
      leaf.append(face(sides[k], 'front'), face(mode === 'spread' ? sides[k + 1] : null, 'back'));
      el.lastElementChild.append(leaf);
      leaves.push(leaf);
    }

    const next = { el, leaves, mode, turned: 0, template, spine, spin: restingSpin() };
    holder.replaceChildren(el);
    size(next);
    goTo(next, mode === 'spread' ? Math.ceil(place / 2) : pages.slice(0, place).filter((p) => !isEndpaper(p)).length, false);
    return next;
  }

  function face(page, side) {
    const el = document.createElement('div');
    el.className = `rb__face rb__face--${side}`;
    if (page) el.append(page);
    return el;
  }

  // Fit the pages to the stage, then shrink any page whose text runs long.
  function size(b) {
    const wide = window.innerWidth >= 900;
    const across = b.mode === 'spread' ? (holder.clientWidth - 24) / 2 : holder.clientWidth - 8;
    const tall = (window.innerHeight - (wide ? 190 : 150)) / PAGE_RATIO;
    const pw = Math.max(180, Math.floor(Math.min(across, tall, b.mode === 'spread' ? 360 : 380)));
    const ph = Math.round(pw * PAGE_RATIO);
    holder.style.setProperty('--pw', `${pw}px`);
    holder.style.setProperty('--ph', `${ph}px`);
    holder.style.height = `${ph}px`;

    b.el.querySelectorAll('.rb-page--title, .rb-page--text, .rb-page--colophon').forEach((page) => {
      page.style.fontSize = '';
      let px = parseFloat(getComputedStyle(page).fontSize);
      for (let n = 0; n < 10 && page.scrollHeight > page.clientHeight + 1; n++) {
        px *= 0.94;
        page.style.fontSize = `${px}px`;
      }
    });
  }

  function goTo(b, turned, animate) {
    turned = Math.max(0, Math.min(turned, b.leaves.length - 1));
    // A book turned by hand faces front again before it opens.
    if (b.spin.moved) {
      if (turned > 0) faceFront(b);
      else settle(b);
    }
    b.turned = turned;
    b.leaves.forEach((leaf, k) => {
      const isTurned = k < b.turned;
      const moving = animate && isTurned !== leaf.classList.contains('is-turned');
      leaf.classList.toggle('is-turned', isTurned);
      if (moving) {
        // A turning leaf passes over both stacks, so it rides on top until it lands.
        leaf.style.zIndex = String(100 + ++turnCount);
        leaf.classList.add('is-moving');
        clearTimeout(leaf.landing);
        leaf.landing = setTimeout(() => {
          leaf.classList.remove('is-moving');
          leaf.style.zIndex = String(stackOrder(b, k));
        }, TURN_MS);
      } else if (!leaf.classList.contains('is-moving')) {
        leaf.style.zIndex = String(stackOrder(b, k));
      }

      // Only the pages in view can take focus or be read out.
      leaf.children[0].inert = k !== b.turned;
      leaf.children[1].inert = !(b.mode === 'spread' && k === b.turned - 1);
    });

    b.el.classList.toggle('is-open', b.turned > 0);
    dialog.classList.toggle('is-shut', b.turned === 0);
    const focused = document.activeElement;
    prevButton.disabled = b.turned === 0;
    nextButton.disabled = b.turned === b.leaves.length - 1;
    nextButton.setAttribute('aria-label', b.turned === 0 ? 'Open the book' : 'Next page');
    folio.textContent = pageLabel(b);

    // A button that just became disabled drops focus; hand it to the other one.
    if (focused === nextButton && nextButton.disabled) prevButton.focus();
    if (focused === prevButton && prevButton.disabled) nextButton.focus();
  }

  // Turned leaves pile up on the left with the last one on top; the rest
  // stack on the right with the first one on top.
  function stackOrder(b, k) {
    return k < b.turned ? k + 1 : b.leaves.length * 2 - k;
  }

  function pageLabel(b) {
    if (b.turned === 0) return 'Cover · drag to rotate';
    const label = (side) => (side && side.firstElementChild && side.firstElementChild.dataset.label) || '';
    const left = b.mode === 'spread' && b.turned > 0 ? b.leaves[b.turned - 1].children[1] : null;
    const right = b.leaves[b.turned].children[0];
    return [label(left), label(right)].filter(Boolean).join(' · ');
  }

  function turn(step) {
    if (book) goTo(book, book.turned + step, !reduceMotion.matches);
  }

  prevButton.addEventListener('click', () => turn(-1));
  nextButton.addEventListener('click', () => turn(1));

  /* ── Turning the closed book by hand ── */

  // The resting pose matches .rb in press.css (--rx, --ry).
  const REST = { x: 10, y: 24 };
  const DEG_PER_PX = 0.45;
  const TILT_LIMIT = 70;
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));

  function restingSpin() {
    return { x: REST.x, y: REST.y, vx: 0, vy: 0, moved: false, frame: 0, timer: 0 };
  }

  function showSpin(b) {
    b.el.style.setProperty('--rx', `${b.spin.x}deg`);
    b.el.style.setProperty('--ry', `${b.spin.y}deg`);
  }

  function stopSpin(b) {
    cancelAnimationFrame(b.spin.frame);
    clearTimeout(b.spin.timer);
  }

  function grab(b) {
    stopSpin(b);
    b.spin.moved = true;
    b.el.classList.add('is-held');
  }

  // After a flick the book coasts to a stop, rests a moment, then goes home.
  function letGo(b) {
    const s = b.spin;
    stopSpin(b);
    if (reduceMotion.matches) return;
    let last = performance.now();
    const coast = (now) => {
      const dt = Math.min(48, now - last);
      last = now;
      s.y += s.vy * dt;
      s.x = clamp(s.x + s.vx * dt, -TILT_LIMIT, TILT_LIMIT);
      const friction = Math.pow(0.994, dt);
      s.vx *= friction;
      s.vy *= friction;
      showSpin(b);
      if (Math.abs(s.vx) + Math.abs(s.vy) > 0.01) s.frame = requestAnimationFrame(coast);
      else s.timer = setTimeout(() => goHome(b), 1600);
    };
    s.frame = requestAnimationFrame(coast);
  }

  // A critically damped spring back to the resting pose, the short way round.
  function goHome(b) {
    const s = b.spin;
    const homeY = REST.y + 360 * Math.round((s.y - REST.y) / 360);
    const k = 0.00008;
    const damping = 2 * Math.sqrt(k);
    s.vx = 0;
    s.vy = 0;
    let last = performance.now();
    const step = (now) => {
      const dt = Math.min(48, now - last);
      last = now;
      s.vy += (-k * (s.y - homeY) - damping * s.vy) * dt;
      s.vx += (-k * (s.x - REST.x) - damping * s.vx) * dt;
      s.y += s.vy * dt;
      s.x += s.vx * dt;
      if (Math.abs(s.y - homeY) + Math.abs(s.x - REST.x) < 0.05) {
        settle(b);
        return;
      }
      showSpin(b);
      s.frame = requestAnimationFrame(step);
    };
    s.frame = requestAnimationFrame(step);
  }

  // Turn to face front the short way round, then hand the pose back to the
  // stylesheet, which opens the book from there.
  function faceFront(b) {
    stopSpin(b);
    b.el.classList.remove('is-held');
    b.el.style.setProperty('--rx', '0deg');
    b.el.style.setProperty('--ry', `${360 * Math.round(b.spin.y / 360)}deg`);
    b.spin.timer = setTimeout(() => settle(b), 1050);
  }

  // Drop the inline angles without an animated jump: they match the
  // stylesheet's pose by now, or differ by whole turns.
  function settle(b) {
    stopSpin(b);
    b.spin = restingSpin();
    b.el.classList.add('is-held');
    b.el.style.removeProperty('--rx');
    b.el.style.removeProperty('--ry');
    void b.el.offsetWidth;
    b.el.classList.remove('is-held');
  }

  // Drag the closed book to rotate it. Drag an open book sideways to turn a
  // page. A plain click opens the book or turns the page under the pointer.
  let gesture = null;
  let dragged = false;

  holder.addEventListener('pointerdown', (event) => {
    if (!book || !event.isPrimary || event.button !== 0 || event.target.closest('a, button')) return;
    gesture = {
      id: event.pointerId, x0: event.clientX, y0: event.clientY,
      x: event.clientX, y: event.clientY, t: event.timeStamp, moved: false, spin: book.turned === 0,
    };
    dragged = false;
  });

  holder.addEventListener('pointermove', (event) => {
    const g = gesture;
    if (!g || event.pointerId !== g.id || !book) return;
    if (!g.moved && Math.hypot(event.clientX - g.x0, event.clientY - g.y0) > 6) {
      g.moved = true;
      if (g.spin) {
        holder.setPointerCapture(event.pointerId);
        grab(book);
      }
    }
    if (g.moved && g.spin) {
      const s = book.spin;
      const dt = Math.max(8, event.timeStamp - g.t);
      const dy = (event.clientX - g.x) * DEG_PER_PX;
      const dx = -(event.clientY - g.y) * DEG_PER_PX;
      s.y += dy;
      s.x = clamp(s.x + dx, -TILT_LIMIT, TILT_LIMIT);
      s.vy = 0.6 * (dy / dt) + 0.4 * s.vy;
      s.vx = 0.6 * (dx / dt) + 0.4 * s.vx;
      showSpin(book);
    }
    g.x = event.clientX;
    g.y = event.clientY;
    g.t = event.timeStamp;
  });

  function endGesture(event) {
    const g = gesture;
    if (!g || event.pointerId !== g.id) return;
    gesture = null;
    if (!g.moved || !book) return;
    dragged = true;
    if (g.spin) {
      // Holding still before letting go means no flick.
      if (event.timeStamp - g.t > 80) book.spin.vx = book.spin.vy = 0;
      letGo(book);
    } else if (event.type === 'pointerup' && Math.abs(event.clientX - g.x0) > 40) {
      turn(event.clientX < g.x0 ? 1 : -1);
    }
  }

  holder.addEventListener('pointerup', endGesture);
  holder.addEventListener('pointercancel', endGesture);

  holder.addEventListener('click', (event) => {
    if (dragged) {
      dragged = false;
      return;
    }
    if (!book || event.target.closest('a, button')) return;
    if (book.turned === 0) {
      turn(1);
      return;
    }
    const rect = book.el.getBoundingClientRect();
    const back = book.mode === 'spread'
      ? event.clientX < rect.left + rect.width / 2
      : event.clientX < rect.left + rect.width * 0.3;
    turn(back ? -1 : 1);
  });

  // Listen on the document: focus can sit on <body> after a click on a page.
  document.addEventListener('keydown', (event) => {
    if (!dialog.open || event.altKey || event.ctrlKey || event.metaKey) return;
    const inDetails = event.target.closest && event.target.closest('.reader__info');
    switch (event.key) {
      case 'ArrowRight':
        turn(1);
        break;
      case 'ArrowLeft':
        turn(-1);
        break;
      case 'ArrowDown':
      case 'PageDown':
        if (inDetails) return;
        show(current + 1);
        break;
      case 'ArrowUp':
      case 'PageUp':
        if (inDetails) return;
        show(current - 1);
        break;
      default:
        return;
    }
    event.preventDefault();
  });

  // Rebuild on resize when the layout changes, keeping the reader's place.
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    if (!book) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!book) return;
      if (layoutMode() !== book.mode) {
        book = build(book.template, book.spine, placeOf(book));
      } else {
        size(book);
      }
    }, 150);
  });

  // Links such as /#press-pixelapse open that book.
  function openFromHash() {
    const match = location.hash.match(/^#press-([\w-]+)$/);
    const i = match ? spines.findIndex((spine) => spine.dataset.book === match[1]) : -1;
    if (i >= 0 && !dialog.open) open(i);
  }

  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
