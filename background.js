function onContextMenuClick(info, tab) {
    const menuItemId = info.menuItemId;
    const url = new URL(tab.url);
    let navigateTo = url;
    if (menuItemId === "mono.debug") {
        navigateTo = getMonoDebugUrl(url);
    } else if (menuItemId === "LDX_variant.debug") {
        navigateTo = getLDXVariabntDebugUrl(url);
    } else if (menuItemId === "LDX_batch.debug") {
        navigateTo = getLDXBatchDebugUrl(url);
    }

    console.log("🚀 ~ onContextMenuClick ~ navigateTo:", navigateTo);
    chrome.tabs.update(tab.id, { url: navigateTo }, () => {
        console.log("update succeed");
    });
}

function getMonoDebugUrl(url) {
    const searchParams = url.searchParams;
    if (searchParams.has("debug")) {
        searchParams.delete("debug");
        searchParams.delete("newcicd");
        searchParams.delete("cdn");
    } else {
        searchParams.append("debug", true);
        searchParams.append("newcicd", true);
        searchParams.append("cdn", "https://127.0.0.1:4444");
    }
    return url.toString();
}

function getLDXVariabntDebugUrl(url) {
    const searchParams = url.searchParams;
    if (searchParams.has("seismic-livedoc-variants-cdn")) {
        searchParams.delete("seismic-livedoc-variants-cdn");
    } else {
        searchParams.append(
            "seismic-livedoc-variants-cdn",
            "https://127.0.0.1:3000"
        );
    }
    return url.toString();
}

function getLDXBatchDebugUrl(url) {
    const searchParams = url.searchParams;
    if (searchParams.has("seismic-batch-schedule-cdn")) {
        searchParams.delete("cdseismic-batch-schedule-cdnn");
    } else {
        searchParams.append(
            "seismic-batch-schedule-cdn",
            "https://127.0.0.1:3000"
        );
    }
    return url.toString();
}

/* Main */
chrome.runtime.onInstalled.addListener(() => {
    const contexts = ["page"];
    chrome.contextMenus.create({
        type: "normal",
        id: "seismic.debug",
        title: "Seismic Debug",
        contexts: contexts,
        documentUrlPatterns: ["https://*.seismic.com/*"],
    });

    chrome.contextMenus.create({
        type: "normal",
        id: "mono.debug",
        title: "🤡 Mono Debug",
        parentId: "seismic.debug",
        contexts: contexts,
    });

    chrome.contextMenus.create({
        type: "normal",
        id: "LDX_variant.debug",
        title: "🚨 LDX Variant Debug",
        parentId: "seismic.debug",
        contexts: contexts,
    });

    chrome.contextMenus.create({
        type: "normal",
        id: "LDX_batch.debug",
        title: "🦄 LDX Batch Debug",
        parentId: "seismic.debug",
        contexts: contexts,
    });
});

chrome.contextMenus.onClicked.addListener(onContextMenuClick);
