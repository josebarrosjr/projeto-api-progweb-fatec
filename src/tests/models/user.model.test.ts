import { UserRole } from "../../models/enums/user-role.enums";
import { Usuario } from "../../models/user.model";


describe('Modelo de Usuário (Unitário)', () => {
    it('deve ser capaz de criar uma instância da classe Usuario', () => {
        const usuario = new Usuario();
        expect(usuario).toBeInstanceOf(Usuario);
    });

    it('deve atribuir propriedades corretamente', () => {
        const usuario = new Usuario();
        usuario.id = 'user-uuid-1';
        usuario.nome = 'Usuário de Teste';
        usuario.role = UserRole.ADMIN;
        usuario.cpf = 12345678900;
        
        expect(usuario.id).toBe('user-uuid-1');
        expect(usuario.nome).toBe('Usuário de Teste');
        expect(usuario.role).toEqual(UserRole.ADMIN);
    });
});