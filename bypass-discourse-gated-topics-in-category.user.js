// ==UserScript==
// @name   bypass discourse-gated-topics-in-category
// @namespace   https://github.com/hawm/bypass-discourse-gated-topics-in-category
// @grant       none
// @version     1.6
// @author      hawm
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE4ElEQVR4AcWXY4ArSRSFk8GzjaSrk07GVvJs27Zt27Zt27Zt2xjtaL179lY/prczXPw47a7z1a1bt6s1ALSJkZGJmSUmNpAEtsjI2CVJEEPp/CcuuveBzi+Q5pFqGfRC+sS2myCAxJhEjS4ixZEZEqlIgppE+9zJBhB1+rTSp0Z+IyGZijIKrEuSAeglM718i4R/QtTeLkk0ZEwUAI2vP4Uv1G5jjEEnCMgvMJJ8zA0SAcIukbLHC0APukp2zBmZ1DS5YIqHLw74BuOynxWX/K046BuC6R5+qGdyhZgwyBmjnqVVBTCJxvREeE8lfChnNGMfmd4KKIBbQRY8sgbieSF/vC7ki9cWb7wI9sYzawBOBAaisuQCQ/wgC1QB6MYs5cO8oc4uHrhNxjcDrXhe0B9vC3njbZkghI6sh/BNXRB5ZhAiLwxBxN5eCJvVHB8alcRAtwSjUcEGgMbVk2e7sudtXNxl8zvBIXhT2BdvSwQgfEUHRH+Yjuh3UxH9fpqt+LXQGYg6MwSzaxeOD4IibXD+CkBma5QPFTJIuCmbW/CWzN/VKYqo++NVjNUV82EGGnUsCkkn2EvKejKAQa/P/rmi4Ys4+QqvANwIsOI1N69ZGFEvJitMEtaR+4ORs345SHpViCMyAB00U94MEo24S73nyfaGEu2HG6OTbM4V93EG/Nc1gK54FTWA3yjyOQmALVHe7OLqgesEwMc9dFLjZJlzRdFwDTjSAmlmToGUX6dSoMRaGv5hUd6guS4n3luLF6KeTEg2ANeay73gsHwg8peprZYHozSSIL6zoSIt8vLHQ0sQ3jcrxbM6RQAHbw+Cw7zayNxnkUpVFVdpaBOlBJjr6YdHlkCEjm2gyPqka9fN/nCYUxqp512FKV9eZZHbppEUAFzD3b0pAYMQNq9lisy5Zp/tTBGoAKd1z2HKk0cRATsAdUyuFIFghM1pQRFIGUCDnfXhsLA1nFY/UQEQl6kC8BJ8KdCC0BF1UzQEH+jdjHMKwmHFNKSZcZJmQj4ovIapAnD1dPXE67rFER02M9kAw4+1gWZ2MBw23kLWrlOVM4DnQBW7AK6kZ37+iHo8IVnz/+qTUUjDe7+4GzQ7Y6AvWFbp8QutHbPaBShvNONN7RJJnobc/OHL8RCXlIR2TjFoNz9B2ikH1QrRrs+lmKkCdKNqGL66Y5Jz4MT9odAtKk7mheGw/hS0Wz+CBRSy+0lWj4DAMD/Yj8xtexZLtT2O9OWc9Lnmz8SVx6PQfHcDOMyyytPOYcNlaLZHIG/FRmrLugs5smV1tAugI4DLYxrLBtzw6uPhGHykOdxWtoS0oiUa7qiBHodayGq0qz7MS0tDMzMQDnNLU8bPgmbLRzhseoP8Zevwzig79wcBWLi5XQCznuHG1bEYcWAsgqb0Qqbu3ZGtwyjkatANOZv2R6rlZ+GwbguZzYPjitnQrlpB4b4AzbYoaLeHI3P/xTC4edtbjIyxWZJJghj5t4dEEYJOhCkvzVtdfmXxkBNKV6wKsrcajsy95yFzv0XI2mky8lRvBaPkau/7z7UrT67czrYAjMkA/77YPqMgyivi/wNgHs351Ko/JhTSfw2Aku0V7aspTP99ACqxj6jdbmbBoAi5KgB7QS+Ff6fQROjDF5HZG9rfIMMttB9E58HqZur6C5qnka1PYhKsAAAAAElFTkSuQmCC
// @homepageURL https://github.com/hawm/bypass-discourse-gated-topics-in-category
// @downloadURL https://raw.githubusercontent.com/hawm/bypass-discourse-gated-topics-in-category/main/bypass-discourse-gated-topics-in-category.user.js
// @description A userscript to bypass the discourse-gated-topics-in-category theme component
// ==/UserScript==

"use strict";

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
