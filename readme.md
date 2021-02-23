# folderToJson

Generates a JavaScript object (or JSON text) that represents the structure of a folder.

### Basic functionality

The <a href="https://github.com/scripting/folderToJson/tree/main/test">test app</a> displays in the console the folder hierarchy of the node_modules folder. 

### Advanced functionaly

You can cook your own generator for other formats by following the example of <a href="https://github.com/scripting/folderToJson/blob/93dc1daf715777a8c003ac1ee608baf074ca227a/foldertojson.js#L68">getObject</a> in foldertojson.js.

### Updates

#### 2/22/21 by DW

Attributes for folders such as creation and mod dates, and add an extral level between a folder and its subs. This conforms to the JSON structure we use for outlines so it should just plug right into LO2, which was the plan. 

Changed the test script to run from the root folder of the project instead of a sub-folder. Makes debugging much easier. 

