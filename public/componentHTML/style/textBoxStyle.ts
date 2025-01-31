class TextBoxStyle{
    getStyle(){
        return `
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5rem; /* space-y-6 */
                    flex-shrink: 0;
                    max-width: 400px; /* xl:max-w-[400px] */
                }

                .text {
                    font-size: 1rem; /* text-base */
                    font-weight: 400; /* font-normal */
                    color: #6b7280; /* text-neutral-500 */
                    text-align: center; /* text-center */
                    white-space: pre-wrap; /* Preserve newlines (\n) */
                }
            `
    }
}

export default TextBoxStyle;

//Pierson Silver - html string for the content in the textbox component