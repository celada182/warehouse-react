import React, {ChangeEvent, Component} from 'react';

type ImportProps = {
  onImport: () => void
}

type ImportState = {
  inventoryFile: string,
  productFile: string,
  loading: boolean
}

export class ImportComponent extends Component<ImportProps, ImportState> {
  state: ImportState = {
    inventoryFile: "",
    productFile: "",
    loading: false
  }

  postFile(endpoint: string, data: object) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(data)
    };
    this.setState({loading: true});
    fetch('http://localhost:8080/' + endpoint, requestOptions)
    .then(res => res.json())
    .then(res => {
        if (res.error){
          alert(res.error);
        }
        this.setState({loading: false});
    })
    .then(this.props.onImport);
  };

  handleImport(e: ChangeEvent<HTMLInputElement>, type: string) {
    const fileReader = new FileReader();
    if (e.target.files) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = () => {
        if (!fileReader.result) return;
        const data = JSON.parse(fileReader.result as string);
        this.postFile(type, data);
      };
    }
  };

  render() {
    return (
        <div className={"row"}>
          <div className={"col"}>
            <label className={"form-label"}>Import Inventory</label>
            <input className={"form-control"} type="file"
                   value={this.state.inventoryFile}
                   onChange={(e) => this.handleImport(e, 'inventory')}
                   disabled={this.state.loading}/>
          </div>
          <div className={"col"}>
            <label className={"form-label"}>Import Products</label>
            <input className={"form-control"} type="file"
                   value={this.state.productFile}
                   onChange={(e) => this.handleImport(e, 'product')}
                   disabled={this.state.loading}/>
          </div>
          <p style={{visibility: this.state.loading ? 'visible' : 'hidden'}}>Loading...</p>
        </div>
    );
  }
}
