import React from 'react'
import { Input } from 'semantic-ui-react'

export default function Search({ onFilterChange, searchFilter }) {

  const onChange = (event) => onFilterChange(event.target.value);

  return (
    <div>
        <Input onChange={onChange} type='text' placeholder={searchFilter || 'search...'} />
    </div>
  )
}
