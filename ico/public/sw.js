if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let i={};const r=e=>a(e,t),d={module:{uri:t},exports:i,require:r};s[t]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(n(...e),i)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/85T_bNKsAminGFQuevxkn/_buildManifest.js",revision:"57b91ecccabd428c828b0263573560bf"},{url:"/_next/static/85T_bNKsAminGFQuevxkn/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1180-0ff1846d79a57a71.js",revision:"0ff1846d79a57a71"},{url:"/_next/static/chunks/1653-ff9a693b2b7d7ab3.js",revision:"ff9a693b2b7d7ab3"},{url:"/_next/static/chunks/1664-d851c5b71380ec58.js",revision:"d851c5b71380ec58"},{url:"/_next/static/chunks/1801-dc00845a6784e411.js",revision:"dc00845a6784e411"},{url:"/_next/static/chunks/2259-abec6031e32e3388.js",revision:"abec6031e32e3388"},{url:"/_next/static/chunks/2616-a691cc74e1e1879a.js",revision:"a691cc74e1e1879a"},{url:"/_next/static/chunks/29107295-54c46f60208f68c8.js",revision:"54c46f60208f68c8"},{url:"/_next/static/chunks/3625-3efb80cf02cf3dba.js",revision:"3efb80cf02cf3dba"},{url:"/_next/static/chunks/4070-614126da00951f97.js",revision:"614126da00951f97"},{url:"/_next/static/chunks/5121-0a36502e1e61a7eb.js",revision:"0a36502e1e61a7eb"},{url:"/_next/static/chunks/5551-10d8c04945631bb1.js",revision:"10d8c04945631bb1"},{url:"/_next/static/chunks/6723-4647fefbf45f52b3.js",revision:"4647fefbf45f52b3"},{url:"/_next/static/chunks/7920-6b843f4b357a7bd5.js",revision:"6b843f4b357a7bd5"},{url:"/_next/static/chunks/8602-14ab65c31a303320.js",revision:"14ab65c31a303320"},{url:"/_next/static/chunks/9072-36e1844ec68defb0.js",revision:"36e1844ec68defb0"},{url:"/_next/static/chunks/framework-ce84985cd166733a.js",revision:"ce84985cd166733a"},{url:"/_next/static/chunks/main-e86509e4e63f9278.js",revision:"e86509e4e63f9278"},{url:"/_next/static/chunks/pages/404-64a3a892ab2ca415.js",revision:"64a3a892ab2ca415"},{url:"/_next/static/chunks/pages/_app-04b7921fa48c27a1.js",revision:"04b7921fa48c27a1"},{url:"/_next/static/chunks/pages/_error-82b79221b9ed784b.js",revision:"82b79221b9ed784b"},{url:"/_next/static/chunks/pages/admin/confirm-082fce48c28ed2c2.js",revision:"082fce48c28ed2c2"},{url:"/_next/static/chunks/pages/admin/login-8187e50a7ee91f8f.js",revision:"8187e50a7ee91f8f"},{url:"/_next/static/chunks/pages/index-df655e9f116009de.js",revision:"df655e9f116009de"},{url:"/_next/static/chunks/pages/loading-05f2ad404d97dd40.js",revision:"05f2ad404d97dd40"},{url:"/_next/static/chunks/pages/login-614e57201ebb2d40.js",revision:"614e57201ebb2d40"},{url:"/_next/static/chunks/pages/signup-4a1a5840350d246b.js",revision:"4a1a5840350d246b"},{url:"/_next/static/chunks/pages/student/check-2c8b5ae721d14a71.js",revision:"2c8b5ae721d14a71"},{url:"/_next/static/chunks/pages/student/check_backup-841c499a690a5ee8.js",revision:"841c499a690a5ee8"},{url:"/_next/static/chunks/pages/student/class/jobsearch-6fbc6b1c4599f954.js",revision:"6fbc6b1c4599f954"},{url:"/_next/static/chunks/pages/student/class/students-aa3a11f8dc04a397.js",revision:"aa3a11f8dc04a397"},{url:"/_next/static/chunks/pages/student/enter-eeb9b03dfb40d7cc.js",revision:"eeb9b03dfb40d7cc"},{url:"/_next/static/chunks/pages/student/enter_backup-06dd89814bc90065.js",revision:"06dd89814bc90065"},{url:"/_next/static/chunks/pages/student/finance/deposit-899dca1a635cae74.js",revision:"899dca1a635cae74"},{url:"/_next/static/chunks/pages/student/finance/deposit/%5Bpid%5D-f16e798a3a748a0d.js",revision:"f16e798a3a748a0d"},{url:"/_next/static/chunks/pages/student/finance/invest-89eaffce4c3bb5e7.js",revision:"89eaffce4c3bb5e7"},{url:"/_next/static/chunks/pages/student/finance/invest/%5Bpid%5D-313c9b07608b7820.js",revision:"313c9b07608b7820"},{url:"/_next/static/chunks/pages/student/finance/invest/backup-41b1b3f14183299e.js",revision:"41b1b3f14183299e"},{url:"/_next/static/chunks/pages/student/finance/savings-e9b413cbf291a2f1.js",revision:"e9b413cbf291a2f1"},{url:"/_next/static/chunks/pages/student/finance/savings/%5Bpid%5D-23b972dfbdfac641.js",revision:"23b972dfbdfac641"},{url:"/_next/static/chunks/pages/student/gov/exchequer-bea7d662c6b7f5ef.js",revision:"bea7d662c6b7f5ef"},{url:"/_next/static/chunks/pages/student/gov/rule-4eabeea6d61faa80.js",revision:"4eabeea6d61faa80"},{url:"/_next/static/chunks/pages/student/home-3de980fbe6c7ea7f.js",revision:"3de980fbe6c7ea7f"},{url:"/_next/static/chunks/pages/student/home/asset-e5a20b0152f50189.js",revision:"e5a20b0152f50189"},{url:"/_next/static/chunks/pages/student/home/coupon-cbdb8f60507a5543.js",revision:"cbdb8f60507a5543"},{url:"/_next/static/chunks/pages/student/home/exchequer-30e37373f14179b3.js",revision:"30e37373f14179b3"},{url:"/_next/static/chunks/pages/student/job/rule-84bf84273b0790e6.js",revision:"84bf84273b0790e6"},{url:"/_next/static/chunks/pages/student/job/rule/%5BruleId%5D-b0cb090e1c6833f0.js",revision:"b0cb090e1c6833f0"},{url:"/_next/static/chunks/pages/student/job/rule/create-a1248d68b6f22721.js",revision:"a1248d68b6f22721"},{url:"/_next/static/chunks/pages/student/job/seller-9a9d54f6d1ce2a5f.js",revision:"9a9d54f6d1ce2a5f"},{url:"/_next/static/chunks/pages/student/job/seller/%5Bpid%5D-3319ad663aed80b1.js",revision:"3319ad663aed80b1"},{url:"/_next/static/chunks/pages/student/job/seller/create-d3ccd05736ca3df6.js",revision:"d3ccd05736ca3df6"},{url:"/_next/static/chunks/pages/student/password-607b6f3eec660e6c.js",revision:"607b6f3eec660e6c"},{url:"/_next/static/chunks/pages/student/shop/%5Btype%5D/%5BproductType%5D/%5BproductId%5D-c06855b02720b268.js",revision:"c06855b02720b268"},{url:"/_next/static/chunks/pages/student/shop/basket-7759c30022b94315.js",revision:"7759c30022b94315"},{url:"/_next/static/chunks/pages/student/shop/create-47de1a4117ab6ac8.js",revision:"47de1a4117ab6ac8"},{url:"/_next/static/chunks/pages/student/shop/student-eab53f753f44e376.js",revision:"eab53f753f44e376"},{url:"/_next/static/chunks/pages/student/shop/student/%5Bpid%5D-30df1c925650a4ae.js",revision:"30df1c925650a4ae"},{url:"/_next/static/chunks/pages/student/shop/teacher-77cb10b46564c09d.js",revision:"77cb10b46564c09d"},{url:"/_next/static/chunks/pages/student/shop/teacher/%5Bpid%5D-b1a668b242379438.js",revision:"b1a668b242379438"},{url:"/_next/static/chunks/pages/student/shop/teacher/%5Bpid%5D_backup-6976d0d77bd4adc6.js",revision:"6976d0d77bd4adc6"},{url:"/_next/static/chunks/pages/student/signup-57985c4da2bf9a52.js",revision:"57985c4da2bf9a52"},{url:"/_next/static/chunks/pages/student/test-23a4b04267d5e3ac.js",revision:"23a4b04267d5e3ac"},{url:"/_next/static/chunks/pages/teacher/cert-e57b144d018bbdb1.js",revision:"e57b144d018bbdb1"},{url:"/_next/static/chunks/pages/teacher/class/coupons-c216d666e6bdb2d9.js",revision:"c216d666e6bdb2d9"},{url:"/_next/static/chunks/pages/teacher/class/jobsearch-577ba2fbbd5b6038.js",revision:"577ba2fbbd5b6038"},{url:"/_next/static/chunks/pages/teacher/class/property-8ff1fef5f92895b1.js",revision:"8ff1fef5f92895b1"},{url:"/_next/static/chunks/pages/teacher/class/students-51b25feea2096aa6.js",revision:"51b25feea2096aa6"},{url:"/_next/static/chunks/pages/teacher/create-dcf53efbd3d35cdf.js",revision:"dcf53efbd3d35cdf"},{url:"/_next/static/chunks/pages/teacher/finance/deposit-6f35f027f181465c.js",revision:"6f35f027f181465c"},{url:"/_next/static/chunks/pages/teacher/finance/invest-19164c27d1a9cf5c.js",revision:"19164c27d1a9cf5c"},{url:"/_next/static/chunks/pages/teacher/finance/saving-4857b250baf2aced.js",revision:"4857b250baf2aced"},{url:"/_next/static/chunks/pages/teacher/gov/corporate-ff959b8f90cfebf9.js",revision:"ff959b8f90cfebf9"},{url:"/_next/static/chunks/pages/teacher/gov/corporate/create-daa06cf54b329f28.js",revision:"daa06cf54b329f28"},{url:"/_next/static/chunks/pages/teacher/gov/economy-d916381ab85eec3f.js",revision:"d916381ab85eec3f"},{url:"/_next/static/chunks/pages/teacher/gov/exchequer-3659caf1c8898d82.js",revision:"3659caf1c8898d82"},{url:"/_next/static/chunks/pages/teacher/gov/job-f435746a883b1bf0.js",revision:"f435746a883b1bf0"},{url:"/_next/static/chunks/pages/teacher/gov/license-41b922f1ffda0edc.js",revision:"41b922f1ffda0edc"},{url:"/_next/static/chunks/pages/teacher/gov/rule-3636882a25982d9e.js",revision:"3636882a25982d9e"},{url:"/_next/static/chunks/pages/teacher/password-f523e2d3ae67a586.js",revision:"f523e2d3ae67a586"},{url:"/_next/static/chunks/pages/teacher/shop/create-1641a8ab674be837.js",revision:"1641a8ab674be837"},{url:"/_next/static/chunks/pages/teacher/shop/my-aa3b280699192760.js",revision:"aa3b280699192760"},{url:"/_next/static/chunks/pages/teacher/shop/my/%5Bpid%5D-be0b29fa22670546.js",revision:"be0b29fa22670546"},{url:"/_next/static/chunks/pages/teacher/shop/student-9fdc5d6bf5516654.js",revision:"9fdc5d6bf5516654"},{url:"/_next/static/chunks/pages/teacher/shop/student/%5Bpid%5D-833b6f7edb711c34.js",revision:"833b6f7edb711c34"},{url:"/_next/static/chunks/pages/teacher/shop/student/temp-1ec425ee7340dba2.js",revision:"1ec425ee7340dba2"},{url:"/_next/static/chunks/pages/teacher/signup-8b3ad34e12df7367.js",revision:"8b3ad34e12df7367"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-ac85c2766400df59.js",revision:"ac85c2766400df59"},{url:"/_next/static/css/983bfb3510e70e40.css",revision:"983bfb3510e70e40"},{url:"/assets/account.png",revision:"32ef6b90033f3f6ebdff61b3d8b8bb6c"},{url:"/assets/bracket.png",revision:"98a78b5e482c0c18584763765ca49e8d"},{url:"/assets/check/check_image_1.png",revision:"a7a6de56cdde9448c3a91b65401d74bc"},{url:"/assets/children_icon.png",revision:"32f81f2c9623cc6e07942e486c7065bf"},{url:"/assets/create/create_illust_11.png",revision:"816473e2f71841f6a0814f3cda5cf541"},{url:"/assets/create/create_illust_22.png",revision:"e47e3c2398e5d76453ec41d589b42c04"},{url:"/assets/create/create_illust_33.jpg",revision:"20a8ab0dbf0f127ef324cf07f6fb4b07"},{url:"/assets/deposit/deposit_guide_1.png",revision:"4f791b967612ac21bc294d65c6edec9c"},{url:"/assets/deposit/deposit_guide_2.png",revision:"5801866a6685965750b72a443285a962"},{url:"/assets/deposit/deposit_guide_3.png",revision:"11dc9cd126958baf998a7919782265b4"},{url:"/assets/dock/dock_class.png",revision:"77afde06747231df188660a50dac8882"},{url:"/assets/dock/dock_gov.png",revision:"d0fb7d05ec8bbd8ec561bd235a129650"},{url:"/assets/dock/dock_home.png",revision:"994a4537621b66e9e48602431c20b618"},{url:"/assets/dock/dock_shop.png",revision:"dc4a4615e2710352cdbdf0b97ca56c24"},{url:"/assets/enter/enter_image.png",revision:"16586243fd991c8ff0521eefe8b9e08c"},{url:"/assets/enter/student_check.png",revision:"a182e7d6498780b8a08b18a11e99c081"},{url:"/assets/guide/14.jpg",revision:"e2d8ecd8fb9bf704e82726f0f9ecb0d1"},{url:"/assets/guide/background1.jpg",revision:"385307fd48f8b2e71b1e827818562301"},{url:"/assets/guide/background2.jpg",revision:"86855b9b489da4d2870f53d1cd129dcb"},{url:"/assets/guide/background3.jpg",revision:"a06d490525be235144f6b51675f374fe"},{url:"/assets/guide/background4.jpg",revision:"20a8ab0dbf0f127ef324cf07f6fb4b07"},{url:"/assets/guide/deco_1.jpg",revision:"ef2ad3bbba1283be9dcebfc197b230bb"},{url:"/assets/guide/deco_2.jpg",revision:"730bb7231103efc19cb6eaebb94e7403"},{url:"/assets/guide/deco_3.jpg",revision:"04a23fb05344ee32e4dcbfd149b0c707"},{url:"/assets/home/coupon.png",revision:"8c35cb0a5bca78b1e648c54b2cb39464"},{url:"/assets/home/deposit.png",revision:"d7f0fc1b7ae136057d9e849c32c56f39"},{url:"/assets/home/exchequer.png",revision:"b1727ea44eea8adb43371c38d420bb5d"},{url:"/assets/home/stock.png",revision:"fb06184d4a396e222f9b36bac3b70897"},{url:"/assets/icon_desktop.png",revision:"30412d169d509eafe53528181acb3313"},{url:"/assets/job/firefighter.png",revision:"cdf12fa6f593a125afe46ec32268f6d8"},{url:"/assets/job/weather_caster.png",revision:"4c0a0b8f7002d2898c151f4e1735ee80"},{url:"/assets/job/worker_female.png",revision:"2df687db294893046b8843bd903f1ea8"},{url:"/assets/job/worker_male.png",revision:"ae6709260b369b42734f6ac08ee1839c"},{url:"/assets/login/login_illust.png",revision:"4fe66baae98ff55c12a9d242e2147917"},{url:"/assets/login/login_illust_2.jpg",revision:"abcf200dad2b43d6459b268d84257a51"},{url:"/assets/side_menu/student_logout.png",revision:"752000f8dcfbb0348f461ee7f1d2ca2f"},{url:"/assets/side_menu/student_menu_icon.png",revision:"9b59b7f41412cb09a5bdb7132c33f63b"},{url:"/assets/signup/illust.jpg",revision:"7b5290eedb4fb0bac6cc4d0c4a96d6d3"},{url:"/assets/signup/illust.png",revision:"3a9499aad5d3737817ab1c291b696156"},{url:"/assets/signup/illust2.png",revision:"e9d077df685994a0d31a4f330c532e25"},{url:"/favicon.ico",revision:"1b4ea62c745dfb612fb78843e13f2b33"},{url:"/icons/apple-touch-icon-114x114.png",revision:"8b5afa01f8f3c65d890887c63e36bac9"},{url:"/icons/apple-touch-icon-120x120.png",revision:"63032890888c8e1015a793d9328e4521"},{url:"/icons/apple-touch-icon-144x144.png",revision:"20709864fd1aeb1f9e2a220ec19eb9ab"},{url:"/icons/apple-touch-icon-152x152.png",revision:"6cb9fc38b7b4fc7500a14545e5dea663"},{url:"/icons/apple-touch-icon-57x57.png",revision:"b9653b3fd38df630a405ce8743882281"},{url:"/icons/apple-touch-icon-60x60.png",revision:"7344e42345289e31e38f8c79ddc2ae01"},{url:"/icons/apple-touch-icon-72x72.png",revision:"52bee5411a1c0b29198f5669e9967c19"},{url:"/icons/apple-touch-icon-76x76.png",revision:"593db0a21371575ed921835ad3b383fc"},{url:"/icons/code.txt",revision:"aa1202c4cbd6457b40c635bd985ab3db"},{url:"/icons/favicon-128.png",revision:"5e2efde2e370b1e938d444d544035f41"},{url:"/icons/favicon-16x16.png",revision:"d81470663d3e97ec6ce3e4906df6b067"},{url:"/icons/favicon-196x196.png",revision:"fc8516b60e3102bfb92647d3180c870f"},{url:"/icons/favicon-32x32.png",revision:"01a85e52a50d69b4a45bcd089cba9d9d"},{url:"/icons/favicon-96x96.png",revision:"2a7edaac22e4e96c855d16d4ad3e15ed"},{url:"/icons/mstile-144x144.png",revision:"20709864fd1aeb1f9e2a220ec19eb9ab"},{url:"/icons/mstile-150x150.png",revision:"03eff1589ea042aee04f570f95b550a5"},{url:"/icons/mstile-310x150.png",revision:"cf4d55c5dd7f8d325bb87ad4db6ebf2e"},{url:"/icons/mstile-310x310.png",revision:"6518c96e4c297e05563bd211b7162224"},{url:"/icons/mstile-70x70.png",revision:"5e2efde2e370b1e938d444d544035f41"},{url:"/manifest.json",revision:"07b6edbe5aac840817b2534478e480e8"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
