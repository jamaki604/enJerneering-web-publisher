class TextBoxContent {
    constructor(parsedTextboxData){
        this.parsedTextboxData = parsedTextboxData;
    }
    getContent(){
        return `
                <body>
                    <div class="container">
                        <p class="text">
                            ${this.parsedTextboxData.content}
                        </p>
                    </div>
            `
    }
}

module.exports = TextBoxContent

//Pierson Silver - html string for the style of the textbox component