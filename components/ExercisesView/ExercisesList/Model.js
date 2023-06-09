export const sectionize = (array) => {
    const result = {};
    array.forEach(obj => {
        const firstLetter = obj.name.charAt(0).toUpperCase();
        if (/[A-Z]/.test(firstLetter)) {
            if (result[firstLetter]) {
                result[firstLetter].push({ ...obj });
            } else {
                result[firstLetter] = [{ ...obj }];
            }
        } else {
            if (result["#"]) {
                result["#"].push({ ...obj });
            } else {
                result["#"] = [{ ...obj }];
            }
        }
    });
    const sortedKeys = Object.keys(result).sort();
    return sortedKeys.map(key => ({
        title: key,
        data: result[key]
    }));
}



export const getDistinct = (propName) => {
    const distincts = new Set();
    global.exercises.forEach(element => {
        if (Array.isArray(element[propName])) {
            element[propName].forEach(subElem => { distincts.add(subElem) });
        } else {
            distincts.add(element[propName]);
        }
    });
    const sorted = Array.from(distincts).map(elem => elem.charAt(0).toUpperCase() + elem.slice(1)).sort();
    sorted.unshift("All");
    return sorted.map(v => ({
        label: v,
        value: v
    }));
}

export const filter = (filter) => {
    const search = filter.search.trim().toLowerCase();
    if (search === '') {
        // Return the original array if no filters are applied
        return global.exercises;
    }
    return global.exercises.filter((exercise) => {
        return exercise.name.toLowerCase().includes(search);
    });
}