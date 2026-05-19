window.addEventListener('load', handleInit);

function handleInit() {
    loadValidationData();
    document.querySelector('#refreshBtn').addEventListener('click', loadValidationData);
}

function loadValidationData() {
    loadJsonFile('../data/validatie-results.json', handleData);
}

function handleData(data) {
    let grouped = groupAutoValidationData(data);
    renderValidationResults(grouped);
}


function renderValidationResults(grouped) {
    let resultsContainer = document.querySelector('#validationResults');
    resultsContainer.innerHTML = '';

    for (let category in grouped) {
        let allChecks = getAllChecks(grouped[category]);
        let hasErrors = allChecks.some(check => check.state === 2);

        let technologySection = document.createElement('section');
        technologySection.className = hasErrors ? 'technology-section pixel-box technology-error' : 'technology-section pixel-box technology-ok';

        let statusText = hasErrors ? 'Fouten aanwezig' : 'Alles in orde';
        let statusClass = hasErrors ? 'status-error' : 'status-ok';

        technologySection.innerHTML = `
            <header class="technology-header centered-card flex-column-container">
                <h3 class="technology-name centered-text">${category}</h3>
                <span class="technology-status centered-text ${statusClass}">${statusText}</span>
            </header>
        `;

        if (!hasErrors) {
            let message = document.createElement('p');
            message.className = 'no-errors-message centered-text';
            message.textContent = `Geen fouten gevonden voor ${category}.`;
            technologySection.appendChild(message);

        } else {
            let criteriaMap = grouped[category];

            for (let criteria in criteriaMap) {
                let checks = criteriaMap[criteria];
                let problemChecks = checks.filter(check => check.state === 2 || check.state === 3);

                if (problemChecks.length === 0) continue;

                let checkList = document.createElement('ul');
                checkList.className = 'check-list';

                for (let check of problemChecks) {
                    let checkItem = document.createElement('li');
                    checkItem.className = 'check-item ' + getStateClass(check.state);
                    checkItem.textContent = (check.subcriteria ? check.subcriteria + ' — ' : '') + check.text;
                    checkList.appendChild(checkItem);
                }

                technologySection.appendChild(checkList);
            }
        }

        resultsContainer.appendChild(technologySection);
    }
}


function getAllChecks(criteriaMap) {
    let allChecks = [];
    for (let criteria in criteriaMap) {
        for (let check of criteriaMap[criteria]) {
            allChecks.push(check);
        }
    }
    return allChecks;
}

function getStateClass(state) {
    if (state === 2) return 'state-error';
    if (state === 3) return 'state-warning';
    if (state === 4) return 'state-success';
    if (state === 5) return 'state-info';
    return 'state-unknown';
}