// HTMLElement.click()
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
// https://developer.mozilla.org/en-US/docs/Web/API/Location
// https://developer.mozilla.org/en-US/docs/Web/API/Location/assign

/*


 // for redirecting to another page from one page in case of redirect event.
 window.location.assign(
 "https://petrobyte.com/a/b/c?d=e&f=g"
 );
 // in case of no back for this redirect.
 window.location.replace(
 "https://developer.mozilla.org/en-US/docs/Web/API/Location.reload"
 );


 // breakdown the url [href]
 let anchor = document.createElement('a');
 anchor = "https://developer.mozilla.org/en-US/docs/Web/API/?a=b&c=d#e-f_g";
 //anchor.href
 console.log(anchor.href); // "https://developer.mozilla.org/en-US/docs/Web/API/?a=b&c=d#e-f_g"
 //anchor.origin
 console.log(anchor.origin); // "https://developer.mozilla.org"
 //anchor.pathname
 console.log(anchor.pathname); // "/en-US/docs/Web/API/"
 //anchor.port
 console.log(anchor.port); // ""
 //anchor.protocol
 console.log(anchor.protocol); // "https:"
 //anchor.host
 console.log(anchor.host); // "developer.mozilla.org"
 //anchor.hostname
 console.log(anchor.hostname); // "developer.mozilla.org"
 //anchor.hash
 console.log(anchor.hash); // "#e-f_g"
 //anchor.search
 console.log(anchor.search); // "?a=b&c=d"
 // Further parsing:
 const params = new URLSearchParams(anchor.search);
 const q = parseInt(params.get(a)); // b


 */