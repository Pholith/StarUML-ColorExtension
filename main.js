
let dict = {
    // Class diagram
    "uml.class.fillColor":                      "#d8e1f8",
    "uml.interface.fillColor":                  "#ffffcd",
    "uml.enumeration.fillColor":                "#f4d3d3",
    
    // Use case diagram
    "uml.actor.fillColor":                      "#ffffff",
    "uml.package.fillColor":                    "#fff2e4",
    "uml.usecase.fillColor":                    "#d6ffae",

    // Activity diagram
    "uml.action.fillColor":                     "#d8e1f8",
    "uml.controlnode.fillColor":                "#cce18d",

    // Deployment and component diagram
    "uml.node.fillColor":                       "#f1d9c2",
    "uml.component.fillColor":                  "#e1e5fa",
    "uml.artifact.fillColor":                   "#e3ffc9",
    "uml.port.fillColor":                       "#c082ff",

    // Flowchart diagram
    "flowchart.terminator.fillColor":           "#9acef6",
    "flowchart.process.fillColor":              "#fff07c",
    "flowchart.decision.fillColor":             "#cce18d",
    "flowchart.database.fillColor":             "#f8a9cc",
    "flowchart.document.fillColor":             "#8acd8a",
    "flowchart.predefined-process.fillColor":   "#ddc8c3",
    "flowchart.data.fillColor":                 "#dee7fe",
    "flowchart.manual-input.fillColor":         "#edeffa",

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