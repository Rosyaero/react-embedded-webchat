import { useEffect, useState } from "react"

interface Props {
  botID: string
}

const INJECTION_ID = "bp-webchat-injection"
const WEBCHAT_ID = "botpress-webchat"
const WRAPPER_ID = `${WEBCHAT_ID}-wrapper`

const EmbeddedWebchat = (props: Props) => {
  const [injectScriptLoaded, setWebchatLoaded] = useState(false)
  const [webchatReady, setWebchatReady] = useState(false)

  const loadWebchatScript = (): Promise<Webchat> => {
    if (window.botpressWebChat) {
      return Promise.resolve(window.botpressWebChat)
    }
    if (!window.document.getElementById(INJECTION_ID)) {
      const script = window.document.createElement("script")
      script.src = `https://cdn.botpress.cloud/webchat/v3.2/inject.js`
      script.id = INJECTION_ID
      window.document.body.appendChild(script)
    }
    const loadPromise = new Promise<Webchat>((resolve) => {
      const intervalId = setInterval(() => {
        if (window.botpressWebChat) {
          setWebchatLoaded(true)
          clearInterval(intervalId)
          resolve(window.botpressWebChat)
        }
      }, 100)
    })
    return loadPromise
  }

  useEffect(() => {
    loadWebchatScript().then((webchat: Webchat) => {
      webchat.onEvent(
        (event: WebchatEvent) => {
          if (event.type === "LIFECYCLE.LOADED") {
            setWebchatReady(true)
            window.botpressWebChat.sendEvent({ type: "show" }, WEBCHAT_ID)
          }
        },
        ["LIFECYCLE.LOADED", "LIFECYCLE.LOADED"],
        WEBCHAT_ID
      )
    })
  }, [])

  useEffect(() => {
    if (!injectScriptLoaded) {
      return
    }
    if (import.meta.env.DEV && webchatReady) {
      document.querySelector(`#${WRAPPER_ID}>div`)?.remove()
    }
    const webchatConfig = {
      botId: props.botID,
      clientId: "c4aae970-1304-4b0e-bfa6-55c13a110136",
      hostUrl: "https://cdn.botpress.cloud/webchat/v3.2",
      messagingUrl: "https://messaging.botpress.cloud",
      stylesheet: `${window.location.origin}/webchat-stylesheet.css`,
      showConversationsButton: false,
      hideWidget: true,
      disableAnimations: true,
      className: "webchatIframe",
      showPoweredBy: true,
      enableTranscriptDownload: false,
      showCloseButton: false,
      closeOnEscape: false,
      containerWidth: encodeURIComponent("100%"),
      layoutWidth: encodeURIComponent("100%"),
      // These 3 should use real bot info
      botName: "anonymized",
      botConversationDescription:
        "Chat with this bot built surprisingly fast in Botpress",
      composerPlaceholder: `Chat with Bot NAME`, // TODO replace with bot name from static file
      // remove this when we have a real bot
      chatId: WEBCHAT_ID,
    }

    window.botpressWebChat.init(webchatConfig, `#${WRAPPER_ID}`)
  }, [injectScriptLoaded])

  return (
    <div id={WRAPPER_ID} className="webchatContainer">
      {!webchatReady && <div>loading</div>}
    </div>
  )
}

export default EmbeddedWebchat
