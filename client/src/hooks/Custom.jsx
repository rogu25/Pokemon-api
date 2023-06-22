export function customFilter(obj) {
    try {
        const { origen, orden, tipo, filtrados, total} = obj;
        if(origen === "all"){
            const filterType = tipo !== "all" ? filtrados.filter((f) => {
                const tipos = f.types.find((t) => t.name === tipo);
                return tipos;
            }) : filtrados;
            if(filterType.length){
                if(orden === "all"){
                    return { origen, orden, tipo, filtrados: filterType, total: filterType.length}
                }
                if(orden === "asc"){
                    return { origen, orden, tipo, filtrados: filterType.sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)), total: filterType.length}
                }
                if(orden === "desc"){
                    return { origen, orden, tipo, filtrados: filterType.sort((b, a) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)), total: filterType.length}
                }
                if(orden === "mas"){
                    return { origen, orden, tipo, filtrados: filterType.sort((b, a) => a.fuerza - b.fuerza), total: filterType.length}
                }
                if(orden === "menos"){
                    return { origen, orden, tipo, filtrados: filterType.sort((a, b) => a.fuerza - b.fuerza), total: filterType.length}
                }
                   
            }
            return { origen, orden, tipo, filtrados: filterType, total: filterType.length, mensaje : !filterType.length && `no se encontro ${tipo}`}
        }
        if(origen === "db"){
            const db = filtrados.filter((f) => f.id.length === 36);
            const filterType = tipo !== "all" ? db.filter((f) => {
                const tipos = f.types.find((t) => t.name === tipo);
                return tipos;
            }) : db;
            if(filterType.length){
                if(orden === "all"){
                    return { origen, orden, tipo, filtrados: filterType, total: filterType.length}
                }
                if(orden === "asc"){
                    return { origen, orden, tipo, filtrados: filterType.sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)), total: filterType.length}
                }
                if(orden === "desc"){
                    return { origen, orden, tipo, filtrados: filterType.sort((b, a) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)), total: filterType.length}
                }
                if(orden === "mas"){
                    return { origen, orden, tipo, filtrados: filterType.sort((b, a) => a.fuerza - b.fuerza), total: filterType.length}
                }
                if(orden === "menos"){
                    return { origen, orden, tipo, filtrados: filterType.sort((a, b) => a.fuerza - b.fuerza), total: filterType.length}
                }
                   
            }else{
                return { origen, orden, tipo, filtrados: [], total, mensaje : !filterType.length && `no se encontro ${tipo}`}
            }
            return { origen, orden, tipo, filtrados: db, total: db.length}
        }
        if(origen === "api"){
            const api = filtrados.filter((f) => f.id.length !== 36);
            const filterType = tipo !== "all" ? api.filter((f) => {
                const tipos = f.types.find((t) => t.name === tipo);
                return tipos;
            }) : api;
            if(filterType.length){
                if(orden === "all"){
                    return { origen, orden, tipo, filtrados: filterType, total: filterType.length}
                }
                if(orden === "asc"){
                    return { origen, orden, tipo, filtrados: filterType.sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)), total: filterType.length}
                }
                if(orden === "desc"){
                    return { origen, orden, tipo, filtrados: filterType.sort((b, a) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)), total: filterType.length}
                }
                if(orden === "mas"){
                    return { origen, orden, tipo, filtrados: filterType.sort((b, a) => a.fuerza - b.fuerza), total: filterType.length}
                }
                if(orden === "menos"){
                    return { origen, orden, tipo, filtrados: filterType.sort((a, b) => a.fuerza - b.fuerza), total: filterType.length}
                }  
            }else{
                return { origen, orden, tipo, filtrados: [], total, mensaje : !filterType.length && `no se encontro ${tipo}`}
            }
            return { origen, orden, tipo, filtrados: api, total: api.length}
        }
        return { origen, orden, tipo, filtrados:[], total}
        
    } catch (error) {
        return error.message
    }
}