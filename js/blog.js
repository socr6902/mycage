// Just list .html files in /posts manually in an array (simple & static)
const POSTS = [
    { file:"2025-08-01-first-post.html", title:"first post", date:"2025-08-01" },
    { file:"2025-08-10-another-post.html", title:"another post", date:"2025-08-10" },
    // add more here when you create a new post in /posts
  ];
  
  const ul = document.getElementById('postList');
  POSTS.sort((a,b)=> b.date.localeCompare(a.date)).forEach(p=>{
    const li = document.createElement('li');
    li.innerHTML = `<a href="/posts/${p.file}">${p.title}</a> <span style="margin-left:auto; font-family:monospace">${p.date}</span>`;
    ul.appendChild(li);
  });
  