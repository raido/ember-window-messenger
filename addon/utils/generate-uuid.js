export default function generateUuid() {
  var date = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character) {
    var random = (date + Math.random() * 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (character === 'x' ? random : (random & 0x7 | 0x8)).toString(16);
  });
  return uuid;
}
