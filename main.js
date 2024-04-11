// ==UserScript==
// @name   bypass discourse-gated-topics-in-category
// @namespace   Violentmonkey Scripts
// @grant       none
// @version     1.2
// @author      hawm
// @description A userscript to bypass the discourse-gated-topics-in-category theme component
// @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// ==/UserScript==

const gatedClassName = 'topic-in-gated-category';

function isGatedTopic(){
  return document.body.classList.contains(gatedClassName);
}

function bypassGated(){
  // clear style
  document.body.classList.remove(gatedClassName);
  // hide banner
  document.querySelector(`.topic-above-post-stream-outlet.${gatedClassName}`).style.display = 'none';
}

function bypass(){
  isGatedTopic() && bypassGated();
}

const observer = new MutationObserver((record, observer)=>{
  bypass();
});

// apply on Discourse powered website only
if(Discourse){
  // for init page
  bypass();
  // for page change
  observer.observe(document.body, {attributeFilter: ['class']});
}
