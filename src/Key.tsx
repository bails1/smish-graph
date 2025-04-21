import './Key.css'

function Key() {
  return (
    <div className="key">
      <div className="key-item">
        <span className="dot dot-page"></span>
        Phishing page
      </div>
      <div className="key-item">
        <span className="dot dot-bot"></span>
        Telegram bot
      </div>
      <div className="key-item">
        <span className="dot dot-chat"></span>
        Telegram chat
      </div>
      <div className="key-item">
        <span className="dot dot-user"></span>
        Telegram user
      </div>
      <div className="key-item">
        <span className="dot dot-author"></span>
        Phish kit author
      </div>
      <div className="key-item">
        <span className="dot dot-token"></span>
        Unresolved bot token
      </div>
    </div>
  )
}

export default Key
