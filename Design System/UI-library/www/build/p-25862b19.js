import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-7e9d4539.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v2.17.3 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        // because the mark/measure APIs are designed to write entries to a buffer in the browser that does not exist,
        // simply stub the implementations out.
        // TODO(STENCIL-323): Remove this patch when support for older browsers is removed (breaking)
        // @ts-ignore
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-26e7cb2c.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["blaze-tags",[[0,"blaze-tags",{"placeholder":[1],"autocomplete":[4],"options":[1],"_placeholder":[32],"_options":[32],"choices":[32],"inputValue":[32],"setOptions":[64]}]]],["blaze-accordion",[[4,"blaze-accordion",null,[[0,"togglepane","onTogglePane"]]]]],["blaze-accordion-pane",[[4,"blaze-accordion-pane",{"open":[4],"header":[1],"_isOpen":[32],"show":[64],"close":[64],"isOpen":[64]}]]],["blaze-address",[[4,"blaze-address"]]],["blaze-address-heading",[[4,"blaze-address-heading"]]],["blaze-alert",[[4,"blaze-alert",{"type":[1],"dismissible":[4],"open":[4],"_isOpen":[32],"close":[64],"show":[64],"isOpen":[64]}]]],["blaze-alerts",[[4,"blaze-alerts",{"position":[1]}]]],["blaze-avatar",[[0,"blaze-avatar",{"size":[1],"src":[1],"src2":[1,"src-2"],"alt":[1],"alt2":[1,"alt-2"],"text":[1]}]]],["blaze-back-to-top",[[4,"blaze-back-to-top",{"position":[1],"_isOpen":[32]},[[5,"scroll","enable"]]]]],["blaze-badge",[[4,"blaze-badge",{"type":[1],"rounded":[4],"ghost":[4]}]]],["blaze-calendar",[[0,"blaze-calendar",{"date":[1],"type":[1],"multiple":[4],"_date":[32],"_selectedDates":[32]}]]],["blaze-card",[[4,"blaze-card"]]],["blaze-card-body",[[4,"blaze-card-body"]]],["blaze-card-footer",[[4,"blaze-card-footer"]]],["blaze-card-header",[[4,"blaze-card-header"]]],["blaze-counter",[[4,"blaze-counter",{"autoStart":[4,"auto-start"],"startValue":[2,"start-value"],"endValue":[2,"end-value"],"decimals":[2],"duration":[2],"delay":[2],"easing":[4],"grouping":[4],"separator":[1],"decimal":[1],"start":[64],"reset":[64],"update":[64],"restart":[64],"pauseResume":[64]}]]],["blaze-demo",[[0,"blaze-demo",{"classes":[1],"code":[1],"language":[1],"demo":[4],"markup":[32]}]]],["blaze-divider",[[4,"blaze-divider",{"type":[1],"content":[32]}]]],["blaze-drawer",[[4,"blaze-drawer",{"open":[4],"dismissible":[4],"position":[1],"_isOpen":[32],"close":[64],"show":[64],"isOpen":[64]}]]],["blaze-file-upload",[[4,"blaze-file-upload",{"drop":[4],"multiple":[4],"url":[1],"files":[32]}]]],["blaze-image",[[0,"blaze-image",{"src":[1],"alt":[1],"width":[2],"height":[2],"photo":[1],"user":[1],"likes":[4],"collection":[1],"filter":[1],"_src":[32]}]]],["blaze-media-body",[[4,"blaze-media-body"]]],["blaze-media-image",[[0,"blaze-media-image",{"src":[1],"alt":[1]}]]],["blaze-media-item",[[4,"blaze-media-item"]]],["blaze-modal",[[4,"blaze-modal",{"ghost":[4],"full":[4],"open":[4],"dismissible":[4],"_isOpen":[32],"close":[64],"show":[64],"isOpen":[64]}]]],["blaze-pagination",[[0,"blaze-pagination",{"page":[2],"pages":[2],"_currentPage":[32],"goToPage":[64],"currentPage":[64]}]]],["blaze-panel",[[4,"blaze-panel",{"height":[2]}]]],["blaze-progress",[[4,"blaze-progress",{"rounded":[4],"timer":[4],"size":[1]},[[0,"progressbar","onChangeBar"]]]]],["blaze-progress-bar",[[4,"blaze-progress-bar",{"type":[1],"value":[2],"min":[2],"max":[2],"duration":[2]}]]],["blaze-sticky",[[4,"blaze-sticky",{"top":[2],"staticStyles":[32],"stickyStyles":[32]},[[9,"resize","positionElement"],[5,"scroll","positionElement"]]]]],["blaze-tab",[[4,"blaze-tab",{"header":[1],"disabled":[4],"open":[4],"type":[1]}]]],["blaze-tabs",[[4,"blaze-tabs",{"tabs":[32],"currentTab":[64],"openTab":[64]}]]],["blaze-timeline",[[4,"blaze-timeline",{"alternate":[4],"loading":[4]}]]],["blaze-timeline-item",[[4,"blaze-timeline-item",{"type":[1],"last":[4],"left":[4],"loading":[4]}]]],["blaze-toggle",[[4,"blaze-toggle",{"type":[1],"toggled":[4],"_toggled":[32],"isToggled":[64]}]]],["blaze-tree",[[4,"blaze-tree"]]],["blaze-tree-branch",[[4,"blaze-tree-branch",{"expanded":[32],"expand":[64],"collapse":[64]}]]],["blaze-tree-leaf",[[4,"blaze-tree-leaf"]]],["blaze-autocomplete",[[0,"blaze-autocomplete",{"placeholder":[1],"items":[32],"selectedItem":[32],"activeItem":[32],"_isOpen":[32],"value":[32],"setItems":[64],"reset":[64]},[[0,"keydown","handleKeyDown"]]]]]], options);
});
