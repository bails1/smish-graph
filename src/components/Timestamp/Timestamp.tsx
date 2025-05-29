import './Timestamp.css'

type TimestampProps = {
  timestamp: number
}

function Timestamp({ timestamp }: TimestampProps) {
  return (
    <div className="timestamp">
      Updated {new Date(timestamp).toLocaleString('en-us', {dateStyle: 'short', timeStyle: 'short'})}
    </div>
  )
}

export default Timestamp
