import React, {ChangeEvent, Component} from 'react';

type ImportProps = {
  onImport: () => void
}

type ImportState = {
  inventoryFile: string,
  productFile: string
}

export class ImportComponent extends Component<ImportProps, ImportState> {
  state: ImportState = {
    inventoryFile: "",
    productFile: ""
  }

  postFile(endpoint: string, data: object) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(data)
    };
    fetch('http://localhost:8080/' + endpoint, requestOptions)
    .then(this.props.onImport);
  };

  handleImport(e: ChangeEvent<HTMLInputElement>, type) {
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
        <div>
          <label>Import Inventory JSON</label>
          <input type="file" value={this.state.inventoryFile} onChange={(e) => this.handleImport(e, 'inventory')}/>
          <label>Import Product JSON</label>
          <input type="file" value={this.state.productFile} onChange={(e) => this.handleImport(e, 'product')}/>
        </div>
    );
  }
}
