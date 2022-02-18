import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const toolbar = {
  options: ["inline", "blockType", "list", "remove", "history"],

  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code"
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined
  }
};

class PracticeDescriptionEditor extends Component {
  constructor(props) {
    super(props);
    const html = this.props.value || "";
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState
      };
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
    if (this.props.onChange) {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const markup = draftToHtml(rawContentState);
      this.props.onChange(markup);
    }
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="border p-2" {...this.props}>
        <Editor
          editorState={editorState}
          toolbar={toolbar}
          onEditorStateChange={this.onEditorStateChange}
          readOnly={this.props.readOnly}
          toolbarHidden={this.props.readOnly}
          handlePastedText={() => false}
          stripPastedStyles={true}
        />
      </div>
    );
  }
}

PracticeDescriptionEditor.defaultProps = {
  readOnly: false
};

export default PracticeDescriptionEditor;
