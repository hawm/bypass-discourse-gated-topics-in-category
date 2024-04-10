// ==UserScript==
// @name   bypass discourse-gated-topics-in-category
// @namespace   Violentmonkey Scripts
// @match       *://*/t/*/*
// @grant       none
// @version     1.1
// @author      hawm
// @description A userscript to bypass the discourse-gated-topics-in-category theme component
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

const gatedClassName = 'topic-in-gated-category';

function bypass(){
  console.log(document.body.classList)
  if(document.body.classList.contains(gatedClassName)){
    // clear style
    document.body.classList.remove(gatedClassName);
    // hide banner
    document.querySelector(`.topic-above-post-stream-outlet.${gatedClassName}`).style.display = 'none';
  }
}

const observer = new MutationObserver(bypass);

observer.observe(document.body, {attributeFilter: ['class']})
