class TextBoxContent {
    private parsedTextboxData: { content: string };

    constructor(parsedTextboxData: { content: string }) {
        this.parsedTextboxData = parsedTextboxData;
    }

    getContent(): string {
        return `
            <body>
                <div class="container">
                    <p class="text">
                        ${this.parsedTextboxData?.content ?? ""}
                    </p>
                </div>
            </body>
        `;
    }
}

export default TextBoxContent;
