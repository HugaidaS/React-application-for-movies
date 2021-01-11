import React from 'react'

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem
}) => {
  //text and value property allow us to use this ListGroup with any kind of lists

  return (
    <div className='list-group '>
      {items.map((item) => {
        return (
          <a
            href='#'
            className={
              selectedItem === item
                ? 'list-group-item list-group-item-action active'
                : 'list-group-item list-group-item-action'
            }
            key={item[valueProperty]}
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </a>
        )
      })}
    </div>
  )
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
}
//allows us to simplify code in movies component

export default ListGroup
