const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const elements = new Map();
const buttons = [];
function element(id) {
  if (elements.has(id)) return elements.get(id);
  const node = {
    id, innerHTML: '', textContent: '', hidden: false, dataset: {}, listeners: {}, children: [],
    classList: { toggle() {}, add() {}, remove() {} },
    setAttribute(key, value) { this[key] = value; },
    addEventListener(key, handler) { this.listeners[key] = handler; },
    appendChild(child) { this.children.push(child); buttons.push(child); },
    querySelectorAll() { return []; }
  };
  elements.set(id, node);
  return node;
}
const context = {
  document: {
    getElementById: element,
    createElement: () => element(`button-${elements.size}`),
    querySelectorAll: () => buttons,
    body: { classList: { add() {}, remove() {} } }
  },
  window: { addEventListener() {}, print() {} },
  console
};
vm.createContext(context);
vm.runInContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], context);
const app = context.window.muttsPlaybook;
const play = id => app.plays.find(p => p.id === id);
const fit = (id, front, pressure = 'base') => app.scene(play(id), front, pressure);
const targets = scene => Object.fromEntries(scene.blocks.map(b => [b.pos, b.target]));
const selectPull = choice => element('look').listeners.click({
  target: { closest: selector => selector === '[data-pull]' ? { dataset: { pull: choice } } : null }
});
const setInsideThreat = checked => element('inside-threat').listeners.change({ target: { checked } });

// Requirements stated by the coach.
for (const [group, ids] of [
  ['inside-buttons', ['20', '21', '22']], ['outside-buttons', ['23', '24']],
  ['stretch-buttons', ['25', '26']], ['pass-buttons', ['60', '61']]
]) assert.deepEqual(element(group).children.map(b => b.dataset.play), ids);
for (const [id, x] of [['20', 360], ['21', 313], ['22', 407]])
  assert.equal(app.runRoute(play(id)).x, x);
assert.equal(play('25').dir, -1);
assert.equal(play('26').dir, 1);
assert.equal(play('60').dir, 1);
assert.equal(play('61').dir, -1);

// A single edge blitz is blocked by a called exchange; it is not automatically hot.
for (const [id, front, expected] of [
  ['60', 'nt', { C: 'N', RG: 'ER', RT: 'X' }],
  ['61', 'nt', { C: 'N', LG: 'EL', LT: 'X' }],
  ['60', '34', { C: 'N', RG: 'ER', RT: 'OR' }],
  ['61', '34', { C: 'N', LG: 'EL', LT: 'OL' }],
  ['60', '43', { C: 'TR', RG: 'ER', RT: 'BR' }],
  ['61', '43', { C: 'TL', LG: 'EL', LT: 'BL' }]
]) {
  const scene = fit(id, front, 'edge');
  for (const [position, defender] of Object.entries(expected))
    assert.equal(targets(scene)[position], defender, `${id}/${front}/${position}`);
  assert.equal(scene.hot.length, 0);
  assert.ok(!scene.rushers.includes('M'));
  assert.ok(scene.edgeAdjustment.includes('Mike drops'));
}

// An edge plus Mike overload leaves the outside threat hot, while inside threats stay blocked.
for (const id of ['60', '61']) for (const front of ['nt', '34', '43']) {
  const scene = fit(id, front, 'overload');
  assert.equal(scene.hot.length, 1);
  assert.equal(scene.hot[0], scene.edgeID);
  assert.ok(Object.values(targets(scene)).includes('M'));
}

// The coach's puller choices require inside coverage before movement.
for (const [id, backsideGuard] of [['25', 'RG'], ['26', 'LG']]) {
  for (const front of ['nt', '34']) {
    assert.equal(fit(id, front).puller, backsideGuard);
    assert.equal(targets(fit(id, front)).C, 'N');
  }
  assert.equal(fit(id, 'five').puller, 'C');
  selectPull('G');
  assert.equal(fit(id, '43').puller, backsideGuard);
  assert.equal(targets(fit(id, '43')).C, id === '25' ? 'TR' : 'TL');
  selectPull('C');
  assert.equal(fit(id, '43').puller, 'C');
}

// Support defenders remain visible until a formation-specific answer exists.
for (const [id, front, expected] of [
  ['22', '34', ['OL']], ['22', '43', ['BL']],
  ['26', 'nt', ['B']], ['26', '34', ['B', 'OL']], ['26', '43', ['M', 'BL']]
]) {
  assert.deepEqual(Array.from(fit(id, front).supportNeeds, n => n.id), expected);
  const svg = app.diagram(play(id), front, 'base', `support-${id}-${front}`).svg;
  for (const defender of expected) assert.ok(svg.includes(`data-support-need="${defender}"`));
}

let combinations = 0;
for (const choice of ['C', 'G']) for (const blockedInside of [false, true]) {
  selectPull(choice);
  setInsideThreat(blockedInside);
  for (const p of app.plays) {
    if (p.kind !== 'stretch' && (choice !== 'C' || blockedInside)) continue;
    for (const pressure of p.kind === 'pass' ? ['base', 'mike', 'back', 'edge', 'overload'] : ['base']) {
      const page = app.playPage(p, pressure, `case-${combinations}`);
      assert.equal((page.match(/data-front=/g) || []).length, p.kind === 'stretch' ? 4 : 3);
      assert.ok(!page.includes('undefined'));
      const ids = [...page.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
      assert.equal(ids.length, new Set(ids).size);
      for (const front of app.pageFronts(p)) {
        const scene = app.scene(p, front, pressure);
        for (const position of ['LT', 'LG', 'C', 'RG', 'RT']) assert.ok(scene.jobs[position]);
        for (const block of scene.blocks) if (block.target) assert.ok(scene.byId[block.target]);
        if (p.kind === 'pass') assert.equal(scene.hot.length, pressure === 'overload' ? 1 : 0);
        if (p.kind === 'stretch') {
          const svg = app.diagram(p, front, pressure, `pull-${combinations}`).svg;
          if (blockedInside) {
            assert.equal(scene.puller, null);
            assert.equal(targets(scene)[scene.plannedPuller], 'IN');
            assert.ok(!svg.includes('data-puller='));
            assert.ok(!svg.includes('data-hb-route='));
            assert.ok(svg.includes('STAY + CALL'));
            const printed = app.playPage(p, pressure, `stopped-${combinations}`, true);
            assert.ok(!printed.includes('null pulls'));
            assert.ok(printed.includes('STAY / CHECK — pull stopped'));
            assert.ok(!printed.includes('BACKSIDE — M (Mike)'));
          } else {
            assert.ok(scene.puller);
            assert.ok(!scene.blocks.some(b => b.pos === scene.puller));
          }
        }
        combinations++;
      }
    }
  }
}
setInsideThreat(false);
selectPull('C');
element('print-all').listeners.click();
assert.equal((element('print-book').innerHTML.match(/class="print-page"/g) || []).length, 9);
assert.equal((element('print-book').innerHTML.match(/data-front=/g) || []).length, 29);
console.log(`Checked ${combinations} scheme states, including EDGE exchanges, overloads, stopped pulls, coach choices, and visible support needs.`);
