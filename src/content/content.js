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

clickMergeMethod(defaultMergeMethod);