const allPossibleMergeMethods = ["merge", "rebase", "squash"];

const mergeMethodLookups = {
    allEnabled: {
        merge: true,
        rebase: true,
        squash: true
    },
    allDisabled: {
        merge: false,
        rebase: false,
        squash: false
    }
};

const defaultMergeMethodLookup = mergeMethodLookups.allEnabled;

const MERGE_BLOCKING_STYLE_EL_ID = "mergeBlockingStyle";

function insertMergeBlockingStyle(allowedMergeMethodLookup) {

    document.head.insertAdjacentHTML(`beforeend`, `
        <style id="${MERGE_BLOCKING_STYLE_EL_ID}">
            ${
                Object.entries(allowedMergeMethodLookup).filter(([_, isAllowed]) => isAllowed === false).map(([blockedMergeMethodName, _]) => {
                    const selector = `.merge-message button[value='${blockedMergeMethodName}']`;
                    const styleDeclarations = `user-select: none; pointer-events: none; opacity: 0.6; cursor: not-allowed !important;`;
                    const note = `Disabled when merging into this branch.`;
                    return `${selector} { ${styleDeclarations} } ${selector}:after { content: "${note}" }`;
                })
            }
        </style>
    `);
}

function insertMergeBlockingStyleIfNotInserted(allowedMergeMethodLookup) {
    const doesMergeBlockingStyleExist = !!(document.getElementById(MERGE_BLOCKING_STYLE_EL_ID));
    if(!doesMergeBlockingStyleExist) {
        insertMergeBlockingStyle(allowedMergeMethodLookup);
    }
}

export { insertMergeBlockingStyle, insertMergeBlockingStyleIfNotInserted };