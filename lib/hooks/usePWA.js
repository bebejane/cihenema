import {useEffect, useState} from 'react';

const isOnHomeScreen = () => {
  return ('standalone' in navigator && !navigator.standalone && (/iphone|ipod|ipad/gi).test(navigator.platform) && (/Safari/i).test(navigator.appVersion))
}

const usePWA = () => {
  
  const [state, setState] = useState(undefined)
  //const [conf, setConfirm] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      
      const noConfirm = true;
      const wb = window.workbox
      
      // add event listeners to handle any of PWA lifecycle event
      // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
      wb.addEventListener('installed', event => {
        setState(event.type)
      })  
      wb.addEventListener('controlling', event => {
        setState(event.type)
      })
      wb.addEventListener('activated', event => {
        setState(event.type)
      })
  
      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: MUST set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      const promptNewVersionAvailable = e => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        console.log('A newer version of this web app is available')
        setState(e.type)    
        wb.addEventListener('controlling', e => {
          setState(e.type)
        })
        wb.messageSkipWaiting()
      }
      wb.addEventListener('waiting', promptNewVersionAvailable)
  
      // ISSUE - this is not working as expected, why?
      // I could only make message event listenser work when I manually add this listenser into sw.js file
      wb.addEventListener('message', e => {
        setState(e.type)
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
  
      /*
      wb.addEventListener('redundant', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      wb.addEventListener('externalinstalled', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      wb.addEventListener('externalactivated', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      */
  
      // never forget to call register as auto register is turned off in next.config.js
      wb.register()
    }
  }, [])

  return [state, setState]
}

export default usePWA;