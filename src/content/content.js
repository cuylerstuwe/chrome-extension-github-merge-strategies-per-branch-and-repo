import "../utils/startedLog";
import {insertMergeBlockingStyleIfNotInserted} from "./mergeBlockingStyle";
import {clickMergeMethod} from "./clickMergeMethod";

const explicitDefaultMergeMethod = undefined;

const allowedMergeMethodLookup = {
    merge: true,
    rebase: false,
    squash: false
}

function discoverImplicitDefaultMergeMethodIfPresent(allowedMergeMethodLookup) {
    const allowedMergeMethodTuples = [...Object.entries(allowedMergeMethodLookup) || []]?.filter(([mergeMethod, isMergeMethodAllowed]) => isMergeMethodAllowed);
    if(allowedMergeMethodTuples.length === 1) {
        return allowedMergeMethodTuples[0][0];
    }
    else {
        return undefined;
    }
}

function scrapeBaseRef() {
    return document.querySelector(".js-pull-header-details .base-ref a span")?.innerText?.trim();
}

function doesHaveAtLeastOneMergeMethodOnPage() {
    return document.querySelectorAll(`.merge-message .select-menu-merge-method button[value]`)?.length >= 1;
}

async function waitForMergeMethodsToBeInitiallyInserted() {
    if(doesHaveAtLeastOneMergeMethodOnPage()) { return true; }
    else {
        return new Promise(resolve => {
            const mo = new MutationObserver(mutations => {
                if(doesHaveAtLeastOneMergeMethodOnPage()) {
                    mo.disconnect();
                    return resolve(true);
                }
            });
            mo.observe(document.body, { childList: true, subtree: true });
        });
    }
}

async function main() {
    await waitForMergeMethodsToBeInitiallyInserted();
    const baseRef = scrapeBaseRef();
    insertMergeBlockingStyleIfNotInserted(allowedMergeMethodLookup, baseRef);
    clickMergeMethod(discoverImplicitDefaultMergeMethodIfPresent(allowedMergeMethodLookup) ?? explicitDefaultMergeMethod);
}

main();
