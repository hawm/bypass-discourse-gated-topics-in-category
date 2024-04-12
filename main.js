// ==UserScript==
// @name   bypass discourse-gated-topics-in-category
// @namespace   https://github.com/hawm/bypass-discourse-gated-topics-in-category
// @grant       none
// @version     1.3
// @author      hawm
// @homepageURL https://github.com/hawm/bypass-discourse-gated-topics-in-category
// @downloadURL https://raw.githubusercontent.com/hawm/bypass-discourse-gated-topics-in-category/main/main.js
// @description A userscript to bypass the discourse-gated-topics-in-category theme component
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
if(typeof Discourse !== 'undefined'){
  // for init page
  bypass();
  // for page change
  observer.observe(document.body, {attributeFilter: ['class']});
}
