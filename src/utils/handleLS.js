/**
 * localStorage 操作
 */
const handleLS = {
    set(name, val = {}) {
        try {
            window.localStorage.setItem(name, JSON.stringify(val));
        } catch (error) {
            console.error("Item name is required!");
        }
    },
    get(name, isRemove) {
        try {
            const data = JSON.parse(window.localStorage.getItem(name));
            if (isRemove) {
                this.remove(name);
            }

            // eslint-disable-next-line consistent-return
            return data;
        } catch (error) {
            console.error("Item name is required!");
        }
    },
    remove(name) {
        try {
            window.localStorage.removeItem(name);
            window.localStorage.removeItem(`${name}_time`);
        } catch (error) {
            console.error("Item name is required!");
        }
    },
};

export default handleLS;
