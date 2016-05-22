var casper = require('casper').create();
casper.start('http://ie6bot.kill.jp/v3/siri/', function() {
  console.log('sucess access');
  this.wait(1000,function(){
    this.click('#bombtn');
    this.wait(6000,function(){
      console.log('Logout');
    });
  }.bind(this));
});
casper.run();