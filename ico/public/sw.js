if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/XLnJwCMUolSF7NyY5uIq3/_buildManifest.js",revision:"4abfb433c3c322e77e5b52d3dcb6543b"},{url:"/_next/static/XLnJwCMUolSF7NyY5uIq3/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1681-7bf4de94ab660e42.js",revision:"7bf4de94ab660e42"},{url:"/_next/static/chunks/3414-d69cfbdef5c7b7c1.js",revision:"d69cfbdef5c7b7c1"},{url:"/_next/static/chunks/3625-88e6a138bbfaa5fe.js",revision:"88e6a138bbfaa5fe"},{url:"/_next/static/chunks/5551-157a01e5ac983479.js",revision:"157a01e5ac983479"},{url:"/_next/static/chunks/5675-34e70fd0a6e7030e.js",revision:"34e70fd0a6e7030e"},{url:"/_next/static/chunks/70-62bd16bddec277ff.js",revision:"62bd16bddec277ff"},{url:"/_next/static/chunks/9997-0131eabb6d64751c.js",revision:"0131eabb6d64751c"},{url:"/_next/static/chunks/ea88be26-79ce1c3feb943cea.js",revision:"79ce1c3feb943cea"},{url:"/_next/static/chunks/framework-3671d8951bf44e4e.js",revision:"3671d8951bf44e4e"},{url:"/_next/static/chunks/main-5b43a55baddbeb05.js",revision:"5b43a55baddbeb05"},{url:"/_next/static/chunks/pages/_app-157d5e3ac449f011.js",revision:"157d5e3ac449f011"},{url:"/_next/static/chunks/pages/_error-bd1da5a6907513b5.js",revision:"bd1da5a6907513b5"},{url:"/_next/static/chunks/pages/admin-4879dd8bc84a9b5d.js",revision:"4879dd8bc84a9b5d"},{url:"/_next/static/chunks/pages/index-c2d8f944fcc45b7f.js",revision:"c2d8f944fcc45b7f"},{url:"/_next/static/chunks/pages/student/class/jobsearch-73dee0ff9c49b9db.js",revision:"73dee0ff9c49b9db"},{url:"/_next/static/chunks/pages/student/class/students-be82baf1f1c4fff4.js",revision:"be82baf1f1c4fff4"},{url:"/_next/static/chunks/pages/student/enter-38b056695fee8f60.js",revision:"38b056695fee8f60"},{url:"/_next/static/chunks/pages/student/finance/guide-dd1c29496aa87e95.js",revision:"dd1c29496aa87e95"},{url:"/_next/static/chunks/pages/student/finance/invest-9150be553c1e5ea1.js",revision:"9150be553c1e5ea1"},{url:"/_next/static/chunks/pages/student/gov/exchequer-741e38a2a399ca54.js",revision:"741e38a2a399ca54"},{url:"/_next/static/chunks/pages/student/gov/job-1b64870c855305df.js",revision:"1b64870c855305df"},{url:"/_next/static/chunks/pages/student/gov/rule-4385b0689d163e35.js",revision:"4385b0689d163e35"},{url:"/_next/static/chunks/pages/student/home-854ba760f91e24ff.js",revision:"854ba760f91e24ff"},{url:"/_next/static/chunks/pages/student/home/asset-f82f2bebba2a2425.js",revision:"f82f2bebba2a2425"},{url:"/_next/static/chunks/pages/student/home/coupon-8e9b6b0cb523aa67.js",revision:"8e9b6b0cb523aa67"},{url:"/_next/static/chunks/pages/student/home/exchequer-e1539325438c93e6.js",revision:"e1539325438c93e6"},{url:"/_next/static/chunks/pages/student/login-e33196521c9b85e4.js",revision:"e33196521c9b85e4"},{url:"/_next/static/chunks/pages/student/shop/create-0d263bd16ebd334a.js",revision:"0d263bd16ebd334a"},{url:"/_next/static/chunks/pages/student/shop/student-4f2a575663e080c0.js",revision:"4f2a575663e080c0"},{url:"/_next/static/chunks/pages/student/shop/student/%5Bpid%5D-a4a98cc904bf7276.js",revision:"a4a98cc904bf7276"},{url:"/_next/static/chunks/pages/student/shop/teacher-06981d68479c7ddd.js",revision:"06981d68479c7ddd"},{url:"/_next/static/chunks/pages/student/shop/teacher/%5Bpid%5D-d70bb625788a89eb.js",revision:"d70bb625788a89eb"},{url:"/_next/static/chunks/pages/student/signup-1124b30e5967adb4.js",revision:"1124b30e5967adb4"},{url:"/_next/static/chunks/pages/student/test-118b0de4e83b102c.js",revision:"118b0de4e83b102c"},{url:"/_next/static/chunks/pages/student/test2-3560a33135c9aec5.js",revision:"3560a33135c9aec5"},{url:"/_next/static/chunks/pages/student/test3-3b06a0790d1a0b02.js",revision:"3b06a0790d1a0b02"},{url:"/_next/static/chunks/pages/teacher/class/coupons-e89aaf73edb16e57.js",revision:"e89aaf73edb16e57"},{url:"/_next/static/chunks/pages/teacher/class/jobsearch-25320db4a04b2d10.js",revision:"25320db4a04b2d10"},{url:"/_next/static/chunks/pages/teacher/class/property-3f86cd4d290bc748.js",revision:"3f86cd4d290bc748"},{url:"/_next/static/chunks/pages/teacher/class/students-32102c9925758333.js",revision:"32102c9925758333"},{url:"/_next/static/chunks/pages/teacher/create-aee3bb9458c1347d.js",revision:"aee3bb9458c1347d"},{url:"/_next/static/chunks/pages/teacher/finance/deposit-70ebd15460cb04d8.js",revision:"70ebd15460cb04d8"},{url:"/_next/static/chunks/pages/teacher/finance/invest-e7689638f7a04c5f.js",revision:"e7689638f7a04c5f"},{url:"/_next/static/chunks/pages/teacher/gov/exchequer-f69a9eb1e28ee33f.js",revision:"f69a9eb1e28ee33f"},{url:"/_next/static/chunks/pages/teacher/gov/job-29be25e99483cd50.js",revision:"29be25e99483cd50"},{url:"/_next/static/chunks/pages/teacher/gov/rule-776e5c25d42dc734.js",revision:"776e5c25d42dc734"},{url:"/_next/static/chunks/pages/teacher/login-b6bfeebbdb9aa0d2.js",revision:"b6bfeebbdb9aa0d2"},{url:"/_next/static/chunks/pages/teacher/shop/create-58b0c66f0a4b4036.js",revision:"58b0c66f0a4b4036"},{url:"/_next/static/chunks/pages/teacher/shop/my-4b631e8f7e246009.js",revision:"4b631e8f7e246009"},{url:"/_next/static/chunks/pages/teacher/shop/my/%5Bpid%5D-49058a42295683ec.js",revision:"49058a42295683ec"},{url:"/_next/static/chunks/pages/teacher/shop/student-937979f0fc64ad84.js",revision:"937979f0fc64ad84"},{url:"/_next/static/chunks/pages/teacher/shop/student/%5Bpid%5D-ea07781d21f492e6.js",revision:"ea07781d21f492e6"},{url:"/_next/static/chunks/pages/teacher/signup-4457d9202def1849.js",revision:"4457d9202def1849"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-ac85c2766400df59.js",revision:"ac85c2766400df59"},{url:"/_next/static/css/acfd06570e28306b.css",revision:"acfd06570e28306b"},{url:"/assets/account.png",revision:"32ef6b90033f3f6ebdff61b3d8b8bb6c"},{url:"/assets/bracket.png",revision:"98a78b5e482c0c18584763765ca49e8d"},{url:"/assets/create/create_illust_11.png",revision:"816473e2f71841f6a0814f3cda5cf541"},{url:"/assets/create/create_illust_22.png",revision:"e47e3c2398e5d76453ec41d589b42c04"},{url:"/assets/create/create_illust_33.jpg",revision:"20a8ab0dbf0f127ef324cf07f6fb4b07"},{url:"/assets/deposit/deposit_guide_1.png",revision:"4f791b967612ac21bc294d65c6edec9c"},{url:"/assets/deposit/deposit_guide_2.png",revision:"5801866a6685965750b72a443285a962"},{url:"/assets/deposit/deposit_guide_3.png",revision:"11dc9cd126958baf998a7919782265b4"},{url:"/assets/enter/enter_image.png",revision:"16586243fd991c8ff0521eefe8b9e08c"},{url:"/assets/guide/14.jpg",revision:"e2d8ecd8fb9bf704e82726f0f9ecb0d1"},{url:"/assets/guide/background1.jpg",revision:"385307fd48f8b2e71b1e827818562301"},{url:"/assets/guide/background2.jpg",revision:"86855b9b489da4d2870f53d1cd129dcb"},{url:"/assets/guide/background3.jpg",revision:"a06d490525be235144f6b51675f374fe"},{url:"/assets/guide/background4.jpg",revision:"20a8ab0dbf0f127ef324cf07f6fb4b07"},{url:"/assets/guide/deco_1.jpg",revision:"ef2ad3bbba1283be9dcebfc197b230bb"},{url:"/assets/guide/deco_2.jpg",revision:"730bb7231103efc19cb6eaebb94e7403"},{url:"/assets/guide/deco_3.jpg",revision:"04a23fb05344ee32e4dcbfd149b0c707"},{url:"/assets/home/coupon.png",revision:"8c35cb0a5bca78b1e648c54b2cb39464"},{url:"/assets/home/deposit.png",revision:"d7f0fc1b7ae136057d9e849c32c56f39"},{url:"/assets/home/exchequer.png",revision:"b1727ea44eea8adb43371c38d420bb5d"},{url:"/assets/home/stock.png",revision:"fb06184d4a396e222f9b36bac3b70897"},{url:"/assets/icon_desktop.png",revision:"30412d169d509eafe53528181acb3313"},{url:"/assets/job/firefighter.png",revision:"cdf12fa6f593a125afe46ec32268f6d8"},{url:"/assets/job/weather_caster.png",revision:"4c0a0b8f7002d2898c151f4e1735ee80"},{url:"/assets/job/worker_female.png",revision:"2df687db294893046b8843bd903f1ea8"},{url:"/assets/job/worker_male.png",revision:"ae6709260b369b42734f6ac08ee1839c"},{url:"/assets/login/login_illust.png",revision:"4fe66baae98ff55c12a9d242e2147917"},{url:"/assets/login/login_illust_2.jpg",revision:"abcf200dad2b43d6459b268d84257a51"},{url:"/assets/signup/illust.jpg",revision:"7b5290eedb4fb0bac6cc4d0c4a96d6d3"},{url:"/assets/signup/illust.png",revision:"3a9499aad5d3737817ab1c291b696156"},{url:"/favicon.ico",revision:"1b4ea62c745dfb612fb78843e13f2b33"},{url:"/icons/apple-touch-icon-114x114.png",revision:"8b5afa01f8f3c65d890887c63e36bac9"},{url:"/icons/apple-touch-icon-120x120.png",revision:"63032890888c8e1015a793d9328e4521"},{url:"/icons/apple-touch-icon-144x144.png",revision:"20709864fd1aeb1f9e2a220ec19eb9ab"},{url:"/icons/apple-touch-icon-152x152.png",revision:"6cb9fc38b7b4fc7500a14545e5dea663"},{url:"/icons/apple-touch-icon-57x57.png",revision:"b9653b3fd38df630a405ce8743882281"},{url:"/icons/apple-touch-icon-60x60.png",revision:"7344e42345289e31e38f8c79ddc2ae01"},{url:"/icons/apple-touch-icon-72x72.png",revision:"52bee5411a1c0b29198f5669e9967c19"},{url:"/icons/apple-touch-icon-76x76.png",revision:"593db0a21371575ed921835ad3b383fc"},{url:"/icons/code.txt",revision:"aa1202c4cbd6457b40c635bd985ab3db"},{url:"/icons/favicon-128.png",revision:"5e2efde2e370b1e938d444d544035f41"},{url:"/icons/favicon-16x16.png",revision:"d81470663d3e97ec6ce3e4906df6b067"},{url:"/icons/favicon-196x196.png",revision:"fc8516b60e3102bfb92647d3180c870f"},{url:"/icons/favicon-32x32.png",revision:"01a85e52a50d69b4a45bcd089cba9d9d"},{url:"/icons/favicon-96x96.png",revision:"2a7edaac22e4e96c855d16d4ad3e15ed"},{url:"/icons/mstile-144x144.png",revision:"20709864fd1aeb1f9e2a220ec19eb9ab"},{url:"/icons/mstile-150x150.png",revision:"03eff1589ea042aee04f570f95b550a5"},{url:"/icons/mstile-310x150.png",revision:"cf4d55c5dd7f8d325bb87ad4db6ebf2e"},{url:"/icons/mstile-310x310.png",revision:"6518c96e4c297e05563bd211b7162224"},{url:"/icons/mstile-70x70.png",revision:"5e2efde2e370b1e938d444d544035f41"},{url:"/manifest.json",revision:"002bc01cb078c2cff2b5dd08cc433ff0"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
