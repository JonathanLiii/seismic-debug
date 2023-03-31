function onContextMenuClick(info, tab) {
  const url = new URL(tab.url);
  const navigateTo = getDebugUrl(url);
  console.log(navigateTo);
  chrome.tabs.update(tab.id, { url: navigateTo }, () => {
    console.log("update succeed");
  });
}

function getDebugUrl(url) {
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

/* Main */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    type: "normal",
    id: "seismic.debug",
    title: "Seismic Debug",
    contexts: ["page"],
    documentUrlPatterns: ["https://*.seismic.com/*"],
  });
});

chrome.contextMenus.onClicked.addListener(onContextMenuClick);