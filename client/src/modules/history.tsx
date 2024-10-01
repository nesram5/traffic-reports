'use client'

import { useState } from 'react'

interface TicketGroup {
  name: string
  count: number
  items?: TicketGroup[]
}

const ticketData: TicketGroup[] = [
  { name: 'junio 2024', count: 743 },
  { name: 'julio 2024', count: 1775 },
  { name: 'agosto 2024', count: 2341 },
  {
    name: 'septiembre 2024',
    count: 5554,
    items: [
      { name: '01 sept. 2024', count: 118 },
      { name: '02 sept. 2024', count: 132 },
      { name: '03 sept. 2024', count: 180 },
      { name: '04 sept. 2024', count: 213 },
      { name: '05 sept. 2024', count: 162 },
      { name: '06 sept. 2024', count: 190 },
      { name: '07 sept. 2024', count: 132 },
      { name: '08 sept. 2024', count: 117 },
      { name: '09 sept. 2024', count: 292 },
      { name: '10 sept. 2024', count: 287 },
      // ... add more days as needed
    ],
  },
]

export default function HistoryPage() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['septiembre 2024']))

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(groupName)) {
        newSet.delete(groupName)
      } else {
        newSet.add(groupName)
      }
      return newSet
    })
  }

  const renderGroup = (group: TicketGroup, level: number = 0) => {
    const isExpanded = expandedGroups.has(group.name)
    const hasItems = group.items && group.items.length > 0

    return (
      <div key={group.name} style={{ marginLeft: `${level * 20}px` }}>
        <div
          className={`group-header ${hasItems ? 'expandable' : ''}`}
          onClick={() => hasItems && toggleGroup(group.name)}
        >
          {hasItems && (
            <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
          )}
          <span className="group-name">{group.name}</span>
          <span className="group-count">({group.count})</span>
        </div>
        {isExpanded && group.items && (
          <div className="group-items">
            {group.items.map((item) => renderGroup(item, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="ticket-list">
      {ticketData.map((group) => renderGroup(group))}
    </div>
  )
}