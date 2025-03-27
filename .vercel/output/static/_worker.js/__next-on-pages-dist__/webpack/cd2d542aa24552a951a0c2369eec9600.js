var l={},N=(k,v,M)=>(l.__chunk_6834=(u,S,b)=>{"use strict";var x=Object.create,i=Object.defineProperty,y=Object.getOwnPropertyDescriptor,d=Object.getOwnPropertyNames,j=Object.getPrototypeOf,O=Object.prototype.hasOwnProperty,c=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of d(t))O.call(e,r)||r===n||i(e,r,{get:()=>t[r],enumerable:!(o=y(t,r))||o.enumerable});return e},C=((e,t)=>function(){return t||(0,e[d(e)[0]])((t={exports:{}}).exports,t),t.exports})({"../../node_modules/dedent-tabs/dist/dedent-tabs.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){for(var n=typeof t=="string"?[t]:t.raw,o="",r=0;r<n.length;r++)if(o+=n[r].replace(/\\\n[ \t]*/g,"").replace(/\\`/g,"`").replace(/\\\$/g,"$").replace(/\\\{/g,"{"),r<(1>=arguments.length?0:arguments.length-1)){var q=o.substring(o.lastIndexOf(`
`)+1).match(/^(\s*)\S?/);o+=((1>r+1||arguments.length<=r+1?void 0:arguments[r+1])+"").replace(/\n/g,`
`+q[1])}var _=o.split(`
`),a=null;if(_.forEach(function(s){var R=Math.min,h=s.match(/^(\s+)\S+/);if(h){var m=h[1].length;a=a?R(a,m):m}}),a!==null){var P=a;o=_.map(function(s){return s[0]===" "||s[0]==="	"?s.slice(P):s}).join(`
`)}return o.trim().replace(/\\n/g,`
`)}}}),p={};((e,t)=>{for(var n in t)i(e,n,{get:t[n],enumerable:!0})})(p,{getOptionalRequestContext:()=>g,getRequestContext:()=>E}),u.exports=c(i({},"__esModule",{value:!0}),p),b(3010);var f=((e,t,n)=>(n=e!=null?x(j(e)):{},c(!t&&e&&e.__esModule?n:i(n,"default",{value:e,enumerable:!0}),e)))(C()),w=Symbol.for("__cloudflare-request-context__");function g(){let e=v[w];if((process?.release?.name==="node"?"nodejs":"edge")=="nodejs")throw Error(f.default`
			\`getRequestContext\` and \`getOptionalRequestContext\` can only be run
			inside the edge runtime, so please make sure to have included
			\`export const runtime = 'edge'\` in all the routes using such functions
			(regardless of whether they are used directly or indirectly through imports).
		`);return e}function E(){let e=g();if(!e)throw process?.env?.NEXT_PHASE==="phase-production-build"?Error(f.default`
				\n\`getRequestContext\` is being called at the top level of a route file, this is not supported
				for more details see https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/troubleshooting/#top-level-getrequestcontext \n
			`):Error("Failed to retrieve the Cloudflare request context.");return e}},l.__chunk_5430=u=>{u.exports={videoDisplay:"Videos_videoDisplay__PtcpB",videoContainer:"Videos_videoContainer__ESUjU",videosContainer:"Videos_videosContainer__N39Mp",videosList:"Videos_videosList__XCURK"}},l.__chunk_3010=()=>{},l);export{N as __getNamedExports};
