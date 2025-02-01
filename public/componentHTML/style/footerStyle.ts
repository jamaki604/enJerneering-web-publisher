class FooterStyle{
    getStyle(){
        return `
                .footer-container {
                    z-index: 30;
                    background-color: #DCD3FF; /* Equivalent to bg-gray-50 */
                    max-width: 60%;
                }

                .footer {
                    padding: 2.5rem 1.5rem; /* px-6 py-10 */
                }

                .footer-content {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem; /* gap-8 */
                }

                @media (min-width: 1280px) {
                    .footer-content {
                        flex-direction: row;
                        gap: 5rem; /* xl:gap-20 */
                    }
                }

                .footer-logo {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem; /* space-y-6 */
                    flex-shrink: 0;
                    max-width: 20%;
                    height: auto;
                }

                .footer-text {
                    font-size: 1rem; /* text-base */
                    font-weight: 400; /* font-normal */
                    color: #6b7280; /* text-neutral-500 */
                }

                .social-links {
                    display: flex;
                    gap: 1rem; /* space-x-4 */
                }

                .social-link {
                    color: #9ca3af; /* text-neutral-400 */
                }

                .social-link:hover {
                    color: #6b7280; /* hover:text-neutral-500 */
                }

                .footer-group {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem; /* gap-8 */
                }

                @media (min-width: 768px) {
                    .footer-group {
                        grid-template-columns: repeat(3, 1fr); /* md:grid-cols-3 */
                    }
                }

                @media (min-width: 1280px) {
                    .footer-group {
                        grid-column: span 3; /* xl:col-span-3 */
                    }
                }

                .footer-group h3 {
                    text-transform: uppercase; /* uppercase */
                    font-size: 1rem; /* text-base */
                    font-weight: 600; /* font-semibold */
                    color: #1f2937; /* text-neutral-800 */
                }

                .footer-group a {
                    font-size: 1rem; /* text-base */
                    font-weight: 400; /* font-normal */
                    color: #6b7280; /* text-neutral-500 */
                    text-decoration: none;
                }

                .footer-group a:hover {
                    color: #1f2937; /* hover:text-neutral-800 */
                }

                .footer-policy {
                    display: flex;
                    flex-shrink: 0;
                    gap: 1rem; /* gap-4 */
                    justify-content: center;
                    min-width: 200px; /* min-w-[200px] */
                    flex-direction: column; /* xl:flex-col */
                    justify-content: flex-start; /* xl:justify-start */
                }

                .footer-policy a {
                    font-size: 1rem; /* text-base */
                    font-weight: 400; /* font-normal */
                    color: #6b7280; /* text-neutral-500 */
                    text-decoration: none;
                }

                .footer-policy a:hover {
                    color: #1f2937; /* hover:text-neutral-800 */
                }

                .footer-bottom {
                    margin-top: 2.5rem; /* mt-10 */
                    border-top: 1px solid #1f2937; /* border-neutral-800/10 */
                    padding-top: 1.5rem; /* pt-6 */
                }

                .footer-bottom p {
                    text-align: center;
                    font-size: 1rem; /* text-base */
                    font-weight: 400; /* font-normal */
                    color: #6b7280; /* text-neutral-500 */
                }
                ul.horizontal-list {
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                }

                ul.horizontal-list li {
                    margin-right: 10px;
                }
`
    }
}

export default FooterStyle;

//Pierson Silver - html string for the style of the footer component