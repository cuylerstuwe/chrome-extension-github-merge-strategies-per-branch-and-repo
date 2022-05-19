import "../utils/startedLog";
import {insertMergeBlockingStyleIfNotInserted} from "./mergeBlockingStyle";
import {clickMergeMethod} from "./clickMergeMethod";

const defaultMergeMethod = "squash";

const allowedMergeMethodLookup = {
    merge: false,
    rebase: false,
    squash: true
}

insertMergeBlockingStyleIfNotInserted({
    merge: false,
    rebase: false,
    squash: true
});

function doesHaveMergeMethodsOnPage() {
    return document.querySelectorAll(`.merge-message .select-menu-merge-method button[value]`)?.length >= 1;
}

function waitForMergeMethodsToBeInitiallyInserted() {

}

clickMergeMethod(defaultMergeMethod);