export const isObjEq = (x: any, y: any): boolean => {
    const ok = Object.keys,
        tx = typeof x,
        ty = typeof y

    return x && y && tx === 'object' && tx === ty ? (
        ok(x).length === ok(y).length && ok(x).every(key => isObjEq(x[key], y[key]))
    ) : (x === y)

}