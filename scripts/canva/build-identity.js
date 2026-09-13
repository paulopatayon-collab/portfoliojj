(function pushPageBuildIdentityToNativeShell(identity) {
  if (typeof window === 'undefined') {
    return;
  }
  if (Object.values(identity).every(value => value == null)) {
    return;
  }
  const json = JSON.stringify(identity);
  if (window.Android?.onPageBuildIdentityReady) {
    // Android-shaped device
    window.Android.onPageBuildIdentityReady(json);
  } else if (window.Harmony?.onPageBuildIdentityReady) {
    // HarmonyOS-shaped device
    window.Harmony.onPageBuildIdentityReady(json);
  } else if (window.webkit?.messageHandlers?.pageBuildIdentityReady) {
    // iOS-shaped device
    window.webkit.messageHandlers.pageBuildIdentityReady.postMessage(json);
  } else if (window.ElectronBridge?.onPageBuildIdentityReady) {
    // Canva desktop app
    window.ElectronBridge.onPageBuildIdentityReady(json);
  } else {
    // No native platform detected. Nothing to notify.
  }
})({stack: 'export_website', variant:  null , version: 'e34b1ed14d0397689f9544ac5fa8472062b7b5b7', releaseName: '20260907-23-e34b1ed', deploymentGroup: 'STABLE'});
