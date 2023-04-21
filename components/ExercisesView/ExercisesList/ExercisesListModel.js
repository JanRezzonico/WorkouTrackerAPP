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
    // return sorted;
}

export const filter = (filter) => {
    console.log(filter);
    const useSearchFilter = filter.search != '';
    const useMusclesFilter = filter.muscles.value != 'All';
    const useForceFilter = filter.force.value != 'All';
    if (!useSearchFilter && !useMusclesFilter && !useForceFilter) { //Avoid useless looping if in the end you are not going to apply any change.
        return global.exercises;
    }
    let newExercises = [];
    for (const exercise of global.exercises) {
        const search = exercise.name.includes(filter.search) || !useSearchFilter;
        const muscles = exercise.primaryMuscles.includes(filter.muscles.value) || !useMusclesFilter;
        const force = exercise.force == filter.force.value || !useForceFilter;
        if (search && muscles && force) {
            newExercises.push(exercise);
        }
    }
    return newExercises;
}