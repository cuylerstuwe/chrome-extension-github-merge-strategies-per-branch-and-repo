const clickMergeMethod = (mergeMethodName) => document.querySelector(`.merge-message .select-menu-merge-method button[value='${mergeMethodName}']`)?.click();
export { clickMergeMethod };
