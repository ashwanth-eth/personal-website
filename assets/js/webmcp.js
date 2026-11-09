// WebMCP tools for ashwanthsamuel.com.
//
// Agents that support WebMCP (ChatGPT desktop, Chrome and Edge origin trials)
// can call these tools instead of scraping the page. Every tool is read-only.
// The tools read the live pages, so they stay in sync with the site without a
// separate data file.
//
// Spec: https://webmachinelearning.github.io/webmcp/

(function () {
  const modelContext = document.modelContext || navigator.modelContext;
  if (!modelContext || typeof modelContext.registerTool !== 'function') return;

  const SITE = 'https://ashwanthsamuel.com';
  const WRITEUPS = {
    'gig-pedal': 'Can Claude Save My Violin Gigging? A $45 foot pedal that turns sheet music and fades backing tracks at violin gigs.',
    'medical-collection': 'Can Claude Clear a Collection I Never Owed? Getting a wrong medical collection off a credit report.',
    'seenly-writeup': 'Seenly. A wedding photo-sharing app with face matching.',
    'civic-pulse': 'Civic Pulse. A tracker for local government documents across Kansas.',
  };

  const pageCache = new Map();

  async function loadPage(path) {
    if (!pageCache.has(path)) {
      pageCache.set(path, fetch(path).then((response) => {
        if (!response.ok) throw new Error(`Could not load ${path} (HTTP ${response.status}).`);
        return response.text();
      }).then((html) => new DOMParser().parseFromString(html, 'text/html')).catch((error) => {
        pageCache.delete(path);
        throw error;
      }));
    }
    return pageCache.get(path);
  }

  const clean = (text) => (text || '').replace(/\s+/g, ' ').trim();

  function absolute(href) {
    return new URL(href, SITE).href;
  }

  function reply(data) {
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  }

  function fail(message) {
    return { content: [{ type: 'text', text: JSON.stringify({ error: message }) }], isError: true };
  }

  async function stablecoinItems() {
    const doc = await loadPage('/writing');
    return [...doc.querySelectorAll('ul.posts li')].map((li) => {
      const link = li.querySelector('a');
      const source = clean(li.querySelector('.source')?.textContent);
      const note = clean(li.querySelector('.note')?.textContent).replace(source, '').trim();
      return {
        section: 'Stablecoins',
        title: clean(link?.textContent),
        date: clean(li.querySelector('.when')?.textContent),
        type: source,
        summary: note,
        url: absolute(link?.getAttribute('href')),
      };
    });
  }

  async function trivialPursuitItems() {
    const doc = await loadPage('/side-projects');
    return [...doc.querySelectorAll('article.entry')].map((entry) => {
      const link = entry.querySelector('h3 a');
      return {
        section: 'Trivial Pursuits',
        title: clean(link?.textContent),
        summary: clean(entry.querySelector('p:not(.links)')?.textContent),
        url: absolute(link?.getAttribute('href')),
        links: [...entry.querySelectorAll('.links a')].map((a) => ({ label: clean(a.textContent), url: absolute(a.getAttribute('href')) })),
      };
    });
  }

  function score(item, words) {
    const slug = item.url.replace(`${SITE}/`, '');
    const title = item.title.toLowerCase();
    const body = `${item.summary} ${item.type || ''} ${WRITEUPS[slug] || ''}`.toLowerCase();
    // Longer words match as prefixes ("bank" finds "banks"). Short words must match whole ("act" skips "actually").
    const has = (text, word) => new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${word.length < 4 ? '\\b' : ''}`).test(text);
    return words.reduce((total, word) => total + (has(title, word) ? 3 : 0) + (has(body, word) ? 1 : 0), 0);
  }

  const tools = [
    {
      name: 'get_about',
      title: 'About Ashwanth Samuel',
      description: 'Returns who Ashwanth Samuel is, what he is working on now, and his background. Use this first when someone asks about Ashwanth.',
      inputSchema: { type: 'object', properties: {} },
      annotations: { readOnlyHint: true },
      async execute() {
        const doc = await loadPage('/');
        return reply({
          name: 'Ashwanth Samuel',
          now: clean(doc.querySelector('.lede')?.textContent),
          background: clean(doc.querySelector('.lede + p')?.textContent),
          location: clean(doc.querySelector('.footer .place')?.textContent),
          sections: {
            Stablecoins: `${SITE}/writing`,
            'Trivial Pursuits': `${SITE}/side-projects`,
          },
          tip: 'Use search_site to find specific writing or projects, and get_contact to reach him.',
        });
      },
    },
    {
      name: 'search_site',
      title: 'Search writing and projects',
      description: 'Finds Ashwanth\'s writing, research papers, and talks on stablecoins and payments, plus his side projects and personal essays (Trivial Pursuits). Returns titles, dates, summaries, and links. Leave query empty to list everything in a section.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Topic or keywords, such as "GENIUS Act", "bank", "violin", or "credit report". Leave empty to list everything.' },
          section: { type: 'string', enum: ['All', 'Stablecoins', 'Trivial Pursuits'], description: 'Where to search. Stablecoins holds his writing, research, and talks. Trivial Pursuits holds side projects and personal essays.' },
          limit: { type: 'integer', minimum: 1, maximum: 50, description: 'Most results to return. Defaults to 10.' },
        },
      },
      annotations: { readOnlyHint: true },
      async execute({ query = '', section = 'All', limit = 10 } = {}) {
        if (!['All', 'Stablecoins', 'Trivial Pursuits'].includes(section)) {
          return fail('section must be "All", "Stablecoins", or "Trivial Pursuits".');
        }
        const items = [
          ...(section !== 'Trivial Pursuits' ? await stablecoinItems() : []),
          ...(section !== 'Stablecoins' ? await trivialPursuitItems() : []),
        ];
        const words = clean(query).toLowerCase().split(' ').filter((word) => word.length > 1);
        const count = Math.max(1, Math.min(Number(limit) || 10, 50));
        const results = words.length
          ? items.map((item) => ({ item, score: score(item, words) })).filter((r) => r.score > 0).sort((a, b) => b.score - a.score).map((r) => r.item)
          : items;
        return reply({
          query: clean(query),
          section,
          total: results.length,
          results: results.slice(0, count),
          tip: results.length ? 'Use read_writeup to read a Trivial Pursuits write-up in full.' : 'No matches. Try a broader word, or leave query empty to list a section.',
        });
      },
    },
    {
      name: 'read_writeup',
      title: 'Read a write-up',
      description: 'Returns the full text of one of Ashwanth\'s write-ups on this site: the violin gig pedal, the medical collection he got removed, Seenly, or Civic Pulse.',
      inputSchema: {
        type: 'object',
        properties: {
          page: {
            type: 'string',
            enum: Object.keys(WRITEUPS),
            description: `Which write-up to read. ${Object.entries(WRITEUPS).map(([slug, about]) => `"${slug}": ${about}`).join(' ')}`,
          },
        },
        required: ['page'],
      },
      annotations: { readOnlyHint: true },
      async execute({ page } = {}) {
        if (!WRITEUPS[page]) return fail(`page must be one of: ${Object.keys(WRITEUPS).join(', ')}.`);
        const doc = await loadPage(`/${page}`);
        const blocks = [...doc.querySelectorAll('main > .prose > *, main > .callout, main > figure figcaption, main > .photo-grid figcaption')]
          .map((el) => {
            const text = clean(el.textContent);
            if (!text) return '';
            if (el.matches('h2')) return `## ${text}`;
            if (el.matches('figcaption')) return `[Photo: ${text}]`;
            if (el.matches('.callout')) return `> ${text}`;
            if (el.matches('ol')) return [...el.querySelectorAll('li')].map((li, i) => `${i + 1}. ${clean(li.textContent)}`).join('\n');
            return text;
          })
          .filter(Boolean);
        const video = doc.querySelector('.essay-video source, .video iframe');
        return reply({
          title: clean(doc.querySelector('h1')?.textContent),
          subtitle: clean(doc.querySelector('.dek')?.textContent) || undefined,
          date: clean(doc.querySelector('.dateline')?.textContent),
          url: `${SITE}/${page}`,
          video: video ? absolute(video.getAttribute('src')) : undefined,
          text: blocks.join('\n\n'),
        });
      },
    },
    {
      name: 'get_contact',
      title: 'Contact Ashwanth',
      description: 'Returns how to reach Ashwanth Samuel: email, a link to book time on his calendar, and his social profiles.',
      inputSchema: { type: 'object', properties: {} },
      annotations: { readOnlyHint: true },
      async execute() {
        const doc = await loadPage('/');
        const contact = doc.querySelector('#contact + p');
        const links = [...(contact?.querySelectorAll('a') || [])];
        const email = links.find((a) => a.href.startsWith('mailto:'));
        const calendar = links.find((a) => /calendly/.test(a.href));
        return reply({
          email: email ? email.getAttribute('href').replace('mailto:', '') : undefined,
          book_time: calendar ? calendar.getAttribute('href') : undefined,
          profiles: [...doc.querySelectorAll('.footer a')].map((a) => ({ name: clean(a.textContent), url: a.getAttribute('href') })),
        });
      },
    },
  ];

  // Register the whole set together, and roll back if any tool fails.
  const controller = new AbortController();
  Promise.all(tools.map((tool) => modelContext.registerTool(tool, { signal: controller.signal })))
    .catch((error) => {
      controller.abort();
      console.warn('WebMCP tools were not registered:', error);
    });
})();
