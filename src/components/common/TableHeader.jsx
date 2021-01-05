import React, { Component } from 'react'
//columns: array
//sortcolumn: Object
//onSort: function
class TableHeader extends Component {
    raiseSort = path =>{
        const sortColumn = {...this.props.sortColumn};
            if(sortColumn.path ===path){
                sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
            }else{
                sortColumn.path =path;
                sortColumn.order = 'asc';
        };
        this.props.onSort(sortColumn);
      }

    render() { 
        return (
            <thead>
                <tr>
                   {this.props.columns.map((column,idx)=><th key={idx} onClick={()=>this.raiseSort(column.path)} >{column.label}</th> )}
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;