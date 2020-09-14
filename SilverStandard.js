Hooks.on('renderActorSheet5eCharacter', (sheet, html) => {
  html.find('.denomination.ep').remove();
  html.find('[name="data.currency.ep"]').remove();
});

Hooks.on('renderTidy5eSheet', (sheet, html) => {
    html.find('.denomination.ep').parent().remove();
    html.find('.denomination.ep').remove();
    html.find('[name="data.currency.ep"]').remove();
});
Hooks.on('renderDNDBeyondCharacterSheet5e', (sheet, html) => {
  html.find('.denomination.ep').remove();
  html.find('[name="data.currency.ep"]').remove();
});
Hooks.on('renderAlt5eSheet', (sheet, html) => {
  html.find('.denomination.ep').remove();
  html.find('[name="data.currency.ep"]').remove();
});

Hooks.once('ready', () => {
  CONFIG.Actor.sheetClasses.character['dnd5e.ActorSheet5eCharacter'].cls.prototype._onConvertCurrency = _onMyConvertCurrency;
});

  function _onMyConvertCurrency(event) {
    event.preventDefault();
    const curr = duplicate(this.actor.data.data.currency);
    console.log(curr);
    const convert = {
      cp: {into: "sp", each: 10},
      sp: {into: "gp", each: 100},
      gp: {into: "pp", each: 100}
    };
    for ( let [c, t] of Object.entries(convert) ) {
      let change = Math.floor(curr[c] / t.each);
      curr[c] -= (change * t.each);
      curr[t.into] += change;
    }
    return this.actor.update({"data.currency": curr});
 };
