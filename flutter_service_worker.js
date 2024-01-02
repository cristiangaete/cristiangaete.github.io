'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "86809709578f1f457034485261a0d5c1",
"assets/AssetManifest.json": "268760cc8b5356616fa27d6ae1cfe81f",
"assets/assets/images/certificaciones/cGato.png": "0f45480358236874f7ec5ed7823a2939",
"assets/assets/images/certificaciones/coursera0.png": "6901d244d5a6caa5ea75ea9598510cb9",
"assets/assets/images/certificaciones/coursera1.png": "b12b1bc03000a08e5bdcd3cec6898e81",
"assets/assets/images/certificaciones/coursera2.png": "bf0e74ece0fd54efc1ebf1c73dcdb2bc",
"assets/assets/images/certificaciones/coursera3.png": "fe7cec38742ddb3d82ef72aaebd7f4e0",
"assets/assets/images/certificaciones/coursera4.png": "35a11b84bad24f40bbf4f4889acd92a0",
"assets/assets/images/certificaciones/udemy0.png": "40ba5ad45478ae91312e27c537a0af60",
"assets/assets/images/certificaciones/udemy1.png": "61e60e237d04457d35903a4be9c81868",
"assets/assets/images/certificaciones/udemy2.png": "47e8f7c0ec733ae2610ddf6a92312b9d",
"assets/assets/images/css.png": "b7eb4030946e94e375f674ee670a1c8b",
"assets/assets/images/dart.png": "ec35dfeba7bb01c47df55351367f6700",
"assets/assets/images/dj.png": "9bc0884b6ccfee46a32080db9e1b7a55",
"assets/assets/images/flutter0.PNG": "4200e9f2f73327927389edb2933e4ffd",
"assets/assets/images/flutterLogo.png": "adf03c5e3c90d4e867f7116a3a331ba1",
"assets/assets/images/java.png": "ff3a90b7dfd569d5b02ecd1afd771b28",
"assets/assets/images/js.png": "022e2f719f6123df774031e8a5ead3b3",
"assets/assets/images/map.jpg": "2ad7f59c7791d961fb55fea827d81f9b",
"assets/assets/images/python.png": "1eb04e93fa83fa94129a0488dd7cd124",
"assets/assets/images/react.png": "360a0ef4666dcbbd62d979e7100b4a6d",
"assets/assets/images/yo.jpg": "384dda05ec89754889b4d78fb8dfb404",
"assets/assets/images/yo2.jpg": "c50cd41c26e8fd75e1cd0165cbccbd2c",
"assets/assets/images/yo3.jpg": "357dfb324469141715731cdee6573d3f",
"assets/assets/pdf/cv.pdf": "24f839b1ad1452de64f8606301776c5a",
"assets/FontManifest.json": "ec8a82ec184cf6cd45fbf68291b1fe6b",
"assets/fonts/MaterialIcons-Regular.otf": "b7215f2a38947dd8baedd9149a34fcbc",
"assets/NOTICES": "a4fb5bf8e8f88b1d784ebbd94ef1e41d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "c2716c0888c37a8398f61cdb972c43e2",
"assets/packages/simple_icons/fonts/SimpleIcons.ttf": "429f4878395a78daa21abc07b2954fd9",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "fbe0f7f962708718ecad2afb9df77245",
"/": "fbe0f7f962708718ecad2afb9df77245",
"main.dart.js": "3b64ff2be47d9b85bebfa9a04cd6960f",
"manifest.json": "c825b555d0a91d3baca8a8ac9b9137e9",
"version.json": "45a640efa53d7f7e0eeecda631212b29"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
