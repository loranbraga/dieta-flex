import React from 'react'

function Table({ columns, data }){

  

  return(
    <table className="table">
      <thead>
        <tr>
          {
            columns.map(item => <th scope="col" key={item}>{item}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          data.map(item => {
            return (
              <tr key={item.id}>
                {
                  delete item.id
                }
                {Object.values(item).map(value => {
                    return <td>{value}</td>
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default Table