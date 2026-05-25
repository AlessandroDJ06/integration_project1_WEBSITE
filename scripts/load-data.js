

function loadJsonFile(jsonFileUrl, callback) {
    fetch(jsonFileUrl)
        .then(response => response.json())
        .then(callback)
        .catch(error => alert(`Er heeft zich een fout voorgedaan bij het ophalen van '${jsonFileUrl}'`));
}

function groupAutoValidationData(results) {
    return results.reduce((acc, item) => {
        const {category, criteria} = item;

        // First level: category
        if (!acc[category]) {
            acc[category] = {};
        }

        // Second level: criteria
        if (!acc[category][criteria]) {
            acc[category][criteria] = [];
        }

        // Add item
        acc[category][criteria].push(item);

        return acc;
    }, {});
}