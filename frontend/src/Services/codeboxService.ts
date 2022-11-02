import { codeBoxType } from 'Types';
import Axios from './Axios';

const createCodebox = (codeboxName: string, language: codeBoxType) =>
    Axios.post('/codebox/create', {
        room_name: codeboxName,
        language,
    });

const joinCodebox = (codeboxId: string) =>
    Axios.get(`/codebox/join/${codeboxId}`);

const executeCodebox = (
    language: 'CPP' | 'PYTHON',
    code: string,
    input: string,
) =>
    Axios.post(`/codebox/run`, {
        input,
        code,
        language,
    });

export { createCodebox, joinCodebox, executeCodebox };
