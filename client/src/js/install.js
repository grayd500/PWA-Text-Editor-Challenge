// client/src/js/install.js:
const butInstall = document.getElementById('buttonInstall');

// ✅: Add an event handler to the `beforeinstallprompt` event
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
  // remove the hidden class from install button container
  butInstall.classList.toggle('hidden', false);
});

// ✅: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  // show the install prompt
  promptEvent.prompt();
  window.deferredPrompt = null;
  // hide the install button
  butInstall.classList.toggle('hidden', true);
});

// ✅: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Log install to analytics
  window.deferredPrompt = null;
  console.log('PWA was installed');
});
