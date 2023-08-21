importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js'
);

// This is your Service Worker, you can put any of your custom Service Worker
// code in this file, above the `precacheAndRoute` line.

// When widget is installed/pinned, push initial state.
self.addEventListener('widgetinstall', (event) => {
  event.waitUntil(updateWidget(event));
});

// When widget is shown, update content to ensure it is up-to-date.
self.addEventListener('widgetresume', (event) => {
  event.waitUntil(updateWidget(event));
});

// When the user clicks an element with an associated Action.Execute,
// handle according to the 'verb' in event.action.
self.addEventListener('widgetclick', (event) => {
if (event.action == "updateName") {
  event.waitUntil(updateName(event));
}
});

// When the widget is uninstalled/unpinned, clean up any unnecessary
// periodic sync or widget-related state.
self.addEventListener('widgetuninstall', (event) => {});

const updateWidget = async (event) => {
// The widget definition represents the fields specified in the manifest.
  const widgetDefinition = event.widget.definition;

  // Fetch the template and data defined in the manifest to generate the payload.
  const payload = {
      template: JSON.stringify(await (await fetch(widgetDefinition.msAcTemplate)).json()),
      data: JSON.stringify(await (await fetch(widgetDefinition.data)).json()),
  };

  // Push payload to widget.
  await self.widgets.updateByInstanceId(event.instanceId, payload);
}

const updateName = async (event) => {
  const name = event.data.json().name;

  // The widget definition represents the fields specified in the manifest.
  const widgetDefinition = event.widget.definition;

  // Fetch the template and data defined in the manifest to generate the payload.
  const payload = {
      template: JSON.stringify(await (await fetch(widgetDefinition.msAcTemplate)).json()),
      data: JSON.stringify({name}),
  };

  // Push payload to widget.
  await self.widgets.updateByInstanceId(event.instanceId, payload);
}

