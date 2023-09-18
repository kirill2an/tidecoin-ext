
function getBrowser() {
    if (typeof globalThis.browser === 'undefined') {
        return chrome;
    } else {
        return globalThis.browser;
    }
}

const browser = getBrowser();

export async function browserWindowsGetCurrent(params?: any) {
    return await browser.windows.getCurrent(params);
}

export async function browserWindowsCreate(params?: any) {
    return await browser.windows.create(params);
}

export async function browserWindowsUpdate(windowId: number, updateInfo: any) {
    return await browser.windows.update(windowId, updateInfo);
}

export async function browserWindowsRemove(windowId: number) {
    return await browser.windows.remove(windowId);
}

export async function browserStorageLocalGet(val: any) {
    return await browser.storage.local.get(val);
}

export async function browserStorageLocalSet(val: any) {
    return await browser.storage.local.set(val);
}

export async function browserTabsGetCurrent() {
    return await browser.tabs.getCurrent();
}

export async function browserTabsQuery(params: any) {
    return await browser.tabs.query(params);
}

export async function browserTabsCreate(params: any) {
    return await browser.tabs.create(params);
}

export async function browserTabsUpdate(tabId: number, params: any) {
    return await browser.tabs.update(tabId, params);
}

export function browserWindowsOnFocusChanged(listener) {
    browser.windows.onFocusChanged.addListener(listener);
}

export function browserWindowsOnRemoved(listener) {
    browser.windows.onRemoved.addListener(listener);
}

export function browserTabsOnUpdated(listener) {
    browser.tabs.onUpdated.addListener(listener);
}

export function browserTabsOnRemoved(listener) {
    browser.tabs.onRemoved.addListener(listener);
}

export function browserRuntimeOnConnect(listener) {
    browser.runtime.onConnect.addListener(listener);
}

export function browserRuntimeOnInstalled(listener) {
    browser.runtime.onInstalled.addListener(listener);
}

export function browserRuntimeConnect(extensionId?: string, connectInfo?: any) {
    return browser.runtime.connect(extensionId, connectInfo);
}

export default browser;