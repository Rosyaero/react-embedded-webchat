import { useEffect } from "react";

interface Props {
  botID: string;
}

const EmbeddedWebchat = ({ botID }: Props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v3.2/inject.js";
    script.async = true;

    script.onload = () => {
      if (!(window as any).botpress?.init) {
        console.error("Botpress init function not found");
        return;
      }

      (window as any).botpress.init({
        botId: botID,
        clientId: "c4aae970-1304-4b0e-bfa6-55c13a110136",
        configuration: {
          version: "v1",
          themeMode: "light",
          hideWidget: false,
          layoutWidth: "100%",
          containerWidth: "100%",
          feedbackEnabled: false,
          footer: ""
        }
      });

      (window as any).botpress.open(); // Optional: auto-open on load
    };

    document.body.appendChild(script);
  }, [botID]);

  return null; // No need to return a div, Botpress injects its own iframe
};

export default EmbeddedWebchat;
