import User from "../domain/User";
import UserRepository from "../domain/user.repository";

export class UserUseCases {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    registrar(user: User){
        return this.userRepository.registrarUser(user);
    }

    logIn(user: User){
        return this.userRepository.logIn(user);
    }
}