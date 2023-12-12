// client/src/js/install.js:
const butInstall = document.getElementById('buttonInstall');

// ✅: Add an event handler to the `beforeinstallprompt` event
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
  // Update UI to notify the user they can add to home screen
  butInstall.style.display = 'block';
});

// ✅: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', () => {
  // Hide our user interface that shows our A2HS button
  butInstall.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
});

// ✅: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Log install to analytics
  console.log('PWA was installed');
});
