import { useEffect } from "react";

interface Props {
  botID: string;
}

const EmbeddedWebchat = ({ botID }: Props) => {
  useEffect(() => {
    // Inject the script
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v3.2/inject.js";
    script.async = true;
    script.onload = () => {
      // ✅ Initialize after script loads
      window.botpressWebChat.init({
        botId: botID,
        clientId: "c4aae970-1304-4b0e-bfa6-55c13a110136",
        hostUrl: "https://cdn.botpress.cloud/webchat/v3.2",
        messagingUrl: "https://messaging.botpress.cloud",
        hideWidget: true,
        showCloseButton: false,
        containerWidth: "100%",
        layoutWidth: "100%",
        chatId: "botpress-webchat",
      });

      // ✅ Open the chat immediately
      (window.botpressWebChat as any).init({...})
      (window.botpressWebChat as any).on('webchat:ready', () => {
        (window.botpressWebChat as any).open();
      });
    };

    document.body.appendChild(script);
  }, [botID]);

  return <div id="botpress-webchat" />;
};

export default EmbeddedWebchat;
