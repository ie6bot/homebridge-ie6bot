var Service, Characteristic;

module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-ie6bot", "ie6bot", IE6bot);
}

function IE6bot(log, config) {
  this.log = log;
  this.name = config["name"];
}

IE6bot.prototype = {
  setPowerState: function(powerOn, callback) {
    if (powerOn) {
      this.log("ie6bot Exploooooode!");
      var exec = require('child_process').exec;
      exec('casperjs ie6explode.js',function(err,stdout,stderr){
        if(err){
          console.log("error...");
          console.log(err);
        }else{
          console.log("Success and Logout!");
        }
        callback();
      });
    }
  },
  identify: function (callback) {
    this.log("Identify requested!");
    callback(); // success
  },
  getServices: function () {
    var informationService = new Service.AccessoryInformation();
    informationService
    .setCharacteristic(Characteristic.Manufacturer, "ie6bot Manufacturer")
    .setCharacteristic(Characteristic.Model, "ie6bot Model")
    .setCharacteristic(Characteristic.SerialNumber, "ie6bot Serial Number");

    var switchService = new Service.Switch(this.name);
    switchService
    .getCharacteristic(Characteristic.On)
    .on('set', this.setPowerState.bind(this));

    return [switchService];
  }
};