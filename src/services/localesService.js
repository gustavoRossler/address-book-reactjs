import axios from 'axios';

export const getUfs = async () => {
    const res = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const data = res.data;
    return data;
}

export const getCities = async (uf) => {
    const res = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.toUpperCase()}/municipios`);
    const data = res.data;
    return data;
}