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
    scanId: string
    url: string
    domain: string
  }
}

export type GraphNode = TgUserNode | TgBotNode | TgTokenNode | TgChatNode | UrlscanScanNode

export type GraphData = {
  nodes: GraphNode[]
  links: {
    source: number
    target: number
  }[]
}
