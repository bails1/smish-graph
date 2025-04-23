import { useCallback, useEffect, useRef, useState } from 'react'
import ForceGraph2D, { ForceGraphMethods, NodeObject, LinkObject } from 'react-force-graph-2d'
import Key from './Key'
import NodeDetail from './NodeDetail'
import { GraphData, GraphNode } from './types/common'

function App() {
  const fgRef = useRef<ForceGraphMethods<NodeObject<GraphNode>, LinkObject<GraphNode, { source: number; target: number; }>> | undefined>(undefined)
  const [data, setData] = useState<GraphData>({ nodes: [], links: [] })
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json`).then(res => res.json()).then(data => setData(data))
  }, [])

  const handleClick = useCallback((node: NodeObject<NodeObject<GraphNode>>) => {
    setSelectedNode(node)
    fgRef.current?.centerAt(node.x, node.y, 500)
  }, [])

  return (
    <>
      <Key />
      {selectedNode && <NodeDetail node={selectedNode} />}
      <ForceGraph2D
        ref={fgRef}
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
        onNodeClick={handleClick}
        onBackgroundClick={() => setSelectedNode(null)}
      />
    </>
  )
}

export default App
