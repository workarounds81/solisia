// onClick for any link to #deck. Clicking while the hash is already #deck
// fires no hashchange, so Contact would not switch modes; re-dispatch it so
// the form always lands on the deck-request mode.
export function requestDeck() {
  if (window.location.hash === '#deck') window.dispatchEvent(new HashChangeEvent('hashchange'));
}
