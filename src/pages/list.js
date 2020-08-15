// https://reactrouter.com/

import React from 'react'
import { read } from '../providers/data'

const labels = [
  { label: 'Identificador', render: (item) => (item.id) },
  { label: 'Total de tasks', render: (item) => (item.tasks.length) },
  { label: 'Titulo', render: (item) => (item.title) },
]

const HeadersTable = ({ labels }) => (
  <thead>
    <tr>
      {
        labels.map(lbl => (
          <th key={lbl.label}>{lbl.label}</th>
        ))
      }
    </tr>
  </thead>
)

const BodyTable = ({ rows, labels }) => (
  <tbody>
    {rows.map(item => {
      return <tr key={item.id}>
        {
          labels.map(lbl => (
            <td key={lbl.label}>{lbl.render(item)}</td>
          ))
        }
      </tr>
    })}
  </tbody>
)

const Table = ({ rows, labels }) => {
  return <table>
    <HeadersTable labels={labels} />
    <BodyTable labels={labels} rows={rows} />
  </table>
}

export default class ListTodo extends React.Component {
  state = {
    isLoading: false,
    errorMessage: null,
    rows: []
  }

  async componentDidMount() {
    this.setState({ isLoading: true, errorMessage: null })
    try{
      const rows = await read()
      this.setState({ isLoading: false, rows })
    }catch(e){
      this.setState({ isLoading: false, errorMessage: e })
    }
  }

  render() {
    const { isLoading, rows, errorMessage } = this.state;
    if(isLoading) return <strong>Carregando...</strong>
    if(errorMessage) return <strong style={{color: 'red'}}>{errorMessage}</strong>

    return <div><Table rows={rows} labels={labels} /></div>
  }
}