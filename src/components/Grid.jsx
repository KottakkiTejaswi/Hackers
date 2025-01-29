import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';


const predefinedImages = [
  { id: 1, name: 'Database', src: '/databasee.png' },
  { id: 2, name: 'Firewall', src: '/firewall.png' },
  { id: 3, name: 'WWW Endpoint', src: '/node.png' },
  { id: 4, name: 'Server', src: '/server.png' }
];

const Grid = () => {
  const containerRef = useRef(null);
  const [connections, setConnections] = useState([]);
  const [startNode, setStartNode] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [placedImages, setPlacedImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);

  // Generate 51x51 grid of nodes (50x50 squares)
  const nodes = useMemo(() => 
    Array.from({ length: 51 }, (_, x) =>
      Array.from({ length: 51 }, (_, y) => ({ x, y }))
    ).flat(),
  []);

  const handleMouseMove = useCallback((event) => {
    if (!startNode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCurrentPosition({ x, y });
  }, [startNode]);

  const handleMouseUp = useCallback((event) => {
    if (!startNode || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find the end node
    let endNode = null;
    for (const node of nodes) {
      const nodeX = node.x * 50;
      const nodeY = node.y * 50;
      const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
      if (distance < 10) {
        endNode = node;
        break;
      }
    }

    if (endNode && (startNode.x !== endNode.x || startNode.y !== endNode.y)) {
      const startImage = placedImages.find(img => 
        img.x === startNode.x && img.y === startNode.y
      );
      const endImage = placedImages.find(img => 
        img.x === endNode.x && img.y === endNode.y
      );

      setConnections(prev => [...prev, { 
        start: { x: startNode.x, y: startNode.y }, 
        end: { x: endNode.x, y: endNode.y },
        startImage: startImage?.name || 'Node',
        endImage: endImage?.name || 'Node',
        connection: `${startImage?.name || 'Node'} → ${endImage?.name || 'Node'}`
      }]);
    }

    // Cleanup
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    setStartNode(null);
    setCurrentPosition(null);
  }, [startNode, nodes, handleMouseMove, placedImages]);

  const handleNodeMouseDown = useCallback((node) => {
    setStartNode(node);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  // Image drag handlers
  const handleImageDragStart = (e, image) => {
    const uid = image.uid || Date.now();
    setDraggedImage({ ...image, uid });
    e.dataTransfer.setData('text/plain', '');
  };

  const handleImageDrop = (e, x, y) => {
    e.preventDefault();
    if (draggedImage) {
      setPlacedImages(prev => [
        ...prev.filter(img => img.uid !== draggedImage.uid),
        { ...draggedImage, x, y }
      ]);
    }
  };

  // Handle node double click to remove image and connections
  const handleNodeDoubleClick = useCallback((node) => {
    setPlacedImages(prev => prev.filter(img => 
      !(img.x === node.x && img.y === node.y)
    ));
    
    setConnections(prev => prev.filter(conn => 
      !(conn.start.x === node.x && conn.start.y === node.y) &&
      !(conn.end.x === node.x && conn.end.y === node.y)
    ));
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div style={{ padding: '100px' }}>
      <svg
        ref={containerRef}
        width="1000"
        height="400"
        style={{ border: '1px solid #ccc' }}
      >
        {/* Connections */}
        {connections.map((conn, index) => (
          <line
            key={index}
            x1={conn.start.x * 50}
            y1={conn.start.y * 50}
            x2={conn.end.x * 50}
            y2={conn.end.y * 50}
            stroke="red"
            strokeWidth="2"
          />
        ))}

        {/* Placed images */}
        {placedImages.map((img) => (
          <foreignObject
            key={img.uid}
            x={img.x * 50 - 20}
            y={img.y * 50 - 20}
            width="40"
            height="40"
          >
            <img
              src={img.src}
              alt={img.name}
              draggable
              onDragStart={(e) => handleImageDragStart(e, img)}
              onDragEnd={() => setDraggedImage(null)}
              style={{ 
                width: '40px', 
                height: '40px', 
                cursor: 'grab',
                pointerEvents: 'auto'
              }}
            />
          </foreignObject>
        ))}

        {/* Grid nodes */}
        {nodes.map((node) => (
          <g key={`${node.x}-${node.y}`}>
            <rect
              x={node.x * 50 - 25}
              y={node.y * 50 - 25}
              width="50"
              height="50"
              fill="transparent"
              onDrop={(e) => handleImageDrop(e, node.x, node.y)}
              onDragOver={(e) => e.preventDefault()}
            />
            <circle
              cx={node.x * 50}
              cy={node.y * 50}
              r="5"
              fill="black"
              onMouseDown={() => handleNodeMouseDown(node)}
              onDoubleClick={() => handleNodeDoubleClick(node)}
              style={{ cursor: 'pointer' }}
            />
          </g>
        ))}

        {/* Temporary connection line */}
        {startNode && currentPosition && (
          <line
            x1={startNode.x * 50}
            y1={startNode.y * 50}
            x2={currentPosition.x}
            y2={currentPosition.y}
            stroke="red"
            strokeWidth="2"
          />
        )}
      </svg>

      {/* Image Palette */}
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        borderTop: '2px solid #ccc',
        zIndex: 1000
      }}>
        {predefinedImages.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.name}
            draggable
            onDragStart={(e) => handleImageDragStart(e, { ...image })}
            onDragEnd={() => setDraggedImage(null)}
            style={{ 
              width: '40px', 
              height: '40px', 
              cursor: 'grab', 
              margin: '0 10px' 
            }}
          />
        ))}
      </div>

      <div style={{ marginTop: '20px', top: '500px' }}>
        <h3>Network State:</h3>
        <pre>
          {JSON.stringify({
            connections: connections.map(conn => ({
              from: conn.startImage,
              to: conn.endImage,
              path: `${conn.start.x},${conn.start.y} → ${conn.end.x},${conn.end.y}`
            })),
            devices: placedImages.map(img => ({
              name: img.name,
              type: img.name,
              position: `${img.x},${img.y}`
            }))
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Grid;