if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>c(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>d[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/740OyXqc8dxMIe1kCLG4b/_buildManifest.js",revision:"bd113002be0a168547265fa52631c728"},{url:"/_next/static/740OyXqc8dxMIe1kCLG4b/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1681-04e4f243d5028979.js",revision:"04e4f243d5028979"},{url:"/_next/static/chunks/5551-67faef245ba417d6.js",revision:"67faef245ba417d6"},{url:"/_next/static/chunks/5675-34e70fd0a6e7030e.js",revision:"34e70fd0a6e7030e"},{url:"/_next/static/chunks/622-55b6a43a0c600f48.js",revision:"55b6a43a0c600f48"},{url:"/_next/static/chunks/70-62bd16bddec277ff.js",revision:"62bd16bddec277ff"},{url:"/_next/static/chunks/7517-84c2f9c31bf3b40b.js",revision:"84c2f9c31bf3b40b"},{url:"/_next/static/chunks/7848-dc51de1f6fd3c515.js",revision:"dc51de1f6fd3c515"},{url:"/_next/static/chunks/9997-0131eabb6d64751c.js",revision:"0131eabb6d64751c"},{url:"/_next/static/chunks/ea88be26-79ce1c3feb943cea.js",revision:"79ce1c3feb943cea"},{url:"/_next/static/chunks/framework-3671d8951bf44e4e.js",revision:"3671d8951bf44e4e"},{url:"/_next/static/chunks/main-5b43a55baddbeb05.js",revision:"5b43a55baddbeb05"},{url:"/_next/static/chunks/pages/_app-1d73d3a5b433aec8.js",revision:"1d73d3a5b433aec8"},{url:"/_next/static/chunks/pages/_error-bd1da5a6907513b5.js",revision:"bd1da5a6907513b5"},{url:"/_next/static/chunks/pages/admin-14d69ab05522cbc0.js",revision:"14d69ab05522cbc0"},{url:"/_next/static/chunks/pages/index-c6e9494461ba8a00.js",revision:"c6e9494461ba8a00"},{url:"/_next/static/chunks/pages/student/class/jobsearch-2d339573c67355a3.js",revision:"2d339573c67355a3"},{url:"/_next/static/chunks/pages/student/class/students-47bddc6a5fc844c8.js",revision:"47bddc6a5fc844c8"},{url:"/_next/static/chunks/pages/student/enter-1d9eece25db705c9.js",revision:"1d9eece25db705c9"},{url:"/_next/static/chunks/pages/student/finance/deposit-7a8bf9ad661327f4.js",revision:"7a8bf9ad661327f4"},{url:"/_next/static/chunks/pages/student/finance/invest-13a04e434210d7c9.js",revision:"13a04e434210d7c9"},{url:"/_next/static/chunks/pages/student/gov/exchequer-45ddb117485994e1.js",revision:"45ddb117485994e1"},{url:"/_next/static/chunks/pages/student/gov/job-8e7b05ef6e332325.js",revision:"8e7b05ef6e332325"},{url:"/_next/static/chunks/pages/student/gov/rule-fce6339dbc172528.js",revision:"fce6339dbc172528"},{url:"/_next/static/chunks/pages/student/home-d808d99b19278972.js",revision:"d808d99b19278972"},{url:"/_next/static/chunks/pages/student/home/asset-600c5e51a0cc1fd2.js",revision:"600c5e51a0cc1fd2"},{url:"/_next/static/chunks/pages/student/home/coupon-f7062e4c7d77ce40.js",revision:"f7062e4c7d77ce40"},{url:"/_next/static/chunks/pages/student/home/exchequer-dcbdd2317d4fc672.js",revision:"dcbdd2317d4fc672"},{url:"/_next/static/chunks/pages/student/login-bb2a2c30ec626ec4.js",revision:"bb2a2c30ec626ec4"},{url:"/_next/static/chunks/pages/student/shop/create-239fc277e63d6590.js",revision:"239fc277e63d6590"},{url:"/_next/static/chunks/pages/student/shop/student-aa7b14ad62322de4.js",revision:"aa7b14ad62322de4"},{url:"/_next/static/chunks/pages/student/shop/student/%5Bpid%5D-a4a98cc904bf7276.js",revision:"a4a98cc904bf7276"},{url:"/_next/static/chunks/pages/student/shop/teacher-e64040a8b7cba93f.js",revision:"e64040a8b7cba93f"},{url:"/_next/static/chunks/pages/student/shop/teacher/%5Bpid%5D-5243b9531d87a20e.js",revision:"5243b9531d87a20e"},{url:"/_next/static/chunks/pages/student/signup-ddd06e78319a7356.js",revision:"ddd06e78319a7356"},{url:"/_next/static/chunks/pages/student/test-118b0de4e83b102c.js",revision:"118b0de4e83b102c"},{url:"/_next/static/chunks/pages/student/test2-3560a33135c9aec5.js",revision:"3560a33135c9aec5"},{url:"/_next/static/chunks/pages/student/test3-3b06a0790d1a0b02.js",revision:"3b06a0790d1a0b02"},{url:"/_next/static/chunks/pages/teacher/class/coupons-4e504e9d4e1d7caa.js",revision:"4e504e9d4e1d7caa"},{url:"/_next/static/chunks/pages/teacher/class/jobsearch-25320db4a04b2d10.js",revision:"25320db4a04b2d10"},{url:"/_next/static/chunks/pages/teacher/class/property-ecab84790151a613.js",revision:"ecab84790151a613"},{url:"/_next/static/chunks/pages/teacher/class/students-1e994fe6df772934.js",revision:"1e994fe6df772934"},{url:"/_next/static/chunks/pages/teacher/create-781b70619596502e.js",revision:"781b70619596502e"},{url:"/_next/static/chunks/pages/teacher/finance/deposit-d2b7cc39f0c93dfb.js",revision:"d2b7cc39f0c93dfb"},{url:"/_next/static/chunks/pages/teacher/finance/invest-8348b13f2df5b1c3.js",revision:"8348b13f2df5b1c3"},{url:"/_next/static/chunks/pages/teacher/gov/exchequer-f9e197c88e46ef8b.js",revision:"f9e197c88e46ef8b"},{url:"/_next/static/chunks/pages/teacher/gov/job-3c0400803dca7e62.js",revision:"3c0400803dca7e62"},{url:"/_next/static/chunks/pages/teacher/gov/rule-369a7699d1193e58.js",revision:"369a7699d1193e58"},{url:"/_next/static/chunks/pages/teacher/login-498691ae80854296.js",revision:"498691ae80854296"},{url:"/_next/static/chunks/pages/teacher/shop/create-235610b2de2da00a.js",revision:"235610b2de2da00a"},{url:"/_next/static/chunks/pages/teacher/shop/my-2b51901ed17529c7.js",revision:"2b51901ed17529c7"},{url:"/_next/static/chunks/pages/teacher/shop/my/%5Bpid%5D-606a761f1fd1a10e.js",revision:"606a761f1fd1a10e"},{url:"/_next/static/chunks/pages/teacher/shop/student-6e42398850dc8ba7.js",revision:"6e42398850dc8ba7"},{url:"/_next/static/chunks/pages/teacher/shop/student/%5Bpid%5D-ea07781d21f492e6.js",revision:"ea07781d21f492e6"},{url:"/_next/static/chunks/pages/teacher/signup-c9a2ba5bf7276593.js",revision:"c9a2ba5bf7276593"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-ac85c2766400df59.js",revision:"ac85c2766400df59"},{url:"/_next/static/css/454fc7cac7b64ec0.css",revision:"454fc7cac7b64ec0"},{url:"/assets/account.png",revision:"32ef6b90033f3f6ebdff61b3d8b8bb6c"},{url:"/assets/bracket.png",revision:"98a78b5e482c0c18584763765ca49e8d"},{url:"/assets/create/create_illust_11.png",revision:"816473e2f71841f6a0814f3cda5cf541"},{url:"/assets/create/create_illust_22.png",revision:"e47e3c2398e5d76453ec41d589b42c04"},{url:"/assets/create/create_illust_33.jpg",revision:"20a8ab0dbf0f127ef324cf07f6fb4b07"},{url:"/assets/deposit/deposit_guide_1.png",revision:"4f791b967612ac21bc294d65c6edec9c"},{url:"/assets/deposit/deposit_guide_2.png",revision:"5801866a6685965750b72a443285a962"},{url:"/assets/deposit/deposit_guide_3.png",revision:"11dc9cd126958baf998a7919782265b4"},{url:"/assets/enter/enter_image.png",revision:"16586243fd991c8ff0521eefe8b9e08c"},{url:"/assets/guide/14.jpg",revision:"e2d8ecd8fb9bf704e82726f0f9ecb0d1"},{url:"/assets/guide/background1.jpg",revision:"385307fd48f8b2e71b1e827818562301"},{url:"/assets/guide/background2.jpg",revision:"86855b9b489da4d2870f53d1cd129dcb"},{url:"/assets/guide/background3.jpg",revision:"a06d490525be235144f6b51675f374fe"},{url:"/assets/guide/background4.jpg",revision:"20a8ab0dbf0f127ef324cf07f6fb4b07"},{url:"/assets/guide/deco_1.jpg",revision:"ef2ad3bbba1283be9dcebfc197b230bb"},{url:"/assets/guide/deco_2.jpg",revision:"730bb7231103efc19cb6eaebb94e7403"},{url:"/assets/guide/deco_3.jpg",revision:"04a23fb05344ee32e4dcbfd149b0c707"},{url:"/assets/home/coupon.png",revision:"8c35cb0a5bca78b1e648c54b2cb39464"},{url:"/assets/home/deposit.png",revision:"d7f0fc1b7ae136057d9e849c32c56f39"},{url:"/assets/home/exchequer.png",revision:"b1727ea44eea8adb43371c38d420bb5d"},{url:"/assets/home/stock.png",revision:"fb06184d4a396e222f9b36bac3b70897"},{url:"/assets/icon_desktop.png",revision:"30412d169d509eafe53528181acb3313"},{url:"/assets/job/firefighter.png",revision:"cdf12fa6f593a125afe46ec32268f6d8"},{url:"/assets/job/weather_caster.png",revision:"4c0a0b8f7002d2898c151f4e1735ee80"},{url:"/assets/job/worker_female.png",revision:"2df687db294893046b8843bd903f1ea8"},{url:"/assets/job/worker_male.png",revision:"ae6709260b369b42734f6ac08ee1839c"},{url:"/assets/login/login_illust.png",revision:"4fe66baae98ff55c12a9d242e2147917"},{url:"/assets/login/login_illust_2.jpg",revision:"abcf200dad2b43d6459b268d84257a51"},{url:"/assets/signup/illust.jpg",revision:"7b5290eedb4fb0bac6cc4d0c4a96d6d3"},{url:"/assets/signup/illust.png",revision:"3a9499aad5d3737817ab1c291b696156"},{url:"/favicon.ico",revision:"1b4ea62c745dfb612fb78843e13f2b33"},{url:"/icons/apple-touch-icon-114x114.png",revision:"8b5afa01f8f3c65d890887c63e36bac9"},{url:"/icons/apple-touch-icon-120x120.png",revision:"63032890888c8e1015a793d9328e4521"},{url:"/icons/apple-touch-icon-144x144.png",revision:"20709864fd1aeb1f9e2a220ec19eb9ab"},{url:"/icons/apple-touch-icon-152x152.png",revision:"6cb9fc38b7b4fc7500a14545e5dea663"},{url:"/icons/apple-touch-icon-57x57.png",revision:"b9653b3fd38df630a405ce8743882281"},{url:"/icons/apple-touch-icon-60x60.png",revision:"7344e42345289e31e38f8c79ddc2ae01"},{url:"/icons/apple-touch-icon-72x72.png",revision:"52bee5411a1c0b29198f5669e9967c19"},{url:"/icons/apple-touch-icon-76x76.png",revision:"593db0a21371575ed921835ad3b383fc"},{url:"/icons/code.txt",revision:"aa1202c4cbd6457b40c635bd985ab3db"},{url:"/icons/favicon-128.png",revision:"5e2efde2e370b1e938d444d544035f41"},{url:"/icons/favicon-16x16.png",revision:"d81470663d3e97ec6ce3e4906df6b067"},{url:"/icons/favicon-196x196.png",revision:"fc8516b60e3102bfb92647d3180c870f"},{url:"/icons/favicon-32x32.png",revision:"01a85e52a50d69b4a45bcd089cba9d9d"},{url:"/icons/favicon-96x96.png",revision:"2a7edaac22e4e96c855d16d4ad3e15ed"},{url:"/icons/mstile-144x144.png",revision:"20709864fd1aeb1f9e2a220ec19eb9ab"},{url:"/icons/mstile-150x150.png",revision:"03eff1589ea042aee04f570f95b550a5"},{url:"/icons/mstile-310x150.png",revision:"cf4d55c5dd7f8d325bb87ad4db6ebf2e"},{url:"/icons/mstile-310x310.png",revision:"6518c96e4c297e05563bd211b7162224"},{url:"/icons/mstile-70x70.png",revision:"5e2efde2e370b1e938d444d544035f41"},{url:"/manifest.json",revision:"002bc01cb078c2cff2b5dd08cc433ff0"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
