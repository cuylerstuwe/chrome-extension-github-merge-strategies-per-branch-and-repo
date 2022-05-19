

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

const allMergeBlockingStyle = `
    <style id="allMergeBlockingStyle">
        .merge-message .select-menu {
            pointer-events: none;
            user-select: none;
            opacity: 0.4;
            margin-bottom: 12px;
        }
        .merge-message .select-menu:after {
            content: "Extension disabled merging into this branch entirely.";
            margin-left: 7px;
        }
    </style>
`;

const defaultMergeMethodLookup = mergeMethodLookups.allEnabled;

const MERGE_BLOCKING_STYLE_EL_ID = "mergeBlockingStyle";

function insertMergeBlockingStyle(allowedMergeMethodLookup, baseRefName) {

    const areNoMergeMethodsAllowed = Object.values(allowedMergeMethodLookup).every(val => !val);
    if(areNoMergeMethodsAllowed) {
        document.body.insertAdjacentHTML("beforeend", allMergeBlockingStyle);
    }

    document.body.insertAdjacentHTML(`beforeend`, `
        <style id="${MERGE_BLOCKING_STYLE_EL_ID}">
            ${
                Object.entries(allowedMergeMethodLookup).filter(([_, isAllowed]) => isAllowed === false).map(([blockedMergeMethodName, _]) => {
                    const selector = `.merge-message button[value='${blockedMergeMethodName}']`;
                    const styleDeclarations = `user-select: none; pointer-events: none; opacity: 0.6; cursor: not-allowed !important;`;
                    const note = `Disabled by extension when merging into ${baseRefName}.`;
                    return `${selector} { ${styleDeclarations} } ${selector}:after { content: "${note}" }`;
                }).join("\n")
            }
        </style>
    `);
}

function insertMergeBlockingStyleIfNotInserted(allowedMergeMethodLookup, baseRefName) {
    const doesMergeBlockingStyleExist = !!(document.getElementById(MERGE_BLOCKING_STYLE_EL_ID));
    if(!doesMergeBlockingStyleExist) {
        insertMergeBlockingStyle(allowedMergeMethodLookup, baseRefName);
    }
}

export { insertMergeBlockingStyle, insertMergeBlockingStyleIfNotInserted };