workbox.precaching.precacheAndRoute([{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"css/classes.css"},{"revision":"c1dc1e175481d5c6fc2d62468b67cfe4","url":"css/custom.css"},{"revision":"6791e82772c27a51fd5fcb82d7813f4c","url":"css/framework7-bundle.min.css"},{"revision":"ce23f859cfc229ce48170f89d54e3678","url":"css/framework7-keypad.min.css"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"css/pages/index.css"},{"revision":"a6866ee11ddc276a79896cecca299ec7","url":"css/thorium.min.css"},{"revision":"2d2c373f7d93a18bad5b158d0db2319f","url":"flexi/flux.html"},{"revision":"cf636c0206ceff47da74ea1202cd4877","url":"flexi/script.js"},{"revision":"3011fba8a6eab534c0c28f72a7d1df5a","url":"flexi/style.css"},{"revision":"fea395db9a5c8eaba924d98161324597","url":"font-awesome/css/font-awesome.min.css"},{"revision":"4e060f56f5407215dae78c3f74dc93ec","url":"index.html"},{"revision":"1114eb29f1bef0eacdbd7fac7980e1f3","url":"js/custom.js"},{"revision":"d70f118e9db65664b1599a2b71f204ae","url":"js/framework/framework7-bundle.min.js"},{"revision":"39167fc080d6865627dfe06ca3c5cecf","url":"js/plugins/thorium.core.min.js"},{"revision":"308f6e5ffe0a8035891e117683b91b60","url":"js/service-worker-register.js"},{"revision":"e14a227e8fc51006aa074d8a9625026c","url":"js/thorium.config.js"},{"revision":"7a7bff3269e1c504f770aeb746ac185d","url":"offline.html"},{"revision":"8a1fc09279b5b957427999d6003605d7","url":"pages/0.html"},{"revision":"d9c29b4185c474ee1fc04a97970090c8","url":"pages/1.html"},{"revision":"051d5cf7d5ff185bdc91824df02662d7","url":"pages/2.html"},{"revision":"cd080b0880a493d979a46d87a1d15dc0","url":"pages/3.html"},{"revision":"65b348a80efc85f91c51c27d48d04aab","url":"pages/4.html"},{"revision":"be0a95c8b7d0d506d716ea6e60c523ac","url":"pages/404.html"},{"revision":"ef1a1923d177ec0dcae74df3ecee6b5b","url":"pages/5.html"},{"revision":"f119b52e962bbcddb76dd5727e70089d","url":"pages/6.html"},{"revision":"4a3279b9b063a10ce98ba13c462e8709","url":"pages/7.html"},{"revision":"6488c9faca0b7dafa923e4c2c4ca814c","url":"pages/av.html"},{"revision":"9c83b8ce4eb68f43cc6c6bc9f5f73212","url":"pages/blank.html"},{"revision":"87ad45ac5dcee7a4964647310e7d58e1","url":"pages/blog.html"},{"revision":"b6cc716accf506fbbe94e665ca57b68d","url":"pages/chat27.html"},{"revision":"30882f931c5036aecd1abc9253df6f2b","url":"pages/cover/assets/main.css"},{"revision":"2929565fa92abaed49883d698b88c63f","url":"pages/cover/assets/main.js"},{"revision":"8df8f5fb1c9a65465cb1af99d1445965","url":"pages/cover/index.html"},{"revision":"c553c8b21f6a31b061f6272fd7b84322","url":"pages/css/flashblock.css"},{"revision":"ff7357ca884ca12c820c9519fb534d32","url":"pages/css/gear.css"},{"revision":"8d0ae181082e8143371402c891ed107d","url":"pages/css/gear.min.css"},{"revision":"c0337a1e0906123ad5b62ae04b83f7ae","url":"pages/css/icons.css"},{"revision":"533a70ba309e1d2f4e39c970d6375ffb","url":"pages/css/styles.css"},{"revision":"a7e86d8bdcb3c0fb08892448bed7a1e7","url":"pages/css/styles.min.css"},{"revision":"ebb4c8ce10b403cbef5735abade2ec61","url":"pages/dash.html"},{"revision":"f9b926e96e6f4aa9c6b3321382698c46","url":"pages/dash2.html"},{"revision":"38f9e6610285f42e96268ea5561109bd","url":"pages/dash3.html"},{"revision":"230dacdf4495e3aadf1fa123e0ef654e","url":"pages/dopemusic.html"},{"revision":"fca2ccc83cce6cc55e466134ac822cdf","url":"pages/gamesnacks.html"},{"revision":"7a8950f6f552a2db7a2c618df1769c63","url":"pages/glass - Copy.html"},{"revision":"401db1790540d2262c0dccebe5fe55a4","url":"pages/glass.html"},{"revision":"3ceb3124683eb52767cdce538cc08b0d","url":"pages/js/app.js"},{"revision":"7133490edcd36df9be81a9a3e2430532","url":"pages/js/app.min.js"},{"revision":"62604e6a5e36e72534e5068a61652cd4","url":"pages/js/jquery.gearplayer.js"},{"revision":"9257207b110259f101eec57dcd015787","url":"pages/js/jquery.gearplayer.libs.min.js"},{"revision":"3a2d4f3b3bff108fa9ef9229088c88a8","url":"pages/js/jquery.gearplayer.min.js"},{"revision":"e5cacc13ca291ae9792c32db51d75827","url":"pages/ko-fi.html"},{"revision":"bfa955d74396afd7401509fd1f2c90f6","url":"pages/loading.html"},{"revision":"bcd955b1ad9dd388b455ebc27e92b905","url":"pages/loficafe.html"},{"revision":"f11fd43489fe4410e6fa92bd078fb5d3","url":"pages/lofifm.html"},{"revision":"a36c5d71313e57e8918cb163d880cfc5","url":"pages/lofigen.html"},{"revision":"d939782d5c1a715c5a77e765f4403fdd","url":"pages/nav.html"},{"revision":"e6e2b1600664d7af96e4541019c2788c","url":"pages/nav/assets/main.css"},{"revision":"0f8c59f96c6e142faec33d88ce1a0c6f","url":"pages/nav/assets/main.js"},{"revision":"168e715df5a73a2e1ad3fc1253f5a5bb","url":"pages/nav/assets/noscript.css"},{"revision":"c7efe00ffdf6e73f0845f2ad41f68190","url":"pages/nav/index.html"},{"revision":"76a245b792f93219a7e0aa9aae7894e5","url":"pages/openwidget.html"},{"revision":"bffdd22af0915f3f968ea0483c29e693","url":"pages/player.html"},{"revision":"611d404e8e60957294230dc94ba0da36","url":"pages/privacy/assets/main.css"},{"revision":"036e74bce21268023adcd4b7fd25faf9","url":"pages/privacy/assets/main.js"},{"revision":"d158015317f2f6dc63147a6ffe4385e1","url":"pages/privacy/index.html"},{"revision":"7d84db5e950a526f7400de560be43121","url":"pages/radio.html"},{"revision":"ab66f4ee5f3e539fab32dc6a9c32375e","url":"pages/radios.html"},{"revision":"611d404e8e60957294230dc94ba0da36","url":"pages/response/assets/main.css"},{"revision":"036e74bce21268023adcd4b7fd25faf9","url":"pages/response/assets/main.js"},{"revision":"9ad99e1cd18bc578269613f019a46eca","url":"pages/response/index.html"},{"revision":"01c91d903284e072355d977eeafca4b8","url":"pages/road/assets/main.css"},{"revision":"06b3ce8a6ee2fddd5b8e197c3bc1fc05","url":"pages/road/assets/main.js"},{"revision":"5aaa12f6a5037978417dc271c86003cd","url":"pages/road/assets/noscript.css"},{"revision":"c2fbfeaabd82f750502abb2727a5376b","url":"pages/road/index.html"},{"revision":"034ec1a2ddb08205c4b2de9cd83d8d5e","url":"pages/script.js"},{"revision":"e97d45238bf1575575ee9f6ca8cf337d","url":"pages/social.html"},{"revision":"ce27de5e4dbc95a664939d66b4613f4d","url":"pages/story.html"},{"revision":"6ff2c930fa84db594eff368becf8dd1b","url":"pages/style.css"},{"revision":"51e189099e0f331cbd97957145952bd3","url":"pages/suyu.html"},{"revision":"cc5ef6ab9395337c84c758d7fe6fd47c","url":"pages/visual.html"},{"revision":"76ade004f947d9694a4832393e25a8b4","url":"pages/wall.html"},{"revision":"e6f312e850c59138bad30b624087c941","url":"pages/youtube.html"},{"revision":"a27866ff000014ef3dc9c3e80cab4c36","url":"pages/youtube1.html"},{"revision":"fb0435d8dcccb28320308f14028f8065","url":"pages/youtube2.html"},{"revision":"21d59d84b8cda8c5d54d19da7846b9ab","url":"pages/zapgpt.html"}] || []);