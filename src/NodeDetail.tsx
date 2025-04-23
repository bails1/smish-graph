import { useState } from 'react'
import './NodeDetail.css'
import { GraphNode } from './types/common'

type UserPhotosProps = {
  images: {
    src: string
    alt?: string
  }[]
}

function UserPhotos({ images }: UserPhotosProps) {
  const [imgIndex, setImgIndex] = useState(0)

  return (
    <div className="node-detail-img">
      {(images.length > 1) &&
        <div onClick={() => setImgIndex((imgIndex - 1 + images.length) % images.length)}>
          &#8249;
        </div>
      }
      <img className="node-detail-user-img" src={images[imgIndex].src} alt={images[imgIndex].alt} />
      {(images.length > 1) &&
        <div onClick={() => setImgIndex((imgIndex + 1) % images.length)}>
          &#8250;
        </div>
      }
    </div>
  )
}

type PagePhotoProps = {
  scanId: string
}

function PagePhoto({ scanId }: PagePhotoProps) {
  return (
    <div className="node-detail-img">
      <img className="node-detail-page-img" src={`https://urlscan.io/screenshots/${scanId}.png`} alt="Screenshot" />
    </div>
  )
}

type NodeDetailProps = {
  node: GraphNode
}

function NodeDetail({ node }: NodeDetailProps) {
  const getTimeStr = (time: Date) => {
    const dt = new Date(time)
    return dt.toLocaleString('en-us', {dateStyle: 'medium', timeStyle: 'long'})
  }

  return (
    <div className="node-detail">
      {node.type === 'user' && node.data.photos.length > 0 &&
        <UserPhotos images={node.data.photos.map(p => ({ src: `${import.meta.env.BASE_URL}photos/${p.path}`, alt: 'User photo' }))} key={node.id} />
      }
      {node.type === 'page' && <PagePhoto scanId={node.data.scanId} key={node.id} />}
      {(node.type === 'user' || node.type === 'bot') &&
        <>
          <div className="node-detail-item node-detail-name">{node.data.firstName + (node.data.lastName ? ` ${node.data.lastName}` : '')}</div>
          {node.data.username && <div className="node-detail-item node-detail-username">{`@${node.data.username}`}</div>}
          {node.type === 'user' && node.data.bio && <div className="node-detail-item">{node.data.bio}</div>}
          {node.type === 'bot' && node.data.description && <div className="node-detail-item">{node.data.description}</div>}
        </>
      }
      {node.type === 'chat' &&
        <>
          {node.data.title && <div className="node-detail-item node-detail-name">{node.data.title}</div>}
          {node.data.description && <div className="node-detail">{node.data.description}</div>}
        </>
      }
      {node.type === 'page' &&
        <>
          <div className="node-detail-item">{node.data.url}</div>
          <div className="node-detail-item">{getTimeStr(node.data.time)}</div>
          <a className="node-detail-item node-detail-link" href={`https://urlscan.io/result/${node.data.scanId}/`} target="_blank">More details</a>
        </>
      }
      {node.type === 'token' &&
        <div className="node-detail-item">This node represents a Telegram bot token which is no longer valid (token revoked, bot deleted or banned). As a result, no additional details can be gathered about the bot, or any associated chats or users.</div>
      }
    </div>
  )
}

export default NodeDetail
