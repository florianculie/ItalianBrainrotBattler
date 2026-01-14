
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://florianculie.github.io/italianbrainrotbattler/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/italianbrainrotbattler"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 655, hash: '9cb2383d0d5829667b68887cc00e9695ef5bdc1a0c9ff4b4d71ee70166188647', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1012, hash: '46b3f0c4b24e846af6bad0552e946e6e442f3da0af3f6d4b74a320e029b99f7b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 7088, hash: 'd17e0407f1e01806160ab428a15abc84073021e86993cfd819d0b6ba3826b47c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-PKXSNX7I.css': {size: 31, hash: 'Rf6bm1oIHRI', text: () => import('./assets-chunks/styles-PKXSNX7I_css.mjs').then(m => m.default)}
  },
};
