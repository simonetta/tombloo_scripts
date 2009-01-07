(function() {

models.register({
  name: 'Femo',
  ICON: 'http://femo.jp/favicon.ico',
  FEMO_URL: 'http://femo.jp/',

  check: function(ps) {
    return (/(regular|photo|quote|link|conversation|video)/).test(ps.type) && !ps.file;
  },
  post: function(ps) {
    var endpoint = this.FEMO_URL + 'create/post';
    var form = {
      title: ps.item,
      text: joinText([ ps.itemUrl, ps.body, ps.description ], '\n', false)
    };
    var tags = [].concat(ps.tags);
    if (getPref('femo.appendDateTag')) {
      var d = new Date();
      var dtag = d.getFullYear() + '-' + [ d.getMonth() + 1, d.getDate() ].map(function(n) {
        return ('' + n).pad(2, '0');
      }).join('-');
      if (tags.indexOf(dtag) == -1) tags.push(dtag);
    }
    update(form, {
      tagtext: joinText(tags, ' ')
    });
    return request(endpoint, { sendContent: form });
  }
});

})();
