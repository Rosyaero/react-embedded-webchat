import "./App.css"
import EmbeddedWebchat from "./EmbeddedWebchat"

const BOT_ID = "477af03c-98d9-416e-9536-1ad66a91e54e"
function App() {
  return (
    <div className="App">
      <EmbeddedWebchat botID={BOT_ID} />
    </div>
  )
}

export default App
