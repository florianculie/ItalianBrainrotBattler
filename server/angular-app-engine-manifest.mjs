
export default {
  basePath: 'https://florianculie.github.io/italianbrainrotbattler',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
