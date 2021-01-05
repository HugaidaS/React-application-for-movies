import React, { Component } from 'react'

import _ from 'lodash';

class TableBody extends Component {
    render() { 
        const {data, columns, onLike, onDelete} = this.props;

        return (  
            <tbody>

            {data.map(item=>{
                return (
                    <tr key={item._id}>
                    {columns.map(column=> 
                    <td>{_.get(item, column.path)}</td>)}
                    <td></td>
                </tr>
                ) 
              })}
    </tbody>
        );
    }
}
 
export default TableBody;