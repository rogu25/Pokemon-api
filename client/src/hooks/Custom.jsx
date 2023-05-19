export function customFilter(arreglo, key, value) {
    try {
        if (key === "type") {
            return arreglo.filter((f) => {
                const tipos = f.types.find((t) => t.name === value);
                return tipos;
            });
        }
        if (key === "order") {
            if (value === "asc") {
                return arreglo.sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0));
            }
            if (value === "desc") {
                return arreglo.sort((a, b) => (b.nombre > a.nombre ? 1 : a.nombre < b.nombre ? -1 : 0))
            }
        }
        if (key === "existencia") {
            if (value === "db") {
                return arreglo.filter((f) => f.id.length === 36);
            }
            if (value === "api") {
                return arreglo.filter((f) => f.id.length !== 36);
            }
        }  
    } catch (error) {
        return []
    }
}