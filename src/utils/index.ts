// Descendant function sort: top watchers first
export const descendantSort = (results: []) => {
    results.sort((a, b) => {
        if (a > b) {
            return -1;
        }
        if (a < b) {
            return 1;
        }
        return 0;
    })
};

// Ascendant function sort: top watchers last
export const ascendantSort = (results: []) => {
    results.sort((a, b) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }
}
