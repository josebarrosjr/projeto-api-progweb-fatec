import { AppDataSource } from "../data-source";
import { Usuario }  from "../models/user.model";

export const userRepository = AppDataSource.getRepository(Usuario).extend({
    
    async addUser(nome: string, senha: string, cpf: number) : Promise<Usuario> {
    
    const newUser = this.create({
      nome: nome,
      senha: senha,
      cpf: cpf,
    });

    return this.save(newUser);
},
    findByCPF(cpf: number) {
    return this.findOneBy({ cpf: cpf });
  },

})


