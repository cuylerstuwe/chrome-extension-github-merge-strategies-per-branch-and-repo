import "../utils/startedLog";
import {insertMergeBlockingStyleIfNotInserted} from "./mergeBlockingStyle";

insertMergeBlockingStyleIfNotInserted({
    merge: false,
    rebase: false,
    squash: true
});