import { useEffect, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import Key from './Key'

type TgUserNode = {
  id: number
  type: 'user'
  data: {
    photos: {
      photoId: number
      tgFileId: string
      path: string
    }[]
  } & {
    userDetailId: number
    firstName: string
    lastName: string | null
    username: string | null
    bio: string | null
    time: Date
    userId: bigint
  }
}

type TgBotNode = {
  id: number
  type: 'bot'
  data: {
    firstName: string
    lastName: string | null
    username: string | null
    time: Date
    description: string | null
    botDetailId: number
    shortDescription: string | null
    botId: bigint
  }
}

type TgTokenNode = {
  id: number
  type: 'token'
  data: {
    botId: bigint | null
    tgToken?: string
    tokenId: number
  }
}

type TgChatNode = {
  id: number
  type: 'chat'
  data: {
    time: Date
    chatDetailId: number
    type: string
    title: string | null
    description: string | null
    chatId: bigint
  }
}

type UrlscanScanNode = {
  id: number
  type: 'page'
  data: {
    time: Date
    scanId?: string
    url: string
    domain: string
  }
}

type GraphData = {
  nodes: (TgUserNode | TgBotNode | TgTokenNode | TgChatNode | UrlscanScanNode)[]
  links: {
    source: number
    target: number
  }[]
}

function App() {
  const [data, setData] = useState<GraphData>({ nodes: [], links: [] })

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json`).then(res => res.json()).then(data => setData(data))
  }, [])

  return (
    <>
      <Key />
      <ForceGraph2D
        graphData={data}
        backgroundColor='#000000'
        nodeColor={node => {
          if (node.type === 'user' && node.data.username === 'qodeninja') return '#FF2F36'
          if (node.type === 'user') return '#FFC32F'
          else if (node.type === 'bot') return '#A929E3'
          else if (node.type === 'token') return '#DBDBDB'
          else if (node.type === 'chat') return '#CBFF43'
          else if (node.type === 'page') return '#39C2D1'
          return '#000000'
        }}
        nodeLabel={node => {
          if (node.type === 'user') return node.data.firstName + (node.data.lastName ? ' ' + node.data.lastName : '') + (node.data.username ?  ` (@${node.data.username})` : '')
          else if (node.type === 'bot') return node.data.firstName + (node.data.lastName ? ' ' + node.data.lastName : '') + (node.data.username ?  ` (@${node.data.username})` : '')
          else if (node.type === 'token') return 'Unresolved bot token'
          else if (node.type === 'page') return node.data.url
          else if (node.type === 'chat') return node.data.title || node.data.chatId.toString()
          return ''
        }}
        linkColor={() => '#FFFFFF'}
        linkDirectionalParticles={1}
        linkDirectionalParticleWidth={2}
        d3VelocityDecay={0.5}
      />
    </>
  )
}

export default App
