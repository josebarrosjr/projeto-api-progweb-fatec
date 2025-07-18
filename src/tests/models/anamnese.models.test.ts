
import { Anamnese } from '../../models/anamnese.model';
import { AnamneseTypes } from '../../models/enums/anamnese-types.enums';

describe('Modelo de Anamnese (Unitário)', () => {
    it('deve atribuir um tipo de exame corretamente usando o enum AnamneseTypes', () => {

        const anamnese = new Anamnese();

        anamnese.tipoExame = AnamneseTypes.ADMISSIONAL;

        expect(anamnese.tipoExame).toBe(AnamneseTypes.ADMISSIONAL);
        
        expect(anamnese.tipoExame).toEqual('ADMISSIONAL');
    });
});