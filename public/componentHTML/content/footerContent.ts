interface Social {
    name: string;
    url: string;
}

interface Navigation {
    title: string;
    href: string;
}

interface Policy {
    title: string;
    url: string;
}

interface ParsedFooterData {
    logo: string;
    slogan: string;
    socials: Social[];
    navigation: Navigation[];
    polices: Policy[];
    copyRight: string;
}

class FooterContent {
    private parsedFooterData: ParsedFooterData;

    constructor(parsedFooterData: ParsedFooterData) {
        this.parsedFooterData = parsedFooterData;
    }

    getContent(): string {
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
                                    ${this.parsedFooterData.socials
                                        .map(social => `<li><a href="https://${social.url}">${social.name}</a></li>`)
                                        .join('')}
                                </ul>
                            </div>
                            <div class="footer-group">
                                <div>
                                    <h3>Group 1</h3>
                                    <ul role="list" class="mt-6 space-y-4">
                                        ${this.getNavigationLinks(['Page 1', 'Page 2', 'Page 3'])}
                                    </ul>
                                </div>
                                <div>
                                    <h3>Group 2</h3>
                                    <ul role="list" class="mt-6 space-y-4">
                                        ${this.getNavigationLinks(['Page 4', 'Page 5', 'Page 6'])}
                                    </ul>
                                </div>
                            </div>
                            <div class="footer-policy">
                                ${this.getPolicyLinks(['Privacy Policy', 'Terms & Conditions', 'Legal Information'])}
                            </div>
                        </div>
                        <div class="footer-bottom">
                            <p>${this.parsedFooterData.copyRight}</p>
                        </div>
                    </footer>
                </div>
            </body>
        `;
    }

    private getNavigationLinks(titles: string[]): string {
        return titles
            .map(title => {
                const page = this.parsedFooterData.navigation.find(p => p.title === title);
                return page ? `<li><a href="${page.href}">${page.title}</a></li>` : '';
            })
            .join('');
    }

    private getPolicyLinks(titles: string[]): string {
        return titles
            .map(title => {
                const policy = this.parsedFooterData.polices.find(p => p.title === title);
                return policy ? `<a href="https://${policy.url}">${policy.title}</a>` : '';
            })
            .join('');
    }
}

export default FooterContent;
