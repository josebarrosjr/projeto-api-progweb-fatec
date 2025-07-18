import 'reflect-metadata';
import { AppDataSource } from '../../data-source';
import { Usuario } from '../../models/user.model';
import { UserRole } from '../../models/enums/user-role.enums';
import * as bcrypt from 'bcrypt';


const createUsers = async () => {
    console.log('🌱 Iniciando o processo de seeding...');

    try {
        await AppDataSource.initialize();
        console.log('✔️ Conexão com o banco de dados estabelecida.');

        const userRepository = AppDataSource.getRepository(Usuario);

        const saltRounds = 10;
        const adminPassword = await bcrypt.hash('admin123', saltRounds);
        const medicoPassword = await bcrypt.hash('medico123', saltRounds);
        const pacientePassword = await bcrypt.hash('paciente123', saltRounds);
        
        console.log('🔑 Senhas hasheadas.');

        const usersToCreate: Partial<Usuario>[] = [
            {
                nome: 'admin',
                senha: adminPassword,
                cpf: 12345,
                role: UserRole.ADMIN,
            },
            {
                nome: 'dr_house',
                senha: medicoPassword,
                cpf: 45678,
                role: UserRole.MEDICO,
                crm: '12345-SP',
            },

            {
                nome: 'joao_paciente',
                senha: pacientePassword,
                cpf: 56789,
                role: UserRole.PACIENTE,
            }
        ];
        
        console.log('👤 Criando usuários...');
        await userRepository.save(usersToCreate);

        console.log('✅ Seeding concluído com sucesso! Usuários criados.');

    } catch (error) {
        console.error('❌ Erro durante o processo de seeding:', error);
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log('🔌 Conexão com o banco de dados fechada.');
        }
    }
}

createUsers();