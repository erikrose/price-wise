import {ruleset, rule, dom, type, score, out} from 'fathom-web';
import {ancestors} from 'fathom-web/utilsForFrontend';

import RulesetFactory from './ruleset_factory';


/**
 * Rulesets to train.
 *
 * More mechanically, a map of names to {coeffs, rulesetMaker} objects.
 * rulesetMaker is a function that takes an Array of coefficients and returns a
 * ruleset that uses them. coeffs is typically the best-yet-found coefficients
 * for a ruleset but can also be some more widely flung ones that you want to
 * start the trainer from. The rulesets you specify here show up in the Train
 * UI, from which you can kick off a training run.
 */
const trainees = new Map();
const viewportSize = {width: 1680, height: 950};

const commonRuleset = {
    coeffs: [2, 7, -2, 5, -4, 3, 1, -17, 4, 5, 15, 10],
    viewportSize,
    rulesetMaker: coeffs => (new RulesetFactory(coeffs)).makeRuleset()
};

trainees.set('image', {
    coeffs: [5, 9, 3, 4],  // [5, 9, 3, 5] gets 98.7% training
    viewportSize,
    // Using Nan as a don't-care value:
    rulesetMaker: coeffs => (new RulesetFactory([NaN, NaN, NaN, NaN, NaN, NaN, coeffs[0], NaN, NaN, NaN, NaN, coeffs[1], coeffs[2], coeffs[3]])).makeRuleset()
});
trainees.set('title', commonRuleset);
trainees.set('price', commonRuleset);

export default trainees;
