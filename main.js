
let dict = {
    "uml.package.fillColor":                    "#d67272",
    "uml.class.fillColor":                      "#d67272",
    "uml.model.fillColor":                      "#d67272",
    "uml.subsystem.fillColor":                  "#d67272",
    "uml.node.fillColor":                       "#d67272",
    "uml.usercase.fillColor":                   "#d67272",

    "flowchart.database.fillColor":             "#f8a9cc",
    "flowchart.document.fillColor":             "#8acd8a",
    "flowchart.predefined-process.fillColor":   "#ddc8c3",
    "flowchart.data.fillColor":                 "#dee7fe",
    "flowchart.decision.fillColor":             "#cce18d",
    "flowchart.manual-input.fillColor":         "#edeffa",
    "flowchart.process.fillColor":              "#fff07c",
    "flowchart.terminator.fillColor":           "#9acef6"
}

// Prefix used in class names
let prefix = {
    "DFD": "dfd",
    "FC": "flowchart",
    "UML": "uml",
    "SysML": "sysml",
    "ERD": "erd"
}


function setColors() {
    for (const key of Object.keys(dict)) {
        prefManager.set(key, dict[key])
    }

}

function setDefault() {
    for (const key of Object.keys(dict)) {
        prefManager.set(key, null)
    }
}

function applyOnDiagram() {
    let diagram = app.diagrams.getCurrentDiagram()
    for (const view of diagram.ownedViews) {

        // Build the preference Id using the class name and the class prefix
        let name = view.getClassName()
        let prefId = ""
        
        // TODO check Multi-Document and Manuel-input

        for (const key of Object.keys(prefix)) {
            if (name.startsWith(key)) {
                prefId += prefix[key] + "."
                name = name.substr(key.length)
                break;
            }
        }
        prefId += name.replace("View", "").toLowerCase()+".fillColor"

        // Change the element color
        let prefColor = prefManager.get(prefId)
        if (prefColor != null) view.fillColor = prefColor
    }
    app.diagrams.repaint()
}



let prefManager;
function init() {
    app.commands.register('color:set', setColors)
    app.commands.register('color:default', setDefault)
    app.commands.register('color:apply', applyOnDiagram)
    prefManager = app.preferences
}

exports.init = init