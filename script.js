const postsContianer=document.querySelector('.post-continer');
const loading=document.querySelector('.loader');
const filter=document.getElementById('filter');
//////////////////////////////////////////////////////////////
let limit=5;
let page=1;

 async function getsPOST(){
    const res=await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data=await res.json();
    return data;
 }

 //show posts
 async function showPost(){
    const posts=await getsPOST();
    posts.forEach(post=>{
        const postEL=document.createElement('div');
        postEL.classList.add('post');
        postEL.innerHTML=`<div class='number'>${post.id}</div>
        <div class='post-info>
        <h2 class='post-title'>${post.title}</h2>
        <p class='post-body'>${post.body}</p>
        </div>`;

        postsContianer.appendChild(postEL)
    });
 }
 //show loader
 function showLoading(){
    loading.classList.add('show');
    setTimeout(()=>{
        loading.classList.remove('show');
        setTimeout(()=>{
            page++;
            showPost();
        },300)
        
    },1000)
 }
 //filter posts
 function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
      const titleElement = post.querySelector('.post-title');
      const bodyElement = post.querySelector('.post-body');
      const title = titleElement ? titleElement.innerText.toUpperCase() : '';
      const body = bodyElement ? bodyElement.innerText.toUpperCase() : '';
      if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
        post.style.display = 'flex';
      } else {
        post.style.display = 'none';
      }
    });
  }
 //initial post
 showPost();

 window.addEventListener('scroll',()=>{
    const {scrollTop,scrollHeight,clientHeight}=document.documentElement;
    if(scrollTop+clientHeight>=scrollHeight-5){
        showLoading();
    }

    
 })

 ////filter evnet listner
 filter.addEventListener('input',filterPosts);