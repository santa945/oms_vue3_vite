// 扁平化数据
export const flatten = (value: any[], result = []) => {
    value.forEach(item => {
        result.push(item);
        if (item.children) {
            flatten(item.children, result);
        }
    });
    return result;
};

/**
 * 时间戳转日期 
 */
export const timestamp2date = (timestamp: number, format = "YYYY-MM-DD") => {
    let str = "";
    const stamp = timestamp > 10000000000 ? timestamp : timestamp * 1000;
    const time = new Date(stamp);
    const Y = time.getFullYear();
    const M = (time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
    const D = time.getDate();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    if (format === "YYYY-MM-DD hh:mm:ss") {
        str = `${Y}-${M}-${D} ${h}:${m}:${s}`;
    } else {
        str = `${Y}-${M}-${D}`;
    }
    return str;
}