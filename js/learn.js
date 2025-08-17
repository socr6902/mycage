const NOTES = [
    { title:"string theory 101", tags:["physics","cosmos"], blurb:"notes on branes & extra dimensions", link:"#"},
    { title:"braitenberg vehicles", tags:["robotics","cog-sci"], blurb:"simple agents, surprising behavior", link:"#"},
    { title:"web retro sprites", tags:["code","design"], blurb:"exporting tiny GIF sprites that don’t look crunchy", link:"#"},
    // add more…
  ];
  
  const filtersEl = document.getElementById('filters');
  const cardsEl = document.getElementById('cards');
  
  const allTags = [...new Set(NOTES.flatMap(n => n.tags))].sort();
  const state = new Set(); // selected tags
  
  function renderFilters(){
    filtersEl.innerHTML = '';
    allTags.forEach(tag=>{
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = tag;
      b.onclick = () => { state.has(tag) ? state.delete(tag) : state.add(tag); render(); };
      filtersEl.appendChild(b);
    });
    const clear = document.createElement('button');
    clear.className='btn'; clear.textContent='clear';
    clear.onclick = ()=>{ state.clear(); render(); };
    filtersEl.appendChild(clear);
  }
  
  function render(){
    cardsEl.innerHTML = '';
    const show = NOTES.filter(n => state.size===0 || n.tags.some(t => state.has(t)));
    show.forEach(n=>{
      const card = document.createElement('article');
      card.className = 'win';
      card.innerHTML = `
        <div class="titlebar"><span>${n.title}</span></div>
        <div class="content">
          <p>${n.blurb}</p>
          <div>${n.tags.map(t=>`<span class="tag">${t}</span>`).join(' ')}</div>
          ${n.link ? `<p><a class="btn" href="${n.link}" target="_blank" rel="noreferrer">open</a></p>`:''}
        </div>
      `;
      cardsEl.appendChild(card);
    });
  }
  
  renderFilters(); render();
  