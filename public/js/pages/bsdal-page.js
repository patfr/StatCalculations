import { createFooter } from "../shared/footer.js";
import { createHeader } from "../shared/header.js";
import { TranscensionPage } from "../shared/trans-page.js";
createHeader();
createFooter();
new TranscensionPage('bsdal')
    .mount('#trans');
