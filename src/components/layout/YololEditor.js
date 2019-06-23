import React from "react";
import AceEditor from "react-ace";

import "brace/mode/java";
import "brace/theme/solarized_dark";

export default class YololEditor extends React.Component {
  onChange = newValue => {
    console.log("change", newValue);
  };

  render() {
    return (
      <AceEditor className="mt-0"
        mode="python"
        theme="solarized_dark"
        onChange={this.onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    );
  }
}
