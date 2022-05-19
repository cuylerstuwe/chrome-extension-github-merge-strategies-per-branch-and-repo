import {allPossibleMergeMethods} from "./allPossibleMergeMethods";

function clickMergeMethod(mergeMethodName) {
    if(!mergeMethodName || !allPossibleMergeMethods.includes(mergeMethodName)) { return; }
    document.querySelector(`.merge-message .select-menu-merge-method button[value='${mergeMethodName}']`)?.click();
}
export { clickMergeMethod };
