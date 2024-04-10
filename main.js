// ==UserScript==
// @name   bypass discourse-gated-topics-in-category
// @namespace   Violentmonkey Scripts
// @match       *://*/t/*/*
// @grant       none
// @version     1.0
// @author      hawm
// @description A userscript to bypass the discourse-gated-topics-in-category theme component
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

VM.observe(document.body, ()=>{
  if(document.body.classList.contains('topic-in-gated-category')){
    // clear style
    document.body.classList.remove('topic-in-gated-category')
    // hide banner
    document.querySelector('.topic-above-post-stream-outlet.topic-in-gated-category').style.display = 'none'
  }
})
