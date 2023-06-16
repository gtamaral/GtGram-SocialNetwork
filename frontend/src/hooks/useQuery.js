import { useLocation } from "react-router-dom"; //para acessar a querystring
import { useMemo } from "react"; //guarda o valor, ou seja, nao vai reenderizar se alterar-lo ou modificar-lo por algum motivo

export function useQuery() {

    const {search} = useLocation()

    return useMemo(() => new URLSearchParams(search), [search])
}