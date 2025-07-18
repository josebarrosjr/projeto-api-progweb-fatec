
import { Consulta } from '../../models/consulta.model';
import { ConsultationStatus } from '../../models/enums/consulta-status.enum';
import { Usuario } from '../../models/user.model';

describe('Modelo de Consulta (Unitário)', () => {
    it('deve ser capaz de criar uma instância da classe Consulta', () => {

        const consulta = new Consulta();

        expect(consulta).toBeInstanceOf(Consulta);
    });

    it('deve ser capaz de atribuir propriedades corretamente', () => {
        const consulta = new Consulta();
        const paciente = new Usuario();
        paciente.id = 'paciente-uuid';

        const dataAtual = new Date();

        consulta.id = 'consulta-uuid';
        consulta.status = ConsultationStatus.SOLICITADA;
        consulta.paciente = paciente;

        expect(consulta.id).toBe('consulta-uuid');
        expect(consulta.status).toBe(ConsultationStatus.SOLICITADA);
        expect(consulta.paciente.id).toBe('paciente-uuid');
    });
});