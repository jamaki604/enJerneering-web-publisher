class FooterContent{
    constructor(parsedFooterData){
        this.parsedFooterData = parsedFooterData;
    }
    getContent(){
        return `
                <body>
                    <div class="footer-container">
                        <footer aria-labelledby="footer-heading" class="footer">
                            <div class="footer-content">
                                <div class="footer-logo">
                                    <img src="${this.parsedFooterData.logo}" alt="Logo"/>
                                    <p class="footer-text">${this.parsedFooterData.slogan}</p>
                                    <h3>Socials</h3>
                                        <ul role="list" class="horizontal-list">
                                            <li>
                                                <a href="https://${this.parsedFooterData.socials.find(social => social.name === 'linkedin').url}">${this.parsedFooterData.socials.find(social => social.name === 'linkedin').name}</a>
                                            </li>
                                            <li>
                                                <a href="https://${this.parsedFooterData.socials.find(social => social.name === 'github').url}">${this.parsedFooterData.socials.find(social => social.name === 'github').name}</a>
                                            </li>
                                            <li>
                                                <a href="https://${this.parsedFooterData.socials.find(social => social.name === 'instagram').url}">${this.parsedFooterData.socials.find(social => social.name === 'instagram').name}</a>
                                            </li>
                                            <li>
                                                <a href="https://${this.parsedFooterData.socials.find(social => social.name === 'facebook').url}">${this.parsedFooterData.socials.find(social => social.name === 'facebook').name}</a>
                                            </li>
                                        </ul>
                                </div>
                                <div class="footer-group">
                                    <div>
                                        <h3>Group 1</h3>
                                        <ul role="list" class="mt-6 space-y-4">
                                            <li>
                                                <a href="${this.parsedFooterData.navigation.find(page => page.title === 'Page 1').href}">${this.parsedFooterData.navigation.find(page => page.title === 'Page 1').title}</a>
                                            </li>
                                            <li>
                                                <a href="${this.parsedFooterData.navigation.find(page => page.title === 'Page 2').href}">${this.parsedFooterData.navigation.find(page => page.title === 'Page 2').title}</a>
                                            </li>
                                            <li>
                                                <a href="${this.parsedFooterData.navigation.find(page => page.title === 'Page 3').href}">${this.parsedFooterData.navigation.find(page => page.title === 'Page 3').title}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3>Group 2</h3>
                                        <ul role="list" class="mt-6 space-y-4">
                                            <li>
                                                <a href="${this.parsedFooterData.navigation.find(page => page.title === 'Page 4').href}">${this.parsedFooterData.navigation.find(page => page.title === 'Page 4').title}</a>
                                            </li>
                                            <li>
                                                <a href="${this.parsedFooterData.navigation.find(page => page.title === 'Page 5').href}">${this.parsedFooterData.navigation.find(page => page.title === 'Page 5').title}</a>
                                            </li>
                                            <li>
                                                <a href="${this.parsedFooterData.navigation.find(page => page.title === 'Page 6').href}">${this.parsedFooterData.navigation.find(page => page.title === 'Page 6').title}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="footer-policy">
                                    <a href="https://${this.parsedFooterData.polices.find(policy => policy.title === 'Privacy Policy').url}">${this.parsedFooterData.polices.find(policy => policy.title === 'Privacy Policy').title}</a>
                                    <a href="https://${this.parsedFooterData.polices.find(policy => policy.title === 'Terms & Conditions').url}">${this.parsedFooterData.polices.find(policy => policy.title === 'Terms & Conditions').title}</a>
                                    <a href="https://${this.parsedFooterData.polices.find(policy => policy.title === 'Legal Information').url}">${this.parsedFooterData.polices.find(policy => policy.title === 'Legal Information').title}</a>
                                </div>
                            </div>
                            <div class="footer-bottom">
                                <p>${this.parsedFooterData.copyRight}</p>
                            </div>
                        </footer>
                    </div>
                </body>
            `
    }
}

module.exports = FooterContent

//Pierson Silver - html string for the content in the footer component